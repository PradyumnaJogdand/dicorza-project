import { useLocation, useNavigate } from 'react-router-dom';
import { useProjects } from '../context/ProjectContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ApplicationCard from '../components/ApplicationCard';

const ApplicationsView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getApplicationsByProject } = useProjects();

  const project = location.state?.project;
  const applications = project ? getApplicationsByProject(project.id) : [];

  if (!project) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-gray-500 mb-4">Project not found</p>
            <button
              onClick={() => navigate('/brand-dashboard')}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <button
          onClick={() => navigate('/brand-dashboard')}
          className="mb-6 text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M15 19l-7-7 7-7"></path>
          </svg>
          Back to Dashboard
        </button>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h1>
          <p className="text-gray-600 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span>
              <span className="font-medium">Category:</span> {project.category}
            </span>
            <span>
              <span className="font-medium">Budget:</span> {project.budget}
            </span>
            <span>
              <span className="font-medium">Deadline:</span> {project.deadline}
            </span>
            <span>
              <span className="font-medium">Status:</span> {project.status}
            </span>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Applications ({applications.length})
        </h2>

        {applications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-gray-500">No applications received yet for this project.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((application) => (
              <ApplicationCard key={application.id} application={application} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ApplicationsView;
