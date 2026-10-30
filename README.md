# TechTrack — Tech Opportunity Tracker

TechTrack is a frontend-based talent and opportunity matching platform designed to connect job seekers with organisations offering employment and other professional opportunities.

The platform provides separate experiences for applicants, companies and administrators. Applicants can create profiles, upload CVs, explore opportunities and submit applications. Companies can submit opportunities for review, while administrators manage offers, screen applicants and use an ATS-style tool to assess candidate suitability.

## Project Overview

**Project name:** TechTrack — Tech Opportunity Tracker  
**Version:** 0.0.0  
**Application type:** Frontend web application  
**Status:** Functional prototype  
**Architecture:** Role-based frontend application  
**Repository:** https://github.com/Peterpraize/Tech-Opportunity-Tracker  
**Live application:** https://tech-opportunity-tracker-three.vercel.app/

## Technology Stack

### Core technologies

- React 19
- JavaScript (ES Modules)
- Vite 8
- React Router 7
- CSS
- Tailwind CSS 4

### UI and styling

- Lucide React — icons
- Base UI React — interface primitives
- Class Variance Authority — component variants
- clsx — conditional class names
- tailwind-merge — Tailwind class merging
- Geist Variable Font

### CV processing and ATS

- PDF.js — extracting text from PDF CVs
- Mammoth — extracting text from DOCX CVs

### Testing and code quality

- Vitest
- React Testing Library
- Testing Library User Event
- Jest DOM
- ESLint

## Main Features

### 1. Applicant Features

Applicants can:

- Register and log in.
- Create and manage their profiles.
- Upload profile photographs.
- Upload CVs in PDF and DOCX formats.
- Browse available opportunities.
- View opportunity details.
- Submit applications.
- Save opportunities.
- View their application history.
- Access their applicant dashboard.

### 2. Company Features

Companies can:

- Register and log in using a company account.
- Access a dedicated company dashboard.
- Submit new opportunities.
- Track submitted offers.
- View the approval status of submitted opportunities.

Company-submitted opportunities are subject to administrator review before approval.

### 3. Administrator Features

Administrators can:

- Access a dedicated administration dashboard.
- Review submitted company opportunities.
- Approve or reject submitted offers.
- View registered applicant profiles.
- Screen applicants.
- Run CV analysis using the ATS functionality.
- Review matched and missing keywords.
- View candidate suitability scores.
- Propose applicants for approved opportunities.
- Track proposed matches and their outcomes.

### 4. Applicant Tracking System (ATS)

TechTrack includes a rule-based ATS feature that extracts CV text and compares it against opportunity requirements.

The ATS supports:

- PDF CV text extraction using PDF.js.
- DOCX CV text extraction using Mammoth.
- Keyword matching.
- Matched keyword identification.
- Missing keyword identification.
- Candidate suitability scoring.
- ATS result storage for subsequent review.

The current ATS uses rule-based keyword comparison. It is not an AI-powered recruitment engine and does not perform semantic understanding of CV content.

### 5. Opportunity Matching

The platform supports a structured matching workflow:

1. A company submits an opportunity.
2. An administrator reviews the submission.
3. The administrator approves or rejects the opportunity.
4. Applicants are screened.
5. The administrator runs candidate assessments.
6. Suitable applicants can be proposed for approved opportunities.
7. Match outcomes can be tracked.

Match statuses include:

- Proposed
- Under discussion
- Successful
- Unsuccessful
- Cancelled

## User Roles and Access Control

TechTrack provides three main user roles.

| Role | Access |
|---|---|
| Applicant | Applicant dashboard, profile, applications and saved opportunities |
| Company | Company dashboard and opportunity submission |
| Administrator | Administration dashboard, offer management, applicant screening, ATS and matching |

Protected routes are used to restrict access to role-specific sections of the application.

**Demo authentication notice:** Authentication currently uses browser storage and demonstration account logic. It is intended for prototype testing and does not provide production-grade security.

## Project Structure

```text
tech-opportunity-tracker/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── ApplicantNav.jsx
│   │   ├── Navbar.jsx
│   │   ├── OpportunityCard.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── AuthContextValue.js
│   │   ├── demoAccounts.js
│   │   ├── SavedOpportunitiesContext.jsx
│   │   ├── SavedOpportunitiesContext.js
│   │   ├── useAuth.js
│   │   └── useSavedOpportunities.js
│   │
│   ├── data/
│   │   └── opportunities.js
│   │
│   ├── lib/
│   │   └── utils.ts
│   │
│   ├── pages/
│   │   ├── AdminDashboard.jsx
│   │   ├── Apply.jsx
│   │   ├── CompanyDashboard.jsx
│   │   ├── CompanyOfferForm.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── MyApplications.jsx
│   │   ├── NotFound.jsx
│   │   ├── OpportunityDetails.jsx
│   │   ├── Profile.jsx
│   │   ├── Register.jsx
│   │   └── SavedOpportunities.jsx
│   │
│   ├── services/
│   │   ├── applicationService.js
│   │   └── opportunityService.js
│   │
│   ├── test/
│   │   └── setup.js
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── App.test.jsx
│   ├── index.css
│   └── main.jsx
│
├── evidence/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

### Architecture Overview

- **components:** Reusable interface elements, navigation and route protection.
- **context:** Authentication, demonstration accounts and saved-opportunity state.
- **data:** Opportunity data used by the application.
- **lib:** Shared utility functions.
- **pages:** Main application screens for applicants, companies and administrators.
- **services:** Application and opportunity-related operations.
- **test:** Test configuration and setup.
- **assets:** Images and other frontend assets.

## Installation and Setup

### Requirements

- Node.js
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Peterpraize/Tech-Opportunity-Tracker.git
```

### 2. Enter the project directory

```bash
cd Tech-Opportunity-Tracker
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local address displayed in your terminal to access TechTrack.

## Available Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Creates the production build |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs ESLint |
| `npm test` | Runs the Vitest test suite |

To run tests once without watch mode:

```bash
npm test -- --run
```

## Data Storage

The current prototype uses browser storage to retain application information.

Depending on the feature, the application uses:

- `localStorage` for persistent demonstration records.
- `sessionStorage` for the active demonstration login session.

This allows the prototype to retain data across browser refreshes on the same browser.

There is currently no connected backend API or production database.

## Current Limitations

The following limitations should be considered before production deployment:

1. Authentication is demonstration-only and does not provide secure password verification.
2. User records and application data are stored in the browser.
3. Browser storage is not suitable for secure or large-scale production data management.
4. ATS results are based on keyword matching, not advanced AI assessment.
5. Scanned PDFs and image-based CVs are not supported by the current text-extraction workflow without OCR.
6. Data is not synchronised across different browsers or devices.
7. Role restrictions in the frontend are not a substitute for server-side authorisation.

## Future Development

Potential next development stages include:

- Backend API development.
- Secure authentication and password management.
- PostgreSQL database integration.
- Server-side role-based access control.
- Cloud-based CV storage.
- More advanced candidate matching.
- Email notifications.
- Company verification.
- Application and recruitment analytics.
- Production deployment and security testing.

## Project Objective

TechTrack aims to provide a structured digital environment where applicants can discover opportunities, companies can submit recruitment offers, and administrators can manage the opportunity approval, applicant screening and candidate matching process.

The project demonstrates frontend engineering, role-based application architecture, browser-based data management, document processing and recruitment workflow implementation.