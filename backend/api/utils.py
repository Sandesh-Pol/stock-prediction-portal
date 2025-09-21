# api/utils.py
import os
import math
import yfinance as yf
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from keras.models import load_model
from datetime import datetime

# Path to your trained model inside api/model/
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "model", "stock_prediction_model.keras")

def get_stock_data(ticker: str, years: int = 10):
    """Fetch stock data using yfinance and add moving averages."""
    now = datetime.now()
    start = datetime(now.year - years, now.month, now.day)
    df = yf.download(ticker, start=start, end=now, auto_adjust=False)
    df = df.reset_index()
    df['MA_100'] = df['Close'].rolling(100).mean()
    df['MA_200'] = df['Close'].rolling(200).mean()
    df['Percentage_Changed'] = df['Close'].pct_change()
    return df

def prepare_test_data(df):
    """Prepare training data and scaler."""
    data_training = pd.DataFrame(df['Close'][0:int(len(df)*0.7)])
    data_testing = pd.DataFrame(df['Close'][int(len(df)*0.7):])

    scaler = MinMaxScaler(feature_range=(0, 1))
    data_training_array = scaler.fit_transform(data_training)

    # Prepare x_train, y_train
    x_train, y_train = [], []
    for i in range(100, data_training_array.shape[0]):
        x_train.append(data_training_array[i-100:i])
        y_train.append(data_training_array[i, 0])
    x_train, y_train = np.array(x_train), np.array(y_train)

    return scaler, data_training, data_testing, x_train, y_train

def make_prediction(ticker: str, company_name: str):
    """Run stock prediction and return structured JSON response."""
    # Fetch data
    df = get_stock_data(ticker)
    scaler, data_training, data_testing, x_train, y_train = prepare_test_data(df)

    # Prepare final data for testing
    past_100_days = data_training.tail(100)
    final_df = pd.concat([past_100_days, data_testing], ignore_index=True)
    input_data = scaler.fit_transform(final_df)

    x_test, y_test = [], []
    for i in range(100, input_data.shape[0]):
        x_test.append(input_data[i-100:i])
        y_test.append(input_data[i, 0])
    x_test, y_test = np.array(x_test), np.array(y_test)

    # Load trained model from api/model/
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(f"Model file not found: {MODEL_PATH}")
    model = load_model(MODEL_PATH)

    # Make predictions
    y_pred = model.predict(x_test)
    y_pred = scaler.inverse_transform(y_pred.reshape(-1, 1)).flatten()
    y_test = scaler.inverse_transform(np.array(y_test).reshape(-1, 1)).flatten()

    # Metrics
    mse = mean_squared_error(y_test, y_pred)
    rmse = math.sqrt(mse)
    mae = mean_absolute_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)

    response = {
        "company": ticker,
        "company_name": company_name,
        "graphs": {
            "close_price": df['Close'].values.flatten().tolist(),
            "ma_100": df['MA_100'].fillna(0).values.flatten().tolist(),
            "ma_200": df['MA_200'].fillna(0).values.flatten().tolist()
        },
        "prediction_graph": {
            "labels": df['Date'].dt.strftime('%Y-%m-%d').values.flatten().tolist()[-len(y_pred):],
            "data": y_pred.flatten().tolist()
        },
        "metrics": {
            "mse": round(mse, 2),
            "rmse": round(math.sqrt(mse), 2),
            "mae": round(mean_absolute_error(y_test, y_pred), 2),
            "r2": round(r2_score(y_test, y_pred), 2)
        }
    }

    return response
