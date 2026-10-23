
# TechTrack — Week 2 Issue Log

This log records development issues, implementation decisions, testing observations, and known limitations identified during Week 2 of BuildLab Stage 1 — Frontend Development.

The entries distinguish resolved issues, documented limitations, and outstanding verification tasks. They reflect the work completed and the checks confirmed so far.

## Issue Register

| ID | Issue or Observation | Impact | Resolution or Next Action | Status |
|---|---|---|---|---|
| TT-01 | Opportunity data and presentation needed clearer separation. | Keeping data inside application logic can make maintenance and updates harder. | Added `public/opportunities.json` and a dedicated opportunity service for asynchronous data retrieval. | Resolved |
| TT-02 | Users needed feedback while opportunity records were loading. | Without loading feedback, users might think the page was unresponsive. | Added a loading state during data retrieval. | Resolved |
| TT-03 | Failed data requests needed a user-friendly response. | A failed request could leave users without a useful explanation or recovery action. | Added a friendly error message and a Try Again button. | Resolved |
| TT-04 | Repeated opportunity-card markup could become difficult to maintain. | Repeated markup makes consistent interface changes harder. | Extracted the reusable `OpportunityCard` component. | Resolved |
| TT-05 | Users needed to locate relevant opportunities efficiently. | Browsing every listing manually takes more effort. | Implemented keyword search and category filtering. These behaviors were previously tested during development. | Resolved |
| TT-06 | Users needed clear feedback when a search or filter returned no matches. | An empty result could be mistaken for a loading or application failure. | Added an empty-results message and a clear-filters action. | Implemented |
| TT-07 | Saved opportunities needed to be available from a dedicated page. | Users needed a central place to revisit saved listings. | Added a Saved Opportunities page using shared saved-opportunity state, with loading, error, retry, and empty states. | Implemented; final manual verification pending |
| TT-08 | Public navigation and applicant workspace navigation serve different purposes. | Mixing all navigation links into one area could make the interface harder to navigate. | Added the public `Navbar` and reusable `ApplicantNav` components. | Implemented |
| TT-09 | The application needed dedicated applicant-facing pages. | Users needed separate interfaces for dashboard, profile, saved opportunities, and application records. | Added routes and page components for Dashboard, Profile, Saved Opportunities, and My Applications. | Implemented; final route verification pending |
| TT-10 | Profile management needed a working demonstration without a backend. | A profile screen without save behavior would be difficult to demonstrate. | Added a browser-based demo profile using local storage, with save and clear actions. Production account persistence is not implemented. | Implemented as a demo |
| TT-11 | Login and registration screens could be mistaken for real authentication. | Users might assume an account was created or authenticated when no backend authentication exists. | Added demo notices and registration validation. The pages remain demonstrations and do not provide production authentication or server-side authorization. | Addressed for current demo |
| TT-12 | Application records needed a dedicated place for users to review their activity. | Users needed to distinguish recorded demo applications from real submissions. | Added a My Applications page that displays locally stored demo records and explains that providers have not received real submissions. | Implemented; final manual verification pending |
| TT-13 | Saved items and demo records are browser-based rather than server-backed. | Data may not synchronize across devices or authenticated accounts. | Documented the limitation. Server-side persistence and cross-device synchronization remain future improvements. | Known limitation |
| TT-14 | Opportunity listings are fictitious development data. | Users could mistake sample records for genuine, currently available opportunities. | Identified the listings as fictitious sample data in the application documentation. | Addressed for current demo |
| TT-15 | ESLint identified an unused `loadOpportunities` function in `SavedOpportunities.jsx`. | The lint check failed because the function was declared but never used. | Removed the redundant callback and import while retaining the existing effect-based loading, error, retry, and cancellation logic. | Resolved; lint subsequently passed |
| TT-16 | The README component map did not fully reflect the expanded application. | Documentation could become inconsistent with the current source structure. | Update the component map to include the shared navigation, applicant pages, context, hooks, and service modules. | Outstanding |
| TT-17 | The Week 2 release still requires final repository and deployment verification. | The submitted source, release tag, and live application need to correspond to the intended Week 2 version. | Verify the working tree, deployed application, and GitHub state; commit and push the intended changes; create and push `week-2` only after verification. Preserve `week-1`. | Outstanding |

## Week 2 Validation

### Confirmed command-line checks

- `npm run lint` — passed after removing the unused `loadOpportunities` function.
- `npm run build` — passed after the correction.
- Production build — Vite transformed 51 modules and completed successfully.

### Previously tested application behavior

The project documentation records successful development testing of:

- Opportunity display and data retrieval.
- Keyword search.
- Category filtering.
- Loading feedback.
- Error messaging for failed data requests.
- Retry behavior after restoring the data request.

These are previously recorded test results. A fresh end-to-end test of all current pages, mobile layouts, and the deployed version remains necessary before submission.

## Outstanding Improvements

- Complete and verify the README component map.
- Manually test the applicant navigation and all main routes.
- Verify profile save and clear behavior.
- Verify saved-opportunity behavior and the empty, loading, and error states.
- Verify the demo application-record flow.
- Recheck mobile layouts and keyboard navigation.
- Verify the latest deployed application and GitHub repository.
- Commit and push the intended Week 2 changes.
- Create and push the `week-2` tag after final verification.
- Complete the BuildLab submission process and retain the submission confirmation.

## Notes

This issue log records implementation decisions, known limitations, previously tested behavior, and remaining work. It does not claim that every edge case, accessibility requirement, browser configuration, or user flow has been tested.

The login, registration, profile, saved-opportunity, and application-record features are frontend demonstrations where indicated. Production authentication, server-side authorization, and backend persistence are not established by these frontend features.
