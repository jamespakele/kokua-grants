Product Requirements Document: Kokua Grants AI Web Application (MVP)
Version: 1.0
Date: August 3, 2025
Author: James Pakele
Status: Draft
Stakeholders: Project Lead, Lead Engineer, UX/UI Designer, Pilot Organizations
1. Introduction & Vision
1.1. Problem Statement
Nonprofits and small organizations in Hawaii face significant challenges in preparing and submitting competitive grant applications due to limited resources, time, and specialized grant-writing expertise. The manual, repetitive collection of organizational data and the need to interpret complex funder requirements often result in stress, inefficiency, and missed opportunities for crucial funding.
1.2. Product Vision
Kokua Grants will deliver a modern, AI-powered web application that helps local nonprofits and small organizations easily prepare, tailor, and generate strong grant applications. By enabling upload and parsing of funder RFPs, offering guided standard templates, and reusing core organizational details, the platform will make the grant process less intimidating, more efficient, and accessible—even for grassroots users.
1.3. Strategic Focus for MVP
Focus on supporting foundation and private grant applications relevant to Hawaii organizations.
Offer two key creation paths: upload an RFP for automated requirement analysis or use a proven standard template.
Prioritize usability, accessibility, and a warm, welcoming user experience.
Validate core value with a targeted pilot group and iterate based on real-world feedback.
2. Goals & Success Metrics
2.1. User Goals
Reduce time spent creating an application by at least 50% compared to manual processes.
Increase user confidence in the quality/completeness of applications.
Remove friction by eliminating redundant data entry and providing clear, actionable guidance.
Make the grant application process less stressful and more approachable.
2.2. Business Goals
Successfully validate the MVP with a pilot group (2–5 Hawaii nonprofits).
Achieve a high onboarding and application completion rate.
Establish groundwork for future regional/feature expansion.
Collect actionable insights to inform the product roadmap.
2.3. Key Performance Indicators (KPIs)
Onboarding Completion: >80% of pilot users complete onboarding and save an organization profile.
Draft Creation: ≥2 grant drafts per pilot user within the first month.
Draft Success: >75% of RFP uploads result in a generated, editable draft.
User Feedback: Strongly positive usability feedback from pilots (measured via NPS, interviews, survey).
Return Rate: ≥60% of users return to complete or edit an application draft.
3. Target Audience & User Personas
Primary Persona: The Grassroots Leader
Name: Malia
Organization: Small grassroots nonprofit focused on local conservation.
Role: Handles multiple responsibilities, including grant writing with minimal formal training.
Goals: Secure grant funding, spend less time on paperwork, get clear, supportive guidance.
Frustrations:
“Every funder asks for the same info but in a different format.”
“Grant portals are intimidating and unfriendly.”
“I don’t have time—or IT staff for complicated tools.”
4. Features & Requirements
Epic 4.1: User Authentication & Onboarding
ID
User Story
Details & Acceptance Criteria
Priority
4.1.1
As a new user, I want to sign in using Google so I don’t have to remember a password.
“Sign in with Google” is branded, welcoming, and uses Google OAuth. No username/password flow.
Must-Have
4.1.2
As a new organization, I want onboarding to guide me through setting up my profile in manageable steps.
Interview-style onboarding collects 501(c)(3) status, mission, contact info, simple revenues/expenses. Autosave, progress indicators.
Must-Have
4.1.3
As an org profile owner, I want to review and update my information whenever needed.
Profile page available from dashboard with edit capabilities.
Must-Have
Epic 4.2: Grant Application Creation
ID
User Story
Details & Acceptance Criteria
Priority
4.2.1
As a user, I want to upload a funder’s RFP and have the system highlight the key requirements.
User uploads RFP (PDF/DOCX); AI highlights requirements and offers a proposal outline based on RFP text.
Must-Have
4.2.2
As a user, I want to use a standard template if I don’t have a specific RFP.
At least 3 simple, beautiful grant templates selectable from the start.
Must-Have
4.2.3
As a user, I want organizational data automatically suggested/fill where possible.
Data from onboarding/profile auto-fills relevant template fields. User can override all values.
Must-Have
4.2.4
As a user, I want AI-powered suggestions to help draft strong, clear answers without jargon or complexity.
Simple, opt-in AI tips and completions offered in editor. Inline help and non-intimidating language.
Must-Have
4.2.5
As a user, I want to download or export my completed application as DOCX/PDF.
Clean export supporting standard grant formats.
Must-Have
Epic 4.3: Dashboard & Persistence
ID
User Story
Details & Acceptance Criteria
Priority
4.3.1
As a user, I want to see my profile, uploaded RFPs, and application drafts in one place and pick up where I left off.
Dashboard lists all active/incomplete grant apps with easy access, persistent sessions, and clear status.
Must-Have
4.3.2
As a user, I want my data to autosave so I never lose progress.
Autosave on field change, robust draft recovery after disconnect.
Must-Have
Epic 4.4: Pilot Admin & Feedback Tools
ID
User Story
Details & Acceptance Criteria
Priority
4.4.1
As a platform admin, I want to view usage stats and collect pilot feedback.
Admin dashboard: see # signups, # RFPs uploaded, grant drafts started/completed, view anonymous feedback.
Must-Have
5. UX/UI Design & Look & Feel Guidelines
Visual Identity:
Clean, modern, and inviting — avoid corporate stiffness.
Subtle references to Hawaii:
Warm, natural color palettes (ocean blues, lush greens, sandy neutrals).
Gentle touches of the Aloha spirit in welcome messages, empty states, and notifications.
Island-inspired design cues—never kitschy, always respectful and professional.
Tone & Copy:
Friendly, jargon-free language at every touchpoint.
Concise instructional text, help tips, and error messages to foster user confidence.
Navigation & Workflow:
Always-visible sidebar or top navigation with clear, easy-to-interpret labels.
Easy access back to the Dashboard from all parts of the app.
Limit visible form fields to only what’s needed at each step (progressive disclosure).
Helpful progress indicators show users’ location in onboarding and application flows.
Persistent autosave and “continue later” options for every user-critical workflow.
Accessibility:
High-contrast, legible font choices.
Responsive and mobile-friendly layouts from the start.
Adherence to WCAG 2.1 AA for all core journeys.
Trust & Privacy Messaging:
Assure users of data safety at all major entry points, in friendly and readable language.
Offer concise, accessible help text and support contact options throughout the app.
6. Non-Functional Requirements
Security: All user data and uploaded files encrypted at rest and in transit. Exclusive use of Google OAuth for login.
Performance: Page loads under 3 seconds; AI-driven template population within 60 seconds.
Usability: Minimal technical jargon; clear, friendly copy; accessibility (WCAG AA compliant); mobile responsive.
Reliability: 99.5% uptime target during pilot.
Scalability:
Architecture (especially data schema) planned for easy regional expansion post-MVP.
While Supabase is open, all development should intentionally support possible future migration (e.g., data schemas, authentication) to other platforms for long-term scaling.
Privacy: No user data shared externally without consent; clear, friendly messaging about data safety.
Robustness:
Ensure robust error handling and clear user-facing fallback mechanisms for all AI API failures and file parsing issues.
Pilot usability must be protected via graceful degradation — users should always have a manual option or clear “next step” in the event of AI or system error.
7. Assumptions & Dependencies
All pilot users have access to a Google account for authentication.
Users are willing to provide basic organizational and financial details securely online.
AI/LLM platforms (OpenAI, Gemini, Claude, etc.) are available and reliable for document parsing and text generation.
If any AI/LLM service is unavailable or fails to process a user’s file, the application will offer a fallback manual mapping or editing workflow, with a supportive message to maintain user trust and workflow continuity.
Simple templates and RFPs cover the vast majority of pilot org use cases.
Chosen frontend and backend stack are available and team is proficient.
Supabase is planned for MVP, yet all core data and auth flows are designed for eventual migration, anticipating future technical scaling requirements.
8. Out of Scope for MVP
Application submission portals directly to funders.
Multi-user teamwork and role management (single user per org for MVP).
Payment processing or advanced billing features.
Public foundation research database.
Mobile apps (web responsive only).
Real-time collaboration and audit history.
9. Go-to-Market & Launch Plan
Phase 1: Build (Weeks 1-8)
Complete Google auth, onboarding, org profile, RFP upload, and grant template workflows.
Build clean, inviting frontend and set up backend infrastructure.
Develop pilot admin dashboard + feedback loop.
Phase 2: Pilot Launch (Week 9)
Select and onboard 2–5 Hawaii-based nonprofit organizations.
Monitor engagement, provide hands-on onboarding.
Phase 3: Pilot Support & Iteration (Weeks 10–14)
Weekly outreach for feedback, resolve issues, prioritize UX improvements.
Phase 4: Decision/Expansion
Analyze success metrics, plan for V1.1 with more advanced features and expanded pilot.
10. Technical Stack Suggestions
Frontend: React, Vue, or Svelte (React preferred for available libraries and team familiarity)
Backend: Node.js or FastAPI
Database: Supabase (managed PostgreSQL)
Authentication: Google OAuth
File Parsing & AI: Integration with Claude, OpenAI, Gemini for document analysis and generation; fallback to manual mapping tool for challenging files.
Storage: Secure file storage via AWS S3 or equivalent (Supabase Storage)
Deployment: Vercel, Netlify (frontend); Supabase (backend, storage, auth)
End of Document