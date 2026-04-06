import React from 'react';
import { LiquidGlassCard } from "../ui/liquid-weather-glass";
import {
  Cloud,
  CloudSun,
  CloudRain,
  Sun,
  MapPin,
  CloudSunRain,
} from 'lucide-react';

const Weather = ({ windowId }) => {
  return (
    <div
      className='p-8 w-full h-full gap-8 py-16 rounded-xl overflow-auto'
      style={{
        background:
          'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%), url("https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750") center / cover no-repeat',
      }}
    >
      <div className='grid w-full max-w-2xl grid-cols-2 gap-6 mx-auto'>
        {/* Hourly Forecast Card */}
        <LiquidGlassCard
          shadowIntensity='xs'
          borderRadius='8px'
          glowIntensity='none'
          className='col-span-2 p-6 text-white bg-white/15 backdrop-blur-xl border border-white/20'
          draggable={false} // Disable dragging for this specific card
        >
          <h3 className='text-lg font-semibold mb-4 text-white/90'>Hourly Forecast</h3>
          <div className='flex justify-between text-sm font-medium text-white/90'>
            <div className='flex flex-col items-center gap-2'>
              <span>16:00</span>
              <Cloud className='h-6 w-6 fill-white/80' />
              <span>+32°</span>
            </div>
            <div className='flex flex-col items-center gap-2'>
              <span>17:00</span>
              <Cloud className='h-6 w-6 fill-white/80' />
              <span>+31°</span>
            </div>
            <div className='flex flex-col items-center gap-2'>
              <span>18:00</span>
              <CloudRain className='h-6 w-6 text-white/80' />
              <span>+29°</span>
            </div>
            <div className='flex flex-col items-center gap-2'>
              <span>19:00</span>
              <CloudRain className='h-6 w-6 text-white/80' />
              <span>+28°</span>
            </div>
            <div className='flex flex-col items-center gap-2'>
              <span>20:00</span>
              <CloudSun className='h-6 w-6 fill-white/80' />
              <span>+27°</span>
            </div>
            <div className='flex flex-col items-center gap-2'>
              <span>21:00</span>
              <CloudSunRain className='h-6 w-6 text-white/80' />
              <span>+26°</span>
            </div>
          </div>
        </LiquidGlassCard>

        {/* Current Weather Card */}
        <LiquidGlassCard
          shadowIntensity='xs'
          borderRadius='8px'
          glowIntensity='none'
          className='rounded-3xl p-6 text-white bg-white/15 backdrop-blur-xl border border-white/20 flex flex-col items-start justify-center'
          draggable={false} // Disable dragging for this specific card
        >
          <div className='text-6xl font-light text-white/95 mb-2'>30°</div>
          <div className='text-lg text-white/80 font-medium'>Partly Cloudy</div>
          <div className='text-sm text-white/60 mt-1'>H:30° L:20°</div>
        </LiquidGlassCard>

        {/* Time and Location Card */}
        <LiquidGlassCard
          shadowIntensity='xs'
          borderRadius='8px'
          glowIntensity='none'
          className='rounded-3xl p-6 text-white bg-white/15 backdrop-blur-xl border border-white/20 flex flex-col items-start justify-center'
          draggable={false} // Disable dragging for this specific card
        >
          <div className='text-5xl font-light text-white/95 mb-2'>17:32</div>
          <div className='text-lg text-white/80 font-medium mb-3'>Saturday, April 4</div>
          <button className='inline-flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-xl px-3 py-1.5 text-sm font-medium text-white/90 hover:bg-white/30 transition-colors'>
            <MapPin className='h-4 w-4' />
            <span>Delhi, India</span>
          </button>
        </LiquidGlassCard>

        {/* Daily Forecast Card */}
        <LiquidGlassCard
          shadowIntensity='xs'
          borderRadius='8px'
          glowIntensity='none'
          className='col-span-2 rounded-3xl bg-white/15 backdrop-blur-xl border border-white/20 p-6 text-white flex flex-col gap-4'
          draggable={false} // Disable dragging for this specific card
        >
          <h3 className='text-lg font-semibold mb-2 text-white/90'>7-Day Forecast</h3>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Sun className='h-5 w-5 fill-white/80' />
              <span className='text-white/90 font-medium'>Sun, 5 Apr</span>
            </div>
            <span className='text-lg font-medium text-white/95'>33°/21°</span>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Cloud className='h-5 w-5 fill-white/80' />
              <span className='text-white/90 font-medium'>Mon, 6 Apr</span>
            </div>
            <span className='text-lg font-medium text-white/95'>32°/22°</span>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <CloudRain className='h-5 w-5 text-white/80' />
              <span className='text-white/90 font-medium'>Tue, 7 Apr</span>
            </div>
            <span className='text-lg font-medium text-white/95'>28°/19°</span>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Sun className='h-5 w-5 fill-white/80' />
              <span className='text-white/90 font-medium'>Wed, 8 Apr</span>
            </div>
            <span className='text-lg font-medium text-white/95'>34°/23°</span>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <CloudRain className='h-5 w-5 text-white/80' />
              <span className='text-white/90 font-medium'>Thu, 9 Apr</span>
            </div>
            <span className='text-lg font-medium text-white/95'>29°/20°</span>
          </div>
        </LiquidGlassCard>
      </div>
    </div>
  );
}

export default Weather;
