import requests
import json

url = "http://localhost:8000/api/cart/"
headers = {"Content-Type": "application/json"}

# Determine a valid product ID first
try:
    p_response = requests.get("http://localhost:8000/api/products/")
    products = p_response.json()
    if not products:
        print("No products found to test with.")
        exit()
    product_id = products[0]['id']
except Exception as e:
    print(f"Error fetching products: {e}")
    exit()

data = {
    "items": [
        { "product_id": product_id, "quantity": 2 }
    ]
}

print(f"Sending data to {url}: {json.dumps(data, indent=2)}")

try:
    response = requests.post(url, headers=headers, json=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
