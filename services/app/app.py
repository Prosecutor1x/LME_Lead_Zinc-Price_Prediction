from flask import Flask, jsonify
import pandas as pd
from utils.kpis import calculate_kpis_lead
from utils.model import model_prediction_sevendays,model_prediction_nextyear,model_prediction_monthlyAvgPred  # Assuming model_prediction is in model.py
from utils.kpi_monthwise import calculate_kpis_month_lead,calculate_kpis_month,load_data
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)

@app.route('/')
def home():
    return "Welcome to the Lead Price API!"

@app.route('/kpis', methods=['GET'])
def get_kpis():
    # Load data from Excel file
    df = pd.read_excel('lead_prices.xlsx')

    # Calculate KPIs
    kpis = calculate_kpis_lead(df)
    
    return jsonify(kpis)

@app.route('/model_prediction', methods=['GET'])
def get_model_prediction():
    result_json = model_prediction_sevendays()
    return jsonify(result_json)

@app.route('/model_3mprediction', methods=['GET'])
def get_model_3mprediction():
    result_json = model_prediction_nextyear()
    return jsonify(result_json)

@app.route('/model_prediction_monthlyavg', methods=['GET'])
def get_model_MAmprediction():
    result_json = model_prediction_monthlyAvgPred()
    return jsonify(result_json)

@app.route('/data', methods=['GET'])
def get_data():
    try:
        # Load data from Excel file (specify engine)
        df = pd.read_excel('lead_prices.xlsx', engine='openpyxl')

        # Convert DataFrame to JSON
        data = df.to_dict(orient='records')
        
        return jsonify(data)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@app.route('/kpism', methods=['GET'])
def get_kpis_month():
    df = pd.read_excel('lead_prices.xlsx', engine='openpyxl')
    df['date'] = pd.to_datetime(df['date'])
    df.set_index('date', inplace=True)
    
    kpis = calculate_kpis_month_lead(df)
    
    return jsonify(kpis)



@app.route('/calculate_kpis', methods=['GET'])
def get_kpis_table():
    file_path = './lead_prices.xlsx'
    df = load_data(file_path)
    kpis = calculate_kpis_month(df)
    return jsonify(kpis.to_dict(orient='records'))


if __name__ == "__main__":
    app.run(debug=True)
