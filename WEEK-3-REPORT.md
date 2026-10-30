TECHTRACK PROJECT DEVELOPMENT REPORT – WEEK 3
Project: TechTrack – Technology Talent and Opportunity Matching Platform
Repository: https://github.com/Peterpraize/Tech-Opportunity-Tracker
Deployment: https://tech-opportunity-tracker-three.vercel.app/
Technology: React 19, Vite 8, JavaScript, React Router, shadcn/ui, CSS, Tailwind CSS and Browser Storage
Development Stage: Functional Frontend Prototype
1. Project Overview
TechTrack is a technology talent and opportunity matching platform designed to connect applicants, companies and organisations with relevant technology opportunities. It provides a centralised interface for applicants to manage their professional profiles and applications, companies to submit opportunities, and administrators to review offers, screen applicants and facilitate candidate matching.
During Week 3, development focused on improving the frontend architecture, implementing role-based access, integrating reusable UI components, developing recruitment management features and optimising application performance.
2. Frontend Development and User Experience
The frontend was developed using React and Vite, with React Router handling application navigation. shadcn/ui was incorporated to support reusable UI components and a consistent interface.
Major frontend implementations include:
Responsive navigation and dashboard interfaces.
Reusable UI component integration using shadcn/ui.
Dedicated applicant, company and administrator dashboards.
Custom 404/not-found page for invalid routes.
Catch-all route handling.
Applicant profile and CV management interfaces.
Opportunity browsing, saving and application interfaces.
The custom 404 page was also included in the automated test suite to verify that unknown routes display the appropriate not-found interface.
3. Major Platform Features
Applicant Management
Applicant registration and login.
Profile creation and management.
Profile photograph upload.
PDF and DOCX CV upload and management.
Opportunity saving and application tracking.
Dedicated applicant dashboard.
Company Management
Company registration and login.
Dedicated company dashboard.
Opportunity submission.
Company-specific offer management and status tracking.
Administrative Management
Dedicated administrator dashboard.
Opportunity approval and rejection.
Applicant screening.
Candidate evaluation and matching.
Candidate proposal management.
Match outcome tracking, including successful and unsuccessful outcomes.
4. Authentication and Role-Based Access
A demonstration authentication system was implemented using sessionStorage, with account records maintained in localStorage.
Three user roles are supported:
Applicant
Company
Administrator
Role-based route protection restricts access to the appropriate dashboards and pages. Users are redirected to their respective dashboards after login, while unauthorised access is redirected appropriately.
A dedicated demonstration administrator account is available. The authentication implementation remains frontend-based and is not intended for production security.
5. Applicant Tracking System (ATS)
An initial rule-based Applicant Tracking System was implemented to support applicant evaluation.
Its capabilities include:
PDF CV text extraction using PDF.js.
DOCX CV text extraction using Mammoth.js.
Keyword comparison between applicant CVs, profiles and opportunity requirements.
Match percentage calculation.
Identification of matching and missing keywords.
Storage of ATS analysis results.
Use of ATS results during candidate proposal.
The current ATS uses rule-based keyword matching rather than AI-powered semantic evaluation. Scanned PDFs requiring OCR are not currently supported.
6. Performance Optimisation
The application underwent JavaScript bundle optimisation through lazy loading and dynamic imports.
Implemented improvements include:
Lazy loading of the administrator dashboard.
Dynamic imports for PDF.js and Mammoth.js.
Separation of document-processing libraries from the main application bundle.
Separate loading of the PDF worker.
Production bundle comparison:
Component
Before
After
Main JavaScript bundle
1,057.83 kB
316.06 kB
PDF.js
Included in main bundle
430.24 kB separate
Mammoth.js
Included in main bundle
298.54 kB separate
Admin dashboard
Included in main bundle
13.28 kB separate

The main JavaScript bundle was reduced by approximately 70.1%, improving the initial application loading footprint.
7. Testing and Quality Assurance
The application underwent manual workflow verification, automated testing, lint checking and production-build verification.
Automated testing using Vitest:
Test
Result
Main navigation links for visitors
Passed
Unknown route displays the not-found page
Passed
Home page renders and requests opportunities
Passed
Total
3 passed, 0 failed

Additional verification:
Applicant, company and administrator demo login workflows tested.
Role-based dashboard access tested.
Profile and CV management tested.
Company offer submission and administrative management tested.
ATS and candidate matching workflows tested.
ESLint completed without errors.
Production build completed successfully.
The latest production build transformed 66 modules and completed without the previous large-chunk warning.
8. Current Limitations and Next Development Phase
TechTrack currently operates as a frontend demonstration prototype. Its major limitations include browser-based data storage, absence of cross-device synchronisation, demonstration-only authentication, lack of server-side authorisation and keyword-based ATS evaluation.
The next development phase will focus on:
Backend API development.
Database design and integration.
Secure authentication and role-based authorisation.
Centralised applicant and company account management.
Secure CV and document storage.
Server-side ATS processing.
Improved candidate matching.
Administrative audit logs.
Production security and deployment preparation.
9. Conclusion
The Week 3 milestone establishes TechTrack as a functional frontend prototype with applicant, company and administrator workflows. The implementation of shadcn/ui, custom 404 handling, role-based navigation, CV processing, ATS functionality and candidate matching provides a foundation for further development.
The project has successfully passed its latest automated tests, ESLint verification and production build.
Overall Status: Functional frontend prototype completed and verified. Backend and database integration remain the next major development objectives.


