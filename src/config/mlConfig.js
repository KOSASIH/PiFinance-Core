// Machine learning model configurations

const mlConfig = {
    modelPath: process.env.ML_MODEL_PATH || './models/my_model.h5', // Path to the machine learning model
    inputShape: process.env.ML_INPUT_SHAPE || [10], // Input shape for the model
    outputShape: process.env.ML_OUTPUT_SHAPE || [1], // Output shape for the model
    predictionThreshold: process.env.ML_PREDICTION_THRESHOLD || 0.5, // Threshold for making predictions
};

module.exports = mlConfig;
