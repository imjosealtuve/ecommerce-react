import os
import django
import requests

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from products.models import Product

print("Checking Product Images...")
products = Product.objects.all()
for p in products:
    url = p.image
    status = "N/A"
    try:
        # User-Agent to mimic browser
        headers = {'User-Agent': 'Mozilla/5.0'} 
        r = requests.head(url, headers=headers, timeout=2)
        status = r.status_code
    except Exception as e:
        status = f"Error: {e}"
    
    print(f"[{status}] {p.name}: {url}")
