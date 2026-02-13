import os
import django
import sys

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from products.models import Product
from products.serializers import ProductSerializer

# Verify Serializer contains category
serializer = ProductSerializer()
print(f"Serializer fields: {serializer.fields.keys()}")

if 'category' not in serializer.fields:
    print("ERROR: 'category' field missing from serializer!")
    sys.exit(1)

print("SUCCESS: 'category' field present in serializer.")

# Verify query filtering
print("\nVerifying filtering:")
tech_products = Product.objects.filter(category='technology')
print(f"Technology products count: {tech_products.count()}")
for p in tech_products:
    print(f"- {p.name}")
