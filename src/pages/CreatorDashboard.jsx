import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProjects } from '../context/ProjectContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import Modal from '../components/Modal';

const CreatorDashboard = () => {
  const { user, updateProfile } = useAuth();
  const { getOpenProjects, applyToProject } = useProjects();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const [profileData, setProfileData] = useState({
    bio: user?.bio || '',
    skills: user?.skills?.join(', ') || '',
    experience: user?.experience || 'Beginner',
    portfolio: user?.portfolio || '',
  });

  const [applicationData, setApplicationData] = useState({
    proposal: '',
    portfolio: user?.portfolio || '',
  });

  const openProjects = getOpenProjects();
  const filteredProjects = openProjects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || project.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateProfile({
      ...profileData,
      skills: profileData.skills.split(',').map((s) => s.trim()),
    });
    setIsEditingProfile(false);
  };

  const handleApply = (project) => {
    setSelectedProject(project);
    setIsApplyModalOpen(true);
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    applyToProject(selectedProject.id, {
      creatorId: user.id,
      creatorName: user.name,
      creatorEmail: user.email,
      skills: user.skills || [],
      experience: user.experience || 'Beginner',
      ...applicationData,
    });
    setIsApplyModalOpen(false);
    setApplicationData({ proposal: '', portfolio: user?.portfolio || '' });
    setSelectedProject(null);
  };

  const categories = ['Web Design', 'Mobile Design', 'Graphic Design', 'Content Creation', 'Photography', 'Video Editing'];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Creator Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}!</p>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">My Profile</h2>
            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-colors"
            >
              {isEditingProfile ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {isEditingProfile ? (
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills (comma-separated)
                </label>
                <input
                  type="text"
                  value={profileData.skills}
                  onChange={(e) => setProfileData({ ...profileData, skills: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                  <select
                    value={profileData.experience}
                    onChange={(e) => setProfileData({ ...profileData, experience: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio Link</label>
                  <input
                    type="url"
                    value={profileData.portfolio}
                    onChange={(e) => setProfileData({ ...profileData, portfolio: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors"
              >
                Save Changes
              </button>
            </form>
          ) : (
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Bio</h4>
                <p className="text-gray-900">{user?.bio || 'No bio added yet'}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {user?.skills && user.skills.length > 0 ? (
                    user.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">No skills added yet</span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Experience</h4>
                  <p className="text-gray-900">{user?.experience || 'Not specified'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Portfolio</h4>
                  {user?.portfolio ? (
                    <a
                      href={user.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline"
                    >
                      View Portfolio
                    </a>
                  ) : (
                    <p className="text-gray-500">No portfolio link</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Browse Projects Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Browse Projects</h2>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-gray-500">No projects found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onApply={handleApply} />
            ))}
          </div>
        )}
      </div>

      {/* Apply Modal */}
      <Modal isOpen={isApplyModalOpen} onClose={() => setIsApplyModalOpen(false)} title="Apply to Project">
        <div className="mb-4">
          <h3 className="font-semibold text-gray-900">{selectedProject?.title}</h3>
          <p className="text-sm text-gray-600">{selectedProject?.brandName}</p>
        </div>

        <form onSubmit={handleSubmitApplication} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Proposal</label>
            <textarea
              value={applicationData.proposal}
              onChange={(e) => setApplicationData({ ...applicationData, proposal: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              rows="6"
              placeholder="Explain why you're a great fit for this project..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio Link (optional)</label>
            <input
              type="url"
              value={applicationData.portfolio}
              onChange={(e) => setApplicationData({ ...applicationData, portfolio: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsApplyModalOpen(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors"
            >
              Submit Application
            </button>
          </div>
        </form>
      </Modal>

      <Footer />
    </div>
  );
};

export default CreatorDashboard;
