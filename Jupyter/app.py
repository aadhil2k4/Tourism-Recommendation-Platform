import pandas as pd
import json
from flask import Flask, request, jsonify
from sklearn.preprocessing import LabelEncoder, StandardScaler
import pickle
import numpy as np
from pymongo import MongoClient

# Load model artifacts
scaler = pickle.load(open("scaler.pkl", "rb"))
label_encoders = pickle.load(open("label_encoders.pkl", "rb"))
destination_mapping = json.load(open("destination_mapping.json", "r"))
df = pd.read_csv("Destinations.csv")

# MongoDB connection (Update URI as needed)
client = MongoClient("mongodb://localhost:27017/")
db = client["travel_app"]
preferences_collection = db["user_preferences"]

app = Flask(__name__)

question_mapping = {
    0: "Activity Types",
    1: "Climate Type",
    2: "Activity Types",
    3: "Recommended for",
    4: "Activity Types",
    5: "Recommended for"
}

def encode_categoricals(df):
    for col in label_encoders:
        if col in df.columns:
            encoder = label_encoders[col]
            try:
                df[col] = encoder.transform(df[col])
            except ValueError:
                df[col] = [encoder.classes_[0]] * len(df)
    return df

def scale_features(df):
    scale_cols = ['User Ratings (out of 5)', 'Number of Reviews', 'Social Media Mentions']
    df[scale_cols] = scaler.transform(df[scale_cols])
    return df

def preprocess(df):
    df = encode_categoricals(df)
    df = scale_features(df)
    return df

def filter_destinations(answers):
    filtered = df.copy()
    for i, ans in enumerate(answers):
        column = question_mapping[i]
        filtered = filtered[filtered[column].str.contains(ans, case=False, na=False)]
    return filtered

@app.route("/predict", methods=['GET'])
def predict():
    answers = request.args.getlist("answer")
    if len(answers) != 6:
        return jsonify({"error": "Invalid number of answers. Expected 6."}), 400

    filtered = filter_destinations(answers)
    if filtered.empty:
        return jsonify({"message": "No matching destinations found."})

    filtered = preprocess(filtered)

    # Select the top (first) destination
    top_destination = filtered.iloc[0]
    dest_name = top_destination["Destination Name"]
    dest_id = dest_name.lower().replace(" ", "-")  # simple slugified ID

    destination_data = {
        "id": dest_id,
        "Destination Name": dest_name,
        "Country": top_destination["Country"],
        "redirect_url": f"/dashboard/destinations/{dest_id}"
    }

    return jsonify(destination_data)

@app.route("/getUserPreferences", methods=["GET"])
def get_user_preferences():
    user_id = request.args.get("user_id")
    if not user_id:
        return jsonify({"error": "Missing user_id parameter"}), 400

    user_doc = preferences_collection.find_one({"user_id": user_id})
    if not user_doc or "preferences" not in user_doc:
        return jsonify({"error": "User preferences not found"}), 404

    answers = user_doc["preferences"]
    if len(answers) != 6:
        return jsonify({"error": "Invalid preferences format. Expected 6 values."}), 400

    filtered = filter_destinations(answers)
    if filtered.empty:
        return jsonify({"message": "No matching destinations found."})

    filtered = preprocess(filtered)
    results = filtered[['Destination Name', 'Country']].to_dict(orient='records')
    return jsonify(results)

@app.route("/getAllDestinations", methods=["POST"])
def get_all_destinations():
    data = request.get_json()
    answers = data.get("preferences", [])

    if len(answers) != 6:
        return jsonify({"error": "Invalid preferences format. Expected 6 values."}), 400

    filtered = filter_destinations(answers)
    if filtered.empty:
        return jsonify({"message": "No matching destinations found."})

    filtered = preprocess(filtered)

    enriched_results = []
    for _, row in filtered.iterrows():
        dest_name = row["Destination Name"]
        result = {
            "Destination Name": dest_name,
            "Country": row["Country"],
            "Details": destination_mapping.get(dest_name, {})
        }
        enriched_results.append(result)

    return jsonify(enriched_results)

if __name__ == "__main__":
    app.run(debug=True)

