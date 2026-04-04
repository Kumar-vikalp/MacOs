import React, { useState, useRef } from 'react'; // Added useRef
import Draggable from 'react-draggable';
import { HardDrive, Folder, Trash2 } from 'lucide-react';
import useDesktopStore from '../../store/desktopStore';

const DesktopIcon = ({ icon, onDoubleClick }) => {
  const [isDragging, setIsDragging] = useState(false);
  const { updateIconPosition } = useDesktopStore();
  
  // 1. Create a reference to the DOM node
  const nodeRef = useRef(null);

  const getIcon = () => {
    switch (icon.type) {
      case 'drive':
        return <HardDrive size={48} className="text-gray-600" />;
      case 'folder':
        return <Folder size={48} className="text-blue-500" />;
      case 'trash':
        return <Trash2 size={48} className="text-gray-600" />;
      default:
        return <Folder size={48} className="text-blue-500" />;
    }
  };

  const handleDrag = (e, data) => {
    setIsDragging(true);
  };

  const handleStop = (e, data) => {
    setIsDragging(false);
    updateIconPosition(icon.id, data.x, data.y);
  };

  const handleDoubleClick = (e) => {
    e.preventDefault();
    if (!isDragging) {
      onDoubleClick();
    }
  };

  return (
    <Draggable
      nodeRef={nodeRef} // 2. Pass the ref to Draggable
      position={{ x: icon.x, y: icon.y }}
      onDrag={handleDrag}
      onStop={handleStop}
      bounds="parent"
    >
      <div
        ref={nodeRef} // 3. Attach the same ref to the root element of the draggable content
        className="absolute desktop-icon w-20 select-none"
        onDoubleClick={handleDoubleClick}
      >
        <div className="flex flex-col items-center">
          {getIcon()}
          <span className="text-white text-xs mt-1 text-center text-shadow-sm bg-black/20 px-1 rounded">
            {icon.name}
          </span>
        </div>
      </div>
    </Draggable>
  );
};

export default DesktopIcon;