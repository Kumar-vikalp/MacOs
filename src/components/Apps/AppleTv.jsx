import React, { useState, useEffect, useRef } from 'react';
import { Search, House as Home, Tv, BriefcaseBusiness, Clapperboard, Library, Plus, Play, Pause, Info, ChevronRight, ChevronLeft, Settings, User, Clock, LayoutGrid, MoveHorizontal as MoreHorizontal, Volume2, VolumeX, Maximize2, Download, Users, Box, Monitor, Flame, Trophy, Star, X, SkipBack, SkipForward, RotateCcw, RotateCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useWindowStore from '../../store/windowStore';

// --- MOCK DATA ---
const HERO_CONTENT = [
  {
    id: 1,
    title: "Drishyam 2",
    category: "Thriller, Drama, and Mystery",
    rating: "TV-MA",
    description: "7 years after the case related to Vijay Salgaonkar and his family was closed, a series of unexpected events bring truth to light that threatens to change everything for the Salgaonkars. Can Vijay save his family this time?",
    image: "https://image.tmdb.org/t/p/original/ydgJ44XRS1QkGzBxw4oABzx4Py5.jpg",
    logoText: "Drishyam 2",
    streamUrl: "https://d3sgzbosmwirao.cloudfront.net/video/8552e62f297ae4b896c8cc85393035cc087acb2e9ae5f9d27eca79f1c4848a3f/3/hls/h264_high.m3u8"
  },
  {
    id: 2,
    title: "Guns Akimbo",
    category: "Action, Comedy, Crime, and Thriller",
    rating: "TV-MA",
    description: "An ordinary guy suddenly finds himself forced to fight a gladiator-like battle for a dark website that streams the violence for viewers. In order to survive and rescue his kidnapped ex-girlfriend, he must battle Nix, a heavily armed and much more experienced fighter.",
    image: "https://image.tmdb.org/t/p/original/iWGGde0CZsYixExGm0pjl1QQUlW.jpg",
    logoText: "Guns Akimbo",
    streamUrl: "https://d3sgzbosmwirao.cloudfront.net/video/ba97cca6ec372bc13edbb5f8bdaef53fc7758e01fb232f8618afc4ae34d938d8/4/hls/h264_high.m3u8"
  },
  {
    id: 3,
    title: "Sming",
    category: "Drama, Action, and Horror",
    rating: "TV-PG",
    description: "Pran Boon, or Hunter Boon, saves a child's life by killing a young Sming that attacked him. Little did he know that the young Sming was not the only one in the area. After having witnessed Pran Boon killing her son, mother Sming sets out to Pran Boon's village, seeking revenge that leaves Pran Boon's wife dead and his daughter injured. Knowing he and his daughter would never be safe again until the Sming is dead, Pran Boon begins his hunt for the most dangerous hunter in the jungle with the support of Pran Hlong, an immigrated Chinese hunter who seems unlikely to be an ordinary hunter.",
    image: "https://img10.hotstar.com/image/upload/f_auto,q_auto/sources/r1/cms/prod/4720/1735391404720-i",
    logoText: "Sming",
    streamUrl: "https://d3sgzbosmwirao.cloudfront.net/video/24ab9479de7b692da9bc651792b1cf276b0327340eefc2bd31702d1a9caf669f/3/hls/h264_high.m3u8"
  }
];

const CONTINUE_WATCHING = [
  { 
    id: 101, 
    title: "The Dirty Picture", 
    ep: "Movie", 
    progress: 40, 
    img: "https://image.tmdb.org/t/p/w300/nL7ENp8wcPaurE2SXtAHLnXrmgh.jpg", 
    streamUrl: "https://d3sgzbosmwirao.cloudfront.net/video/76bb5b4de5dcd510b74e3a774bdf34550928abd99629db0010d995b0d5356309/6/hls/h264_high.m3u8" 
  },
  { 
    id: 102, 
    title: "The Dragon Pearl", 
    ep: "Movie", 
    progress: 10, 
    img: "https://image.tmdb.org/t/p/w300/n0715lqGyMNk2WVskbBsBuzrx8o.jpg", 
    streamUrl: "https://d3sgzbosmwirao.cloudfront.net/video/614b242a23d2c2a1b2bfb3fccdbd33c478d47b3512f2919f1fd27c0ce32f395c/6/hls/h264_high.m3u8" 
  },
  { 
    id: 103, 
    title: "Jab We Met", 
    ep: "Movie", 
    progress: 85, 
    img: "https://image.tmdb.org/t/p/w300/A2Qskkk5zb1GetmA2HkIKytGqR5.jpg", 
    streamUrl: "https://d3sgzbosmwirao.cloudfront.net/video/98ea6fc2a3ac77931d9f7ed2674c05ea2c41d6f02805664243478cacf2856e78/8/hls/h264_high.m3u8" 
  },
];

const MUST_WATCH = [
  { 
    id: 201, 
    title: "Arjun Patiala", 
    genre: "Comedy/Action", 
    img: "https://image.tmdb.org/t/p/original/nuPerJWV04xQMQUu9J6K6H4iFCB.jpg", 
    streamUrl: "https://d3s0ximcru5bdx.cloudfront.net/Patiala_19-Full-Mezz_HD-hi-IN-1730959385256/cmaf/H_264/Patiala_19-Full-Mezz_HD-hi-IN/tseries-Arjun_Patiala_19-Full-Mezz_HD-hi-IN.m3u8" 
  },
  { 
    id: 202, 
    title: "Train To Busan", 
    genre: "Horror/Action", 
    img: "https://image.tmdb.org/t/p/original/3H1WFCuxyNRP35oiL2qqwhAXxc0.jpg", 
    streamUrl: "https://d3sgzbosmwirao.cloudfront.net/video/33c589bec0ad581342ed465c158580742c40f53bc5331d744940c038602972ba/1/hls/h264_high.m3u8" 
  },
  { 
    id: 203, 
    title: "Adipurush", 
    genre: "Action/Fantasy", 
    img: "https://image.tmdb.org/t/p/original/1H2xEZOixs0z0JKwyjANZiKNNVJ.jpg", // Note: High-res poster available on TMDB
    streamUrl: "https://d3s0ximcru5bdx.cloudfront.net/ADPSH_TEL_23-Full-Mezz_HD-te-IN-1739338664835/cmaf/H_264/ADPSH_TEL_23-Full-Mezz_HD-te-IN/tseries-TS_ADPSH_TEL_23-Full-Mezz_HD-te-IN.m3u8" 
  },
  { 
    id: 204, 
    title: "Varisu", 
    genre: "Action/Drama", 
    img: "https://image.tmdb.org/t/p/original/iMUIsV6u0pPqfv1j8tGxbJw40sw.jpg", 
    streamUrl: "https://d3sgzbosmwirao.cloudfront.net/video/4105ee407ba8d17611f55665c0f19bbd00710faefb4841a27d58846bfe51904f/2/hls/h264_high.m3u8" 
  },
  { 
    id: 205, 
    title: "Pushpa: The Rise", 
    genre: "Action/Thriller", 
    img: "https://image.tmdb.org/t/p/original/8Wr5u3h5Tk0fNU4NAjFej6kGYle.jpg", 
    streamUrl: "https://d3sgzbosmwirao.cloudfront.net/video/0ec962650fcd8f71169027acfd1508efdfc6aec02638b4de4ad5a30d4bfcfece/2/hls/h264_high.m3u8" 
  },
];

// --- PLAYER COMPONENT ---

const VideoPlayer = ({ url, title, onClose }) => {
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeout = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.4.12/hls.min.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.Hls && window.Hls.isSupported()) {
        const hls = new window.Hls();
        hls.loadSource(url);
        hls.attachMedia(videoRef.current);
        hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
          videoRef.current.play().catch(() => {});
          setIsPlaying(true);
        });
        return () => hls.destroy();
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = url;
      }
    };
  }, [url]);

  const togglePlay = (e) => {
    e?.stopPropagation();
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration;
    setCurrentTime(current);
    setDuration(total);
    setProgress((current / total) * 100);
  };

  const handleSeek = (e) => {
    e.stopPropagation();
    const rect = progressBarRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * videoRef.current.duration;
  };

  const skip = (e, amount) => {
    e.stopPropagation();
    videoRef.current.currentTime += amount;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    videoRef.current.muted = newMuted;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    controlsTimeout.current = setTimeout(() => setShowControls(false), 3000);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden cursor-none"
      style={{ cursor: showControls ? 'default' : 'none' }}
    >
      <video 
        ref={videoRef}
        onTimeUpdate={handleTimeUpdate}
        onClick={togglePlay}
        className="w-full h-full object-contain cursor-pointer"
      />

      <AnimatePresence>
        {showControls && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col justify-between p-8 bg-gradient-to-b from-black/60 via-transparent to-black/80"
            onClick={togglePlay}
          >
            {/* Top Bar */}
            <div className="flex justify-between items-center" onClick={e => e.stopPropagation()}>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors active:scale-90">
                <X size={28} />
              </button>
              <div className="text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-0.5">Now Playing</p>
                <h2 className="text-lg font-bold tracking-tight">{title}</h2>
              </div>
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <Info size={24} />
              </button>
            </div>

            {/* Bottom Controls */}
            <div className="w-full max-w-5xl mx-auto space-y-6" onClick={e => e.stopPropagation()}>
              
              {/* Progress Bar Container */}
              <div className="flex items-center gap-4">
                <span className="text-[13px] font-medium tabular-nums w-10 text-right opacity-80">{formatTime(currentTime)}</span>
                <div 
                  ref={progressBarRef}
                  onClick={handleSeek}
                  className="relative flex-1 h-1.5 bg-white/20 rounded-full cursor-pointer group"
                >
                  <div 
                    className="absolute left-0 top-0 h-full bg-white rounded-full transition-all duration-100 relative"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full scale-0 group-hover:scale-100 transition-transform shadow-xl" />
                  </div>
                </div>
                <span className="text-[13px] font-medium tabular-nums w-10 opacity-60">-{formatTime(duration - currentTime)}</span>
              </div>

              {/* Main Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                   <button onClick={(e) => skip(e, -15)} className="text-white/60 hover:text-white transition-colors p-2 active:scale-90">
                      <RotateCcw size={28} />
                   </button>
                   
                   <button onClick={togglePlay} className="w-16 h-16 flex items-center justify-center bg-white text-black rounded-full hover:scale-105 active:scale-90 transition-all shadow-2xl">
                      {isPlaying ? <Pause fill="black" size={32} /> : <Play fill="black" size={32} className="ml-1" />}
                   </button>
                   
                   <button onClick={(e) => skip(e, 15)} className="text-white/60 hover:text-white transition-colors p-2 active:scale-90">
                      <RotateCw size={28} />
                   </button>
                </div>

                <div className="flex items-center gap-6">
                  {/* Volume Control */}
                  <div className="flex items-center gap-3 group">
                    <button onClick={toggleMute} className="text-white/60 hover:text-white transition-colors p-2">
                      {isMuted || volume === 0 ? <VolumeX size={24} /> : <Volume2 size={24} />}
                    </button>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.01" 
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-24 h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-white"
                      onClick={e => e.stopPropagation()}
                    />
                  </div>
                  
                  <button className="text-white/60 hover:text-white transition-colors p-2"><LayoutGrid size={22} /></button>
                  <button className="text-white/60 hover:text-white transition-colors p-2"><Maximize2 size={22} /></button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- MAIN APP ---

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-2.5 px-2 py-1 rounded-lg transition-colors group relative ${
      active 
      ? 'bg-[#007AFF] text-white shadow-sm' 
      : 'text-[#9ca3af] hover:bg-white/5 hover:text-white'
    }`}
  >
    <Icon size={16} strokeWidth={active ? 2.5 : 2} />
    <span className={`text-[12px] tracking-tight font-medium`}>{label}</span>
  </button>
);

export default function AppleTv({ windowId }) {
  const [activeTab, setActiveTab] = useState('Home');
  const [heroIndex, setHeroIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState(null);
  const scrollRef = useRef(null);
  
  const currentHero = HERO_CONTENT[heroIndex];

  useEffect(() => {
    if (activeVideo) return;
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_CONTENT.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [activeVideo]);

  return (
    <div className="flex h-full w-full bg-black text-white overflow-hidden font-[-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,Helvetica,Arial,sans-serif] select-none p-1">
      
      <AnimatePresence>
        {activeVideo && (
          <VideoPlayer url={activeVideo.streamUrl} title={activeVideo.title} onClose={() => setActiveVideo(null)} />
        )}
      </AnimatePresence>

      <aside className="w-[180px] flex flex-col bg-[#1c1c1c] rounded-2xl border border-white/5 z-50 overflow-hidden shadow-2xl">
        <div className="px-2 pt-2 overflow-y-auto no-scrollbar flex-1">
          <div className="space-y-0.5 mb-6">
            <SidebarItem icon={Search} label="Search" active={activeTab === 'Search'} onClick={() => setActiveTab('Search')} />
            <SidebarItem icon={Home} label="Home" active={activeTab === 'Home'} onClick={() => setActiveTab('Home')} />
            <SidebarItem icon={Tv} label="Apple TV" active={activeTab === 'AppleTV'} onClick={() => setActiveTab('AppleTV')} />
            {/* <SidebarItem icon={Flame} label="Formula 1" active={activeTab === 'F1'} onClick={() => setActiveTab('F1')} /> */}
            {/* <SidebarItem icon={Trophy} label="MLS" active={activeTab === 'MLS'} onClick={() => setActiveTab('MLS')} /> */}
            <SidebarItem icon={BriefcaseBusiness} label="Store" active={activeTab === 'Store'} onClick={() => setActiveTab('Store')} />
          </div>

          <div className="mb-6">
            <p className="px-2 text-[10px] font-bold text-[#555] mb-2 uppercase tracking-wider">Library</p>
            <div className="space-y-0.5">
              <SidebarItem icon={Clock} label="Recently Added" active={activeTab === 'Recent'} onClick={() => setActiveTab('Recent')} />
              <SidebarItem icon={Clapperboard} label="Movies" active={activeTab === 'Movies'} onClick={() => setActiveTab('Movies')} />
              <SidebarItem icon={Monitor} label="TV Shows" active={activeTab === 'Shows'} onClick={() => setActiveTab('Shows')} />
              {/* <SidebarItem icon={Tv} label="4K HDR" active={activeTab === '4K'} onClick={() => setActiveTab('4K')} /> */}
              <SidebarItem icon={Users} label="Family Sharing" active={activeTab === 'Family'} onClick={() => setActiveTab('Family')} />
              {/* <SidebarItem icon={Box} label="Genres" active={activeTab === 'Genres'} onClick={() => setActiveTab('Genres')} /> */}
            </div>
          </div>
        </div>

        <div className="p-2 bg-[#252525]/30 mt-auto border-t border-white/5">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer group">
            <div className="w-6 h-6 rounded-full overflow-hidden border border-white/10 ring-1 ring-white/5">
              <img src="/wallpaper/Vikalp.jpg" alt="Profile" />
            </div>
            <span className="text-[12px] font-medium text-zinc-300 group-hover:text-white transition-colors">Vikalp Kumar</span>
          </div>
        </div>
      </aside>

      <main ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar relative bg-black ml-1 rounded-2xl overflow-hidden border border-white/5">
        
        <div className="relative h-[60vh] w-full bg-[#0a0a0a]">
          <AnimatePresence mode="wait">
            <motion.div 
              key={heroIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <img 
                src={currentHero.image} 
                alt={currentHero.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-[10%] left-6 z-10">
            <motion.h1 
              key={`title-${heroIndex}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-[48px] font-serif font-bold italic mb-2 tracking-tight leading-none drop-shadow-2xl"
            >
              {currentHero.logoText}
            </motion.h1>
            
            <div className="flex items-center gap-2 mb-4 text-[#9ca3af]">
              <div className="w-3 h-3 bg-white/20 rounded-sm flex items-center justify-center">
                 <Tv size={10} className="text-white" />
              </div>
              <span className="text-xs font-medium">{currentHero.category}</span>
              <span className="px-1 border border-white/20 rounded-[2px] text-[9px] font-bold text-white/80">{currentHero.rating}</span>
            </div>

            <motion.p 
              key={`desc-${heroIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-zinc-300 mb-4 max-w-sm leading-relaxed font-medium drop-shadow-md line-clamp-2 min-h-[2.5rem]"
            >
              {currentHero.description}
            </motion.p>

            <div className="flex gap-3 items-center">
              <button 
                onClick={() => setActiveVideo(currentHero)}
                className="flex items-center gap-2 px-6 py-2 bg-white text-black rounded-full font-bold text-sm hover:bg-zinc-200 transition-all shadow-xl active:scale-95"
              >
                <Play fill="black" size={14} />
                Play
              </button>
              <button className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-2xl border border-white/10 flex items-center justify-center hover:bg-white/25 transition-all active:scale-95">
                <Plus size={20} />
              </button>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-1.5">
            {HERO_CONTENT.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setHeroIndex(i)}
                className={`w-1 h-1 rounded-full transition-all duration-300 ${i === heroIndex ? 'bg-white w-3' : 'bg-white/30 hover:bg-white/50'}`} 
              />
            ))}
          </div>
        </div>

        <div className="px-6 py-6 -mt-16 relative z-20 space-y-10 bg-gradient-to-b from-transparent via-black to-black pb-20">
          
          <section>
            <div className="flex items-center gap-1 mb-5 group cursor-pointer w-fit">
              <h3 className="text-[18px] font-bold tracking-tight">Continue Watching</h3>
              <ChevronRight size={18} className="text-[#4b5563] group-hover:translate-x-1 transition-transform" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CONTINUE_WATCHING.map(item => (
                <div key={item.id} className="group cursor-pointer" onClick={() => setActiveVideo(item)}>
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl">
                    <img src={item.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                       {/* <h4 className="text-[24px] font-bold tracking-tight italic mb-1 drop-shadow-md">{item.title}</h4> */}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-[5px] bg-white/10">
                      <div className="h-full bg-white shadow-[0_0_10px_white]" style={{ width: `${item.progress}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-1 mb-5 group cursor-pointer w-fit">
              <h3 className="text-[18px] font-bold tracking-tight">Must-Watch Apple Originals</h3>
              <ChevronRight size={18} className="text-[#4b5563] group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
              {MUST_WATCH.map(item => (
                <div key={item.id} className="flex-shrink-0 w-[150px] group cursor-pointer" onClick={() => setActiveVideo(item)}>
                  <div className="aspect-[2/3] rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 shadow-lg mb-3">
                    <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                  </div>
                  <h4 className="text-[13px] font-bold truncate">{item.title}</h4>
                  <p className="text-[11px] text-zinc-500 font-medium">{item.genre}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        input[type='range']::-webkit-slider-runnable-track {
          height: 4px;
          border-radius: 2px;
          background: rgba(255, 255, 255, 0.2);
        }
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: white;
          margin-top: -4px;
          box-shadow: 0 0 10px rgba(0,0,0,0.5);
        }
      `}} />
    </div>
  );
}