import { useState } from 'react';
import styled from 'styled-components';
import { Window, WindowHeader, WindowContent, Button, ScrollView } from 'react95';
import { Rnd } from 'react-rnd';
import type { Artist } from '../types';

interface ImageWindowProps {
  artist: Artist;
  imageUrl: string;
  onClose: () => void;
  onFocus: () => void;
  isActive: boolean;
}

// Στυλ για το wrapper που επιτρέπει το σύρσιμο (αποφυγή findDOMNode error)
const StyledWindow = styled(Window)`
  width: 100%;
  height: 100%;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
`;

const ImageContent = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
  border: 2px solid #000; /* Κλασικό περίγραμμα */
`;

export function ImageWindow({ artist, imageUrl, onClose, onFocus, isActive }: ImageWindowProps) {
  // Παραγωγή τυχαίας θέσης κατά το mount του παραθύρου
  const [initialPosition] = useState(() => {
    const maxWidth = window.innerWidth > 400 ? window.innerWidth - 350 : 10;
    const maxHeight = window.innerHeight > 400 ? window.innerHeight - 350 : 10;
    return {
      x: Math.floor(Math.random() * maxWidth) + 50,
      y: Math.floor(Math.random() * maxHeight) + 50,
    };
  });

  return (
    <Rnd
      default={{
        x: initialPosition.x,
        y: initialPosition.y,
        width: 300,
        height: 300,
      }}
      dragHandleClassName="window-header"
      enableResizing={{ bottomRight: true }}
      resizeHandleStyles={{
        bottomRight: {
          width: '20px',
          height: '20px',
          bottom: '0px',
          right: '0px',
          zIndex: 100,
        }
      }}
      bounds="parent"
      style={{ zIndex: isActive ? 100 : 20 }}
    >
      <StyledWindow resizable onMouseDown={onFocus}>
          <WindowHeader 
            className="window-header" 
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'move' }}
          >
            <span>{artist.Name}.jpg</span>
            <Button onClick={onClose} size="sm" square>
              <span style={{ fontWeight: 'bold', transform: 'translateY(-1px)' }}>x</span>
            </Button>
          </WindowHeader>
          <WindowContent style={{ padding: 0, backgroundColor: '#c6c6c6', height: 'calc(100% - 35px)' }}>
            <ScrollView style={{ width: '100%', height: '100%' }}>
              <div style={{ padding: '4px' }}>
                <ImageContent src={imageUrl} alt={artist.Name} />
              </div>
            </ScrollView>
          </WindowContent>
        </StyledWindow>
    </Rnd>
  );
}

export default ImageWindow;
