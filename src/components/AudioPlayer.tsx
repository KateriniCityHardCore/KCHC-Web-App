import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import { Button, Panel } from 'react95';
import styled from 'styled-components';

// Στυλ για τον Player
const PlayerWrapper = styled(Panel)`
  padding: 10px;
  margin-top: 10px;
  background: #c0c0c0;
`;

const ControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

const SongName = styled.div`
  font-weight: bold;
  font-size: 12px;
  background: #000;
  color: #0f0; /* Πράσινο LED στυλ */
  padding: 5px;
  font-family: 'Courier New', Courier, monospace;
  margin-bottom: 10px;
  border: 1px inset #999;
`;

const PlaylistWrapper = styled.div`
  background: #fff;
  border: 1px inset #999;
  max-height: 80px;
  overflow-y: auto;
  margin-bottom: 10px;
`;

const PlaylistItem = styled.div<{ active: boolean }>`
  padding: 3px 5px;
  font-size: 11px;
  cursor: pointer;
  background: ${props => props.active ? '#000080' : 'transparent'};
  color: ${props => props.active ? '#fff' : '#000'};
  
  &:hover {
    background: ${props => props.active ? '#000080' : '#e0e0e0'};
  }
`;

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

  const formatSongName = (filename: string) => {
    return filename.replace('.mp3', '').replace(/_/g, ' ');
  };

  return (
    <PlayerWrapper variant="well">
      <audio 
        ref={audioRef} 
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
      
      <SongName>
        {isPlaying ? '► ' : '◼ '} {formatSongName(currentSong)} [{formatTime(progress)} / {formatTime(duration)}]
      </SongName>

      {songs.length > 1 && (
        <PlaylistWrapper>
          {songs.map((song, index) => (
            <PlaylistItem 
              key={song} 
              active={index === currentSongIndex}
              onClick={() => {
                setCurrentSongIndex(index);
                setIsPlaying(true);
              }}
            >
              {index + 1}. {formatSongName(song)}
            </PlaylistItem>
          ))}
        </PlaylistWrapper>
      )}

      <ControlsWrapper>
        <Button onClick={togglePlay} size="sm" square>
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        </Button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexGrow: 1 }}>
          <span style={{ fontSize: '11px' }}>Seek:</span>
          <input 
            type="range" 
            min="0" 
            max={duration || 0} 
            value={progress} 
            onChange={onProgressChange}
            style={{ flexGrow: 1, height: '10px' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Volume2 size={14} />
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={volume} 
            onChange={onVolumeChange}
            style={{ width: '50px', height: '10px' }}
          />
        </div>
      </ControlsWrapper>
    </PlayerWrapper>
  );
}

export default AudioPlayer;
