import hashlib
import requests

filenames = [
    "Sony_WH-1000XM5.jpg", # Likely won't exist directly, need to check specific files
    "Xbox_Series_X_-_Console.jpg",
    "PS5_console_with_controller.jpg", # Guessing
    "Canon_EOS_R6.jpg", # Guessing
    "Microsoft_Surface_Pro_4_with_Type_Cover.jpg",
    "Computer_mouse_wireless.jpg",
    "Mechanical_Keyboard.jpg",
    "Eizo_monitor.jpg",
    "Automatic_pet_feeder.jpg",
    "Cat_with_toy.jpg",
    "Aquarium_at_The_Mirage.jpg",
    "Bird_cage_19th_century.jpg",
    "Dog_food.jpg",
    "Hamster_wheel.jpg",
    "IPhone_15_Pro_Blue_Titanium.jpg",
    "Samsung_Galaxy_S24.jpg", # Likely generic
    "Google_Pixel_8.jpg", # Likely generic
    "Nokia_3310_blue_R7309170_wp.png",
    "BlackBerry_Bold_9700.jpg",
    "Motorola_RAZR_V3i_01.jpg",
    "Sony_Ericsson_K800i_front.jpg",
    "HTC_Dream.jpg"
]

# Reliable fallbacks if specific files don't exist
fallbacks = {
    "Sony WH-1000XM5": "Headphones_icon.png", # Placeholder if needed
    "PlayStation 5": "PlayStation_5_logo.svg",
    "Canon EOS R6": "Canon_EOS_R6_mark_II_front.jpg", # Better guess
    "Samsung Galaxy S24": "Samsung_Galaxy_S24_Ultra.jpg", # Guess
    "Google Pixel 8": "Pixel_8_Pro_Bay_Model.jpg", # Guess
}

def get_wiki_url(filename):
    # Wikimedia uses md5 of filename to determine path
    # e.g. File:Example.jpg -> md5("Example.jpg") = ab... -> /a/ab/Example.jpg
    # BUT spaces are replaced by underscores in filename BEFORE md5? 
    # Actually, the filename in URL uses underscores.
    
    clean_name = filename.replace(" ", "_")
    md5 = hashlib.md5(clean_name.encode('utf-8')).hexdigest()
    a = md5[0]
    ab = md5[0:2]
    url = f"https://upload.wikimedia.org/wikipedia/commons/{a}/{ab}/{clean_name}"
    return url

print("Generating URLs...")
for fname in filenames:
    url = get_wiki_url(fname)
    # Verify
    try:
        r = requests.head(url, headers={'User-Agent': 'Mozilla/5.0'}, timeout=1)
        if r.status_code == 200:
            print(f"OK: {fname} -> {url}")
        else:
            print(f"FAIL ({r.status_code}): {fname} -> {url}")
    except Exception as e:
        print(f"ERR: {fname} -> {e}")
