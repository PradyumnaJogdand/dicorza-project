import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Landing = () => {
  const features = [
    {
      title: 'For Brands',
      description: 'Post projects, find talented creators, and manage applications all in one place.',
      icon: '🎯',
    },
    {
      title: 'For Creators',
      description: 'Browse exciting projects, showcase your portfolio, and connect with brands.',
      icon: '✨',
    },
    {
      title: 'Easy Collaboration',
      description: 'Streamlined communication and project management for successful outcomes.',
      icon: '🤝',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="flex-1 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Connect Brands with
              <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Creative Talent
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              The digital collaboration platform that brings brands and creators together to build
              amazing projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register?role=brand"
                className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
              >
                Join as Brand
              </Link>
              <Link
                to="/register?role=creator"
                className="px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
              >
                Join as Creator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Dicorza?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of brands and creators collaborating on Dicorza
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-4 bg-white text-indigo-600 rounded-lg hover:bg-gray-50 font-semibold text-lg transition-colors shadow-lg"
          >
            Create Your Account
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
