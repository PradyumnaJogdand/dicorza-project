import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProjects } from '../context/ProjectContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import Modal from '../components/Modal';

const BrandDashboard = () => {
  const { user } = useAuth();
  const { projects, createProject, getProjectsByBrand, getApplicationsByProject } = useProjects();
  const navigate = useNavigate();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    category: '',
    skills: '',
    deadline: '',
    budget: '',
  });

  const userProjects = getProjectsByBrand(user?.id) || [];
  const totalProjects = userProjects.length;
  const openProjects = userProjects.filter((p) => p.status === 'Open').length;
  const totalApplications = userProjects.reduce(
    (sum, project) => sum + getApplicationsByProject(project.id).length,
    0
  );

  const handleCreateProject = (e) => {
    e.preventDefault();
    const projectData = {
      ...newProject,
      brandId: user.id,
      brandName: user.name,
      skills: newProject.skills.split(',').map((s) => s.trim()),
    };
    createProject(projectData);
    setIsCreateModalOpen(false);
    setNewProject({
      title: '',
      description: '',
      category: '',
      skills: '',
      deadline: '',
      budget: '',
    });
  };

  const handleViewApplications = (project) => {
    navigate(`/brand-dashboard/applications/${project.id}`, { state: { project } });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Brand Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}!</p>
        </div>

        {/* Overview Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Total Projects</h3>
            <p className="text-3xl font-bold text-gray-900">{totalProjects}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Open Projects</h3>
            <p className="text-3xl font-bold text-green-600">{openProjects}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Applications Received</h3>
            <p className="text-3xl font-bold text-indigo-600">{totalApplications}</p>
          </div>
        </div>

        {/* Create Project Button */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">My Projects</h2>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold transition-colors"
          >
            + Create Project
          </button>
        </div>

        {/* Projects List */}
        {userProjects.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-gray-500 mb-4">You haven't created any projects yet.</p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors"
            >
              Create Your First Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onViewApplications={handleViewApplications}
              />
            ))}
          </div>
        )}
      </div>

      {/* Create Project Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Project"
      >
        <form onSubmit={handleCreateProject} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
            <input
              type="text"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              rows="4"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={newProject.category}
              onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            >
              <option value="">Select a category</option>
              <option value="Web Design">Web Design</option>
              <option value="Mobile Design">Mobile Design</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="Content Creation">Content Creation</option>
              <option value="Photography">Photography</option>
              <option value="Video Editing">Video Editing</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skills Required (comma-separated)
            </label>
            <input
              type="text"
              value={newProject.skills}
              onChange={(e) => setNewProject({ ...newProject, skills: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="e.g. UI/UX Design, Figma, Prototyping"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
              <input
                type="date"
                value={newProject.deadline}
                onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
              <input
                type="text"
                value={newProject.budget}
                onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="e.g. $1,000 - $2,000"
                required
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors"
            >
              Create Project
            </button>
          </div>
        </form>
      </Modal>

      <Footer />
    </div>
  );
};

export default BrandDashboard;
