from django.db import models
from products.models import Product

class Cart(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    # Could link to User/Session here if advanced, keeping it simple for "saving a cart"
    # Or just storing snapshots.
    # Requirement: "Guardar el carrito... almacenarlos en la base de datos".
    # Implementation: We'll overwrite or create a new cart entry. For simplicity in this demo without auth, 
    # we might just create a new Cart each time or use a session ID if we had one.
    # Let's assume we just create a new Cart snapshot for the demo or try to reuse if we pass an ID.

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    @property
    def subtotal(self):
        return self.product.price * self.quantity
