# A list of places on Google Maps, live: 3 credits.
# Run: SCRAPEFIELD_KEY=sf_live_… python live.py

import os, requests

res = requests.get(
    "https://api.scrapefield.com/v1/google-maps/places",
    params={"query": "coffee shops in Brooklyn"},
    headers={"Authorization": f"Bearer {os.environ['SCRAPEFIELD_KEY']}"},
)
body = res.json()
print(body["data"], body["meta"]["credits_charged"])
