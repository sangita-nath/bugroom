# BugRoom

BugRoom is a hands-on debugging playground for developers who want to practice finding and fixing real coding mistakes.

Instead of only reading tutorials, BugRoom gives users small bug cases with a report, broken code, hints, expected behavior, and a clear solution explanation. It is designed to make debugging practice more practical, structured, and beginner-friendly.

## About the Project

Most developers learn by building, but debugging is where real understanding starts. BugRoom focuses on that part.

The app contains real-world style bug challenges across JavaScript, React, TypeScript, CSS, forms, async code, arrays, objects, and API handling. Each challenge is written like a small developer task, so users can read the issue, inspect the broken code, think through the problem, reveal hints if needed, and compare their solution with the final explanation.

BugRoom is useful for:

- Beginners who want to improve problem-solving
- Students learning frontend development
- Developers practicing debugging patterns
- Anyone preparing for real project work
- People who want to understand why bugs happen, not just copy fixes

## Features

### Challenge Dashboard

Browse all debugging challenges from one clean dashboard. Each challenge includes category, difficulty, estimated time, concepts, and current progress status.

### Search and Filters

Find challenges by title, category, difficulty, status, or concept. This makes it easy to focus on a specific topic like React state, async JavaScript, or CSS layout bugs.

### Challenge Detail Page

Each challenge has a dedicated page with:

- Bug report
- Broken code
- Expected behavior
- Concepts covered
- Hints
- Editable attempt area
- Solution code
- Explanation
- Status controls

### Hint Reveal System

Hints are revealed step by step, so users can get help without immediately seeing the full answer.

### Solution Explanation

Every challenge includes a solution and an explanation of what caused the bug. The goal is not just to solve the challenge, but to understand the mistake clearly.

### Progress Tracking

BugRoom tracks completed challenges, challenges in progress, skipped challenges, and items marked for review.

### Bookmark Support

Users can bookmark difficult or interesting challenges and return to them later.

### Progress Page

The progress page gives a simple overview of learning activity, completion percentage, solved challenges, and review items.

### Dark and Light Mode

The interface supports both dark and light themes for a comfortable reading and coding experience.

### Local Storage

Progress, bookmarks, theme preference, and challenge status are saved in the browser using local storage. No login or backend is required.

### Responsive Design

BugRoom works across desktop, tablet, and mobile screens.

## Tech Stack

| Area | Technology |
| --- | --- |
| Frontend | React |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| State Persistence | LocalStorage |
| Deployment | GitHub Pages |

## Challenge Categories

BugRoom includes challenges from practical frontend development areas:

| Category | Focus |
| --- | --- |
| JavaScript Logic | Conditions, calculations, arrays, objects, and data handling |
| React State | State updates, rendering, events, and component behavior |
| TypeScript | Types, optional values, function returns, and API response shapes |
| CSS Layout | Responsive layout, alignment, grid, spacing, and overflow issues |
| Async JavaScript | Promises, loading states, error handling, and timing bugs |
| Forms | Input handling, validation, reset behavior, and user feedback |
| API Handling | Empty responses, loading states, fallback UI, and error conditions |

## How It Works

A user opens a challenge and starts with the bug report.

They review the broken code, check the expected behavior, and try to understand what is wrong. If they need help, they can reveal hints one by one. After thinking through the fix, they can compare their solution with the provided answer and mark the challenge as solved or needing review.

The flow is simple:

```txt
Choose a challenge
Read the bug report
Inspect the broken code
Try to fix the issue
Reveal hints if needed
Check the solution
Read the explanation
Update progress
```

## Getting Started

### Requirements

Make sure Node.js and npm are installed.

You can check using:

```bash
node -v
npm -v
```

## Installation

Clone the repository:

```bash
git clone https://github.com/sangita-nath/bugroom.git
```

Move into the project folder:

```bash
cd bugroom
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The app will run locally using the Vite development server.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |

## Build

Create a production-ready build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deployment

BugRoom is ready for GitHub Pages deployment.

The Vite base path is configured for this repository:

```ts
base: '/bugroom/'
```

A common deployment flow is:

1. Install dependencies with `npm install`
2. Build the project with `npm run build`
3. Deploy the generated `dist` folder to GitHub Pages
4. Open the published GitHub Pages URL

## Data Storage

BugRoom stores user progress in the browser.

Saved data can include:

- Challenge status
- Bookmarked challenges
- Revealed hints
- Theme preference
- Progress state

Because the app uses local browser storage, the data stays on the same device and browser. No backend server or account system is required.

## Design Goals

BugRoom was built with a few clear goals:

- Keep the interface clean and focused
- Make debugging practice feel practical
- Avoid unnecessary complexity
- Help users understand the reason behind each bug
- Make progress visible
- Keep the project easy to run, deploy, and improve

## Why This Project Matters

Debugging is one of the most important skills in software development. A developer does not only need to write code; they also need to read code, understand behavior, notice mistakes, and fix problems without guessing.

BugRoom turns that process into small, focused practice sessions.

It helps users build confidence with common frontend bugs before they face similar issues in real projects.

## Future Improvements

Some useful improvements that can be added later:

- Real code execution for selected challenges
- More debugging challenge packs
- Monaco or CodeMirror editor integration
- Timer-based practice mode
- Review queue for difficult challenges
- Custom challenge creator
- Import and export progress
- More detailed analytics
- Keyboard shortcuts
- Accessibility improvements
- GitHub Actions deployment workflow

## License

This project is licensed under the MIT License.
