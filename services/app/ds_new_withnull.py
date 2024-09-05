import requests
from bs4 import BeautifulSoup as soup
import pandas as pd
from dateutil import parser

# Function to create a complete date range from the start to end date
def create_date_range(start_date, end_date):
    date_range = pd.date_range(start=start_date, end=end_date)
    return pd.DataFrame(date_range, columns=["Date"])

# Function to find the earliest and latest date in the scraped data
def find_date_range(dates):
    start_date = min(dates)
    end_date = max(dates)
    return start_date, end_date

source = requests.get('https://www.westmetall.com/en/markdaten.php?action=table&field=LME_Pb_cash')
webpage = soup(source.content, features="html.parser")

# Initialize an empty DataFrame to store all the data
all_data = pd.DataFrame()

# Find all tables on the webpage
tables = webpage.find_all('table')

for table in tables:
    headers = [header_cell.get_text(strip=True) for header_cell in table.find('tr').find_all('th', {'class': ['text_class', 'text']})]
    df = pd.DataFrame(columns=headers)

    rows = table.find_all("tr")
    data_to_append = []
    for row in rows[1:]:
        data = row.find_all("td")
        row_data = [td.get_text(strip=True) for td in data]
        if len(row_data) == len(headers):
            data_to_append.append(row_data)
        else:
            print("Mismatched number of columns in row!")
            print("Row data:", row_data)
            print("Headers:", headers)

    df = pd.concat([df, pd.DataFrame(data_to_append, columns=headers)], ignore_index=True)
    
    # Append the data from the current table to the overall DataFrame
    all_data = pd.concat([all_data, df], ignore_index=True)

# Print the columns to check their names
print("Columns in the DataFrame:", all_data.columns)

# Ensure the column 'date' exists and rename it to 'Date'
if 'date' in all_data.columns:
    all_data.rename(columns={'date': 'Date'}, inplace=True)
else:
    raise KeyError("The DataFrame does not have a 'date' column.")

# Convert the 'Date' column to datetime format using dateutil.parser
all_data['Date'] = all_data['Date'].apply(lambda x: parser.parse(x, dayfirst=True))

# Get the start and end dates from the data
start_date, end_date = find_date_range(all_data['Date'])

# Create a complete date range DataFrame
date_range_df = create_date_range(start_date, end_date)

# Merge the complete date range with the scraped data
all_data = date_range_df.merge(all_data, on='Date', how='left')

# Fill missing values with '-'
all_data.fillna("-", inplace=True)

# Save the DataFrame to a CSV file
all_data.to_csv('output_Lead_ne.csv', index=False)

print("CSV file saved successfully.")
