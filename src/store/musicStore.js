import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useMusicStore = create(
  persist(
    (set, get) => ({
      isPlaying: false,
      currentSong: null,
      playlist: [
        {
          id: "o2TiOMOu",
          title: "Dhurandhar - Title Track",
          album: "Dhurandhar",
          duration: 155,
          channel: "",
          release_year: 2025,
          thumbnail: "https://c.saavncdn.com/475/Dhurandhar-Hindi-2025-20260203083204-500x500.jpg",
          view_count: 21182274,
          language: "hindi",
          webpage_url: "https://www.jiosaavn.com/song/dhurandhar-title-track/H1o-WDt9eEY",
          artists: [
            "Hanumankind",
            "Jasmine Sandlas",
            "Babu Singh Maan",
            "Shashwat Sachdev",
            "Sudhir Yaduvanshi",
            "Charanjit Ahuja",
            "Muhammad Sadiq",
            "Ranjit Kaur"
          ],
          formats: [
            {
              url: "https://ac.cf.saavncdn.com/475/d17530d821c3c948ffbbad38a8cd2f08_320.mp4?Expires=1775484590&Signature=ZAEER6LrbZjgfwI8t8Nym2YnTrEYRXNtEDQYNfvZ6RUEGBwfid-AE9aos8Fmjd3UlyaOMWatdo8r-AJgsKepuKsfe5tn77alFD6gve-YBql4Itr39gu2A85Vh6EuEC2XSzTzX7Im2-IAdDt1jHfF5-Bc2psT5sQTGKB2qztikcgfatGVSwzxgkJhGApZdIeIuE9nCHPfdRCsGT0G8oBElYhVOmPLfbN1Sa92S10l~1hMAZR~vpvAlXie6KK1Z5WFnJb56Du~PckWwec45sPmxDaG69BLjztZ5p9OP-8TkNqnmxbcG72WiHfHRs0RzowBaLyCLC7hjXzZPcYrXTBJ7Q__&Key-Pair-Id=APKAJB334VX63D3WJ5ZQ",
              ext: "m4a",
              format_id: "320",
              bitrate: 320,
              quality: "320kbps"
            }
          ]
        }
      ],
      volume: 1,
      progress: 0,
      duration: 0,
      currentIndex: 0,

      playSong: (song, index = 0) => {
        set({ 
          isPlaying: true, 
          currentSong: song,
          currentIndex: index 
        });
      },

      pauseSong: () => {
        set({ isPlaying: false });
      },

      togglePlayPause: () => {
        set(state => ({ isPlaying: !state.isPlaying }));
      },

      setVolume: (volume) => {
        set({ volume: Math.max(0, Math.min(1, volume)) });
      },

      setProgress: (progress) => {
        set({ progress });
      },

      setDuration: (duration) => {
        set({ duration });
      },

      seek: (time) => {
        set({ progress: time });
      },

      addSongToPlaylist: (song) => {
        set(state => ({
          playlist: [...state.playlist, song]
        }));
      },

      setCurrentSong: (song) => {
        set({ currentSong: song });
      },

      nextSong: () => {
        const { playlist, currentIndex } = get();
        const nextIndex = (currentIndex + 1) % playlist.length;
        const nextSong = playlist[nextIndex];
        set({ 
          currentSong: nextSong, 
          currentIndex: nextIndex,
          progress: 0 
        });
      },

      previousSong: () => {
        const { playlist, currentIndex } = get();
        const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
        const prevSong = playlist[prevIndex];
        set({ 
          currentSong: prevSong, 
          currentIndex: prevIndex,
          progress: 0 
        });
      },

      stopSong: () => {
        set({ 
          isPlaying: false, 
          currentSong: null, 
          progress: 0 
        });
      }
    }),
    {
      name: 'macos-music',
    }
  )
);

export default useMusicStore;