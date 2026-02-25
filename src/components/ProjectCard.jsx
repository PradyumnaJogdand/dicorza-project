const ProjectCard = ({ project, onViewApplications, onApply, showActions = true }) => {
  return (
    <div className="group bg-white rounded-xl shadow-md border-2 border-gray-100 p-6 hover:shadow-2xl hover:border-indigo-200 transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{project.title}</h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
            project.status === 'Open'
              ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white'
              : 'bg-gray-200 text-gray-600'
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
            className="px-3 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 text-xs font-medium rounded-full border border-indigo-100 hover:border-indigo-300 transition-colors"
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
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 font-semibold transition-all duration-300 text-sm shadow-md hover:shadow-lg transform hover:scale-105"
            >
              View Applications →
            </button>
          )}
          {onApply && project.status === 'Open' && (
            <button
              onClick={() => onApply(project)}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 font-semibold transition-all duration-300 text-sm shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Apply Now ✨
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
