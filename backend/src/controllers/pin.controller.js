import { Pin } from "../models/pins.model.js";

export const createPin = async (req, res) => {
    const newPin = new Pin(req.body);
    try {
        const savedPin = await newPin.save();
        res.status(200).json(savedPin);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const allPins = async(req, res) => {
    try {
        const pins = await Pin.find();
        res.status(200).json(pins);
    } catch (error) {
        res.status(500).json(error);
    }
}