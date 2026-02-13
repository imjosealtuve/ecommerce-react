import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from products.models import Product

print("Current Product Images in DB:")
for p in Product.objects.all():
    print(f"[{p.category}] {p.name}: {p.image}")
