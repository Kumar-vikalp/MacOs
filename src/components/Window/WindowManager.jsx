import React from 'react';
import useWindowStore from '../../store/windowStore';
import Window from './Window';

// Import all app components
import Finder from '../Apps/Finder';
import TextEdit from '../Apps/TextEdit';
import Calculator from '../Apps/Calculator';
import Notes from '../Apps/Notes';
import Safari from '../Apps/Safari';
import Launchpad from '../Apps/Launchpad';
import Trash from '../Apps/Trash';
import Calendar from '../Apps/Calendar';
import Photos from '../Apps/Photos';
import Settings from '../Apps/Settings';
import Terminal from '../Apps/Terminal';
import Developer from '../Apps/Developer';
import Weather from '../Apps/Weather'; // New import

const appComponents = {
  Finder,
  TextEdit,
  Calculator,
  Notes,
  Safari,
  Launchpad,
  Trash,
  Calendar,
  Photos,
  Settings,
  Terminal,
  Developer,
  Weather, // New app component
};

const WindowManager = () => {
  const { windows } = useWindowStore();

  return (
    <>
      {windows
        .filter(window => !window.isMinimized)
        .sort((a, b) => a.zIndex - b.zIndex)
        .map((window) => {
          const AppComponent = appComponents[window.component];
          
          return (
            <Window key={window.id} window={window}>
              {AppComponent ? <AppComponent windowId={window.id} /> : <div>App not found</div>}
            </Window>
          );
        })}
    </>
  );
};

export default WindowManager;
