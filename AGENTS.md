# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Dicorza is a **frontend-only** digital collaboration platform connecting brands with creative talent. This is a React application built with Vite and Tailwind CSS that simulates a full-stack experience using mock data and local state management.

**Critical constraints:**
- **No backend implementation** - all features use mock data and frontend state only
- **No real authentication** - role-based access is simulated via Context API
- **No API calls** - everything runs locally
- **No database integration** - use mock JSON files in `src/data/`

## Development Commands

```bash
# Start development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Architecture

### State Management
Uses **React Context API** for global state:
- `AuthContext` - manages user authentication state and role (Brand/Creator)
- `ProjectContext` - manages projects and applications state

### Routing & Access Control
- React Router with role-based route guards
- `/brand-dashboard` - accessible only when role === 'Brand'
- `/creator-dashboard` - accessible only when role === 'Creator'
- Unauthenticated users redirect to landing/login pages

### Folder Structure
```
src/
├── components/       # Reusable UI components
│   ├── Navbar/
│   ├── Footer/
│   ├── ProjectCard/
│   ├── ApplicationCard/
│   ├── Modal/
│   └── FormInputs/
├── pages/           # Route-level components
│   ├── Landing/
│   ├── Login/
│   ├── Register/
│   ├── BrandDashboard/
│   └── CreatorDashboard/
├── context/         # React Context providers
│   ├── AuthContext/
│   └── ProjectContext/
├── data/            # Mock data files
│   ├── mockProjects.js
│   └── mockUsers.js
├── App.jsx          # Root component with routing
└── main.jsx         # Entry point
```

### Key User Flows

**Brand Flow:**
1. Register/Login → select "Brand" role
2. Redirect to Brand Dashboard
3. View overview stats (total projects, open projects, applications)
4. Create new projects via modal/form
5. View applications from creators on their projects

**Creator Flow:**
1. Register/Login → select "Creator" role
2. Redirect to Creator Dashboard
3. Edit profile (bio, skills, experience, portfolio)
4. Browse open projects (filter by category, search by keyword)
5. Submit applications with proposal and portfolio link

### Design System
- **Theme:** White background, Indigo/Purple accents
- **Style:** Minimal, clean, startup/SaaS aesthetic (Fiverr/Upwork-inspired)
- **Components:** Card-based, rounded corners, soft shadows, subtle hover effects
- **Responsive:** Mobile-first, fully responsive across all breakpoints

## Implementation Notes

### When Adding Features
- Store all data in Context state (projects, applications, user profiles)
- Use mock data files in `src/data/` for initial/seed data
- Simulate async operations with setTimeout if needed for loading states
- All forms should update local state immediately (no API calls)

### UI/UX Requirements
- Include loading skeletons for async-looking operations
- Show empty states when no data exists
- Use toast notifications for user actions (create project, submit application)
- Ensure all interactions have smooth transitions

### Never Implement
- Express/Node backend
- Database connections (Firebase, Supabase, MongoDB, etc.)
- Real authentication servers
- Payment systems
- External API integrations

The goal is a production-quality **frontend demo** that's ready to be connected to a real backend later.
