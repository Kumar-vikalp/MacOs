import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Draggable from 'react-draggable';
import { Resizable } from 're-resizable';
import useWindowStore from '../../store/windowStore';

const Window = ({ window, children }) => {
  const draggableRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updateWindow } = useWindowStore();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case 'w':
            e.preventDefault();
            closeWindow(window.id);
            break;
          case 'm':
            e.preventDefault();
            minimizeWindow(window.id);
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

  const handleDragStart = (e, data) => {
    setIsDragging(true);
  };

  const handleDrag = (e, data) => {
    if (!window.isMaximized && !isResizing) {
      e.preventDefault();
      e.stopPropagation();
      updateWindow(window.id, { x: data.x, y: data.y });
    }
  };

  const handleDragStop = (e, data) => {
    setIsDragging(false);
  };

  const handleResize = (e, direction, ref, delta, position) => {
    updateWindow(window.id, {
      width: ref.offsetWidth,
      height: ref.offsetHeight,
      ...position,
    });
  };

  const handleDoubleClickTitleBar = () => {
    maximizeWindow(window.id);
  };

  const windowStyle = window.isMaximized
    ? { x: 0, y: 24, width: '100vw', height: 'calc(100vh - 24px - 80px)' }
    : { x: window.x, y: window.y, width: window.width, height: window.height };

  return (
    <Draggable
      nodeRef={draggableRef}
      handle=".window-header"
      position={{ x: windowStyle.x, y: windowStyle.y }}
      onStart={handleDragStart}
      onDrag={handleDrag}
      onStop={handleDragStop}
      disabled={window.isMaximized || isResizing}
      cancel=".traffic-lights"
    >
      <motion.div
        ref={draggableRef}
        className="absolute"
        style={{ zIndex: window.zIndex }}
        onClick={handleFocus}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <Resizable
          size={{ width: windowStyle.width, height: windowStyle.height }}
          onResize={handleResize}
          onResizeStart={() => setIsResizing(true)}
          onResizeStop={() => setIsResizing(false)}
          minWidth={window.minWidth}
          minHeight={window.minHeight}
          enable={!window.isMaximized ? {
            top: true,
            right: true,
            bottom: true,
            left: true,
            topRight: true,
            bottomRight: true,
            bottomLeft: true,
            topLeft: true,
          } : false}
          handleStyles={{
            top: { cursor: 'ns-resize', background: 'transparent' },
            right: { cursor: 'ew-resize', background: 'transparent' },
            bottom: { cursor: 'ns-resize', background: 'transparent' },
            left: { cursor: 'ew-resize', background: 'transparent' },
            topRight: { cursor: 'ne-resize', background: 'transparent' },
            bottomRight: {
              bottom: 0,
              right: 0,
              width: 20,
              height: 20,
              cursor: 'se-resize',
              background: 'transparent'
            },
            bottomLeft: { cursor: 'sw-resize', background: 'transparent' },
            topLeft: { cursor: 'nw-resize', background: 'transparent' }
          }}
        >
          <div 
            className="w-full h-full bg-white/95 backdrop-blur-xl rounded-xl overflow-hidden border border-white/20"
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}
          >
            {/* Window Header */}
            <div 
              className="window-header h-8 bg-gradient-to-b from-gray-100/90 to-gray-50/90 flex items-center justify-between px-4 border-b border-gray-200/50 backdrop-blur-sm select-none"
              onDoubleClick={handleDoubleClickTitleBar}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
              {/* Traffic Lights */}
              <div className="traffic-lights flex items-center space-x-2">
                <motion.button
                  onClick={(e) => { e.stopPropagation(); closeWindow(window.id); }}
                  className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors relative group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-red-400 to-red-600" />
                  <div className="absolute inset-0.5 rounded-full bg-gradient-to-b from-red-300 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute inset-0 flex items-center justify-center text-red-900 text-xs opacity-0 group-hover:opacity-100 transition-opacity">×</span>
                </motion.button>
                <motion.button
                  onClick={(e) => { e.stopPropagation(); minimizeWindow(window.id); }}
                  className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors relative group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-yellow-400 to-yellow-600" />
                  <div className="absolute inset-0.5 rounded-full bg-gradient-to-b from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute inset-0 flex items-center justify-center text-yellow-900 text-xs opacity-0 group-hover:opacity-100 transition-opacity">−</span>
                </motion.button>
                <motion.button
                  onClick={(e) => { e.stopPropagation(); maximizeWindow(window.id); }}
                  className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors relative group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-green-400 to-green-600" />
                  <div className="absolute inset-0.5 rounded-full bg-gradient-to-b from-green-300 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute inset-0 flex items-center justify-center text-green-900 text-xs opacity-0 group-hover:opacity-100 transition-opacity">+</span>
                </motion.button>
              </div>
              
              {/* Window Title */}
              <div className="text-sm font-medium text-gray-700 absolute left-1/2 transform -translate-x-1/2 select-none">
                {window.title}
              </div>
              
              <div className="w-16" />
            </div>

            {/* Window Content */}
            <div className="h-full pb-8 overflow-hidden">
              {children}
            </div>
          </div>
        </Resizable>
      </motion.div>
    </Draggable>
  );
};

export default Window;