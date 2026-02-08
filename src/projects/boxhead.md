---
title: "Boxhead - AI Chat App"
date: "2025-06-12"
updated: "2025-06-12"
slug: "boxhead"
demo: "https://www.boxhead.chat"
github: "https://github.com/notshekhar/boxhead"
technologies: ["Next.js", "AI SDK", "React", "TypeScript", "LLM"]
type: "ml"
status: "active"
details-included: true
---


# Boxhead - AI Chat App

Boxhead is a modern AI chat application that provides a seamless conversational experience with large language models. Built with the latest web technologies, it offers a clean, intuitive interface for interacting with AI.

## Why I Built This

I wanted to create a personal AI assistant that I could use daily without relying on third-party services. The goal was to build something that:

- **Works with multiple LLM providers** - Switch between different AI models seamlessly
- **Has a beautiful, minimal UI** - No clutter, just conversation
- **Is fast and responsive** - Built with performance in mind
- **Is self-hostable** - Complete control over my data

## How It Works

### Architecture

The app is built on Next.js 15 with React 19, leveraging the Vercel AI SDK for streaming responses from LLMs. Here's the high-level architecture:

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │ ←→  │  Next.js    │ ←→  │  LLM API    │
│   (React)   │     │  API Routes │     │  (OpenAI,   │
└─────────────┘     └─────────────┘     │  Anthropic) │
                                        └─────────────┘
```

### Key Features

1. **Streaming Responses** - Real-time token streaming for instant feedback
2. **Conversation History** - Persistent chat history with local storage
3. **Multiple Models** - Support for GPT-4, Claude, and other LLMs
4. **Dark/Light Mode** - Automatic theme detection with manual toggle
5. **Mobile Responsive** - Works great on all device sizes

### Technical Decisions

**Why Next.js?**
- Built-in API routes for server-side LLM calls
- Excellent React integration with Server Components
- Easy deployment to Vercel with edge functions

**Why AI SDK?**
- Unified interface for multiple LLM providers
- Built-in streaming support
- Type-safe with excellent TypeScript integration

**Why TypeScript?**
- Catch errors at compile time
- Better IDE support and autocomplete
- Self-documenting code with types

## Challenges & Learnings

### Challenge 1: Streaming UX
Getting the streaming to feel natural was tricky. The initial implementation had issues with:
- Cursor jumping during stream
- Markdown rendering mid-stream

**Solution:** Implemented a custom renderer that handles partial markdown and maintains scroll position.

### Challenge 2: Rate Limiting
Users could accidentally spam the API, leading to high costs.

**Solution:** Added client-side debouncing and server-side rate limiting with exponential backoff.

## What's Next

- [ ] Add voice input support
- [x] Implement conversation branching
- [ ] Add plugin system for tools
- [ ] Multi-modal support (images, files)

## Screenshots

The interface is designed to be minimal and distraction-free, focusing entirely on the conversation.
