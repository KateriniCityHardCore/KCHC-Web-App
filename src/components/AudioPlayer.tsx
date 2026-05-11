import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Music, Volume2 } from 'lucide-react';
import './AudioPlayer.css';

interface Props {
  songs: string[];
}

export function AudioPlayer({ songs }: Props) {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1); // 0 to 1

  
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentSong = songs[currentSongIndex];
  const audioUrl = `/audio/${currentSong}`;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSongIndex, audioUrl]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const onProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setProgress(value);
    }
  };

  const onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = value;
      setVolume(value);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Clean filename for display (remove .mp3 and underscores)
  const formatSongName = (filename: string) => {
    return filename.replace('.mp3', '').replace(/_/g, ' ');
  };

  return (
    <div className="audio-player glass-panel animate-fade-in">
      <audio 
        ref={audioRef} 
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
      
      <div className="player-header">
        <Music className="music-icon" />
        <div className="song-info">
          <h4 className="song-title">{formatSongName(currentSong)}</h4>
          <p className="song-subtitle">Local Track</p>
        </div>
      </div>

      {songs.length > 1 && (
        <div className="playlist">
          {songs.map((song, index) => (
            <button 
              key={song} 
              className={`playlist-item ${index === currentSongIndex ? 'active' : ''}`}
              onClick={() => {
                setCurrentSongIndex(index);
                setIsPlaying(true);
              }}
            >
              {formatSongName(song)}
            </button>
          ))}
        </div>
      )}

      <div className="controls">
        <button className="play-btn" onClick={togglePlay}>
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        <div className="progress-container">
          <span className="time">{formatTime(progress)}</span>
          <input 
            type="range" 
            min="0" 
            max={duration || 0} 
            value={progress} 
            onChange={onProgressChange}
            className="progress-bar"
          />
          <span className="time">{formatTime(duration)}</span>
        </div>

        <div className="volume-container">
          <Volume2 size={18} className="volume-icon" />
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={volume} 
            onChange={onVolumeChange}
            className="volume-bar"
          />
        </div>
      </div>
    </div>
  );
}
