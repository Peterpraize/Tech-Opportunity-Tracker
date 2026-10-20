# Tech Opportunity Tracker

## Project Overview

Tech Opportunity Tracker (TechTrack) is a responsive web application that helps users discover, search, filter, and save technology-related opportunities.

The platform is designed for opportunities such as internships, scholarships, fellowships, entry-level jobs, and training programmes.

**Important:** The current opportunities are fictitious sample data used for development and testing. They are not verified live openings.

## Problem Statement

Technology opportunities can be difficult to track when they are published across different platforms. Users need a simple interface for finding relevant opportunities and keeping track of listings that interest them.

## Proposed Solution

TechTrack provides a central interface for browsing opportunities, searching by keywords, filtering by category, and saving interesting listings.

## Target Users

- Students and recent graduates
- Beginner and aspiring developers
- People seeking technology training
- Job seekers looking for technology opportunities

## Technology Stack

- React
- Vite
- JavaScript
- HTML
- CSS
- ESLint
- Fetch API and JSON for asynchronous sample-data loading

## Current Features

- Responsive user interface
- Keyword search
- Category filtering
- Save and unsave opportunities
- Loading state while opportunity data is retrieved
- Friendly error message when data retrieval fails
- Retry button for failed data requests
- Empty-results message
- Clear-filters action
- Keyboard focus styling and accessible labels
- Reusable opportunity card component

## Component Map and Project Structure

```text
tech-opportunity-tracker/
├── public/
│   └── opportunities.json
├── src/
│   ├── components/
│   │   └── OpportunityCard.jsx
│   ├── data/
│   │   └── opportunities.js
│   ├── services/
│   │   └── opportunityService.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── WEEK-1-REPORT.md
├── WEEK-2-REPORT.md
├── README.md
└── package.json
```

### Main Components and Responsibilities

- **App.jsx:** Main application component. Manages opportunity data, loading and error states, search, category filtering, saved opportunities, and the main page layout.
- **OpportunityCard.jsx:** Reusable component that displays an individual opportunity, its details, and the save/unsave control.
- **opportunityService.js:** Retrieves opportunity records asynchronously using `fetch`, validates the response, and reports errors.
- **opportunities.json:** JSON data source fetched by the application.
- **opportunities.js:** Local sample opportunity data retained in the project.
- **App.css:** Styles the main application layout, opportunity cards, search controls, and other page elements.
- **index.css:** Provides global styles and base styling.
- **main.jsx:** React application entry point.

## Getting Started

### Prerequisites

Install Node.js and npm.

### Installation

Clone or download the project repository and open its folder in the terminal.

Run:

```bash
npm install
npm run dev
```

Open the local address displayed in the terminal, usually `http://localhost:5173/`.

### Production Build

```bash
npm run build
```

### Code Quality Check

```bash
npm run lint
```

## Testing and Validation

The following checks have been completed during Week 2:

- Application displays opportunity records.
- Keyword search works.
- Category filtering works.
- Failed data requests display a friendly error.
- The Try Again action successfully reloads the opportunities after the request is restored.
- `npm run lint` passes.
- `npm run build` passes.

## Planned Improvements

- Persist saved opportunities across page reloads.
- Add routed opportunity details pages and a not-found page.
- Add automated tests.
- Conduct a formal accessibility audit.
- Consider a backend and user accounts in a later development stage.

## Project Status

This project is being developed as part of the BuildLab Stage 1 Frontend Development programme.

Week 2 includes reusable components, asynchronous sample-data retrieval, loading and error handling, retry functionality, search, and category filtering.

## AI Use Declaration

AI assistance was used to support interface development, debugging, and documentation. The developer is responsible for reviewing, testing, understanding, and validating the submitted work.