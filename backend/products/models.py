from django.db import models

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('technology', 'Technology'),
        ('pets', 'Pets'),
        ('phones', 'Phones'),
        ('gardening', 'Gardening'),
        ('pc', 'PC'),
        ('kitchen', 'Kitchen'),
        ('lifestyle', 'Lifestyle'),
    ]
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='technology')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True)
    image = models.URLField(max_length=500, blank=True) # Using URL for simplicity as per frontend mock data

    def __str__(self):
        return self.name
