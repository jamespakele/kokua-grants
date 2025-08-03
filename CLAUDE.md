# Kokua Grants - AI Development Context

## Project Overview
Kokua Grants is an AI-powered web application designed to help Hawaii nonprofits create grant applications efficiently. The application combines modern web technologies with AI-powered document analysis to reduce the time and complexity of grant writing.

## Key Features Implemented
- ✅ React + TypeScript + Vite frontend setup
- ✅ Supabase backend with PostgreSQL database
- ✅ Google OAuth authentication
- ✅ Basic routing and layout structure
- ✅ Hawaii-inspired design system with Tailwind CSS
- ✅ Database schema for organizations, applications, and RFP analysis

## Architecture Decisions

### Frontend Stack
- **React 18** with TypeScript for type safety
- **Vite** for fast development and building
- **Tailwind CSS** with custom Hawaii-inspired color palette (ocean blues, sandy neutrals)
- **React Router v6** for client-side routing
- **React Hook Form** for form handling
- **Lucide React** for consistent iconography

### Backend & Database
- **Supabase** for managed PostgreSQL, authentication, and file storage
- **Row Level Security (RLS)** for data privacy and access control
- **Google OAuth** for secure, passwordless authentication
- **JSONB fields** for flexible content storage in grant applications

### Design Philosophy
- **Accessibility First**: WCAG 2.1 AA compliance, mobile-responsive
- **Progressive Disclosure**: Show only what's needed at each step
- **Hawaii-Inspired**: Warm colors, friendly language, Aloha spirit
- **Grassroots Friendly**: No jargon, clear instructions, supportive messaging

## Database Schema

### Core Tables
1. **organizations** - Nonprofit profiles with 501(c)(3) status, contact info, financials
2. **grant_applications** - Application drafts with status tracking and JSONB content
3. **rfp_analyses** - AI analysis results for uploaded RFP documents

### Key Relationships
- Users (auth.users) → Organizations (1:1 for MVP)
- Organizations → Grant Applications (1:many)
- Grant Applications → RFP Analyses (1:1 optional)

## Development Commands

```bash
# Development
npm run dev          # Start dev server
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript checks

# Build
npm run build        # Production build
npm run preview      # Preview production build
```

## Environment Variables
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key

## Next Steps for Development
1. Create organization onboarding flow
2. Implement grant template system
3. Build RFP upload and AI analysis features
4. Add rich text editor for grant applications
5. Implement export functionality (PDF/DOCX)
6. Add admin dashboard for pilot feedback

## Coding Conventions
- Use TypeScript strict mode
- Functional components with hooks
- Tailwind CSS for styling (avoid custom CSS)
- Descriptive component and variable names
- Error boundaries for graceful error handling
- Optimistic UI updates where appropriate