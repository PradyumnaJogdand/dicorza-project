const ProjectCard = ({ project, onViewApplications, onApply, showActions = true }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            project.status === 'Open'
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          {project.status}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="font-medium">Category:</span>
          <span>{project.category}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="font-medium">Budget:</span>
          <span>{project.budget}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="font-medium">Deadline:</span>
          <span>{project.deadline}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.skills?.map((skill, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-indigo-50 text-indigo-600 text-xs rounded-md"
          >
            {skill}
          </span>
        ))}
      </div>

      {showActions && (
        <div className="flex gap-2">
          {onViewApplications && (
            <button
              onClick={() => onViewApplications(project)}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors text-sm"
            >
              View Applications
            </button>
          )}
          {onApply && project.status === 'Open' && (
            <button
              onClick={() => onApply(project)}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors text-sm"
            >
              Apply Now
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
