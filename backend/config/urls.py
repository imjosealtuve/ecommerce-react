from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # App URLs
    path('api/products/', include('products.urls')),
    path('api/cart/', include('cart.urls')),
]
