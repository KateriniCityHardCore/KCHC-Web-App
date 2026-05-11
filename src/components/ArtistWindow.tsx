import { useRef } from 'react';
import styled from 'styled-components';
import { Window, WindowHeader, WindowContent, Button } from 'react95';
import { Play, Music, Radio, Tv, MonitorPlay } from 'lucide-react';
import Draggable from 'react-draggable';
import type { Artist } from '../types';
import { AudioPlayer } from './AudioPlayer';

// Στυλ για το παράθυρο
const DraggableWrapper = styled.div`
  position: absolute;
  top: 50px;
  left: 50px;
  z-index: 10;
`;

const StyledWindow = styled(Window)`
  width: 450px;
  max-width: 90vw;
  
  /* Προσθήκη σκιάς για εφέ βάθους */
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border: 2px solid #000;
  margin-right: 15px;
  object-fit: cover;
`;

const FlexContainer = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

const SocialLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
`;

const SocialBtn = styled(Button)`
  display: flex;
  align-items: center;
  gap: 5px;
`;

interface ArtistWindowProps {
  artist: Artist;
  onClose: () => void;
}

export function ArtistWindow({ artist, onClose }: ArtistWindowProps) {
  const imageUrl = `/images/${artist.PhotoPath}`;
  const nodeRef = useRef(null);

  const getSpotifyEmbedUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      return `https://open.spotify.com/embed${pathname}?utm_source=generator&theme=0`;
    } catch (e) {
      return url;
    }
  };

  return (
    <Draggable nodeRef={nodeRef} handle=".window-header">
      <DraggableWrapper ref={nodeRef}>
        <StyledWindow>
          <WindowHeader 
            className="window-header" 
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'move' }}
          >
            <span>{artist.Name}.exe</span>
            <Button onClick={onClose} size="sm" square>
              <span style={{ fontWeight: 'bold', transform: 'translateY(-1px)' }}>x</span>
            </Button>
          </WindowHeader>
      <WindowContent>
        <FlexContainer>
          <ProfileImage src={imageUrl} alt={artist.Name} />
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>{artist.Name}</h2>
            <p style={{ fontSize: '14px' }}>{artist.Description}</p>
            {artist.IsABand && (
              <span style={{ 
                fontSize: '12px', 
                background: '#ccc', 
                padding: '2px 5px', 
                border: '1px solid #999', 
                marginTop: '5px', 
                display: 'inline-block' 
              }}>
                Μπάντα
              </span>
            )}
          </div>
        </FlexContainer>

        {artist.ExtraDescription && (
          <div style={{ marginTop: '10px', fontSize: '14px', background: '#fff', padding: '10px', border: '1px inset #999' }}>
            <h3 style={{ fontWeight: 'bold', marginBottom: '5px' }}>Περισσότερα:</h3>
            <p style={{ whiteSpace: 'pre-wrap' }}>{artist.ExtraDescription}</p>
          </div>
        )}

        {artist.Songs && artist.Songs.length > 0 && (
          <div style={{ marginTop: '15px' }}>
            <h3 style={{ fontWeight: 'bold', marginBottom: '5px' }}>Κομμάτια:</h3>
            <AudioPlayer songs={artist.Songs} />
          </div>
        )}

        {artist.SpotifyAccountUrl && (
          <div style={{ marginTop: '15px' }}>
            <iframe 
              style={{ borderRadius: '0px', border: '1px inset #999' }} 
              src={getSpotifyEmbedUrl(artist.SpotifyAccountUrl)} 
              width="100%" 
              height="80" 
              frameBorder="0" 
              allowFullScreen={true} 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
            ></iframe>
          </div>
        )}

        <SocialLinks>
          {artist.YoutubeAccountUrl && (
            <SocialBtn as="a" href={artist.YoutubeAccountUrl} target="_blank" rel="noopener noreferrer">
              <Play size={16} /> YouTube
            </SocialBtn>
          )}
          {artist.SpotifyAccountUrl && (
            <SocialBtn as="a" href={artist.SpotifyAccountUrl} target="_blank" rel="noopener noreferrer">
              <Music size={16} /> Spotify
            </SocialBtn>
          )}
          {artist.BandCampAccountUrl && (
            <SocialBtn as="a" href={artist.BandCampAccountUrl} target="_blank" rel="noopener noreferrer">
              <Radio size={16} /> Bandcamp
            </SocialBtn>
          )}
          {artist.SoundcloudAccountUrl && (
            <SocialBtn as="a" href={artist.SoundcloudAccountUrl} target="_blank" rel="noopener noreferrer">
              <Music size={16} /> SoundCloud
            </SocialBtn>
          )}
          {artist.TwitchAccountUrl && (
            <SocialBtn as="a" href={artist.TwitchAccountUrl} target="_blank" rel="noopener noreferrer">
              <MonitorPlay size={16} /> Twitch
            </SocialBtn>
          )}
          {artist.TrovoAccountUrl && (
            <SocialBtn as="a" href={artist.TrovoAccountUrl} target="_blank" rel="noopener noreferrer">
              <Tv size={16} /> Trovo
            </SocialBtn>
          )}
        </SocialLinks>
      </WindowContent>
        </StyledWindow>
      </DraggableWrapper>
    </Draggable>
  );
}

export default ArtistWindow;
