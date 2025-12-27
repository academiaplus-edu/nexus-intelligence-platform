# Cloudflare Workers React Starter Template

[![Deploy to Cloudflare][cloudflarebutton]]

A production-ready full-stack starter template for Cloudflare Workers featuring a React frontend, Hono backend, and Durable Objects for scalable entity storage. Perfect for building real-time apps like chat systems, with built-in users, chat boards, and messaging.

## ✨ Features

- **Full-Stack Ready**: React 18 frontend with Vite + Tailwind CSS + shadcn/ui; Hono backend with type-safe APIs.
- **Durable Objects**: Efficient multi-entity storage (Users, Chats, Messages) with indexing for listings.
- **Modern UI**: shadcn/ui components, dark mode, responsive design, animations.
- **Data Fetching**: TanStack Query for optimistic updates and caching.
- **Development UX**: Hot reload, error boundaries, theme toggle, sidebar layout.
- **Production Optimized**: TypeScript, Tailwind JIT, Cloudflare deployment with one command.
- **Seed Data**: Pre-populated mock users/chats/messages for instant demo.
- **API-First**: RESTful endpoints for CRUD operations on users, chats, and messages.

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS 3, shadcn/ui, TanStack Query, React Router, Lucide Icons, Sonner (toasts)
- **Backend**: Cloudflare Workers, Hono, Durable Objects, TypeScript
- **Utilities**: Zustand (state), Immer, Framer Motion (animations), Zod (validation)
- **Dev Tools**: Bun, Wrangler, ESLint, Prettier

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) installed (`curl -fsSL https://bun.sh/install | bash`)
- [Cloudflare Account](https://dash.cloudflare.com/) with Workers enabled
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install/) (`bunx wrangler@latest`)

### Installation

1. Clone or download the repo
2. Install dependencies:
   ```bash
   bun install
   ```
3. Generate Worker types (optional, for IDE support):
   ```bash
   bunx wrangler types
   ```

### Development

Start the dev server with hot reload for both frontend and Worker:

```bash
bun dev
```

- Frontend: http://localhost:3000 (or `${PORT:-3000}`)
- API: http://localhost:3000/api/*
- Open `src/pages/HomePage.tsx` to customize your app.

### Build & Preview

```bash
bun build
bun preview
```

## ☁️ Deployment

Deploy to Cloudflare Workers with a single command (free tier available):

```bash
bun deploy
```

Or use the [Cloudflare Dashboard](https://dash.cloudflare.com/).

[![Deploy to Cloudflare][cloudflarebutton]]

**Custom Domain**: After deployment, add a custom domain in Wrangler or Dashboard.

**Environment Variables**: Set via Wrangler secrets or Dashboard:
```bash
bunx wrangler secret put YOUR_SECRET
```

## 📁 Project Structure

```
├── shared/           # Shared types & mock data
├── src/              # React frontend (pages, components, hooks)
├── worker/           # Cloudflare Worker backend (entities, routes)
├── public/           # Static assets
├── vite.config.ts    # Vite bundler config
└── wrangler.jsonc    # Worker deployment config
```

## 🔌 API Endpoints

All APIs under `/api/` with JSON responses `{ success: boolean; data?: T; error?: string }`.

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/users` | GET | List users (?cursor=?&limit=10) |
| `/api/users` | POST | Create user `{ name: string }` |
| `/api/users/:id` | DELETE | Delete user |
| `/api/users/deleteMany` | POST | Delete many `{ ids: string[] }` |
| `/api/chats` | GET | List chats (?cursor=?&limit=10) |
| `/api/chats` | POST | Create chat `{ title: string }` |
| `/api/chats/:chatId/messages` | GET | List messages |
| `/api/chats/:chatId/messages` | POST | Send message `{ userId: string; text: string }` |
| `/api/chats/:id` | DELETE | Delete chat |
| `/api/chats/deleteMany` | POST | Delete many `{ ids: string[] }` |

**Frontend Integration**: Use `src/lib/api-client.ts` for type-safe fetches.

## ✏️ Customization

1. **Extend Entities**: Add to `worker/entities.ts` (extends `IndexedEntity`), register routes in `worker/user-routes.ts`.
2. **Pages**: Edit `src/pages/` and update `src/main.tsx` router.
3. **UI**: Use shadcn components (`@components/ui/*`), add via `npx shadcn-ui@latest add <component>`.
4. **Styles**: `src/index.css` + Tailwind config.
5. **Theme**: Toggle via `ThemeToggle`; persistent with localStorage.

**DO NOT MODIFY** `worker/index.ts`, `worker/core-utils.ts`, or `wrangler.jsonc` to preserve core functionality.

## 🤝 Contributing

1. Fork & clone
2. `bun install`
3. `bun dev`
4. Create PR to `main`

Report issues for bugs/features.

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.