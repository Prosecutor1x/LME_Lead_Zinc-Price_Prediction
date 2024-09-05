import pandas as pd
import pandasql as psql
from datetime import datetime, timedelta


#ZINCCC:------
# def calculate_kpis(data):
#     # Convert date column to datetime
#     data['date'] = pd.to_datetime(data['date'])
    
#     # Convert to a string format for SQL queries
#     data['date_str'] = data['date'].dt.strftime('%Y-%m-%d')

#     # Define dates
#     last_month = (datetime.now() - timedelta(days=30)).strftime('%Y-%m')
#     same_month_last_year = (datetime.now() - timedelta(days=365)).strftime('%Y-%m')
#     start_of_year = datetime(datetime.now().year, 1, 1).strftime('%Y-%m-%d')
#     start_of_last_year = datetime(datetime.now().year - 1, 1, 1).strftime('%Y-%m-%d')
#     # date_today = datetime.now().strftime('%Y-%m-%d')
#     date_today = datetime(2024, 6, 13).strftime('%Y-%m-%d')
#     last_year_this_day = (datetime.now() - timedelta(days=365)).strftime('%Y-%m-%d')
    
#     # SQL queries
#     last_month_query = f"SELECT AVG(lmeZinc) as avg FROM data WHERE strftime('%Y-%m', date_str) = '{last_month}'"
#     same_month_last_year_query = f"SELECT AVG(lmeZinc) as avg FROM data WHERE strftime('%Y-%m', date_str) = '{same_month_last_year}'"
#     last3_months_query = f"SELECT AVG(lmeZinc) as avg FROM data WHERE date_str >= date('{date_today}', '-3 months') AND date_str <= '{date_today}'"
#     same3_months_last_year_query = f"SELECT AVG(lmeZinc) as avg FROM data WHERE date_str >= date('{last_year_this_day}', '-3 months') AND date_str <= '{last_year_this_day}'"
#     ytd_query = f"SELECT AVG(lmeZinc) as avg FROM data WHERE date_str >= '{start_of_year}' AND date_str <= '{date_today}'"
#     ytd_last_year_query = f"SELECT AVG(lmeZinc) as avg FROM data WHERE date_str >= '{start_of_last_year}' AND date_str <= '{last_year_this_day}'"
#     rolling6_months_query = f"SELECT AVG(lmeZinc) as avg FROM data WHERE date_str >= date('{date_today}', '-6 months') AND date_str <= '{date_today}'"
#     quarterly_query = f"SELECT AVG(lmeZinc) as avg FROM data WHERE date_str >= date('{date_today}', '-3 months') AND date_str <= '{date_today}'"
#     highest_price_query = "SELECT MAX(lmeZinc) as max FROM data"
#     lowest_price_query = "SELECT MIN(lmeZinc) as min FROM data"

#     # Execute queries
#     last_month_avg = psql.sqldf(last_month_query, locals()).iloc[0]['avg']
#     same_month_last_year_avg = psql.sqldf(same_month_last_year_query, locals()).iloc[0]['avg']
#     last3_months_avg = psql.sqldf(last3_months_query, locals()).iloc[0]['avg']
#     same3_months_last_year_avg = psql.sqldf(same3_months_last_year_query, locals()).iloc[0]['avg']
#     ytd_avg = psql.sqldf(ytd_query, locals()).iloc[0]['avg']
#     ytd_last_year_avg = psql.sqldf(ytd_last_year_query, locals()).iloc[0]['avg']
#     rolling6_months_avg = psql.sqldf(rolling6_months_query, locals()).iloc[0]['avg']
#     quarterly_avg = psql.sqldf(quarterly_query, locals()).iloc[0]['avg']
#     highest_price = psql.sqldf(highest_price_query, locals()).iloc[0]['max']
#     lowest_price = psql.sqldf(lowest_price_query, locals()).iloc[0]['min']
    
#     kpis = {
#         'lastMonthAvg': round(last_month_avg, 2) if last_month_avg else 0,
#         'sameMonthLastYearAvg': round(same_month_last_year_avg, 2) if same_month_last_year_avg else 0,
#         'last3MonthsAvg': round(last3_months_avg, 2) if last3_months_avg else 0,
#         'same3MonthsLastYearAvg': round(same3_months_last_year_avg, 2) if same3_months_last_year_avg else 0,
#         'ytdAvg': round(ytd_avg, 2) if ytd_avg else 0,
#         'ytdLastYearAvg': round(ytd_last_year_avg, 2) if ytd_last_year_avg else 0,
#         'rolling6MonthsAvg': round(rolling6_months_avg, 2) if rolling6_months_avg else 0,
#         'quarterlyAvg': round(quarterly_avg, 2) if quarterly_avg else 0,
#         'highestPrice': round(highest_price, 2) if highest_price else 0,
#         'lowestPrice': round(lowest_price, 2) if lowest_price else 0
#     }
    
#     return kpis



def calculate_kpis_lead(data):
    # Convert date column to datetime
    data['date'] = pd.to_datetime(data['date'])
    
    # Convert to a string format for SQL queries
    data['date_str'] = data['date'].dt.strftime('%Y-%m-%d')

    # Define dates
    last_month = (datetime.now() - timedelta(days=30)).strftime('%Y-%m')
    same_month_last_year = (datetime.now() - timedelta(days=365)).strftime('%Y-%m')
    start_of_year = datetime(datetime.now().year, 1, 1).strftime('%Y-%m-%d')
    start_of_last_year = datetime(datetime.now().year - 1, 1, 1).strftime('%Y-%m-%d')
    # date_today = datetime.now().strftime('%Y-%m-%d')
    date_today = datetime(2024, 6, 13).strftime('%Y-%m-%d')
    last_year_this_day = (datetime.now() - timedelta(days=365)).strftime('%Y-%m-%d')
    
    # SQL queries
    last_month_query = f"SELECT AVG(lmelead) as avg FROM data WHERE strftime('%Y-%m', date_str) = '{last_month}'"
    same_month_last_year_query = f"SELECT AVG(lmelead) as avg FROM data WHERE strftime('%Y-%m', date_str) = '{same_month_last_year}'"
    last3_months_query = f"SELECT AVG(lmelead) as avg FROM data WHERE date_str >= date('{date_today}', '-3 months') AND date_str <= '{date_today}'"
    same3_months_last_year_query = f"SELECT AVG(lmelead) as avg FROM data WHERE date_str >= date('{last_year_this_day}', '-3 months') AND date_str <= '{last_year_this_day}'"
    ytd_query = f"SELECT AVG(lmelead) as avg FROM data WHERE date_str >= '{start_of_year}' AND date_str <= '{date_today}'"
    ytd_last_year_query = f"SELECT AVG(lmelead) as avg FROM data WHERE date_str >= '{start_of_last_year}' AND date_str <= '{last_year_this_day}'"
    rolling6_months_query = f"SELECT AVG(lmelead) as avg FROM data WHERE date_str >= date('{date_today}', '-6 months') AND date_str <= '{date_today}'"
    quarterly_query = f"SELECT AVG(lmelead) as avg FROM data WHERE date_str >= date('{date_today}', '-3 months') AND date_str <= '{date_today}'"
    highest_price_query = "SELECT MAX(lmelead) as max FROM data"
    lowest_price_query = "SELECT MIN(lmelead) as min FROM data"

    # Execute queries
    last_month_avg = psql.sqldf(last_month_query, locals()).iloc[0]['avg']
    same_month_last_year_avg = psql.sqldf(same_month_last_year_query, locals()).iloc[0]['avg']
    last3_months_avg = psql.sqldf(last3_months_query, locals()).iloc[0]['avg']
    same3_months_last_year_avg = psql.sqldf(same3_months_last_year_query, locals()).iloc[0]['avg']
    ytd_avg = psql.sqldf(ytd_query, locals()).iloc[0]['avg']
    ytd_last_year_avg = psql.sqldf(ytd_last_year_query, locals()).iloc[0]['avg']
    rolling6_months_avg = psql.sqldf(rolling6_months_query, locals()).iloc[0]['avg']
    quarterly_avg = psql.sqldf(quarterly_query, locals()).iloc[0]['avg']
    highest_price = psql.sqldf(highest_price_query, locals()).iloc[0]['max']
    lowest_price = psql.sqldf(lowest_price_query, locals()).iloc[0]['min']
    
    kpis = {
        'lastMonthAvg': round(last_month_avg, 2) if last_month_avg else 0,
        'sameMonthLastYearAvg': round(same_month_last_year_avg, 2) if same_month_last_year_avg else 0,
        'last3MonthsAvg': round(last3_months_avg, 2) if last3_months_avg else 0,
        'same3MonthsLastYearAvg': round(same3_months_last_year_avg, 2) if same3_months_last_year_avg else 0,
        'ytdAvg': round(ytd_avg, 2) if ytd_avg else 0,
        'ytdLastYearAvg': round(ytd_last_year_avg, 2) if ytd_last_year_avg else 0,
        'rolling6MonthsAvg': round(rolling6_months_avg, 2) if rolling6_months_avg else 0,
        'quarterlyAvg': round(quarterly_avg, 2) if quarterly_avg else 0,
        'highestPrice': round(highest_price, 2) if highest_price else 0,
        'lowestPrice': round(lowest_price, 2) if lowest_price else 0
    }
    
    return kpis
