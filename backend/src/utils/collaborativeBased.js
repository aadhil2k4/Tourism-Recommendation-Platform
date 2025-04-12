import tf from "@tensorflow/tfjs-node";

export const trainCollabModel = async (wishlists, destinationIdMap) => {
  const numDestinations = destinationIdMap.length;
  const userIDs = [...new Set(wishlists.map((w) => w.userId))];
  const numUsers = userIDs.length;

  // Create interaction matrix
  const interactions = tf.buffer([numUsers, numDestinations]);
  wishlists.forEach((w) => {
    const userIdx = userIDs.indexOf(w.userId);
    w.destinationIds.forEach((destId) => {
      // Map the destination ID to its numeric index
      const destIndex = destinationIdMap.indexOf(destId);
      if (destIndex !== -1) {
        interactions.set(1, userIdx, destIndex);
      }
    });
  });

  // Build model
  const model = tf.sequential();
  model.add(tf.layers.embedding({
    inputDim: numUsers,
    outputDim: 32,
    inputLength: 1,
    name: "userEmbedding"
  }));
  model.add(tf.layers.flatten());
  model.add(tf.layers.dense({
    units: numDestinations,
    activation: "sigmoid",
    name: "output"
  }));

  // Compile and train
  model.compile({
    optimizer: tf.train.adam(0.001),
    loss: "binaryCrossentropy"
  });

  const userIndices = tf.tensor1d(
    Array.from({ length: numUsers }, (_, i) => i),
    "int32"
  );

  await model.fit(userIndices, interactions.toTensor(), {
    epochs: 20,
    batchSize: 32,
    shuffle: true
  });

  return model; // Return the trained model
};
