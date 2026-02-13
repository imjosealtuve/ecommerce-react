import requests
import hashlib
import urllib.parse
import time

products = [
    # Technology
    "Sony WH-1000XM5", "Xbox Series X", "PlayStation 5", "Canon EOS R6",
    "Surface Laptop", "Logitech MX Master", "Mechanical Keyboard", "Computer Monitor",
    # Pets
    "Automatic Pet Feeder", "Cat Bed", "Dog Leash", "Cat Toy",
    "Aquarium", "Bird Cage", "Dog Food", "Hamster Wheel",
    # Phones
    "iPhone 15 Pro", "Samsung Galaxy S24", "Google Pixel 8", "Nokia 3310",
    "BlackBerry Bold", "Motorola Razr", "Sony Ericsson K800i", "HTC Dream"
]

def get_image_url(filename):
    # Use API to get the real URL
    base = "https://commons.wikimedia.org/w/api.php"
    params = {
        "action": "query",
        "format": "json",
        "titles": filename,
        "prop": "imageinfo",
        "iiprop": "url",
    }
    try:
        r = requests.get(base, params=params, headers={'User-Agent': 'Bot/1.0'})
        data = r.json()
        pages = data.get("query", {}).get("pages", {})
        for page_id in pages:
            if "imageinfo" in pages[page_id]:
                return pages[page_id]["imageinfo"][0]["url"]
    except Exception as e:
        print(f"Error getting URL for {filename}: {e}")
    return None

def search_wiki(query):
    base = "https://commons.wikimedia.org/w/api.php"
    params = {
        "action": "query",
        "format": "json",
        "list": "search",
        "srsearch": f"{query} filetype:bitmap", 
        "srnamespace": 6, 
        "srlimit": 1 # get top 1
    }
    try:
        r = requests.get(base, params=params, headers={'User-Agent': 'Bot/1.0'})
        data = r.json()
        if "query" in data and "search" in data["query"]:
                item = data["query"]["search"][0]
                title = item["title"]
                # Only accept jpg/jpeg strictly as per user request
                if title.lower().endswith((".jpg", ".jpeg")):
                    return title
    except Exception as e:
        print(f"Error searching {query}: {e}")
    return None

results = {}

print("Searching Wikimedia Commons (API)...")
for p in products:
    search_query = p + " filetype:bitmap"
    # Specific tweaks for better results
    if "Sony WH-1000XM5" in p: search_query = "Sony WH-1000XM5 headphones"
    if "Dog Leash" in p: search_query = "Dog leash"
    if "Cat Toy" in p: search_query = "Cat toy"

    fname = search_wiki(search_query)
    
    if fname:
        url = get_image_url(fname)
        if url:
             print(f"[FOUND] {p} -> {url}")
             results[p] = url
        else:
             print(f"[NO URL] {p} -> {fname}")
    else:
        print(f"[NOT FOUND] {p}")
    time.sleep(0.5)

print("\n--- RESULTS MAP ---")
print(results)
