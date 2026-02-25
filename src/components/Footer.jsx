const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
              Dicorza
            </h3>
            <p className="text-gray-600 text-sm">
              Connect brands with creative talent. Build amazing projects together.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">For Brands</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Post Projects</li>
              <li>Find Talent</li>
              <li>Manage Applications</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">For Creators</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Browse Projects</li>
              <li>Build Portfolio</li>
              <li>Submit Proposals</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-500">
          © 2026 Dicorza. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
