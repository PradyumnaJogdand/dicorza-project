const ApplicationCard = ({ application }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="text-lg font-semibold text-gray-900">{application.creatorName}</h4>
          <p className="text-sm text-gray-500">{application.creatorEmail}</p>
        </div>
        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
          {application.experience}
        </span>
      </div>

      <div className="mb-4">
        <h5 className="text-sm font-medium text-gray-700 mb-2">Proposal:</h5>
        <p className="text-gray-600 text-sm">{application.proposal}</p>
      </div>

      {application.portfolio && (
        <div className="mb-4">
          <h5 className="text-sm font-medium text-gray-700 mb-1">Portfolio:</h5>
          <a
            href={application.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-700 text-sm underline"
          >
            {application.portfolio}
          </a>
        </div>
      )}

      {application.skills && application.skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {application.skills.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-md"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationCard;
