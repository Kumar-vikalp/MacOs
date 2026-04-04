import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaVolumeUp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function LastPlayedCard() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    // Set initial volume
    audio.volume = volume;

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [volume]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Audio playback failed:', error);
    }
  };

  const handleProgressClick = (e) => {
    if (!audioRef.current || !duration) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <motion.div 
      className="w-full max-w-lg mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main Card */}
      <div className="glassmorphism rounded-2xl p-4 border border-white/20 backdrop-blur-xl bg-white/10 hover:bg-white/15 transition-all duration-300 shadow-2xl">
        <div className="flex items-center gap-4">
          {/* Album Art */}
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src="/icons/SpotifyThree.jpg"
              alt="DIE WITH SMILE cover"
              className="w-16 h-16 object-cover rounded-xl shadow-lg"
            />
            {isPlaying && (
              <motion.div
                className="absolute inset-0 rounded-xl bg-black/20 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </motion.div>
            )}
          </motion.div>

          {/* Track Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <img 
                src="/icons/spotify.jpg" 
                className="w-4 h-4 rounded-full" 
                alt="Spotify"
              />
              <span className="text-green-400 text-xs font-medium">Last played</span>
            </div>
            <h3 className="text-white font-semibold text-sm truncate">
              DIE WITH SMILE
            </h3>
            <p className="text-white/60 text-xs truncate">
              by D'Mile, Andrew Watt, and James Fauntleroy
            </p>
          </div>

          {/* Play Button */}
          <motion.button
            onClick={togglePlay}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200 backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? (
              <FaPause className="text-white text-sm" />
            ) : (
              <FaPlay className="text-white text-sm ml-0.5" />
            )}
          </motion.button>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 space-y-2">
          <div 
            className="w-full h-1 bg-white/20 rounded-full cursor-pointer overflow-hidden"
            onClick={handleProgressClick}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
              style={{ width: `${progressPercentage}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          
          {/* Time Display */}
          <div className="flex justify-between items-center text-xs text-white/60">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="mt-3 flex items-center gap-2">
          <FaVolumeUp className="text-white/60 text-xs" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer slider"
          />
        </div>
      </div>

      {/* Audio Element */}
      <audio 
        ref={audioRef} 
        src="/music/DIE.mp3"
        preload="metadata"
      />

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </motion.div>
  );
}