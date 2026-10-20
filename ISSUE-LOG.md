# TechTrack — Week 2 Issue Log

This log records development issues and testing observations identified during Week 2. The entries distinguish resolved issues from improvements that remain outstanding.

| ID | Issue or Observation | Impact | Resolution or Next Action | Status |
|---|---|---|---|---|
| TT-01 | Opportunity records were initially stored directly in the application code. | Data and presentation were less clearly separated. | Created a separate JSON data source and an opportunity service for asynchronous retrieval. | Resolved |
| TT-02 | The application needed feedback while opportunity data was loading. | Users could be uncertain whether data retrieval was in progress. | Added a loading state. | Resolved |
| TT-03 | A failed data request needed to be handled gracefully. | Users could otherwise receive no useful explanation when records failed to load. | Added a friendly error message and a Try Again button. | Resolved |
| TT-04 | Repeated opportunity-card markup could make the application harder to maintain. | Changes to card presentation could require editing repeated markup. | Extracted the reusable `OpportunityCard` component. | Resolved |
| TT-05 | Users needed to find relevant opportunities efficiently. | Browsing all listings manually could take longer. | Implemented keyword search and category filtering; both were tested. | Resolved |
| TT-06 | Saved opportunities do not yet persist across page reloads. | Users may lose their saved list after refreshing the page. | Consider persistent storage in a future iteration. | Outstanding |
| TT-07 | The opportunity records are fictitious sample data. | Users could mistake demonstrations for genuine openings if the data is not clearly identified. | Documented that the current listings are sample data, not verified live openings. | Addressed for current demo |

## Week 2 Validation

- `npm run lint` — passed.
- `npm run build` — passed.
- Search and category filtering — tested successfully.
- Error handling and retry — tested successfully.
- Loading and opportunity display — tested successfully.

## Notes

This log documents observed implementation decisions, tested behaviors, and known limitations. It does not claim that every possible edge case or accessibility requirement has been tested.