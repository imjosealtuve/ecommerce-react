from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Cart
from .serializers import CartSerializer

class CartView(APIView):
    def get(self, request):
        # Retrieve the latest cart or specific cart if ID provided (simplification)
        cart = Cart.objects.last()
        if cart:
            serializer = CartSerializer(cart)
            return Response(serializer.data)
        return Response({'items': []}) # Empty cart

    def post(self, request):
        # Overwrite/Create new cart logic
        # For this requirement: "Guardar el carrito", we can just save a new snapshot.
        serializer = CartSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print("Cart Validation Errors:", serializer.errors) # Debugging
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
