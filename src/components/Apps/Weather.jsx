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
          'url("https://images.pexels.com/photos/1587010/pexels-photo-1587010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750") center / cover no-repeat', // Changed background to a generic city
      }}
    >
      <div className='grid w-full max-w-xl grid-cols-2 gap-4 mx-auto'>
        {/* Hourly Forecast Card */}
        <LiquidGlassCard
          shadowIntensity='xs'
          borderRadius='8px'
          glowIntensity='none'
          className='col-span-2 p-6 text-white bg-white/8'
          draggable={false} // Disable dragging for this specific card
        >
          <div className='flex justify-between text-sm font-medium'>
            <div className='flex flex-col items-center gap-2'>
              <span>16:00</span>
              <Cloud className='h-6 w-6 fill-white' />
              <span>+32°</span>
            </div>
            <div className='flex flex-col items-center gap-2'>
              <span>17:00</span>
              <Cloud className='h-6 w-6 fill-white' />
              <span>+31°</span>
            </div>
            <div className='flex flex-col items-center gap-2'>
              <span>18:00</span>
              <CloudRain className='h-6 w-6' />
              <span>+29°</span>
            </div>
            <div className='flex flex-col items-center gap-2'>
              <span>19:00</span>
              <CloudRain className='h-6 w-6' />
              <span>+28°</span>
            </div>
            <div className='flex flex-col items-center gap-2'>
              <span>20:00</span>
              <CloudSun className='h-6 w-6 fill-white' />
              <span>+27°</span>
            </div>
            <div className='flex flex-col items-center gap-2'>
              <span>21:00</span>
              <CloudSunRain className='h-6 w-6' />
              <span>+26°</span>
            </div>
          </div>
        </LiquidGlassCard>

        {/* Current Weather Card */}
        <LiquidGlassCard
          shadowIntensity='xs'
          borderRadius='8px'
          glowIntensity='none'
          className='rounded-3xl p-6 text-white bg-white/8 flex flex-col items-start justify-center'
          draggable={false} // Disable dragging for this specific card
        >
          <div className='text-6xl font-semibold'>+30°C</div>
          <div className='text-lg'>Partly Cloudy +30°/+20°</div>
        </LiquidGlassCard>

        {/* Time and Location Card */}
        <LiquidGlassCard
          shadowIntensity='xs'
          borderRadius='8px'
          glowIntensity='none'
          className='rounded-3xl p-6 text-white bg-white/8 flex flex-col items-start justify-center'
          draggable={false} // Disable dragging for this specific card
        >
          <div className='text-6xl font-semibold'>17:32</div>
          <div className='text-lg'>Saturday, April 4</div>
          <button className='mt-4 inline-flex items-center gap-1 rounded-full bg-black/10 backdrop-blur-xl px-2 py-1 text-sm font-medium'>
            <MapPin className='h-4 w-4' />
            Delhi
          </button>
        </LiquidGlassCard>

        {/* Daily Forecast Card */}
        <LiquidGlassCard
          shadowIntensity='xs'
          borderRadius='8px'
          glowIntensity='none'
          className='col-span-2 rounded-3xl bg-white/8 p-6 text-white flex flex-col gap-4'
          draggable={false} // Disable dragging for this specific card
        >
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Sun className='h-6 w-6 fill-white' />
              <span>Sun, 5 Apr</span>
            </div>
            <span className='text-lg'>+33°/+21°</span>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Cloud className='h-6 w-6 fill-white' />
              <span>Mon, 6 Apr</span>
            </div>
            <span className='text-lg'>+32°/+22°</span>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <CloudRain className='h-6 w-6' />
              <span>Tue, 7 Apr</span>
            </div>
            <span className='text-lg'>+28°/+19°</span>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Sun className='h-6 w-6 fill-white' />
              <span>Wed, 8 Apr</span>
            </div>
            <span className='text-lg'>+34°/+23°</span>
          </div>
          <div className='flex items-center gap-2'>
            <CloudRain className='h-6 w-6' />
            <span>Thu, 9 Apr</span>
          </div>
          <span className='text-lg'>+29°/+20°</span>
        </LiquidGlassCard>
      </div>
    </div>
  );
}

export default Weather;
