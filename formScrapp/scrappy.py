from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import re
import json
import os
import shutil

# ------------------------------
# ChromeDriver path
chromedriver_path = r"C:\Users\saura\Downloads\chromedriver-win64\chromedriver-win64\chromedriver.exe"

# Start Chrome with Service
service = Service(chromedriver_path)
driver = webdriver.Chrome(service=service)

# ------------------------------
# Open Udyam Registration page
driver.get("https://udyamregistration.gov.in/UdyamRegistration.aspx")
time.sleep(5)  # Wait for page to load

# ------------------------------
# Friendly field mapping
field_map = {
    "ctl00$ContentPlaceHolder1$txtadharno": {
        "id": "aadhaarNumber",
        "label": "Aadhaar Number",
        "type": "text",
        "validation": r"^\d{12}$"
    },
    "ctl00$ContentPlaceHolder1$txtownername": {
        "id": "ownerName",
        "label": "Name as per Aadhaar",
        "type": "text",
        "validation": r"^[A-Za-z ]{3,100}$"
    },
    "ctl00$ContentPlaceHolder1$chkDecarationA": {
        "id": "declaration",
        "label": "I hereby declare…",
        "type": "checkbox"
    },
    "ctl00$ContentPlaceHolder1$txtPanNo": {
        "id": "panNumber",
        "label": "PAN Number",
        "type": "text",
        "validation": r"^[A-Z]{5}\d{4}[A-Z]$"
    }
}

# ------------------------------
# Ignore system/hidden fields
ignore_patterns = [
    r"^__VIEWSTATE",
    r"^__EVENT",
    r"__EVENTVALIDATION",
    r"^ctl00\$ContentPlaceHolder1\$chk[A-Za-z]*$"  # generic unwanted checkboxes
]

def should_ignore(name):
    return any(re.match(pat, name) for pat in ignore_patterns)

# ------------------------------
# Extract fields from page dynamically
def extract_fields():
    inputs = driver.find_elements(By.TAG_NAME, "input")
    fields = []
    for inp in inputs:
        name = inp.get_attribute("name")
        if name and not should_ignore(name) and name in field_map:
            fields.append(field_map[name])
    return fields

# ------------------------------
# Step 1
step1_fields = extract_fields()

# Add OTP field manually
step1_fields.append({
    "id": "otp",
    "label": "OTP",
    "type": "text",
    "validation": r"^\d{6}$"
})

# ------------------------------
# Step 2 (PAN)
step2_fields = [
    field_map["ctl00$ContentPlaceHolder1$txtPanNo"]
]

# ------------------------------
# Combine schema
final_schema = {
    "step1": step1_fields,
    "step2": step2_fields
}

# ------------------------------
# Save JSON in current folder
local_file = "udyam_schema.json"
with open(local_file, "w", encoding="utf-8") as f:
    json.dump(final_schema, f, indent=2, ensure_ascii=False)

print(f"Schema saved locally to {local_file}")

# ------------------------------
# Copy to backend schema folder
backend_schema_dir = r"..\backend\src\schema"  # relative path from formScrapp
backend_file = os.path.join(backend_schema_dir, "udyam_schema.json")

# Ensure the directory exists
os.makedirs(backend_schema_dir, exist_ok=True)

# Copy the file
shutil.copy(local_file, backend_file)
print(f"Schema also copied to backend at {backend_file}")

driver.quit()
