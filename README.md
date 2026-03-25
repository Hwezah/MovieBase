# 🎬 MovieBase

A modern, full-stack movie discovery and watchlist app built with Next.js 15, powered by the TMDB API and Supabase.

🔗 **Live Demo:** [movie-base-zeta.vercel.app](https://movie-base-zeta.vercel.app)

---

## 📸 Screenshots

> Coming soon

---

## ✨ Features

- 🎯 **Movie Discovery** — Browse trending, popular, top rated and upcoming movies and TV shows
- 🔍 **Search** — Search for any movie or TV show instantly
- 🎛️ **Filter** — Filter movies by genre and release year with persistent filter state
- 🎬 **Movie Details** — View detailed information including cast, genres, runtime and ratings
- 🎭 **Actor Pages** — Explore an actor's full filmography by clicking on any cast member
- ➕ **Watchlist** — Add and remove movies from a personal watchlist saved to the cloud
- 🔐 **Authentication** — Sign in with Google via NextAuth
- 📱 **PWA Support** — Install the app on Android and iOS like a native app
- ♾️ **Infinite Scroll** — Seamlessly load more content as you scroll
- 🎨 **Dynamic Background** — App background color adapts to the current movie's palette
- 🎞️ **Trailer Playback** — Watch official trailers directly in the app
- 💀 **Skeleton Loaders** — Smooth loading states across all pages
- 📱 **Fully Responsive** — Optimized for mobile, tablet and desktop

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| [Next.js 15](https://nextjs.org) | Full stack React framework (App Router) |
| [React](https://react.dev) | UI library |
| [Tailwind CSS](https://tailwindcss.com) | Styling |
| [Shadcn/ui](https://ui.shadcn.com) | UI components |
| [TMDB API](https://www.themoviedb.org/documentation/api) | Movie data source |
| [Supabase](https://supabase.com) | Database for watchlist storage |
| [NextAuth v5](https://authjs.dev) | Authentication |
| [Vercel](https://vercel.com) | Deployment |

---

## 🏗️ Architecture

### Authentication + Database
This project uses **NextAuth** for authentication and **Supabase** as the database — two separate systems connected through a shared user identifier.

Since NextAuth users don't exist in Supabase's auth system, RLS (Row Level Security) is bypassed using Supabase's service role key on the server. Every database operation manually verifies the user through NextAuth before executing — making this a secure and intentional architectural decision.

### Server vs Client Components
The app follows Next.js App Router best practices:
- **Server components** handle all data fetching (movie details, watchlist, actor pages)
- **Client components** handle interactivity (infinite scroll, filters, watchlist buttons)
- **Server actions** handle all database mutations (add/remove from watchlist)
- **API routes** (`route.js`) are used only where client side fetching is required (infinite scroll, filter results)

### Data Flow
```
TMDB API → lib/tmdb.js → Server Components / API Routes → UI
Supabase → lib/supabase/admin.js → Server Actions → UI
NextAuth → lib/auth.js → Session → Server Actions / Pages
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A [TMDB API key](https://www.themoviedb.org/settings/api)
- A [Supabase](https://supabase.com) project
- A [Google OAuth](https://console.cloud.google.com) client

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/moviebase.git
cd moviebase
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root of the project and add your environment variables (see below)

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

---

## 🔑 Environment Variables

Create a `.env.local` file in the root of your project with the following variables:
```env
# TMDB
TMDB_API_KEY=your_tmdb_api_key

# NextAuth
NEXTAUTH_SECRET=your_random_secret_string
NEXTAUTH_URL=http://localhost:3000
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

> ⚠️ Never commit `.env.local` to GitHub. It is already included in `.gitignore`.

---

## 🗄️ Database Setup

This app uses a single Supabase table:

### `watchlist` table

| Column | Type | Description |
|--------|------|-------------|
| `id` | int8 | Primary key (auto generated) |
| `user_id` | uuid | NextAuth user ID |
| `movie_id` | int8 | TMDB movie ID |
| `created_at` | timestamp | Auto generated |

---

## 📁 Project Structure
```
moviebase/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/  ← NextAuth endpoint
│   │   ├── tmdb/                ← TMDB infinite scroll endpoint
│   │   ├── discover/            ← Filter results endpoint
│   │   └── recommendations/     ← Movie recommendations endpoint
│   ├── actor/[id]/              ← Actor filmography page
│   ├── watch/[slug]/            ← Movie details page
│   ├── watchlist/               ← User watchlist page
│   ├── search/                  ← Search results page
│   ├── settings/                ← User settings page
│   ├── error.js                 ← Global error boundary
│   ├── not-found.js             ← Global 404 page
│   ├── loading.js               ← Global loading skeleton
│   └── layout.js                ← Root layout
├── components/
│   ├── Buttons/                 ← Reusable button components
│   ├── providerRows/            ← Infinite scroll row components
│   ├── movieCard.jsx            ← Movie card component
│   ├── movieCardOverlay.jsx     ← Watchlist movie card with remove button
│   ├── skeletonCard.jsx         ← Loading skeleton card
│   ├── commonHeader.jsx         ← Hero section component
│   ├── filteredResultsRow.jsx   ← Filter results with infinite scroll
│   ├── recommendationsRow.jsx   ← Movie recommendations row
│   └── dynamicBackground.jsx   ← Dynamic color background wrapper
├── hooks/
│   └── useExtractColor.js       ← Color extraction hook
├── lib/
│   ├── auth.js                  ← NextAuth configuration
│   ├── tmdb.js                  ← TMDB API functions
│   ├── actions/
│   │   └── watchlistActions.js  ← Server actions for watchlist
│   └── supabase/
│       ├── client.js            ← Browser Supabase client
│       ├── server.js            ← Server Supabase client
│       └── admin.js             ← Admin Supabase client
├── public/
│   ├── manifest.json            ← PWA manifest
│   └── icons/                   ← PWA icons
└── middleware.js                 ← Route protection (optional)
```

---

## 🔐 Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Go to **APIs & Services** → **Credentials**
4. Create an **OAuth 2.0 Client ID**
5. Add authorized origins:
   - `http://localhost:3000`
   - `https://yourapp.vercel.app`
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://yourapp.vercel.app/api/auth/callback/google`
7. Copy the client ID and secret to `.env.local`

---

## 📱 PWA Installation

### Android
1. Open Chrome and visit the live URL
2. Tap the three dots menu
3. Select **"Add to Home Screen"** or **"Install App"**
4. Confirm installation

### iOS
1. Open Safari and visit the live URL
2. Tap the Share button
3. Select **"Add to Home Screen"**
4. Confirm installation

---

## 🙏 Acknowledgements

- [TMDB](https://www.themoviedb.org) for the movie data API
- [Supabase](https://supabase.com) for the database
- [NextAuth](https://authjs.dev) for authentication
- [Shadcn/ui](https://ui.shadcn.com) for UI components
- [Lucide](https://lucide.dev) for icons

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

> Built with ❤️ by [Kenneth Ruhweza](https://github.com/Hwezah)
