# Backgammon Arena

Backgammon Arena is a modern web platform for playing, learning, and improving at backgammon through AI coaching, fast matches, player statistics, and city-based competition.

## Why this product is different

Most backgammon websites only provide a board. Backgammon Arena focuses on learning, retention, competition, and monetization.

## Key Features

- Interactive backgammon board
- Local two-player mode
- AI opponent
- Fast 5-minute matches
- Training mode
- Legal move hints
- AI Coach analysis
- Match history
- Player profile and statistics
- City leaderboard
- Pro subscription concept
- Supabase-ready architecture
- LocalStorage fallback

## Target Audience

Backgammon Arena is built for beginners who want to learn strategy, casual players who want fast games, competitive players who want progress tracking, families and friends who want simple multiplayer, and players who enjoy social rankings and city competition.

## Product Thinking

This project is designed as a real service, not just a game.

It includes retention through statistics and match history, education through AI Coach and Learn page, monetization through Pro features, social competition through leaderboards, and expansion potential through multiplayer rooms and tournaments.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase-ready architecture
- LocalStorage fallback

## How to Run

```bash
npm install
npm run dev
```

## Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

If these variables are missing, the app runs in guest mode using LocalStorage.

## Future Improvements

- Real Supabase Realtime multiplayer
- Stripe payments
- Real AI API integration for deeper coaching
- Tournament system
- Custom board skins
- Friends system
