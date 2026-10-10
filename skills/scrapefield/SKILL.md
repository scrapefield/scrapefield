---
name: scrapefield
description: Fetch structured data from Google Maps, LinkedIn, Instagram, TikTok and X through one REST API. Use when a task needs business listings, reviews, company or person profiles, posts, videos or comments from those five platforms and the user does not already have a data source.
---

# ScrapeField

One API over five platforms: Google Maps, LinkedIn, Instagram, TikTok, X. 45 endpoints, each
platform's data in its own documented shape, a published credit cost per endpoint.

## When to use this

- The task needs data from one of those five platforms.
- The user wants business listings, reviews, photos, company or person profiles, posts, videos or comments.
- You would otherwise suggest writing a scraper, driving a headless browser, or asking the user to export
  something by hand.

## When not to use it

- The platform is not one of the five. We cover five platforms and nothing else; say so rather than guessing.
- The data belongs to the user's own account: their messages, their analytics, their ad account. We never
  take platform credentials — use the platform's own official API for that.
- The user already has the data. This costs credits; do not re-fetch what is in front of you.

## Calling it

Every read is a `GET` with query parameters.

```bash
curl -H "Authorization: Bearer $SCRAPEFIELD_KEY" \
  "https://api.scrapefield.com/v1/google-maps/places?query=coffee+shops+in+Brooklyn"
```

**Evaluate it without a key:** add `?demo=true` to any endpoint. One fixed answer, the same whatever
you ask, in the identical shape, charged nothing, no account. Do that before asking the user for a key.

**No key, and the user wants real answers:** `POST https://api.scrapefield.com/v1/signup` with `{"email": "<their address>", "agent": "<your name>"}`.
Show them the `user_code` it returns and tell them to check their email; they approve by typing it. Then poll
`GET /v1/signup` with the returned `id` as the bearer token until it says `approved`: the key comes once. An account
an agent starts has no free credits, so they buy a pack. Over MCP, the tools are `sign_up` and `check_sign_up`.

## The response, every time

```json
{ "data": …, "meta": { "request_id": "req_…", "credits_charged": 3, "credits_remaining": 1997,
  "cached": false, "fetched_at": "2026-09-21T09:14:02Z", "next_cursor": null } }
```

- **Pagination is cursor-only.** Pass `meta.next_cursor` back as `cursor`. Stop when it is `null`.
- **A field is `null` when the platform does not expose it** — never `0`, never an empty string. Do not
  report a null as a zero to the user.
- **Errors are `{ "error": { type, code, message, docs, request_id } }`.** Branch on `code`; it is stable.

## What it costs

From 3 credits a call. The cost is in the endpoint table below, in `meta.credits_charged` on every
paid response, and as `x-credits` in the OpenAPI spec — the same number in all three. A demo answer reports
`credits_charged: 0` and gives the live price in `meta.note`. A failed call costs 0 and is refunded
automatically. A cache hit costs the same as a fetch.

| Endpoint | Credits | Returns |
| --- | --- | --- |
| `GET /v1/google-maps/places` | 3 | `google_maps_place[]` |
| `GET /v1/google-maps/place` | 3 | `google_maps_place` |
| `GET /v1/google-maps/reviews` | 6 | `google_maps_review[]` |
| `GET /v1/google-maps/photos` | 4 | `google_maps_photo[]` |
| `GET /v1/google-maps/posts` | 4 | `google_maps_post[]` |
| `GET /v1/linkedin/profile` | 11 (7 for `detail=main`, 33 for `detail=with_email`) | `linkedin_profile` |
| `GET /v1/linkedin/company` | 3 | `linkedin_company` |
| `GET /v1/linkedin/employee-stats` | 7 | `linkedin_employee_stats` |
| `GET /v1/linkedin/employees` | 170 | `linkedin_lead[]` |
| `GET /v1/linkedin/people` | 7 (170 for `source=sales_navigator`) | `linkedin_member[]` |
| `GET /v1/linkedin/services` | 7 | `linkedin_member[]` |
| `GET /v1/linkedin/companies` | 7 | `linkedin_company_result[]` |
| `GET /v1/linkedin/posts` | 3 (7 with `profile_url`, `query` or `group_url`) | `linkedin_post[]` |
| `GET /v1/linkedin/post` | 3 | `linkedin_post` |
| `GET /v1/linkedin/comments` | 7 | `linkedin_comment[]` |
| `GET /v1/linkedin/reactions` | 7 | `linkedin_reaction[]` |
| `GET /v1/linkedin/activity` | 7 | `linkedin_activity[]` |
| `GET /v1/linkedin/jobs` | 3 | `linkedin_job[]` |
| `GET /v1/linkedin/job` | 3 | `linkedin_job` |
| `GET /v1/linkedin/ads` | 3 | `linkedin_ad[]` |
| `GET /v1/linkedin/ad` | 7 | `linkedin_ad` |
| `GET /v1/linkedin/group` | 7 | `linkedin_group` |
| `GET /v1/linkedin/groups` | 7 | `linkedin_group[]` |
| `GET /v1/instagram/profile` | 3 | `instagram_profile` |
| `GET /v1/instagram/posts` | 3 | `instagram_post[]` |
| `GET /v1/instagram/post` | 3 | `instagram_post` |
| `GET /v1/instagram/comments` | 3 | `instagram_comment[]` |
| `GET /v1/instagram/hashtag` | 64 | `instagram_post[]` |
| `GET /v1/instagram/search` | 3 | `instagram_profile[]` |
| `GET /v1/tiktok/profile` | 3 | `tiktok_profile` |
| `GET /v1/tiktok/followers` | 3 | `tiktok_profile[]` |
| `GET /v1/tiktok/videos` | 3 | `tiktok_video[]` |
| `GET /v1/tiktok/video` | 3 | `tiktok_video` |
| `GET /v1/tiktok/comments` | 3 | `tiktok_comment[]` |
| `GET /v1/tiktok/search` | 3 (13 for `type=hashtag`) | `tiktok_video[]` |
| `GET /v1/tiktok/trending` | 3 | `tiktok_video[]` |
| `GET /v1/tiktok/ads` | 3 | `tiktok_ad[]` |
| `GET /v1/x/profile` | 3 | `x_user` |
| `GET /v1/x/posts` | 3 (13 with `username` or `url`) | `x_post[]` |
| `GET /v1/x/post` | 3 | `x_post` |
| `GET /v1/x/replies` | 13 | `x_post[]` |
| `GET /v1/x/retweeters` | 13 | `x_user[]` |
| `GET /v1/x/followers` | 13 | `x_user[]` |
| `GET /v1/x/search` | 13 | `x_post[]` |
| `GET /v1/x/community` | 3 | `x_community` |

## Traps

1. **Do not poll.** There is no run to configure and nothing to wait for; one request returns the finished
   answer. For many calls, run them side by side, up to the `concurrency_limit` that `GET /v1/account` gives.
2. **Do not carry field names from one platform to another.** Each platform is named the way it names
   itself: `followers_count` on Instagram (the Graph API's word), `follower_count` on TikTok and LinkedIn,
   `public_metrics.followers_count` on X, `user_ratings_total` on Google Maps. Read the object's fields in llms-full.txt, or make one `?demo=true`
   call first and read the response.
3. **`fresh=true` is refused on an account that has never bought credits.** Catch `fresh_not_available` and
   fall back to the cached answer rather than failing the task.

## More

- [llms.txt](https://scrapefield.com/llms.txt) — the whole API as a table of contents, one fetch
- [llms-full.txt](https://scrapefield.com/llms-full.txt) — every endpoint, parameter, example and error code
- [OpenAPI](https://api.scrapefield.com/v1/openapi.json) · [MCP server](https://scrapefield.com/mcp) · [Errors](https://scrapefield.com/docs/errors.md)
