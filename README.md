# ScrapeField

Google Maps, LinkedIn, Instagram, TikTok and X data through one REST API, and as tools for AI agents. 45 endpoints,
each platform's data in its own documented shape, and a published credit cost for every call. Blocks are
handled for you: no proxies to rotate, no CAPTCHAs to solve, no browser to run.

This repository holds the agent skill, the MCP server's setup and examples. The API itself is at
[scrapefield.com](https://scrapefield.com).

## Try it with no key

```bash
curl "https://api.scrapefield.com/v1/google-maps/place?place_id=ChIJN1t_tDeuEmsRUsoyG83frY4&demo=true"
```

Add `demo=true` to any endpoint: one fixed answer in the real shape, charged nothing, no account.
For real answers, get a key at [scrapefield.com](https://scrapefield.com) and send it as `Authorization: Bearer sf_live_…`.

## Platforms

| Platform | Endpoints | What you get |
| --- | --- | --- |
| [Google Maps](https://scrapefield.com/apis/google-maps) | 5 | Places, details, reviews, photos and posts. |
| [LinkedIn](https://scrapefield.com/apis/linkedin) | 18 | Profiles, companies, search, posts and jobs. |
| [Instagram](https://scrapefield.com/apis/instagram) | 6 | Profiles, posts, comments and hashtags. |
| [TikTok](https://scrapefield.com/apis/tiktok) | 8 | Profiles, videos, comments and search. |
| [X](https://scrapefield.com/apis/x) | 8 | Profiles, posts, replies and search. |

## For AI agents: the MCP server

A remote MCP server at `https://scrapefield.com/mcp` (streamable HTTP). Every endpoint is a tool. With no key it runs in demo
mode, and its `sign_up` tool asks the user for an account by email.

Claude Code:

```bash
claude mcp add --transport http scrapefield https://scrapefield.com/mcp \
  --header "Authorization: Bearer sf_live_…"
```

A client that reads `mcp.json`:

```json
{
  "mcpServers": {
    "scrapefield": {
      "type": "http",
      "url": "https://scrapefield.com/mcp",
      "headers": { "Authorization": "Bearer sf_live_…" }
    }
  }
}
```

The setup for each client: [Claude Code](https://scrapefield.com/integrations/claude-code), [Cursor](https://scrapefield.com/integrations/cursor), [Codex](https://scrapefield.com/integrations/codex), [VS Code](https://scrapefield.com/integrations/vs-code), [Claude](https://scrapefield.com/integrations/claude), [ChatGPT](https://scrapefield.com/integrations/chatgpt).
The registry entry is [`mcp/server.json`](mcp/server.json).

## The agent skill

[`skills/scrapefield/SKILL.md`](skills/scrapefield/SKILL.md) tells a coding agent when to reach for the API, when
not to, and the traps. For Claude Code, copy the folder into `.claude/skills/` in your project or in your home
folder. For Cursor, save the file as a rule in `.cursor/rules/`. The current version is always at [scrapefield.com/skill.md](https://scrapefield.com/skill.md).

## Examples

- [`examples/typescript`](examples/typescript): Node 22.18 or later, which runs TypeScript as it is; no packages.
- [`examples/python`](examples/python): Python 3 with `requests`.

Each folder has `demo`, which needs no key, and `live`, which reads your key from `SCRAPEFIELD_KEY`.

## Documentation

- [Docs](https://scrapefield.com/docs) and [errors](https://scrapefield.com/docs/errors)
- [llms.txt](https://scrapefield.com/llms.txt) and [llms-full.txt](https://scrapefield.com/llms-full.txt): the whole API for a model, in one fetch
- [OpenAPI](https://api.scrapefield.com/v1/openapi.json)
- [Pricing](https://scrapefield.com/pricing) and [status](https://scrapefield.com/status)

Questions: [support@scrapefield.com](mailto:support@scrapefield.com).

## License

MIT: use the skill and the examples as you like. See [LICENSE](LICENSE).
