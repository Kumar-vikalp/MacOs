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
      className="space-y-6 text-white/80" // Adjusted text color
    >
      <div className="text-center">
        <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
          VK
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Vikalp Kumar</h1> {/* Adjusted text color */}
        <p className="text-white/60 mb-4">Full Stack Developer & UI/UX Enthusiast</p> {/* Adjusted text color */}
        <div className="flex justify-center space-x-4">
          <motion.a
            href="https://github.com/Kumar-Vikalp"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors" // Adjusted button style
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={16} />
            <span>GitHub</span>
          </motion.a>
        </div>
      </div>

      <div className="bg-white/5 rounded-xl p-6 border border-white/10"> {/* Adjusted card style */}
        <h3 className="text-lg font-semibold text-white mb-3">About Me</h3> {/* Adjusted text color */}
        <p className="text-white/70 leading-relaxed mb-4"> {/* Adjusted text color */}
          I'm a passionate full-stack developer with over 2 years of experience building scalable web applications
          and user interfaces. I love creating pixel-perfect designs and bringing them to life with clean,
          efficient code.
        </p>
        <p className="text-white/70 leading-relaxed"> {/* Adjusted text color */}
          When I'm not coding, you can find me exploring new technologies, contributing to open source projects,
          or enjoying a good cup of coffee while reading about the latest in tech.
        </p>
      </div>
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
          className="bg-white/5 border border-white/10 rounded-xl p-6 hover:shadow-lg transition-shadow text-white/80" // Adjusted card style
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold text-white">{project.name}</h3> {/* Adjusted text color */}
              <div className="flex items-center space-x-4 mt-1">
                <span className={`px-2 py-1 text-xs rounded-full ${project.status === 'Active' ? 'bg-green-500/20 text-green-300' : // Adjusted status badge colors
                  project.status === 'Beta' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-blue-500/20 text-blue-300'
                  }`}>
                  {project.status}
                </span>
                <div className="flex items-center space-x-1 text-white/60"> {/* Adjusted text color */}
                  <Star size={14} />
                  <span className="text-sm">{project.stars}</span>
                </div>
              </div>
            </div>
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-white/40 hover:text-white/60 transition-colors" // Adjusted button style
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <GitBranch size={16} />
            </motion.a>
          </div>

          <p className="text-white/70 mb-4">{project.description}</p> {/* Adjusted text color */}

          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded-md" // Adjusted tech badge style
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
          className="bg-white/5 border border-white/10 rounded-xl p-6" // Adjusted card style
        >
          <h3 className="text-lg font-semibold text-white mb-4">{skillGroup.category}</h3> {/* Adjusted text color */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {skillGroup.items.map((skill) => (
              <motion.div
                key={skill}
                className="flex items-center space-x-2 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors" // Adjusted skill item style
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-white/80">{skill}</span> {/* Adjusted text color */}
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
        <h3 className="text-xl font-semibold text-white mb-2">Let's Connect!</h3> {/* Adjusted text color */}
        <p className="text-white/70 mb-6"> {/* Adjusted text color */}
          I'm always open to discussing new opportunities and interesting projects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.a
          href="mailto:Kumar-vikalp@example.com"
          className="flex items-center space-x-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-colors" // Adjusted card style
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
            <Mail size={20} className="text-white" />
          </div>
          <div>
            <div className="font-medium text-white">Email</div> {/* Adjusted text color */}
            <div className="text-sm text-white/70">kumarvikalp48@gmail.com</div> {/* Adjusted text color */}
          </div>
        </motion.a>

        <motion.a
          href="https://github.com/Kumar-vikalp"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-3 p-4 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-colors" // Adjusted card style
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
            <Github size={20} className="text-white" />
          </div>
          <div>
            <div className="font-medium text-white">GitHub</div> {/* Adjusted text color */}
            <div className="text-sm text-white/70">@Kumar-vikalp</div> {/* Adjusted text color */}
          </div>
        </motion.a>
      </div>

      <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <span className="text-white/60">Made with</span> {/* Adjusted text color */}
          <Heart size={16} className="text-red-500" />
          <span className="text-white/60">and lots of</span> {/* Adjusted text color */}
          <Coffee size={16} className="text-brown-500" />
        </div>
        <p className="text-sm text-white/50"> {/* Adjusted text color */}
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
    <div className="h-full flex flex-col bg-neutral-800/95 backdrop-blur-xl font-system rounded-b-xl overflow-hidden"> {/* Adjusted main container style */}
      {/* Header */}
      <div className="bg-neutral-800/50 border-b border-white/10 px-6 py-4"> {/* Adjusted header style */}
        <div className="flex items-center space-x-4">
          <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
            LS
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">Developer Portfolio</h1> {/* Adjusted text color */}
            <p className="text-sm text-white/60">Full Stack Developer & UI/UX Enthusiast</p> {/* Adjusted text color */}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-neutral-800/50 border-b border-white/10 px-6"> {/* Adjusted tabs container style */}
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-3 border-b-2 transition-colors ${activeTab === tab.id
                ? 'border-blue-500 text-blue-400' // Adjusted active tab color
                : 'border-transparent text-white/60 hover:text-white/80' // Adjusted inactive tab color
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
