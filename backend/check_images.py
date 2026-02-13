import urllib.request
import urllib.error

urls = [
    "https://commons.wikimedia.org/wiki/Special:FilePath/Xbox_Series_X_-_Console.jpg",
    "https://commons.wikimedia.org/wiki/Special:FilePath/IPhone_15_Pro_Blue_Titanium.jpg",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Cat_feeder.jpg"
]

for url in urls:
    try:
        # User-Agent is required by Wikimedia
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            print(f"{url.split('/')[-1]} -> {response.getcode()} (Redirected to: {response.geturl()[:50]}...)")
    except urllib.error.HTTPError as e:
        print(f"{url.split('/')[-1]} -> Error: {e.code}")
    except Exception as e:
        print(f"{url.split('/')[-1]} -> Error: {e}")
