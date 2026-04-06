import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Shuffle, Repeat, Heart, MoveHorizontal as MoreHorizontal, Search, Hop as Home, Music, Radio, Library, Download } from 'lucide-react';
import useMusicStore from '../../store/musicStore';

const AppleMusic = ({ windowId }) => {
  const audioRef = useRef(null);
  const [activeTab, setActiveTab] = useState('browse');
  const [searchQuery, setSearchQuery] = useState('');
  
  const {
    isPlaying,
    currentSong,
    playlist,
    volume,
    progress,
    duration,
    playSong,
    pauseSong,
    togglePlayPause,
    setVolume,
    setProgress,
    setDuration,
    nextSong,
    previousSong,
    seek
  } = useMusicStore();

  // Audio element management
  useEffect(() => {
    if (audioRef.current && currentSong) {
      const audio = audioRef.current;
      
      // Load HLS if available
      if (window.Hls && window.Hls.isSupported()) {
        const hls = new window.Hls();
        hls.loadSource(currentSong.formats[0].url);
        hls.attachMedia(audio);
        hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
          if (isPlaying) {
            audio.play().catch(console.error);
          }
        });
        return () => hls.destroy();
      } else if (audio.canPlayType('application/vnd.apple.mpegurl')) {
        audio.src = currentSong.formats[0].url;
      }
    }
  }, [currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      if (audioRef.current.duration) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleSeek = (e) => {
    if (audioRef.current && duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * duration;
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const sidebarItems = [
    { id: 'browse', label: 'Browse', icon: Home },
    { id: 'radio', label: 'Radio', icon: Radio },
    { id: 'library', label: 'Library', icon: Library },
    { id: 'search', label: 'Search', icon: Search },
  ];

  const SidebarItem = ({ item, active, onClick }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2 text-left rounded-lg transition-all ${
        active 
          ? 'bg-red-500 text-white shadow-lg' 
          : 'text-white/70 hover:text-white hover:bg-white/10'
      }`}
    >
      <item.icon size={18} />
      <span className="text-sm font-medium">{item.label}</span>
    </button>
  );

  const SongRow = ({ song, index, isCurrentSong }) => (
    <motion.div
      className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all ${
        isCurrentSong ? 'bg-red-500/20' : 'hover:bg-white/5'
      }`}
      onClick={() => playSong(song, index)}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
        <img 
          src={song.thumbnail} 
          alt={song.title}
          className="w-full h-full object-cover"
        />
        {isCurrentSong && isPlaying && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className={`text-sm font-medium truncate ${
          isCurrentSong ? 'text-red-400' : 'text-white'
        }`}>
          {song.title}
        </h4>
        <p className="text-xs text-white/60 truncate">
          {song.artists.slice(0, 2).join(', ')}
        </p>
      </div>
      
      <div className="text-xs text-white/40">
        {formatTime(song.duration)}
      </div>
    </motion.div>
  );

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Load HLS.js */}
      <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
      
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-black/30 backdrop-blur-xl border-r border-white/10 flex flex-col">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Music size={18} className="text-white" />
              </div>
              <h1 className="text-xl font-bold">Music</h1>
            </div>
            
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <SidebarItem
                  key={item.id}
                  item={item}
                  active={activeTab === item.id}
                  onClick={() => setActiveTab(item.id)}
                />
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {activeTab === 'browse' && 'Browse'}
                {activeTab === 'library' && 'Your Library'}
                {activeTab === 'search' && 'Search'}
                {activeTab === 'radio' && 'Radio'}
              </h2>
              
              {activeTab === 'search' && (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={16} />
                  <input
                    type="text"
                    placeholder="Search songs, artists, albums..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-red-500"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'browse' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Recently Added</h3>
                <div className="space-y-2">
                  {playlist.map((song, index) => (
                    <SongRow
                      key={song.id}
                      song={song}
                      index={index}
                      isCurrentSong={currentSong?.id === song.id}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'library' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Your Music</h3>
                <div className="space-y-2">
                  {playlist.map((song, index) => (
                    <SongRow
                      key={song.id}
                      song={song}
                      index={index}
                      isCurrentSong={currentSong?.id === song.id}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'search' && (
              <div>
                <p className="text-white/60 text-center py-12">
                  Search for your favorite music
                </p>
              </div>
            )}

            {activeTab === 'radio' && (
              <div>
                <p className="text-white/60 text-center py-12">
                  Radio stations coming soon
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Player Bar */}
      {currentSong && (
        <div className="bg-black/50 backdrop-blur-xl border-t border-white/10 p-4">
          <div className="flex items-center gap-4">
            {/* Song Info */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                <img 
                  src={currentSong.thumbnail} 
                  alt={currentSong.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-medium text-white truncate">
                  {currentSong.title}
                </h4>
                <p className="text-xs text-white/60 truncate">
                  {currentSong.artists.slice(0, 2).join(', ')}
                </p>
              </div>
              <button className="text-white/60 hover:text-white">
                <Heart size={16} />
              </button>
            </div>

            {/* Controls */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="flex items-center gap-4">
                <button className="text-white/60 hover:text-white">
                  <Shuffle size={16} />
                </button>
                <button 
                  onClick={previousSong}
                  className="text-white/60 hover:text-white"
                >
                  <SkipBack size={20} />
                </button>
                <button
                  onClick={togglePlayPause}
                  className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
                </button>
                <button 
                  onClick={nextSong}
                  className="text-white/60 hover:text-white"
                >
                  <SkipForward size={20} />
                </button>
                <button className="text-white/60 hover:text-white">
                  <Repeat size={16} />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center gap-2 w-full max-w-md">
                <span className="text-xs text-white/60 w-10 text-right">
                  {formatTime(progress)}
                </span>
                <div 
                  className="flex-1 h-1 bg-white/20 rounded-full cursor-pointer"
                  onClick={handleSeek}
                >
                  <div 
                    className="h-full bg-white rounded-full transition-all"
                    style={{ width: `${duration ? (progress / duration) * 100 : 0}%` }}
                  />
                </div>
                <span className="text-xs text-white/60 w-10">
                  {formatTime(duration)}
                </span>
              </div>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-2 flex-1 justify-end">
              <button 
                onClick={() => setVolume(volume === 0 ? 1 : 0)}
                className="text-white/60 hover:text-white"
              >
                {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer"
              />
              <button className="text-white/60 hover:text-white">
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Audio Element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration);
          }
        }}
        onEnded={nextSong}
      />
    </div>
  );
};

export default AppleMusic;