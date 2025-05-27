import React, { useState, useEffect } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
  const [hoveredDot, setHoveredDot] = useState(null);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  // Multiple rotating welcome messages
  const welcomeMessages = [
    "Welcome to UrbanConnect",
    "Smart City Solutions",
    "Digital Governance Platform",
    "Connecting Citizens & Services",
    "Innovation for Better Living"
  ];

  // Auto-cycle through messages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % welcomeMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Icons for the animated skyline dots
  const skylineIcons = [
    { id: 1, icon: '🌐', label: 'Wi-Fi Hotspots' },
    { id: 2, icon: '🚦', label: 'Smart Traffic' },
    { id: 3, icon: '☀', label: 'Solar Energy' },
    { id: 4, icon: '🗑', label: 'Waste Management' },
  ];

  // Governance features
  const governanceFeatures = [
    {
      icon: '📊',
      title: 'Data-Driven Decisions',
      description: 'Real-time analytics for urban planning and resource allocation'
    },
    {
      icon: '🤝',
      title: 'Citizen Engagement',
      description: 'Direct channels for community feedback and participation'
    },
    {
      icon: '⚡',
      title: 'Efficient Services',
      description: 'Streamlined municipal operations with digital workflows'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen text-gray-900 relative overflow-hidden">
      {/* Background with subtle animation */}
      <motion.div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-blue-50/80" />

      {/* Content Container */}
      <div className="relative z-10">
        {/* Unique Welcome Message Panel */}
        

        
  

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    {/* Transforming Governance Section */}
                    <section className="py-12 px-4">
                      <motion.div 
                        className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden border border-white/50"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                      >
                        <div className="grid md:grid-cols-2 gap-0">
                          <div className="p-8 md:p-10 lg:p-12">
                            <motion.h2
                              className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.2 }}
                            >
                              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                                Transforming Urban Governance
                              </span>
                            </motion.h2>
                            
                            <motion.p
                              className="text-lg text-gray-600 mb-8"
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.4 }}
                            >
                              UrbanConnect revolutionizes municipal administration through digital innovation, 
                              creating transparent, efficient, and citizen-centric smart cities.
                            </motion.p>
                            <ul className="space-y-6 mb-10">
                              {governanceFeatures.map((feature, index) => (
                                <motion.li 
                                  key={index}
                                  className="flex items-start bg-white/50 p-4 rounded-xl shadow-sm hover:shadow-md transition-all"
                                  initial={{ opacity: 0, x: -20 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: 0.4 + index * 0.1 }}
                                  whileHover={{ x: 5 }}
                                >
                                  <span className="text-3xl mr-4">{feature.icon}</span>
                                  <div>
                                    <h3 className="font-bold text-gray-700 text-lg">{feature.title}</h3>
                                    <p className="text-gray-600 mt-1">{feature.description}</p>
                                  </div>
                                </motion.li>
                              ))}
                            </ul>
                            
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.8 }}
                            >
                              <Link 
                                to="/services" 
                                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
                              >
                                Explore All Services
                                <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </Link>
                            </motion.div>
                          </div>
                          
                          <div className="hidden md:block relative bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden min-h-[400px]">
                            <motion.div
                              className="absolute inset-0"
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.4 }}
                            >
                              <motion.img
                                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                                alt="Modern cityscape"
                                className="object-cover w-full h-full"
                                initial={{ scale: 1.2 }}
                                animate={{ 
                                  scale: 1.1,
                                  transition: { duration: 10 }
                                }}
                                whileHover={{
                                  scale: 1.15,
                                  transition: { duration: 0.5 }
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent" />
                              <motion.div
                                className="absolute bottom-8 left-8 bg-white/90 px-6 py-3 rounded-xl shadow-xl"
                                initial={{ y: 30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.8, duration: 0.8 }}
                              >
                                <span className="font-semibold text-blue-600">Smart City Solutions</span>
                              </motion.div>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    </section>

                    {/* Your Gateway Section */}
                    <motion.section 
                      className="py-12 px-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="relative">
                        <motion.div 
                          className="bg-white/80 p-8 md:p-12 rounded-3xl shadow-xl backdrop-blur-lg border border-white/30 relative overflow-hidden"
                          initial={{ y: 50, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 }}
                        >
                          {/* Decorative elements */}
                          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-100 rounded-full opacity-10 blur-xl" />
                          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-100 rounded-full opacity-10 blur-xl" />
                          
                          <motion.h2
                            className="text-3xl md:text-5xl font-bold mb-6 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                          >
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                              Your Gateway to Smarter City Living
                            </span>
                          </motion.h2>
                          
                          <motion.p
                            className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto text-center"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                          >
                            Access all municipal services in one convenient platform with seamless integration
                          </motion.p>
                          
                          <motion.div
                            className="flex flex-col sm:flex-row justify-center gap-6"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8 }}
                          >
                            <motion.div
                              whileHover={{ y: -8 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Link
                                to="/services"
                                className="inline-block bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
                              >
                                Explore Services
                              </Link>
                            </motion.div>
                            <motion.div
                              whileHover={{ y: -8 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Link
                                to="/contact"
                                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl border-2 border-blue-600 transition-all"
                              >
                                Get Help
                              </Link>
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      </div>
                    </motion.section>

                    {/* Stats Section */}
                    <motion.section 
                      className="py-12 px-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-10 text-white text-center relative overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl" />
                        
                        <motion.h3
                          className="text-2xl md:text-3xl font-bold mb-8"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 }}
                        >
                          Powering the Cities of Tomorrow
                        </motion.h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
                          {[
                            { value: "75+", label: "Municipal Services", delay: 0.3 },
                            { value: "1M+", label: "Citizens Served", delay: 0.4 },
                            { value: "24/7", label: "Service Availability", delay: 0.5 }
                          ].map((stat, index) => (
                            <motion.div 
                              key={index}
                              className="bg-white/10 p-6 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-colors"
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: stat.delay }}
                              whileHover={{ scale: 1.05 }}
                            >
                              <div className="text-4xl md:text-5xl font-bold mb-3">{stat.value}</div>
                              <div className="text-sm md:text-base opacity-90">{stat.label}</div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.section>
                  </>
                }
              />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;