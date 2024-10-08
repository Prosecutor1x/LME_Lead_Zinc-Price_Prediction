
---

# LSTM Price Prediction Model

This project is a price prediction platform built using various modern technologies. It leverages an LSTM (Long Short-Term Memory) model for time-series price prediction and provides a user-friendly web interface to visualize the predictions. The project is containerized using Docker and can be easily deployed for production.

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS, Chart.js
- **Backend**: Flask, PyTorch, Pandas, SQL
- **Deployment**: Docker

## Features

- **LSTM Model**: Predict future prices based on historical data.
- **Interactive Charts**: Visualize historical and predicted data using Chart.js.
- **Responsive Design**: Built with Tailwind CSS for a seamless experience across devices.
- **REST API**: Flask-powered API for fetching and serving prediction data.
- **Data Handling**: Pandas for preprocessing and handling the data, and SQL for database storage.
- **Dockerized**: The entire application is containerized using Docker for easy setup and deployment.

## Setup and Installation

### Prerequisites

- Docker
- Python (for local development of backend)
- Node.js (for local development of frontend)

### Backend Setup

1. Clone the repository:

   ```bash
   git clone git https://github.com/Prosecutor1x/LME_Lead_Zinc-Price_Prediction.git
   cd lstm-price-prediction/backend
   ```

2. Create a virtual environment and install dependencies:

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

3. Configure your SQL database in the `.env` file.

4. Run the Flask server:

   ```bash
   flask run
   ```

### Frontend Setup

1. Navigate to the frontend folder:

   ```bash
   cd ../frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

### Docker Setup

For easy setup and deployment, you can use Docker:

1. Build and run the Docker containers:

   ```bash
   docker-compose up --build
   ```

2. Access the application at `http://localhost:3000` for the frontend and `http://localhost:5000` for the backend.

## Usage

1. Load historical data into the database via SQL.
2. The LSTM model will process the data and generate predictions.
3. Visualize the historical and predicted prices on the web interface with Chart.js.

## API Endpoints

- `POST /predict`: Generate price predictions based on historical data.
- `GET /history`: Fetch historical price data.

## Future Improvements

- Implement authentication for secure access.
- Improve model accuracy by incorporating additional features.
- Add real-time data fetching from external APIs.
  
## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

