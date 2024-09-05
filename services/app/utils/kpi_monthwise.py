import pandas as pd
import pandasql as psql
import numpy as np


# ZinCCCC:----
# Load the data
def load_data(file_path):
    # Load the data
    df = pd.read_excel(file_path, engine='openpyxl')
    # Ensure the date column is in datetime format
    df['date'] = pd.to_datetime(df['date'])
    # Set date as index
    df.set_index('date', inplace=True)
    return df

# Function to calculate KPIs using SQL queries
def calculate_kpis_month(df):
    query = """
    SELECT
        strftime('%Y-%m', date) as month,
        AVG(lmelead) as avg_lead,
        MAX(lmelead) as max_lead,
        MIN(lmelead) as min_lead,
        AVG(lmelead3) as avg_lead_3m,
        AVG(lmeleadStock) as avg_stock,
        AVG(lmelead) OVER (ORDER BY date ROWS BETWEEN 89 PRECEDING AND CURRENT ROW) as rolling_3m_avg,
        AVG(lmelead) OVER (ORDER BY date ROWS BETWEEN 179 PRECEDING AND CURRENT ROW) as rolling_6m_avg,
        AVG(lmelead) OVER (PARTITION BY strftime('%Y', date)) as ytd_avg
    FROM df
    GROUP BY month
    """
    result = psql.sqldf(query, locals())
    return result

# Calculate KPIs
# kpis = calculate_kpis_month(df)

# Save to a new Excel file (optional)
# kpis.to_excel('/mnt/data/kpis.xlsx')

# LEAD:------------

file_path2 = './lead_prices.xlsx'
df_l = pd.read_excel(file_path2, engine='openpyxl')

# Ensure the date column is in datetime format
df_l['date'] = pd.to_datetime(df_l['date'])

# Set date as index
df_l.set_index('date', inplace=True)

# Function to calculate KPIs using SQL queries

def calculate_kpis_month_lead(df_l):
    queries = {
        '1_month': """
            SELECT
                strftime('%Y-%m', date) as month,
                AVG(lmelead) as avg_lead,
                MAX(lmelead) as max_lead,
                MIN(lmelead) as min_lead,
                AVG(lmelead3) as avg_lead_3m,
                AVG(lmeleadStock) as avg_stock,
                AVG(lmelead) OVER (ORDER BY date ROWS BETWEEN 29 PRECEDING AND CURRENT ROW) as rolling_1m_avg,
                AVG(lmelead) OVER (PARTITION BY strftime('%Y', date)) as ytd_avg
            FROM df_l
            WHERE date >= date('now', '-1 month')
            GROUP BY month
        """,
        '3_months': """
            SELECT
                strftime('%Y-%m', date) as month,
                AVG(lmelead) as avg_lead,
                MAX(lmelead) as max_lead,
                MIN(lmelead) as min_lead,
                AVG(lmelead3) as avg_lead_3m,
                AVG(lmeleadStock) as avg_stock,
                AVG(lmelead) OVER (ORDER BY date ROWS BETWEEN 89 PRECEDING AND CURRENT ROW) as rolling_3m_avg,
                AVG(lmelead) OVER (PARTITION BY strftime('%Y', date)) as ytd_avg
            FROM df_l
            WHERE date >= date('now', '-3 months')
            GROUP BY month
        """,
        '6_months': """
            SELECT
                strftime('%Y-%m', date) as month,
                AVG(lmelead) as avg_lead,
                MAX(lmelead) as max_lead,
                MIN(lmelead) as min_lead,
                AVG(lmelead3) as avg_lead_3m,
                AVG(lmeleadStock) as avg_stock,
                AVG(lmelead) OVER (ORDER BY date ROWS BETWEEN 179 PRECEDING AND CURRENT ROW) as rolling_6m_avg,
                AVG(lmelead) OVER (PARTITION BY strftime('%Y', date)) as ytd_avg
            FROM df_l
            WHERE date >= date('now', '-6 months')
            GROUP BY month
        """,
        '1_year': """
            SELECT
                strftime('%Y-%m', date) as month,
                AVG(lmelead) as avg_lead,
                MAX(lmelead) as max_lead,
                MIN(lmelead) as min_lead,
                AVG(lmelead3) as avg_lead_3m,
                AVG(lmeleadStock) as avg_stock,
                AVG(lmelead) OVER (ORDER BY date ROWS BETWEEN 364 PRECEDING AND CURRENT ROW) as rolling_1y_avg,
                AVG(lmelead) OVER (PARTITION BY strftime('%Y', date)) as ytd_avg
            FROM df_l
            WHERE date >= date('now', '-1 year')
            GROUP BY month
        """,
        '2_years': """
            SELECT
                strftime('%Y-%m', date) as month,
                AVG(lmelead) as avg_lead,
                MAX(lmelead) as max_lead,
                MIN(lmelead) as min_lead,
                AVG(lmelead3) as avg_lead_3m,
                AVG(lmeleadStock) as avg_stock,
                AVG(lmelead) OVER (ORDER BY date ROWS BETWEEN 729 PRECEDING AND CURRENT ROW) as rolling_2y_avg,
                AVG(lmelead) OVER (PARTITION BY strftime('%Y', date)) as ytd_avg
            FROM df_l
            WHERE date >= date('now', '-2 years')
            GROUP BY month
        """,
        '5_years': """
            SELECT
                strftime('%Y-%m', date) as month,
                AVG(lmelead) as avg_lead,
                MAX(lmelead) as max_lead,
                MIN(lmelead) as min_lead,
                AVG(lmelead3) as avg_lead_3m,
                AVG(lmeleadStock) as avg_stock,
                AVG(lmelead) OVER (ORDER BY date ROWS BETWEEN 1824 PRECEDING AND CURRENT ROW) as rolling_5y_avg,
                AVG(lmelead) OVER (PARTITION BY strftime('%Y', date)) as ytd_avg
            FROM df_l
            WHERE date >= date('now', '-5 years')
            GROUP BY month
        """
    }
    
    results = {}
    for key, query in queries.items():
        result_df = psql.sqldf(query, locals())
        results[key] = result_df.to_dict(orient='records')
    
    return results