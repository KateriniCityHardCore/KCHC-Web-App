import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { AppBar, Toolbar, Button, TextInput, MenuList, MenuListItem } from 'react95';
import artistsData from '../data/artists.json';
import type { Artist } from '../types';
import { FolderIcon } from './FolderIcon';
import { ArtistWindow } from './ArtistWindow';
import { ImageWindow } from './ImageWindow';

// Στυλ για την επιφάνεια εργασίας
const DesktopWrapper = styled.div`
  background-color: #008080; /* Το κλασικό πετρόλ των Windows 95 */
  min-height: 100vh;
  position: relative;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(100px, 1fr));
  gap: 20px;
  align-content: start;
  overflow: hidden; /* Αποφυγή οριζόντιας κύλισης που αποκαλύπτει το μαύρο φόντο */
`;

const GlobalDesktopStyle = createGlobalStyle`
  body {
    background-color: #008080 !important;
  }

  /* Στυλ για τη μπάρα κύλισης του browser */
  ::-webkit-scrollbar {
    width: 16px;
    background-color: #dfe0e3;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #c0c0c0;
    border: 2px solid;
    border-color: #ffffff #808080 #808080 #ffffff;
    box-shadow: inset 1px 1px 0px #ffffff, inset -1px -1px 0px #000000;
  }

  ::-webkit-scrollbar-track {
    background-color: #dfe0e3;
    /* Μοτίβο σκάκι για το track */
    background-image: linear-gradient(45deg, #efefef 25%, transparent 25%, transparent 75%, #efefef 75%, #efefef), 
                      linear-gradient(45deg, #efefef 25%, transparent 25%, transparent 75%, #efefef 75%, #efefef);
    background-size: 2px 2px;
    background-position: 0 0, 1px 1px;
  }

  ::-webkit-scrollbar-button {
    background-color: #c0c0c0;
    border: 2px solid;
    border-color: #ffffff #808080 #808080 #ffffff;
  }
`;

export function Desktop() {
  const { name } = useParams<{ name?: string }>();
  const navigate = useNavigate();
  const artists = artistsData as Artist[];

  // Κατάσταση για τα ανοιχτά παράθυρα
  const [openWindows, setOpenWindows] = useState<string[]>([]);

  // Κατάσταση για τα ανοιχτά παράθυρα εικόνων
  const [openImageWindows, setOpenImageWindows] = useState<string[]>([]);

  // Κατάσταση για το ποιο παράθυρο είναι ενεργό (focused)
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);

  // Κατάσταση για το Start Menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Κατάσταση για το Shutdown
  const [isShutDown, setIsShutDown] = useState(false);

  // Κατάσταση για την αναζήτηση
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArtists = artists.filter(artist =>
    artist.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Έλεγχος αν υπάρχει καλλιτέχνης στο URL
  useEffect(() => {
    if (name) {
      const decodedName = decodeURIComponent(name);
      if (!openWindows.includes(decodedName)) {
        setOpenWindows(prev => [...prev, decodedName]);
      }
      setActiveWindowId(`artist-${decodedName}`);
    }
  }, [name]);

  // Ήχος εκκίνησης Windows 95
  useEffect(() => {
    const audio = new Audio('https://www.orangefreesounds.com/wp-content/uploads/2014/09/Windows-95-startup-sound.mp3');

    const playSound = () => {
      audio.play().catch(() => {
        console.log('Autoplay blocked. Waiting for user interaction.');
        // Αν ο browser μπλοκάρει το autoplay, περιμένουμε το πρώτο κλικ στην οθόνη
        const handleFirstClick = () => {
          audio.play();
          document.removeEventListener('click', handleFirstClick);
        };
        document.addEventListener('click', handleFirstClick);
      });
    };

    playSound();

    return () => {
      audio.pause();
    };
  }, []);

  const handleCloseWindow = (artistName: string) => {
    setOpenWindows(prev => prev.filter(w => w !== artistName));
    if (name && decodeURIComponent(name) === artistName) {
      navigate('/');
    }
  };

  const handleOpenWindow = (artistName: string) => {
    if (!openWindows.includes(artistName)) {
      setOpenWindows(prev => [...prev, artistName]);
    }
    setActiveWindowId(`artist-${artistName}`);
    navigate(`/artist/${encodeURIComponent(artistName)}`);
  };

  const handleOpenImage = (artistName: string) => {
    if (!openImageWindows.includes(artistName)) {
      setOpenImageWindows(prev => [...prev, artistName]);
    }
    setActiveWindowId(`image-${artistName}`);
  };

  const handleFocus = (id: string, artistName: string) => {
    setActiveWindowId(id);
    navigate(`/artist/${encodeURIComponent(artistName)}`);
  };

  const handleShutdown = () => {
    setIsMenuOpen(false);
    setIsShutDown(true);
    
    // Σταμάτημα όλων των ήχων που παίζουν (π.χ. από το AudioPlayer)
    document.querySelectorAll('audio').forEach(el => el.pause());
    
    // Χρήση του ίδιου ήχου ως placeholder για τον τερματισμό
    const audio = new Audio('https://www.orangefreesounds.com/wp-content/uploads/2014/09/Windows-95-startup-sound.mp3');
    audio.play().catch(() => console.log('Autoplay blocked'));
  };

  const handleCloseImage = (artistName: string) => {
    setOpenImageWindows(prev => prev.filter(w => w !== artistName));
  };

  return (
    <>
      <GlobalDesktopStyle />
      <DesktopWrapper onClick={() => setIsMenuOpen(false)}>
        {/* Εικονίδια για κάθε καλλιτέχνη */}
        {filteredArtists.map(artist => (
          <FolderIcon
            key={`icon-${artist.Name}`}
            name={artist.Name}
            onClick={() => handleOpenWindow(artist.Name)}
          />
        ))}

        {/* Παράθυρα για τους ανοιχτούς καλλιτέχνες */}
        {openWindows.map(artistName => {
          const artist = artists.find(a => a.Name === artistName);
          if (!artist) return null;
          const id = `artist-${artist.Name}`;
          return (
            <ArtistWindow
              key={`window-${artist.Name}`}
              artist={artist}
              onClose={() => handleCloseWindow(artist.Name)}
              onOpenImage={handleOpenImage}
              onFocus={() => handleFocus(id, artist.Name)}
              isActive={activeWindowId === id}
            />
          );
        })}

        {/* Παράθυρα για τις ανοιχτές εικόνες */}
        {openImageWindows.map(artistName => {
          const artist = artists.find(a => a.Name === artistName);
          if (!artist) return null;
          const imageUrl = `/images/${artist.PhotoPath}`;
          const id = `image-${artist.Name}`;
          return (
            <ImageWindow
              key={`${artist.Name}-image`}
              artist={artist}
              imageUrl={imageUrl}
              onClose={() => handleCloseImage(artist.Name)}
              onFocus={() => handleFocus(id, artist.Name)}
              isActive={activeWindowId === id}
            />
          );
        })}

        {/* Γραμμή Εργασιών (Taskbar) */}
        <AppBar style={{ top: 'auto', bottom: 0, zIndex: 1000 }}>
          <Toolbar style={{ justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
              <Button
                style={{ fontWeight: 'bold' }}
                onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }}
                active={isMenuOpen}
              >
                <img src="/images/kchc.ico" alt="Start" style={{ height: '20px', marginRight: '5px' }} />
                Start
              </Button>

              {/* Start Menu */}
              {isMenuOpen && (
                <MenuList style={{ position: 'absolute', bottom: '100%', left: 0, zIndex: 1001 }} onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                  <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {artists.map(a => (
                      <MenuListItem key={a.Name} onClick={() => { handleOpenWindow(a.Name); setIsMenuOpen(false); }}>
                        📁 {a.Name}
                      </MenuListItem>
                    ))}
                  </div>
                  <div style={{ height: '2px', background: '#808080', margin: '5px 0' }} />
                  <MenuListItem onClick={handleShutdown}>
                    💻 Shut Down...
                  </MenuListItem>
                </MenuList>
              )}

              <TextInput
                value={searchQuery}
                placeholder="Αναζήτηση..."
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                style={{ width: '200px', marginLeft: '10px' }}
              />
            </div>
            <div style={{ padding: '0 10px' }}>
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </Toolbar>
        </AppBar>

        {/* Οθόνη Τερματισμού */}
        {isShutDown && (
          <div
            onClick={() => {
              setIsShutDown(false);
              setOpenWindows([]);
              setOpenImageWindows([]);
              setActiveWindowId(null);
              setSearchQuery('');
              navigate('/');
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: '#000000',
              color: '#ff8c00', /* Πορτοκαλί των Windows 95 */
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              fontFamily: 'monospace',
              zIndex: 9999,
              textAlign: 'center',
              cursor: 'pointer'
            }}
          >
            <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>
              It is now safe to turn off your computer.
            </h1>
          </div>
        )}
      </DesktopWrapper>
    </>
  );
}

export default Desktop;
