# Kokua Grants 🌺

A modern, AI-powered web application that helps Hawaii nonprofits and small organizations easily prepare, tailor, and generate strong grant applications. Built with the Aloha spirit to make grant writing less intimidating and more accessible.

## 🌟 Features

- **Google OAuth Authentication** - Secure, easy sign-in
- **Organization Profile Management** - Store and reuse organizational details
- **RFP Upload & Analysis** - AI-powered parsing of grant requirements
- **Standard Templates** - Proven grant templates for Hawaii organizations
- **Autosave & Progress Tracking** - Never lose your work
- **Export Capabilities** - Download applications as DOCX/PDF
- **Hawaii-Inspired Design** - Warm, welcoming user experience

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kokua-grants
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Fill in your Supabase credentials in `.env`:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase database**
   - Create a new Supabase project
   - Run the SQL migration in `supabase/migrations/001_initial_schema.sql`
   - Enable Google OAuth in Supabase Auth settings

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🏗️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS with Hawaii-inspired color palette
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Authentication**: Google OAuth via Supabase
- **Routing**: React Router v6
- **Forms**: React Hook Form
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components
├── pages/            # Page components
├── hooks/            # Custom React hooks (auth, etc.)
├── lib/              # Configuration (Supabase client)
├── types/            # TypeScript type definitions
└── utils/            # Utility functions

supabase/
└── migrations/       # Database migration files
```

## 🎨 Design Philosophy

Kokua Grants embraces the Aloha spirit with:
- **Ocean Blues & Sandy Neutrals** - Calming, professional color palette
- **Friendly, Jargon-Free Language** - Accessible to grassroots organizations  
- **Progressive Disclosure** - Show only what's needed at each step
- **Mobile-First Design** - Responsive and accessible (WCAG 2.1 AA)

## 📊 Database Schema

The application uses three main tables:
- `organizations` - Nonprofit organization profiles
- `grant_applications` - Grant application drafts and submissions
- `rfp_analyses` - AI analysis results for uploaded RFPs

All tables include Row Level Security policies to ensure data privacy.

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Variables

- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

## 🚀 Deployment

The application is designed to deploy easily on:
- **Frontend**: Vercel, Netlify
- **Backend**: Supabase (managed)
- **Storage**: Supabase Storage or AWS S3

## 🤝 Contributing

This project is built for Hawaii nonprofits. Contributions that improve accessibility, user experience, and functionality are welcome.

## 📄 License

Built with ❤️ for Hawaii's nonprofit community.
