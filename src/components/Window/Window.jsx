import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Resizable } from 're-resizable';
import useWindowStore from '../../store/windowStore';

const Window = ({ window, children, isActive }) => {
  const windowRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [localPos, setLocalPos] = useState({ x: window.x, y: window.y });

  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updateWindow } = useWindowStore();

  // Sync local position with global store position when window.x/y changes
  useEffect(() => {
    setLocalPos({ x: window.x, y: window.y });
  }, [window.x, window.y]);

  // Handle Keyboard Shortcuts (Cmd+W, Cmd+M)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key.toLowerCase()) {
          case 'w':
            e.preventDefault();
            closeWindow(window.id);
            break;
          case 'm':
            e.preventDefault();
            minimizeWindow(window.id);
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [window.id, closeWindow, minimizeWindow]);

  const handleFocus = () => {
    focusWindow(window.id);
  };

  const handleMouseDown = (e) => {
    // Only start drag if not maximized and not clicking on traffic lights
    if (window.isMaximized || e.target.closest('.traffic-lights')) return;

    setIsDragging(true);
    const startX = e.clientX;
    const startY = e.clientY;
    const initialX = localPos.x;
    const initialY = localPos.y;

    const handleMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      let newX = initialX + deltaX;
      let newY = initialY + deltaY;

      // Boundary checks
      const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      // Keep window within viewport, ensuring title bar is always visible
      newX = Math.max(0, Math.min(newX, viewportWidth - window.width));
      newY = Math.max(24, Math.min(newY, viewportHeight - window.height - 80)); // 24px for menubar, 80px for dock

      setLocalPos({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      updateWindow(window.id, { x: localPos.x, y: localPos.y });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleResize = (e, direction, ref, delta, position) => {
    updateWindow(window.id, {
      width: ref.offsetWidth,
      height: ref.offsetHeight,
      ...position,
    });
  };

  const isMaximized = window.isMaximized;

  // Define dynamic styles based on window state
  const containerStyle = {
    zIndex: window.zIndex,
    left: isMaximized ? 0 : localPos.x,
    top: isMaximized ? 24 : localPos.y, // 24px is the standard MenuBar height
  };

  const contentSize = {
    width: isMaximized ? '100vw' : window.width,
    height: isMaximized ? 'calc(100vh - 104px)' : window.height, // Subtract MenuBar (24) + Dock (80)
  };

  return (
    <motion.div
      ref={windowRef}
      className="absolute"
      style={containerStyle}
      onClick={handleFocus}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        // We animate width/height here for smooth maximize transition
        width: contentSize.width,
        height: contentSize.height
      }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
      // Removed framer-motion's drag props
    >
      <Resizable
        size={contentSize}
        onResize={handleResize}
        onResizeStart={() => setIsResizing(true)}
        onResizeStop={() => setIsResizing(false)}
        minWidth={window.minWidth || 300}
        minHeight={window.minHeight || 200}
        enable={!isMaximized ? {
          top: true, right: true, bottom: true, left: true,
          topRight: true, bottomRight: true, bottomLeft: true, topLeft: true
        } : false}
        handleStyles={{
          bottomRight: { bottom: 0, right: 0, width: 15, height: 15, cursor: 'se-resize' }
        }}
      >
        <div 
          className="w-full h-full bg-white/95 backdrop-blur-xl rounded-xl overflow-hidden border border-white/20 flex flex-col"
          style={{
            boxShadow: isActive 
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              : '0 15px 30px -8px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Window Header */}
          <div 
            className={`window-header h-8 flex items-center justify-between px-4 border-b select-none shrink-0 ${
              isActive 
                ? 'bg-gradient-to-b from-gray-50/98 to-gray-100/98 border-gray-200/70' 
                : 'bg-gradient-to-b from-gray-100/90 to-gray-200/90 border-gray-300/50'
            }`}
            onDoubleClick={() => maximizeWindow(window.id)}
            onMouseDown={handleMouseDown} // Re-added native mouse down for dragging
            style={{ 
              cursor: isMaximized ? 'default' : (isDragging ? 'grabbing' : 'grab'),
              backdropFilter: isActive ? 'blur(25px)' : 'blur(15px)',
              WebkitBackdropFilter: isActive ? 'blur(25px)' : 'blur(15px)'
            }}
          >
            {/* Traffic Lights */}
            <div className={`traffic-lights flex items-center space-x-2 z-50 transition-all duration-200 ${
              !isActive ? 'grayscale opacity-50' : ''
            }`}>
              <button
                onClick={(e) => { e.stopPropagation(); closeWindow(window.id); }}
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-all duration-200 relative group overflow-hidden"
                style={{ cursor: 'pointer' }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-red-400 to-red-600 shadow-sm" />
                <span className="absolute inset-0 flex items-center justify-center text-[8px] text-red-900 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-150">×</span>
              </button>
              
              <button
                onClick={(e) => { e.stopPropagation(); minimizeWindow(window.id); }}
                className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-all duration-200 relative group overflow-hidden"
                style={{ cursor: 'pointer' }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-yellow-400 to-yellow-600 shadow-sm" />
                <span className="absolute inset-0 flex items-center justify-center text-[8px] text-yellow-900 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-150">−</span>
              </button>
              
              <button
                onClick={(e) => { e.stopPropagation(); maximizeWindow(window.id); }}
                className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-all duration-200 relative group overflow-hidden"
                style={{ cursor: 'pointer' }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-green-400 to-green-600 shadow-sm" />
                <span className="absolute inset-0 flex items-center justify-center text-[8px] text-green-900 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-150">+</span>
              </button>
            </div>
            
            {/* Window Title */}
            <div className={`text-[13px] font-semibold absolute left-1/2 transform -translate-x-1/2 pointer-events-none tracking-tight ${
              isActive ? 'text-gray-800' : 'text-gray-600'
            }`}>
              {window.title}
            </div>
            
            {/* Spacer for layout balance */}
            <div className="w-12" />
          </div>

          {/* Window Content Area */}
          <div className="flex-1 overflow-auto relative">
            {children}
          </div>
        </div>
      </Resizable>
    </motion.div>
  );
};

export default Window;
