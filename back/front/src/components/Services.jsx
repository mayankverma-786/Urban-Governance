import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      icon: '📝',
      title: 'Property Tax Payment',
      description: 'Pay your property taxes online with multiple payment options',
      link: '/tax-payment'
    },
    {
      icon: '🏗️',
      title: 'Building Permits',
      description: 'Apply for new construction or renovation permits',
      link: '/permits'
    },
    {
      icon: '🚮',
      title: 'Waste Management',
      description: 'Schedule garbage collection and report missed pickups',
      link: '/waste'
    },
    {
      icon: '🚧',
      title: 'Road Maintenance',
      description: 'Report potholes and road damage in your area',
      link: '/roads'
    },
    {
      icon: '💧',
      title: 'Water Services',
      description: 'Pay bills and request water connection/disconnection',
      link: '/water'
    },
    {
      icon: '🌳',
      title: 'Parks & Recreation',
      description: 'Book community centers and park facilities',
      link: '/parks'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-5">
          <span className="text-indigo-600">City</span> Services
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover all the municipal services available to enhance your community experience
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <div 
            key={index}
            className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-indigo-200 transform hover:-translate-y-1"
          >
            <div className="flex justify-center mb-5">
              <div className="bg-indigo-100 p-4 rounded-full group-hover:bg-indigo-200 transition-colors duration-300">
                <span className="text-2xl text-indigo-600">{service.icon}</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">
              {service.title}
            </h3>
            <p className="text-gray-500 text-center mb-6">
              {service.description}
            </p>
            <div className="text-center">
              <Link
                to={service.link}
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 shadow-md hover:shadow-indigo-200"
              >
                Access Service
                <svg className="ml-2 w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto mt-20 bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-2xl shadow-xl">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white sm:text-3xl mb-4">
            Need personalized assistance?
          </h3>
          <p className="text-indigo-100 max-w-2xl mx-auto mb-6 text-lg">
            Our dedicated support team is ready to guide you through any municipal service
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-3 text-base font-medium rounded-full text-indigo-600 bg-white hover:bg-gray-50 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Contact Our Team
            <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;