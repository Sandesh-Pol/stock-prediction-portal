import os
from keras.models import load_model

BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # points to api/
MODEL_PATH = os.path.join(BASE_DIR, "model", "stock_prediction_model.keras")  # singular 'model'

print("Loading model from:", MODEL_PATH)  # debug
model = load_model(MODEL_PATH)
