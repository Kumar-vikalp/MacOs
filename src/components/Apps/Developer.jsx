import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitFork as Github, Globe, Mail, Code, Coffee, Heart, Star, GitBranch, Users, Award } from 'lucide-react';

const Developer = ({ windowId }) => {
  const [activeTab, setActiveTab] = useState('about');

  const tabs = [
    { id: 'about', label: 'About', icon: Users },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'skills', label: 'Skills', icon: Award },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const projects = [
    {
      name: 'MacOS',
      description: 'A fully functional macOS desktop environment built with React, featuring window management, dock interactions, and native-like UI components.',
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Zustand'],
      status: 'Active',
      stars: '0.0',
      link: 'https://github.com/Kumar-vikalp/MacOs'
    },
  ];

  const skills = [
    { category: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'Vue.js', 'Tailwind CSS', 'Framer Motion'] },
    { category: 'Backend', items: ['Node.js', 'Python', 'Go', 'PostgreSQL', 'MongoDB', 'Redis'] },
    { category: 'DevOps', items: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform', 'Monitoring'] },
    { category: 'Mobile', items: ['React Native', 'Flutter', 'iOS', 'Android', 'Cross-platform'] }
  ];

  const AboutTab = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">          VK
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Vikalp Kumar</h1>
        <p className="text-gray-600 mb-4">Full Stack Developer & UI/UX Enthusiast</p>
        <div className="flex justify-center space-x-4">
          <motion.a
            href="https://github.com/Kumar-Vikalp"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={16} />
            <span>GitHub</span>
          </motion.a>
          {/* <motion.a
            href="https://Kumar-vikalp.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Globe size={16} />
            <span>Portfolio</span>
          </motion.a> */}
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">About Me</h3>
        <p className="text-gray-600 leading-relaxed mb-4">
          I'm a passionate full-stack developer with over 2 years of experience building scalable web applications
          and user interfaces. I love creating pixel-perfect designs and bringing them to life with clean,
          efficient code.
        </p>
        <p className="text-gray-600 leading-relaxed">
          When I'm not coding, you can find me exploring new technologies, contributing to open source projects,
          or enjoying a good cup of coffee while reading about the latest in tech.
        </p>
      </div>

      {/* <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">50+</div>
          <div className="text-sm text-gray-600">Projects</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">5+</div>
          <div className="text-sm text-gray-600">Years Exp</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">3.4k</div>
          <div className="text-sm text-gray-600">GitHub Stars</div>
        </div>
      </div> */}
    </motion.div>
  );

  const ProjectsTab = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {projects.map((project, index) => (
        <motion.div
          key={project.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
              <div className="flex items-center space-x-4 mt-1">
                <span className={`px-2 py-1 text-xs rounded-full ${project.status === 'Active' ? 'bg-green-100 text-green-800' :
                  project.status === 'Beta' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                  {project.status}
                </span>
                <div className="flex items-center space-x-1 text-gray-500">
                  <Star size={14} />
                  <span className="text-sm">{project.stars}</span>
                </div>
              </div>
            </div>
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <GitBranch size={16} />
            </motion.a>
          </div>

          <p className="text-gray-600 mb-4">{project.description}</p>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );

  const SkillsTab = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {skills.map((skillGroup, index) => (
        <motion.div
          key={skillGroup.category}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white border border-gray-200 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{skillGroup.category}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {skillGroup.items.map((skill) => (
              <motion.div
                key={skill}
                className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700">{skill}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );

  const ContactTab = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Let's Connect!</h3>
        <p className="text-gray-600 mb-6">
          I'm always open to discussing new opportunities and interesting projects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.a
          href="mailto:Kumar-vikalp@example.com"
          className="flex items-center space-x-3 p-4 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
            <Mail size={20} className="text-white" />
          </div>
          <div>
            <div className="font-medium text-gray-800">Email</div>
            <div className="text-sm text-gray-600">kumarvikalp48@gmail.com</div>
          </div>
        </motion.a>

        <motion.a
          href="https://github.com/Kumar-vikalp"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-3 p-4 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
            <Github size={20} className="text-white" />
          </div>
          <div>
            <div className="font-medium text-gray-800">GitHub</div>
            <div className="text-sm text-gray-600">@Kumar-vikalp</div>
          </div>
        </motion.a>

        {/* <motion.a
          href="https://Kumar-vikalp.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <Globe size={20} className="text-white" />
          </div>
          <div>
            <div className="font-medium text-gray-800">Portfolio</div>
            <div className="text-sm text-gray-600">Kumar-vikalp.dev</div>
          </div>
        </motion.a> */}

        {/* <motion.div
          className="flex items-center space-x-3 p-4 bg-purple-50 border border-purple-200 rounded-xl"
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
            <Coffee size={20} className="text-white" />
          </div>
          <div>
            <div className="font-medium text-gray-800">Coffee Chat</div>
            <div className="text-sm text-gray-600">Always up for a good discussion</div>
          </div>
        </motion.div> */}
      </div>

      <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">        <div className="flex items-center justify-center space-x-2 mb-2">
        <span className="text-gray-600">Made with</span>
        <Heart size={16} className="text-red-500" />
        <span className="text-gray-600">and lots of</span>
        <Coffee size={16} className="text-brown-500" />
      </div>
        <p className="text-sm text-gray-500">
          This macOS simulator is a passion project showcasing modern web technologies
        </p>
      </div>
    </motion.div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'about': return <AboutTab />;
      case 'projects': return <ProjectsTab />;
      case 'skills': return <SkillsTab />;
      case 'contact': return <ContactTab />;
      default: return <AboutTab />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 font-system">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-4">
          <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">            LS
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-800">Developer Portfolio</h1>
            <p className="text-sm text-gray-500">Full Stack Developer & UI/UX Enthusiast</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-3 border-b-2 transition-colors ${activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              <tab.icon size={16} />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Developer;
