import React from 'react';
import { X } from 'lucide-react';
import useDesktopStore from '../../store/desktopStore';

const WallpaperModal = () => {
  const { wallpapers, setWallpaper, toggleWallpaperModal } = useDesktopStore();

  const handleWallpaperSelect = (wallpaper) => {
    setWallpaper(wallpaper);
    toggleWallpaperModal();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="glassmorphism rounded-xl p-6 max-w-2xl w-full mx-4 text-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Choose Wallpaper</h2>
          <button
            onClick={toggleWallpaperModal}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {wallpapers.map((wallpaper, index) => (
            <button
              key={index}
              onClick={() => handleWallpaperSelect(wallpaper)}
              className="aspect-video rounded-lg overflow-hidden hover:scale-105 transition-transform"
            >
              <img
                src={wallpaper}
                alt={`Wallpaper ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WallpaperModal;