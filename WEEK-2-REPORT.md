
# Week 2 Report — TechTrack

## Project Overview

**Project:** Tech Opportunity Tracker (TechTrack)  
**Stage:** BuildLab Stage 1 — Frontend Development  
**Week:** 2  
**Repository:** https://github.com/Peterpraize/Tech-Opportunity-Tracker  
**Live Application:** https://tech-opportunity-tracker-three.vercel.app/

## 1. Week 2 Objectives

Week 2 focused on building a component-based frontend, integrating asynchronous opportunity data, improving loading and error handling, and developing the applicant-facing experience.

The work also continued the project from the initial opportunity-discovery interface toward a broader frontend prototype with saved opportunities, applicant workspace pages, profile management, demo authentication screens, and application records.

## 2. Features Implemented

### Opportunity Discovery and Data Integration

- Created a reusable `OpportunityCard` component for displaying opportunity information.
- Added a JSON data source at `public/opportunities.json`.
- Implemented asynchronous data retrieval using `fetch`, `async/await`, and a dedicated opportunity service.
- Added a loading state while opportunity data is retrieved.
- Added a friendly error message and a retry action for failed data requests.
- Retained keyword search and category filtering.
- Included an empty-results experience and a clear-filters action.
- Maintained responsive styling and opportunity save/unsave functionality.

### Navigation and Applicant Workspace

- Developed a shared public navigation bar for Home, My Saved, Login, and Create Account.
- Added responsive navigation-menu behavior for smaller screens.
- Created a reusable `ApplicantNav` component linking to Dashboard, Profile, Saved Opportunities, and My Applications.
- Added applicant-facing routes for the dashboard, profile, saved opportunities, and application records.

### Applicant Pages and Demo Functionality

- Added a dashboard page for the applicant workspace.
- Added a profile-management interface with a browser-based demo profile.
- Added login and registration demonstration pages.
- Added registration form validation, including password matching and consent handling.
- Added a saved-opportunities page with loading, error, retry, and empty states.
- Added a My Applications page for displaying locally stored demo application records.
- Added demo notices to explain the limitations of profile, login, registration, saved-item, and application-record functionality.

These screens are frontend demonstrations. They do not constitute a production authentication system, and demo application records are not real submissions received by opportunity providers.

## 3. Data Source and Limitations

TechTrack retrieves opportunity records from `public/opportunities.json` through the opportunity service.

The opportunity listings are fictitious sample data used for development and demonstration. They are not verified live openings.

The applicant-facing features currently use browser-based demo behavior where applicable. Data stored locally in the browser is not automatically synchronized with a server or across devices.

The current frontend does not establish secure user authentication, server-side authorization, or persistent backend application processing.

## 4. Component-Based Structure

The project uses reusable components and separates some responsibilities across components, context, and service modules.

Key components and modules include:

- `Navbar.jsx` — public navigation and mobile menu behavior.
- `ApplicantNav.jsx` — navigation links for the applicant workspace.
- `OpportunityCard.jsx` — reusable opportunity display and save controls.
- `SavedOpportunitiesContext.jsx` and its associated hook — shared saved-opportunity state.
- `opportunityService.js` — asynchronous retrieval of opportunity records.
- `applicationService.js` — access to demo application records.
- Page components — separate interfaces for Home, Opportunity Details, Apply, Dashboard, Profile, Saved Opportunities, My Applications, Login, and Register.
- `App.jsx` — route configuration and shared provider setup.

The README component map should be kept synchronized with the actual source tree.

## 5. Testing and Validation

### Confirmed command-line checks

| Check | Result |
|---|---|
| `npm run lint` after correcting the unused `loadOpportunities` function | Passed |
| `npm run build` after the correction | Passed |

The latest production build transformed 51 modules and completed successfully.

### Application behavior

The project documentation records successful testing of opportunity display, search, category filtering, loading behavior, failed-request messaging, and retry behavior during Week 2 development.

A fresh end-to-end verification of all newer applicant pages, mobile layouts, the deployed application, and the latest GitHub state remains necessary before final submission.

## 6. Issue Log and Development Decisions

The project includes `ISSUE-LOG.md`, which records implementation decisions, fixes, tested behaviors, and known limitations.

Current documented entries cover:

- Separating opportunity data from presentation logic.
- Adding a loading state.
- Handling failed data requests and adding retry functionality.
- Reusing opportunity-card markup.
- Improving opportunity discovery with search and category filtering.
- Recording the current limitation of saved-item persistence.
- Clearly identifying fictitious opportunity listings.

The existing issue log contains more than the five entries required for Week 2. It should continue to record genuine issues and improvements as they are identified.

## 7. Code Quality and Accessibility Considerations

The frontend uses reusable components, separate styling files, descriptive interface text, and responsive navigation behavior.

Keyboard focus styles and accessible labels are included in the existing interface. A complete accessibility audit and automated component or end-to-end test suite have not yet been confirmed.

The latest lint and production build checks pass, but these checks alone do not prove that all interactive features work correctly in every browser or viewport.

## 8. Outstanding Tasks Before Submission

- Verify the README component map against the current source tree.
- Complete a final manual test of the major opportunity and applicant flows.
- Verify the latest deployed application and confirm that it reflects the intended Week 2 code.
- Review the Git working tree and ensure the intended Week 2 changes are committed and pushed.
- Create and push the `week-2` Git tag after final verification, preserving the existing `week-1` tag.
- Complete the required BuildLab submission process and retain its confirmation.

## 9. Conclusion

Week 2 expanded TechTrack beyond opportunity discovery by developing reusable UI components, asynchronous JSON data retrieval, loading and error handling, retry behavior, search and filtering, shared navigation, and applicant-facing demonstration pages.

The project includes a dashboard, profile interface, saved-opportunities view, demo login and registration pages, and a view of locally stored demo application records. These are frontend prototype features; production authentication, backend persistence, and real application processing remain outside the current implementation.

The latest ESLint and production build checks both passed. Final application, deployment, repository, and release-tag verification remain the final steps before submission.

## AI Use Declaration

AI assistance was used to support frontend implementation, debugging, development planning, and documentation. The developer is responsible for reviewing the code, understanding the implementation, validating behavior, and ensuring that the submitted work accurately represents the project.
