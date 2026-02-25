import { createContext, useContext, useState, useEffect } from 'react';
import { mockProjects } from '../data/mockProjects';

const ProjectContext = createContext();

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Load projects from localStorage or use mock data
    const storedProjects = localStorage.getItem('dicorza_projects');
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    } else {
      setProjects(mockProjects);
      localStorage.setItem('dicorza_projects', JSON.stringify(mockProjects));
    }

    // Load applications from localStorage
    const storedApplications = localStorage.getItem('dicorza_applications');
    if (storedApplications) {
      setApplications(JSON.parse(storedApplications));
    }
  }, []);

  const createProject = (projectData) => {
    const newProject = {
      ...projectData,
      id: Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      status: 'Open',
    };
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    localStorage.setItem('dicorza_projects', JSON.stringify(updatedProjects));
    return newProject;
  };

  const updateProject = (projectId, updates) => {
    const updatedProjects = projects.map((project) =>
      project.id === projectId ? { ...project, ...updates } : project
    );
    setProjects(updatedProjects);
    localStorage.setItem('dicorza_projects', JSON.stringify(updatedProjects));
  };

  const deleteProject = (projectId) => {
    const updatedProjects = projects.filter((project) => project.id !== projectId);
    setProjects(updatedProjects);
    localStorage.setItem('dicorza_projects', JSON.stringify(updatedProjects));
  };

  const applyToProject = (projectId, applicationData) => {
    const newApplication = {
      ...applicationData,
      id: Date.now(),
      projectId,
      createdAt: new Date().toISOString(),
    };
    const updatedApplications = [...applications, newApplication];
    setApplications(updatedApplications);
    localStorage.setItem('dicorza_applications', JSON.stringify(updatedApplications));
    return newApplication;
  };

  const getApplicationsByProject = (projectId) => {
    return applications.filter((app) => app.projectId === projectId);
  };

  const getProjectsByBrand = (brandId) => {
    return projects.filter((project) => project.brandId === brandId);
  };

  const getOpenProjects = () => {
    return projects.filter((project) => project.status === 'Open');
  };

  const value = {
    projects,
    applications,
    createProject,
    updateProject,
    deleteProject,
    applyToProject,
    getApplicationsByProject,
    getProjectsByBrand,
    getOpenProjects,
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};
