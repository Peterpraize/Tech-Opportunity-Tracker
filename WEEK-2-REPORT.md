# Week 2 Report — TechTrack

## Project Overview

**Project:** Tech Opportunity Tracker (TechTrack)  
**Stage:** BuildLab Stage 1 — Frontend Development  
**Week:** 2  
**Repository:** https://github.com/Peterpraize/Tech-Opportunity-Tracker  
**Live Application:** https://tech-opportunity-tracker-three.vercel.app/

## 1. Week 2 Objectives

The objective for Week 2 was to improve the frontend structure, integrate asynchronous data loading, and provide a better user experience when data is loading or unavailable.

## 2. Features Implemented

- Created a reusable `OpportunityCard` component.
- Moved sample opportunity records into a separate data file.
- Created a JSON data source at `public/opportunities.json`.
- Implemented asynchronous data retrieval using `fetch`, `async/await`, and a dedicated opportunity service.
- Added a loading state while opportunity data is being retrieved.
- Added a friendly error message when data retrieval fails.
- Implemented a Try Again button to retry loading data.
- Retained opportunity search and category filtering.
- Maintained the responsive interface and existing save functionality.

## 3. Data Source

The application retrieves opportunity records from a local JSON file served by Vite.

The records are fictitious sample data used for development and testing. They should not be interpreted as verified, currently available opportunities.

## 4. Testing and Validation

The following checks were completed:

| Test | Result |
|---|---|
| Application loads and displays opportunities | Passed |
| Search returns matching opportunities | Passed |
| Category filtering works | Passed |
| Loading state and data retrieval | Passed |
| Error message appears when the data request fails | Passed |
| Try Again reloads the opportunities after the request is restored | Passed |
| ESLint (`npm run lint`) | Passed |
| Production build (`npm run build`) | Passed |

## 5. User Experience and Code Quality

The application provides feedback during data retrieval and when a request fails. Users can retry a failed request without needing to reload the entire page.

The reusable opportunity card separates repeated card presentation from the main application component.

## 6. Outstanding Tasks

- Complete and verify the README component map.
- Create or update the issue log with at least five relevant entries.
- Deploy and verify the latest Week 2 version.
- Commit the completed Week 2 work and push it to GitHub.
- Create and push the `week-2` Git tag after final verification.

## 7. Conclusion

Week 2 has implemented reusable UI components, asynchronous JSON data loading, loading and error states, retry functionality, search, and category filtering. The lint and production build checks passed, and the main user-facing behaviors were tested successfully.

The remaining tasks are documentation completion, issue logging, deployment verification, and Git release tagging.