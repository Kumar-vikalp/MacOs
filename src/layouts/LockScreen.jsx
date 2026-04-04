import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function LockScreen({ goNext }) {
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [time, setTime] = useState(new Date());
  const [wallpaper, setWallpaper] = useState(() => 
    localStorage.getItem("lockscreen_wallpaper") || "/wallpaper/sana'sKitty.jpg"
  );

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    // Listen for wallpaper changes from other components
    const syncWallpaper = () => {
      setWallpaper(localStorage.getItem("lockscreen_wallpaper"));
    };
    window.addEventListener("storage", syncWallpaper); // Listen for storage events
    return () => {
      clearInterval(timer);
      window.removeEventListener("storage", syncWallpaper);
    };
  }, []);

  const handleUnlock = () => {
    setIsUnlocking(true);
    setTimeout(goNext, 500);
  };

  return (
    <motion.div 
      className="relative w-full h-full flex flex-col items-center justify-center"
      initial={{ y: 0 }}
      animate={{ y: isUnlocking ? "-100%" : 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      onClick={handleUnlock}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-500" 
        style={{ backgroundImage: `url(${wallpaper})` }}
      />
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
      
      <div className="relative z-10 text-center">
        <h1 className="text-8xl font-light tracking-tighter">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
        </h1>
        <p className="text-xl font-medium mt-2">
          {time.toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>
      
      <div className="absolute bottom-20 flex flex-col items-center">
         <div className="w-16 h-16 rounded-full border-2 border-white/50 overflow-hidden mb-4 shadow-xl">
            <img src="/wallpaper/Vikalp.jpg" alt="User" className="w-full h-full object-cover" />
         </div>
         <p className="font-semibold text-lg">Kumar Vikalp</p>
         <p className="text-sm opacity-70 mt-8">Click to unlock</p>
      </div>
    </motion.div>
  );
}
