import urllib.request
import urllib.parse

filenames = [
    "Microsoft_Surface_Pro_4_with_Type_Cover.jpg",
    "Computer_mouse_wireless.jpg",
    "Mechanical_Keyboard.jpg",
    "Eizo_monitor.jpg",
    "Cat_with_toy.jpg",
    "Aquarium_at_The_Mirage.jpg",
    "Bird_cage_19th_century.jpg",
    "Dog_food.jpg",
    "Hamster_wheel.jpg",
    "Nokia_3310_blue_R7309170_wp.png",
    "BlackBerry_Bold_9700.jpg",
    "Motorola_RAZR_V3i_01.jpg",
    "Sony_Ericsson_K800i_front.jpg",
    "HTC_Dream.jpg"
]

base_url = "https://commons.wikimedia.org/wiki/Special:FilePath/"

print("Resolving URLs...")
for fname in filenames:
    encoded_name = urllib.parse.quote(fname)
    url = base_url + encoded_name
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            print(f"'{fname}': '{response.geturl()}',")
    except Exception as e:
        print(f"'{fname}': FAILED ({e}),")
