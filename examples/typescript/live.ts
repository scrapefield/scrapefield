// A list of places on Google Maps, live: 3 credits.
// Run: SCRAPEFIELD_KEY=sf_live_… node live.ts

const params = new URLSearchParams({
  "query": "coffee shops in Brooklyn"
});

const res = await fetch(`https://api.scrapefield.com/v1/google-maps/places?${params}`, {
  headers: { Authorization: `Bearer ${process.env.SCRAPEFIELD_KEY}` },
});

const { data, meta } = await res.json();
console.log(data, meta.credits_charged);
