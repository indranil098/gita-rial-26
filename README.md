# Shanti - Bhagavad Gita Sanctuary (gita-rial-26)

An immersive, multi-page sanctuary exploring the Bhagavad Gita. Read through chapters with cinematic motion, then ask profound questions to an AI Oracle grounded in the text.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Gemini](https://img.shields.io/badge/Gemini-1E88E5?logo=google&logoColor=white)](https://ai.google.dev)

Tags: `react` `vite` `typescript` `tailwind` `gemini` `bhagavad-gita` `spirituality` `ai-oracle`

## Overview

Shanti opens on a home sanctuary, flows into chapter reading across the Gita, and centers on the Oracle page where readers bring their own questions. An Express-assisted service layer calls Gemini for reflective answers, rendered as Markdown with motion-choreographed transitions between states.

## Features

- Sanctuary home page with immersive staging
- Chapter reading across Bhagavad Gita chapters
- AI Oracle answering reader questions with reflective guidance
- Markdown-rendered answers with elegant typography
- Cinematic page motion and scroll choreography
- Responsive navigation and footer across all pages
- Lightweight Express service option for local AI proxying

## Tech Stack

| Layer | Technology |
|-------|------------|
| UI | React 19, TypeScript, React Router DOM 7 |
| Build | Vite 6 |
| Styling | Tailwind CSS 4 |
| AI | Google Gemini (`@google/genai`) via `src/services/ai.ts` |
| Motion | Framer Motion 12, Motion |
| Rendering | React Markdown |
| Icons | Lucide React |
| Local server | Express 4 (optional proxy) |

## Repository Structure

```text
gita-rial-26/
├── src/
│   ├── pages/             # Home, Chapters, Oracle
│   ├── components/        # Navigation, Footer
│   ├── services/          # AI service layer
│   ├── App.tsx            # Routing
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── index.html             # HTML template
├── vite.config.ts         # Vite configuration
└── tsconfig.json          # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 18 or later and npm
- A Google Gemini API key

### Installation

```bash
npm install
```

### Environment

Copy `.env.example` to `.env` and add your key. Never commit `.env`.

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm run preview
```

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start the development server on port 3000 |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | TypeScript check |

## License

All rights reserved.
