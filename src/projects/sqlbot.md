---
title: "SQLBot - AI SQL Assistant"
date: "2026-01-15"
updated: "2026-01-15"
slug: "sqlbot"
demo: "https://www.oboe.chat/sqlbot"
technologies: ["TypeScript", "Next.js", "AI SDK", "tRPC", "Drizzle", "SQLite"]
type: "ml"
status: "active"
details-included: true
---

# SQLBot — AI SQL Assistant

SQLBot is a local-first CLI that lets you talk to your databases in natural language. Install once with `npm i -g sqlbot`, run `sqlbot`, and it opens a browser UI at `http://localhost:1121`. Ask questions in plain English — SQLBot generates SQL, runs it against your connected databases, and renders tables, charts, and maps from the results.

**Ships as a single npm package.** No server to host. No data leaves your machine.

## Why I Built This

I was tired of context-switching between a SQL editor, a chart tool, and a chat window just to answer one business question. Existing text-to-SQL tools either:

- **Lived in the cloud** — your schema and queries go through their servers
- **Locked you into one database** — great for Postgres, useless for the SQLite file on your laptop
- **Returned raw SQL** — then you still have to run it, format the result, and build a chart

SQLBot runs entirely on your machine, speaks to PostgreSQL / MySQL / SQLite / CSV, and renders the answer directly — SQL + table + chart + narrative in one reply.

## How It Works

### Install & Run

```bash
npm install -g sqlbot
sqlbot
# → http://localhost:1121
```

The CLI (`bin/sqlbot.mjs`) boots a Next.js standalone server, resolves the user's config directory (`~/.sqlbot/`), and opens the browser. No Docker, no Python, no native build step on the hot path — ONNX models are downloaded lazily the first time embeddings are needed.

### Architecture

```
┌──────────────┐   tRPC    ┌───────────────────┐   AI SDK   ┌──────────────┐
│   Next.js    │ ────────→ │  Agents & Tools   │ ─────────→ │  LLM         │
│   UI (React) │           │  (run-sql, chart, │            │  (Oboe/OAI/  │
│              │ ←──────── │   map, knowledge) │ ←────────  │   Groq/Gemini)│
└──────────────┘  stream   └─────────┬─────────┘            └──────────────┘
                                     │
                        ┌────────────┼────────────┐
                        ▼            ▼            ▼
                  ┌──────────┐ ┌──────────┐ ┌──────────┐
                  │ Postgres │ │  MySQL   │ │  SQLite  │
                  └──────────┘ └──────────┘ │ + vec KB │
                                            └──────────┘
```

### Key Pieces

1. **Agent loop** — a tool-using LLM driver that picks between `run-sql-query`, `draw-chart`, `draw-table`, `render-map`, `render-number-card`, `knowledge-base`, and `ask-human` per turn.
2. **Knowledge base** — schema, sample rows, and user notes are embedded with `@huggingface/transformers` (ONNX via `onnxruntime-node`) and stored in `sqlite-vec` for fast retrieval before each query.
3. **Streaming UI** — `resumable-stream` + AI SDK so closing the tab mid-answer doesn't lose the response; reopen and it resumes.
4. **Multi-provider** — Oboe, OpenAI, Groq, Google, or any OpenAI-compatible endpoint. Keys stored in `~/.sqlbot/ai-providers.json`, never phoned home.
5. **Rich rendering** — `visx` for charts, `react-leaflet` for maps, Monaco for the SQL editor, `streamdown` for live markdown.

### Data Flow — One Question

1. User: *"top 10 customers by revenue last quarter"*
2. Knowledge agent retrieves relevant schema chunks from vector KB
3. LLM emits `run-sql-query` tool call with generated SQL
4. Query runs against user's connection (pg / mysql2 / better-sqlite3)
5. LLM sees rows, decides: table + bar chart
6. `draw-table` + `draw-chart` tools emit structured artifacts
7. Client renders them inline in the conversation

## Technical Decisions

**Why ship as an npm package, not a web app?**
Users don't want to paste production connection strings into a SaaS dashboard. Running locally removes the trust barrier — the binary is auditable, and nothing leaves the machine unless the user points it at a hosted LLM.

**Why Next.js for a CLI?**
The UI is non-trivial (Monaco editor, streaming markdown, interactive charts). Next standalone output gives me a single `node server.js` artifact, React Server Components for the heavy rendering paths, and zero build step at install time.

**Why tRPC?**
Type-safe end-to-end without codegen. The CLI process and the browser are the same codebase — shared types just work.

**Why Drizzle + sqlite-vec?**
Local SQLite is the perfect embedded store for chat history, knowledge embeddings, and user settings. Drizzle gives migrations without an ORM's runtime overhead; `sqlite-vec` adds vector search in the same file.

**Why the AI SDK (Vercel)?**
Provider-agnostic streaming + tool use. Swapping from OpenAI → Groq → local Oboe proxy is a one-line change.

## Challenges & Learnings

### Challenge 1: Running ONNX in a globally installed npm package

`onnxruntime-node` ships native binaries per platform. A naive install bloated the package and broke on Apple Silicon.

**Solution:** `scripts/postinstall.mjs` downloads only the binary matching the user's arch, and the embedding model itself lazy-loads on first knowledge-base use — `npm i -g sqlbot` stays fast.

### Challenge 2: Resumable streams on a local server

When a user closes the browser tab mid-answer, the LLM call keeps running and their answer is gone.

**Solution:** `resumable-stream` + an in-memory `stream-store` keyed by chat ID. Reopen the tab, reattach to the running stream, pick up exactly where it left off.

### Challenge 3: Keeping SQL generation accurate across databases

A prompt tuned for Postgres hallucinates on SQLite dialect quirks (and vice versa).

**Solution:** Knowledge agent injects dialect + real schema + sample rows into context every turn. `node-sql-parser` validates generated SQL before execution — bad queries get retried, not shown to the user.

### Challenge 4: Credentials sprawl

Users connect to many databases with many AI providers. One password file is a security smell.

**Solution:** Separate `~/.sqlbot/ai-providers.json` and per-connection encrypted config, never committed, never uploaded. The Oboe provider flow uses OAuth instead of raw keys when possible.

## What's Next

- [x] PostgreSQL / MySQL / SQLite / CSV connectors
- [x] Multi-provider LLM support (Oboe, OpenAI, Groq, Google)
- [x] Vector knowledge base for schema-aware queries
- [x] Charts, tables, maps, number cards, custom UI artifacts
- [ ] Saved dashboards (pin answers, auto-refresh)
- [ ] Slack / Discord bot mode
- [ ] Row-level permissions for shared deployments
- [ ] Superset dashboard export (tool scaffolded, needs polish)

## Try It

```bash
npm install -g sqlbot
sqlbot
```

Then visit [oboe.chat/sqlbot](https://www.oboe.chat/sqlbot) for docs and the hosted onboarding.
