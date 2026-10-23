
## Component Map and Project Structure

```text
tech-opportunity-tracker/
├── public/
│   └── opportunities.json
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/
│   │   ├── ApplicantNav.jsx
│   │   ├── ApplicantNav.css
│   │   ├── Navbar.jsx
│   │   ├── Navbar.css
│   │   └── OpportunityCard.jsx
│   ├── context/
│   │   ├── SavedOpportunitiesContext.jsx
│   │   ├── SavedOpportunitiesContext.js
│   │   └── useSavedOpportunities.js
│   ├── data/
│   │   └── opportunities.js
│   ├── pages/
│   │   ├── Apply.jsx
│   │   ├── Apply.css
│   │   ├── Auth.css
│   │   ├── Dashboard.jsx
│   │   ├── Dashboard.css
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── MyApplications.jsx
│   │   ├── MyApplications.css
│   │   ├── NotFound.jsx
│   │   ├── OpportunityDetails.jsx
│   │   ├── OpportunityDetails.css
│   │   ├── Profile.jsx
│   │   ├── profile.css
│   │   ├── Register.jsx
│   │   ├── SavedOpportunities.jsx
│   │   └── SavedOpportunities.css
│   ├── services/
│   │   ├── applicationService.js
│   │   └── opportunityService.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── ISSUE-LOG.md
├── WEEK-1-REPORT.md
├── WEEK-2-REPORT.md
├── README.md
└── package.json
```

### Main Components and Responsibilities

- **`App.jsx`** — Configures the application's routes and shared saved-opportunity provider.
- **`main.jsx`** — Entry point for the React application.
- **`Navbar.jsx`** — Provides the main public navigation and responsive menu.
- **`ApplicantNav.jsx`** — Provides navigation for the applicant workspace.
- **`OpportunityCard.jsx`** — Reusable presentation component for individual opportunity listings and save controls.
- **`Home.jsx`** — Main opportunity discovery page, including the listing and search experience.
- **`OpportunityDetails.jsx`** — Displays details for a selected opportunity.
- **`Apply.jsx`** — Provides the demonstration application interface.
- **`Dashboard.jsx`** — Applicant workspace dashboard.
- **`Profile.jsx`** — Demonstrates profile editing and browser-based storage.
- **`SavedOpportunities.jsx`** — Displays saved listings and handles loading, error, retry, and empty states.
- **`MyApplications.jsx`** — Displays locally stored demonstration application records.
- **`Login.jsx` and `Register.jsx`** — Demonstration login and registration interfaces; they do not implement production authentication.
- **`NotFound.jsx`** — Provides a not-found page component.
- **`SavedOpportunitiesContext.jsx`** — Shares saved-opportunity state across relevant components.
- **`useSavedOpportunities.js`** — Provides access to the saved-opportunity context.
- **`opportunityService.js`** — Retrieves opportunity data asynchronously.
- **`applicationService.js`** — Handles application-record operations for the demonstration.
- **`opportunities.json`** — Public JSON source for opportunity records.
- **`opportunities.js`** — Local sample opportunity data.
- **CSS files** — Define styling for the corresponding components, pages, and global layout.
