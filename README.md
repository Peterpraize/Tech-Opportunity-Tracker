# TechTrack — Tech Opportunity Tracker

TechTrack is a React-based frontend application designed to help users discover technology opportunities, explore listing details, save opportunities, and track application records. The project demonstrates the core user experience of a technology opportunity platform.

**Live Demo:** https://tech-opportunity-tracker-three.vercel.app/  
**GitHub Repository:** https://github.com/Peterpraize/Tech-Opportunity-Tracker

## 1. Project Overview

Finding relevant technology opportunities can be challenging when information is scattered across different platforms. TechTrack provides a centralized interface for exploring opportunities and organizing a user's interest in them.

The longer-term product vision is to develop TechTrack into a technology recruitment and talent-placement service. In that model, TechTrack would screen applicants, assess their skills, and refer qualified candidates to companies. The current project is the frontend foundation for that vision; the complete recruitment workflow is not yet implemented.

## 2. Features

The current frontend demonstration includes:

- Opportunity discovery and browsing.
- Search and category filtering.
- Individual opportunity detail pages.
- Save and unsave opportunity functionality.
- Browser-based persistence for saved opportunities.
- An application form demonstration.
- Local application records and a My Applications page.
- Applicant dashboard and profile interfaces.
- Demonstration login and registration interfaces.
- Responsive navigation and mobile-friendly layouts.
- A custom not-found page for invalid routes.
- Form validation and user feedback.

**Important:** Opportunity records may be sample data. Users should verify any opportunity's availability and legitimacy independently.

## 3. Technology Stack

| Technology | Purpose |
|---|---|
| React | Building reusable UI components |
| Vite | Development server and production build |
| JavaScript (ES modules) | Application logic |
| React Router DOM | Client-side navigation |
| CSS | Layout, styling, and responsive design |
| Lucide React | Icons |
| Vitest | Automated tests |
| React Testing Library | Component and user-interface testing |
| ESLint | Code quality and linting |
| localStorage | Browser-based persistence for demonstration data |

The project also includes Tailwind CSS v4 and related UI tooling.

## 4. Getting Started

### Prerequisites

Install a compatible version of Node.js and npm.

### Installation

Clone the repository:

```bash
git clone https://github.com/Peterpraize/Tech-Opportunity-Tracker.git
```

Navigate into the project directory:

```bash
cd Tech-Opportunity-Tracker
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal, usually `http://localhost:5173`.

## 5. Available Scripts

Run these commands from the project root.

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run lint` | Runs ESLint |
| `npm run test -- --run` | Runs the automated tests once |
| `npm run build` | Creates the production build |
| `npm run preview` | Previews the production build locally |

Before submitting changes, run:

```bash
npm run lint
npm run test -- --run
npm run build
```

## 6. Project Structure

```text
tech-opportunity-tracker/
├── public/
│   └── opportunities.json
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ApplicantNav.jsx
│   │   ├── Navbar.jsx
│   │   └── OpportunityCard.jsx
│   ├── context/
│   │   ├── SavedOpportunitiesContext.jsx
│   │   └── useSavedOpportunities.js
│   ├── data/
│   │   └── opportunities.js
│   ├── pages/
│   │   ├── Apply.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── MyApplications.jsx
│   │   ├── NotFound.jsx
│   │   ├── OpportunityDetails.jsx
│   │   ├── Profile.jsx
│   │   ├── Register.jsx
│   │   └── SavedOpportunities.jsx
│   ├── services/
│   │   ├── applicationService.js
│   │   └── opportunityService.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── evidence/
├── IDEA.md
├── ISSUE-LOG.md
├── README.md
├── WEEK-1-REPORT.md
├── WEEK-2-REPORT.md
├── WORK_PLAN.md
├── package.json
└── vite.config.js
```

### Main Components

- **App.jsx:** Configures application routes and shared saved-opportunity state.
- **main.jsx:** Application entry point.
- **Navbar.jsx:** Public navigation and responsive menu.
- **ApplicantNav.jsx:** Navigation for the applicant workspace.
- **OpportunityCard.jsx:** Reusable opportunity listing and save controls.
- **Home.jsx:** Opportunity discovery, search, and category filtering.
- **OpportunityDetails.jsx:** Details for a selected opportunity.
- **Apply.jsx:** Demonstration application form.
- **Dashboard.jsx:** Applicant dashboard interface.
- **Profile.jsx:** Demonstration profile editing.
- **SavedOpportunities.jsx:** Displays saved listings and relevant UI states.
- **MyApplications.jsx:** Displays locally stored application records.
- **Login.jsx and Register.jsx:** Demonstration authentication interfaces.
- **NotFound.jsx:** Handles unmatched application routes.
- **SavedOpportunitiesContext.jsx:** Shares saved-opportunity state.
- **opportunityService.js:** Retrieves opportunity data.
- **applicationService.js:** Manages demonstration application records.

## 7. Data Storage and Limitations

This version is a frontend demonstration and does not yet have a production backend.

- **Application records:** Stored in the browser rather than submitted to an employer or recruitment system.
- **Saved opportunities:** Persist in browser storage where supported.
- **Authentication:** Login and registration interfaces are demonstrations; they do not provide real account authentication.
- **Opportunity data:** Sample or locally supplied records should not be treated as verified live vacancies.
- **Recruitment workflow:** Candidate screening, technical assessments, interview scheduling, employer referrals, and final hiring decisions are not implemented as a live service.
- **Data availability:** Browser-stored information is not shared automatically across devices or browsers and may be lost if the user clears site data.

Users should not enter sensitive personal information into this demonstration.

## 8. Testing and Quality Checks

The project includes automated tests using Vitest and React Testing Library.

The current test suite covers:

- Main navigation links.
- Not-found route behavior.
- Home-page rendering and opportunity data requests.

The development verification process also includes ESLint checks and a production build.

Manual checks previously completed for this project include:

- Opportunity browsing, searching, and category filtering.
- Saving opportunities and checking persistence after refresh.
- Viewing opportunity details and using the application form.
- Checking local application records.
- Invalid-route handling.
- Mobile layout at a 375-pixel viewport.
- Keyboard navigation, visible focus, form labels, validation feedback, and mobile-menu accessibility.

These manual checks are development evidence, not a formal accessibility certification. Test results should be rerun against the final submitted version.

## 9. Deployment

The frontend demonstration is deployed on Vercel:

https://tech-opportunity-tracker-three.vercel.app/

The deployed application should be checked after each final deployment to confirm that the latest changes are available and that direct navigation to application routes works correctly.

## 10. Future Improvements

The next development phase could introduce:

1. A Node.js and Express backend.
2. A PostgreSQL database for users, opportunities, applications, and recruitment records.
3. Secure authentication and role-based access for applicants, companies, and administrators.
4. Employer registration and vacancy management.
5. Candidate screening, technical assessment, and interview scheduling.
6. Consent-based candidate referrals and recruitment progress tracking.
7. Email notifications and status updates.
8. Administrative tools for reviewing companies and opportunity listings.
9. Privacy, security, and data-retention controls.
10. Additional automated tests, including accessibility and end-to-end workflows.

## 11. Project Learning Outcomes

This project provides practical experience with component-based React development, client-side routing, reusable UI components, browser storage, responsive styling, form validation, automated testing, linting, and production builds.

The project also demonstrates the importance of distinguishing a working frontend prototype from a complete production service.

## 12. Project Status

**Current stage:** Frontend demonstration and submission preparation.

The project establishes the initial user interface and core browser-side workflows for TechTrack. A production recruitment platform will require backend services, secure authentication, persistent server-side data, and the recruitment processes described in the future-improvements section.
