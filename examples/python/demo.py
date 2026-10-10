# One place on Google Maps, in demo mode: no key, no account, charged nothing.
# Run: pip install requests && python demo.py

import requests

res = requests.get(
    "https://api.scrapefield.com/v1/google-maps/place",
    params={"place_id": "ChIJN1t_tDeuEmsRUsoyG83frY4", "demo": "true"},
)
body = res.json()
print(body["data"], body["meta"]["credits_charged"])
