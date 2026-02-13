import os
import django
import hashlib

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from products.models import Product

def get_wiki_url(filename):
    # Wikimedia file structure: /a/ab/Filename.jpg
    clean_name = filename.replace("File:", "").strip().replace(" ", "_")
    md5 = hashlib.md5(clean_name.encode('utf-8')).hexdigest()
    return f"https://upload.wikimedia.org/wikipedia/commons/{md5[0]}/{md5[0:2]}/{clean_name}"

products_data = [
    # Technology (8 products)
    { "name": 'Sony WH-1000XM5', "price": 348.00, "category": 'technology', "image": 'https://crdms.images.consumerreports.org/f_auto,w_600/prod/products/cr/models/406257-wireless-home-studio-style-headphones-sony-wh-1000xm5-10028595.png', "description": "Industry-leading noise canceling headphones." },
    { "name": 'Xbox Series X', "price": 499.99, "category": 'technology', "image": 'https://http2.mlstatic.com/D_NQ_NP_938588-MLA97471452583_112025-O.webp', "description": "Power your dreams." },
    { "name": 'PlayStation 5', "price": 499.99, "category": 'technology', "image": 'https://gamer4ever.com.co/cdn/shop/files/711719573432.png?v=1706722445', "description": "Play Has No Limits." },
    { "name": 'Canon EOS R6', "price": 2499.00, "category": 'technology', "image": 'https://eoatecnologia.com/cdn/shop/files/1667347825_1733217.jpg?v=1703105069&width=416', "description": "Full-frame mirrorless camera." },
    { "name": 'Surface Laptop 6', "price": 999.99, "category": 'technology', "image": 'https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/MSFT-Surface-Laptop-6-Sneak-Curosel-Pivot-3?scl=1', "description": "Style and speed." }, 
    { "name": 'Logitech MX Master 3', "price": 99.99, "category": 'technology', "image": 'https://http2.mlstatic.com/D_NQ_NP_724413-MLA99452929968_112025-O.webp', "description": "Advanced wireless mouse." },
    { "name": 'Mechanical Keyboard', "price": 149.99, "category": 'technology', "image": 'https://m.media-amazon.com/images/I/71ZRus2YNcL._AC_UF894,1000_QL80_.jpg', "description": "Clicky and tactile." },
    { "name": 'Gaming Monitor', "price": 299.99, "category": 'technology', "image": get_wiki_url("Computer_monitor.jpg"), "description": "High refresh rate display." },

    # Pets (8 products)
    { "name": 'Smart Pet Feeder', "price": 129.99, "category": 'pets', "image": 'https://www.teslasmart.com/data/images-xl/888-tesla-smart-pet-feeder-camera-1920x1920-04.png', "description": "Automatic feeder with camera." },
    { "name": 'Cozy Cat Bed', "price": 45.00, "category": 'pets', "image": 'https://m.media-amazon.com/images/I/610wyc7l7WL._AC_UF1000,1000_QL80_.jpg', "description": "Ultra soft bed for your furry friend." },
    { "name": 'Dog Leash', "price": 25.50, "category": 'pets', "image": 'https://www.thefoggydog.com/cdn/shop/files/crop_BrightButterfly_WalkSet_24-03-05_22269_1.jpg?v=1744301126&width=1946', "description": "Durable leash for daily walks." },
    { "name": 'Cat Toy', "price": 12.99, "category": 'pets', "image": 'https://www.tierradegatos.com/terrcontenido/uploads/2023/06/image_423bc291-acb4-4f5f-940f-b9e2dc6808f4.png', "description": "Interactive toy for cats." },
    { "name": 'Aquarium Tank', "price": 199.99, "category": 'pets', "image": 'https://m.media-amazon.com/images/I/91xmGAbd-yL._AC_SL1500_.jpg', "description": "Beautiful home for fish." },
    { "name": 'Bird Cage', "price": 89.99, "category": 'pets', "image": 'https://i5.walmartimages.com/seo/Alden-Design-30-Bird-Cage-with-Slide-Out-Tray-and-Wood-Perches-Black_292f46c9-50d7-4a55-909e-bb0fd76c9a60.4964eae5667a74159d98f31408469e1c.jpeg', "description": "Spacious cage for birds." },
    { "name": 'Premium Dog Food', "price": 49.99, "category": 'pets', "image": 'https://mundocampo.com.co/wp-content/uploads/2022/07/Agility-Gold-Super-Premim-Dog-Food.png', "description": "Healthy nutrition for dogs." },
    { "name": 'Hamster Wheel', "price": 15.99, "category": 'pets', "image": 'https://missinginthemission.com/wp-content/uploads/2016/05/hamster.jpg?w=676', "description": "Exercise wheel for small pets." },

    # Phones (8 products)
    { "name": 'iPhone 15 Pro', "price": 999.99, "category": 'phones', "image": get_wiki_url("IPhone_15_pro.jpg"), "description": "Titanium design." },
    { "name": 'Samsung Galaxy S24', "price": 899.99, "category": 'phones', "image": 'https://smselectronic.com/wp-content/uploads/2024/01/EUREKA_E1_COBALT_VIOLET__4_1000X1000.png', "description": "Galaxy AI is here." },
    { "name": 'Google Pixel 8', "price": 699.00, "category": 'phones', "image": 'https://m.media-amazon.com/images/I/713eEl39eLL._AC_SL1500_.jpg', "description": "The helpful phone engineered by Google." },
    { "name": 'Nokia 3310 (Classic)', "price": 59.99, "category": 'phones', "image": get_wiki_url("Nokia_3310.jpg"), "description": "The indestructible classic." },
    { "name": 'BlackBerry Bold', "price": 199.99, "category": 'phones', "image": 'https://co.celulares.com/fotos/blackberry-bold-9780-905-g.jpeg', "description": "Physical keyboard for productivity." },
    { "name": 'Motorola Razr V3', "price": 149.99, "category": 'phones', "image": 'https://www.enter.co/wp-content/uploads/2023/05/f338192c440938729cc3370489d81bb8-1200x800.jpg', "description": "Iconic flip phone design." },
    { "name": 'Sony Ericsson K800i', "price": 89.99, "category": 'phones', "image": 'https://s.alicdn.com/@sc04/kf/H8214babe234149a9be76568d6244e9c2K/Original-Unlocked-Wholesales-Super-Cheap-Classic-Bar-Mobile-Cell-Phone-K800-for-SonyEriccson.jpg', "description": "Cyber-shot camera phone." },
    { "name": 'HTC Dream', "price": 129.99, "category": 'phones', "image": 'https://i.blogs.es/59f770/htc-dream-2/650_1200.jpeg', "description": "The first Android phone." },
]

def run():
    print("Populating products...")
    # Clear existing products
    Product.objects.all().delete()
    
    for data in products_data:
        Product.objects.create(**data)
        print(f"Created: {data['name']}")
    
    print("Done.")

if __name__ == '__main__':
    run()
