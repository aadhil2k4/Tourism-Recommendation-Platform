import pkg from 'natural';
const { TfIdf } = pkg;

const tfidf = new TfIdf();

// Extract tags from destination document
const extractTags = (destination) => {
  const tags = [];
  
  // Split comma-separated fields and clean up
  if (destination["Activity Types"]) {
    tags.push(...destination["Activity Types"].split(",").map(s => s.trim().toLowerCase()));
  }
  if (destination["Recommended for"]) {
    tags.push(...destination["Recommended for"].split(",").map(s => s.trim().toLowerCase()));
  }
  
  // Add other fields as individual tags
  if (destination["Climate Type"]) {
    tags.push(destination["Climate Type"].toLowerCase());
  }
  if (destination["Budget Level"]) {
    tags.push(destination["Budget Level"].toLowerCase());
  }
  
  return [...new Set(tags)]; // Remove duplicates
};

export const trainTFIDF = (destinations) => {
  destinations.forEach(dest => {
    const tags = extractTags(dest);
    tfidf.addDocument(tags.join(" "));
  });
};

export const getContentBasedScores = (preferredTags) => {
  const scores = new Array(tfidf.documents.length).fill(0);
  preferredTags.forEach(tag => {
    tfidf.tfidfs(tag.toLowerCase(), (i, score) => {
      scores[i] += score;
    });
  });
  return scores;
};
