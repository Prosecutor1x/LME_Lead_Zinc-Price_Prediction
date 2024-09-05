import numpy as np
import pandas as pd
import torch
import torch.nn as nn
from joblib import load
from copy import deepcopy as dc



# Define the LSTM model class
class LSTM(nn.Module):
    def __init__(self, input_size, hidden_size, num_stacked_layers):
        super().__init__()
        self.hidden_size = hidden_size
        self.num_stacked_layers = num_stacked_layers

        self.lstm = nn.LSTM(input_size, hidden_size, num_stacked_layers,
                            batch_first=True)

        self.fc = nn.Linear(hidden_size, 1)

    def forward(self, x):
        batch_size = x.size(0)
        h0 = torch.zeros(self.num_stacked_layers, batch_size, self.hidden_size, dtype=torch.float32).to(x.device)
        c0 = torch.zeros(self.num_stacked_layers, batch_size, self.hidden_size, dtype=torch.float32).to(x.device)

        out, _ = self.lstm(x, (h0, c0))
        out = self.fc(out[:, -1, :])
        return out


#7days

def model_prediction_sevendays():
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    # Load the model and scaler
    model = LSTM(1, 20, 1)
    model.load_state_dict(torch.load('./resources/model_final/model_7days.pt', map_location=device))
    model.to(device)
    model.eval()

    scaler = load('./resources/model_final/scaler7days.joblib')

    # Few Parameters of the Model
    lookback = 7
    num_predictions = 7

    # Load the test dataset
    X_test = np.load('./resources/model_final/X_test_7days.npy')

    # Extract the last known values from the test set
    last_known_prices = X_test[-1, :, :].reshape((1, lookback, -1))

    # Convert to tensor and move to device using clone().detach()
    current_sequence = torch.tensor(last_known_prices, dtype=torch.float32).clone().detach().to(device)

    # Make future predictions
    future_predictions = []

    with torch.no_grad():
        for _ in range(num_predictions):
            # Make a prediction
            prediction = model(current_sequence)

            # Store the prediction
            future_predictions.append(prediction.item())

            # Update the current sequence
            prediction_reshaped = prediction.view(1, 1, 1)  # Reshape to (1, 1, 1)
            current_sequence = torch.cat((current_sequence[:, 1:, :], prediction_reshaped), dim=1)

    # Inverse transform the future predictions
    dummies = np.zeros((num_predictions, lookback + 1))  # Create a dummy array with the same number of features
    dummies[:, 0] = future_predictions  # Place future predictions in the first column
    dummies = scaler.inverse_transform(dummies)  # Inverse transform using the scaler
    future_predictions = dc(dummies[:, 0])  # Extract the inverse transformed predictions

    # Create a DataFrame for visualization
    future_dates = pd.date_range(start='2024-07-16', periods=num_predictions)
    df = pd.DataFrame({
        'Date': future_dates,
        'Predicted': future_predictions
    })
    df.set_index('Date', inplace=True)

    # Convert the DataFrame to JSON for the response
    result_json = df.to_json()

    return result_json

#3 months avg
def model_prediction_nextyear():
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    # Load the model and scaler
    model = LSTM(1, 4, 1)
    model.load_state_dict(torch.load('./resources/model_final/model_3months.pt', map_location=device))
    model.to(device)
    model.eval()

    scaler = load('./resources/model_final/scaler3months.joblib')

    # Few Parameters of the Model
    lookback = 7
    num_predictions = 4

    # Load the test dataset
    X_test = np.load('./resources/model_final/X_test_3months.npy')

    # Extract the last known values from the test set
    last_known_prices = X_test[-1, :, :].reshape((1, lookback, -1))

    # Convert to tensor and move to device using clone().detach()
    current_sequence = torch.tensor(last_known_prices, dtype=torch.float32).clone().detach().to(device)

    # Make future predictions
    future_predictions = []

    with torch.no_grad():
        for _ in range(num_predictions):
            # Make a prediction
            prediction = model(current_sequence)

            # Store the prediction
            future_predictions.append(prediction.item())

            # Update the current sequence
            prediction_reshaped = prediction.view(1, 1, 1)  # Reshape to (1, 1, 1)
            current_sequence = torch.cat((current_sequence[:, 1:, :], prediction_reshaped), dim=1)

    # Inverse transform the future predictions
    dummies = np.zeros((num_predictions, lookback + 1))  # Create a dummy array with the same number of features
    dummies[:, 0] = future_predictions  # Place future predictions in the first column
    dummies = scaler.inverse_transform(dummies)  # Inverse transform using the scaler
    future_predictions = dc(dummies[:, 0])  # Extract the inverse transformed predictions

    # Create a DataFrame for visualization
    future_dates = pd.date_range(start='2024-06-13', periods=num_predictions,freq='3M')
    df = pd.DataFrame({
        'Date': future_dates,
        'Predicted': future_predictions
    })
    df.set_index('Date', inplace=True)

    # Convert the DataFrame to JSON for the response
    result_json = df.to_json()

    return result_json

def model_prediction_monthlyAvgPred():
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    # Load the model and scaler
    model = LSTM(1, 4, 1)
    model.load_state_dict(torch.load('./resources/model_final/model_monthly.pt', map_location=device))
    model.to(device)
    model.eval()

    scaler = load('./resources/model_final/scalermonthly.joblib')

    # Few Parameters of the Model
    lookback = 7
    num_predictions = 3

    # Load the test dataset
    X_test = np.load('./resources/model_final/X_test_monthly.npy')

    # Extract the last known values from the test set
    last_known_prices = X_test[-1, :, :].reshape((1, lookback, -1))

    # Convert to tensor and move to device using clone().detach()
    current_sequence = torch.tensor(last_known_prices, dtype=torch.float32).clone().detach().to(device)

    # Make future predictions
    future_predictions = []

    with torch.no_grad():
        for _ in range(num_predictions):
            # Make a prediction
            prediction = model(current_sequence)

            # Store the prediction
            future_predictions.append(prediction.item())

            # Update the current sequence
            prediction_reshaped = prediction.view(1, 1, 1)  # Reshape to (1, 1, 1)
            current_sequence = torch.cat((current_sequence[:, 1:, :], prediction_reshaped), dim=1)

    # Inverse transform the future predictions
    dummies = np.zeros((num_predictions, lookback + 1))  # Create a dummy array with the same number of features
    dummies[:, 0] = future_predictions  # Place future predictions in the first column
    dummies = scaler.inverse_transform(dummies)  # Inverse transform using the scaler
    future_predictions = dc(dummies[:, 0])  # Extract the inverse transformed predictions

    # Create a DataFrame for visualization
    future_dates = pd.date_range(start='2024-07-15', periods=num_predictions,freq='M')
    df = pd.DataFrame({
        'Date': future_dates,
        'Predicted': future_predictions
    })
    df.set_index('Date', inplace=True)

    # Convert the DataFrame to JSON for the response
    result_json = df.to_json()

    return result_json