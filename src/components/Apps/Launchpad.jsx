import React from 'react';
import { X } from 'lucide-react';
import useWindowStore from '../../store/windowStore';

const Launchpad = ({ windowId }) => {
  const { openWindow, closeWindow } = useWindowStore();

  const apps = [
    { id: 'finder', name: 'Finder', icon: '🗂️', component: 'Finder' },
    { id: 'safari', name: 'Safari', icon: '🧭', component: 'Safari' },
    { id: 'notes', name: 'Notes', icon: '📝', component: 'Notes' },
    { id: 'calculator', name: 'Calculator', icon: '🧮', component: 'Calculator' },
    { id: 'textedit', name: 'TextEdit', icon: '📄', component: 'TextEdit' },
    { id: 'calendar', name: 'Calendar', icon: '📅', component: 'Calendar' },
    { id: 'photos', name: 'Photos', icon: '🖼️', component: 'Photos' },
    { id: 'music', name: 'Music', icon: '🎵', component: 'Music' },
    { id: 'mail', name: 'Mail', icon: '✉️', component: 'Mail' },
    { id: 'maps', name: 'Maps', icon: '🗺️', component: 'Maps' },
    { id: 'weather', name: 'Weather', icon: '🌤️', component: 'Weather' },
    { id: 'clock', name: 'Clock', icon: '⏰', component: 'Clock' },
  ];

  const handleAppClick = (app) => {
    if (['finder', 'safari', 'notes', 'calculator', 'textedit'].includes(app.id)) {
      openWindow(app.id, app.name, app.component);
      closeWindow(windowId);
    } else {
      alert(`${app.name} is not implemented yet!`);
    }
  };

  const handleClose = () => {
    closeWindow(windowId);
  };

  return (
    <div className="h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
      >
        <X size={24} className="text-white" />
      </button>

      {/* Apps Grid */}
      <div className="h-full flex items-center justify-center p-8">
        <div className="grid grid-cols-6 gap-8 max-w-4xl">
          {apps.map((app) => (
            <div
              key={app.id}
              onClick={() => handleAppClick(app)}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-3xl mb-2 group-hover:scale-110 transition-transform duration-200 group-hover:bg-white/20">
                {app.icon}
              </div>
              <span className="text-white text-sm text-center">{app.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Page Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <div className="w-2 h-2 bg-white rounded-full"></div>
        <div className="w-2 h-2 bg-white/50 rounded-full"></div>
      </div>
    </div>
  );
};

export default Launchpad;