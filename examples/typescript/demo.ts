// One place on Google Maps, in demo mode: no key, no account, charged nothing.
// Run: node demo.ts

const params = new URLSearchParams({
  "place_id": "ChIJN1t_tDeuEmsRUsoyG83frY4",
  "demo": "true"
});

const res = await fetch(`https://api.scrapefield.com/v1/google-maps/place?${params}`);

const { data, meta } = await res.json();
console.log(data, meta.credits_charged);
