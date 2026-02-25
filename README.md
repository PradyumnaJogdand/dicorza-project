# Dicorza – Digital Collaboration Platform

A modern, responsive **frontend-only** web application connecting brands with creative talent. Built with React, Vite, Tailwind CSS, and React Router.

## 🎯 Project Overview

Dicorza is a digital collaboration platform that simulates a full-stack experience using mock data and local state management. It features role-based dashboards for both brands and creators.

## ✨ Features

### For Brands
- 📊 Overview dashboard with project statistics
- ✏️ Create and manage projects
- 📝 View and manage creator applications
- 🎯 Track open and closed projects

### For Creators
- 👤 Editable profile with bio, skills, and portfolio
- 🔍 Browse and search projects by category
- 📤 Submit applications with proposals
- 🎨 Showcase skills and experience level

### General
- 🔐 Role-based authentication (simulated)
- 🎨 Modern UI with Indigo/Purple theme
- 📱 Fully responsive design
- ⚡ Fast page transitions
- 🔄 Real-time state management with Context API

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing with protected routes
- **Tailwind CSS v4** - Utility-first styling
- **Context API** - State management
- **Local Storage** - Data persistence

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/      # Reusable UI components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ProjectCard.jsx
│   ├── ApplicationCard.jsx
│   ├── Modal.jsx
│   └── ProtectedRoute.jsx
├── pages/          # Route-level components
│   ├── Landing.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── BrandDashboard.jsx
│   ├── CreatorDashboard.jsx
│   └── ApplicationsView.jsx
├── context/        # React Context providers
│   ├── AuthContext.jsx
│   └── ProjectContext.jsx
├── data/           # Mock data
│   ├── mockProjects.js
│   └── mockUsers.js
├── App.jsx         # Root component with routing
└── main.jsx        # Entry point
```

## 🎨 Design System

- **Theme**: White background with Indigo/Purple accents
- **Style**: Minimal, clean, startup/SaaS aesthetic
- **Components**: Card-based design with rounded corners and soft shadows
- **Typography**: System fonts with clear hierarchy
- **Responsive**: Mobile-first approach

## 🔒 Important Notes

⚠️ **This is a frontend-only application**:
- No backend server or API
- Authentication is simulated
- Data is stored in browser localStorage
- No database integration
- Perfect for demos and academic projects

## 📝 Usage

1. **Landing Page**: Choose to join as a Brand or Creator
2. **Registration**: Create an account with role selection
3. **Brand Flow**:
   - Create projects
   - View applications from creators
   - Manage project status
4. **Creator Flow**:
   - Edit profile and add skills
   - Browse available projects
   - Submit applications with proposals

## 🤝 Contributing

This project was created as an academic demonstration. Feel free to fork and customize for your own use.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ using React, Vite, and Tailwind CSS

Co-Authored-By: Oz <oz-agent@warp.dev>
