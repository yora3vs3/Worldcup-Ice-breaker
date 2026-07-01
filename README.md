<div align="center">
<img width="1200" height="475" alt="World Cup Icebreaker Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# World Cup 2026 Icebreaker Game

A React + Vite web app for a World Cup icebreaker experience. The game includes trivia, polls, jersey rendering, debates, and a live scoreboard powered by the Gemini AI API.

## Features

- Trivia rounds with World Cup-themed questions
- Jersey selection and rendering
- Poll-based gameplay
- Debate and scoreboard views
- Built with React, Vite, Tailwind CSS, and Gemini AI integration

## Prerequisites

- Node.js 18+ or later
- npm

## Setup

1. Install dependencies:

   `npm install`

2. Copy the sample environment file:

   `cp .env.example .env`

3. Set required environment variables in `.env`:

   - `GEMINI_API_KEY` — Gemini AI API key used for AI features
   - `APP_URL` — App URL used for service callbacks or self-referential links

## Run locally

Start the development server:

`npm run dev`

Open your browser at:

`http://localhost:3000`

## Build

Create a production build:

`npm run build`

Preview the production build locally:

`npm run preview`

## Notes

- `.env` is used for local configuration and should not be committed to git.
- If you deploy this app to AI Studio, ensure the required secrets are configured in the deployment environment.
