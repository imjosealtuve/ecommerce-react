import os
import django
import sys

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from products.models import Product

count = Product.objects.count()
print(f"Total Products: {count}")

categories = ['technology', 'pets', 'phones']
for cat in categories:
    c_count = Product.objects.filter(category=cat).count()
    print(f"Category '{cat}': {c_count}")
    if c_count < 8:
        print(f"FAIL: {cat} has less than 8 items!")
