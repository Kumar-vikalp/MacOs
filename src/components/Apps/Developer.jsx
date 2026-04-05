import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CircleUserRound as Github, Mail, Code, Users, Award, ExternalLink, Star, Heart, Coffee } from 'lucide-react';

const Developer = () => {
  const [activeTab, setActiveTab] = useState('about');

  const tabs = [
    { id: 'about', label: 'About', icon: Users },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'skills', label: 'Skills', icon: Award },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const projects = [
    {
      name: 'MacOS Simulator',
      description: 'A fully functional macOS desktop environment built with React, featuring window management, dock interactions, and native-like UI components.',
      tech: ['React', 'TypeScript', 'Tailwind', 'Framer Motion'],
      status: 'Active',
      stars: '12',
      link: 'https://github.com/Kumar-vikalp/MacOs'
    },
  ];

  const skills = [
    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind'] },
    { category: 'Backend', items: ['Node.js', 'Go', 'PostgreSQL', 'MongoDB'] },
    { category: 'DevOps', items: ['Docker', 'AWS', 'CI/CD'] }
  ];

  // Animation variants
  const tabVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  const AboutTab = () => (
    <motion.div variants={tabVariants} initial="initial" animate="animate" className="space-y-6">
      <div className="flex flex-col items-center py-4">
        <div className="w-24 h-24 rounded-full bg-linear-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-xl mb-4">
          VK
        </div>
        <h2 className="text-2xl font-semibold text-white">Vikalp Kumar</h2>
        <p className="text-white/50 text-sm">Full Stack Developer & UI/UX Enthusiast</p>
      </div>

      <div className="grid gap-4">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
          <h3 className="text-sm font-medium text-blue-400 mb-2 uppercase tracking-wider">Background</h3>
          <p className="text-white/80 leading-relaxed">
            I'm a passionate developer with over 2 years of experience building scalable web applications.
            I specialize in creating pixel-perfect designs and bringing them to life with clean, efficient code.
          </p>
        </div>
      </div>
    </motion.div>
  );

  const ProjectsTab = () => (
    <motion.div variants={tabVariants} initial="initial" animate="animate" className="space-y-4">
      {projects.map((project) => (
        <div key={project.name} className="group bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors">{project.name}</h3>
              <div className="flex gap-3 mt-1">
                <span className="flex items-center text-[10px] uppercase font-bold tracking-widest text-green-400 bg-green-400/10 px-2 py-0.5 rounded">
                  {project.status}
                </span>
                <span className="flex items-center gap-1 text-white/40 text-xs">
                  <Star size={12} /> {project.stars}
                </span>
              </div>
            </div>
            <a href={project.link} target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors">
              <ExternalLink size={18} />
            </a>
          </div>
          <p className="text-white/60 text-sm mb-4 leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map(t => (
              <span key={t} className="text-[11px] px-2 py-1 bg-black/30 text-white/70 rounded-md border border-white/5">{t}</span>
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  );

  const SkillsTab = () => (
    <motion.div variants={tabVariants} initial="initial" animate="animate" className="grid gap-4">
      {skills.map((group) => (
        <div key={group.category} className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">{group.category}</h3>
          <div className="grid grid-cols-2 gap-2">
            {group.items.map(skill => (
              <div key={skill} className="flex items-center gap-2 p-2 bg-white/5 rounded-xl border border-white/5 text-white/80 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                {skill}
              </div>
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  );

  const ContactTab = () => (
    <motion.div variants={tabVariants} initial="initial" animate="animate" className="space-y-4">
      <div className="grid grid-cols-1 gap-3">
        {/* Email Link */}
        <a
          href="mailto:kumarvikalp48@gmail.com"
          className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-red-500/10 hover:border-red-500/20 transition-all duration-300 group"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20 group-hover:scale-110 transition-transform">
              <Mail size={20} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Email</p>
              <p className="text-white group-hover:text-red-400 transition-colors">kumarvikalp48@gmail.com</p>
            </div>
          </div>
        </a>

        {/* GitHub Link */}
        <a
          href="https://github.com/Kumar-vikalp"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-blue-500/10 hover:border-blue-500/20 transition-all duration-300 group"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Github size={20} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">GitHub</p>
              <p className="text-white group-hover:text-blue-400 transition-colors">@Kumar-vikalp</p>
            </div>
          </div>
        </a>
      </div>

      {/* Refined Footer Section */}
      <div className="pt-10 pb-2 text-center border-t border-white/5 mt-6">
        <div className="flex items-center justify-center gap-2.5 text-white/30 text-sm group cursor-default">
          <span className="font-medium">Made with</span>

          {/* Pulsing Heart */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <Heart size={14} className="text-red-500/70 fill-red-500/10" />
          </motion.div>

          <span className="font-medium">&</span>

          {/* Tilting Coffee */}
          <Coffee
            size={14}
            className="text-amber-700/70 group-hover:rotate-12 transition-transform duration-300"
          />
        </div>

        {/* Professional Metadata Style */}
        <p className="text-[9px] text-white/15 mt-3 uppercase tracking-[0.3em] font-black">
          Passion Project • 2026
        </p>
      </div>
    </motion.div>
  );

  return (
    <div className="h-full flex flex-col bg-[#1c1c1e]/90 backdrop-blur-2xl font-sans rounded-b-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between bg-white/5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-linear-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white">
            VK
          </div>
          <h1 className="text-sm font-medium text-white/90 tracking-tight">Portfolio.app</h1>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-6 pt-2 bg-white/5">
        <div className="flex space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-3 text-xs font-medium transition-all relative ${activeTab === tab.id ? 'text-blue-400' : 'text-white/40 hover:text-white/60'
                }`}
            >
              <tab.icon size={14} />
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        <AnimatePresence mode="wait">
          {activeTab === 'about' && <AboutTab key="about" />}
          {activeTab === 'projects' && <ProjectsTab key="projects" />}
          {activeTab === 'skills' && <SkillsTab key="skills" />}
          {activeTab === 'contact' && <ContactTab key="contact" />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Developer;