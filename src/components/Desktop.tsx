import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AppBar, Toolbar, Button, TextInput } from 'react95';
import artistsData from '../data/artists.json';
import type { Artist } from '../types';
import { FolderIcon } from './FolderIcon';
import { ArtistWindow } from './ArtistWindow';

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
`;

export function Desktop() {
  const { name } = useParams<{ name?: string }>();
  const navigate = useNavigate();
  const artists = artistsData as Artist[];
  
  // Κατάσταση για τα ανοιχτά παράθυρα
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  
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
    }
  }, [name]);

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
    navigate(`/artist/${encodeURIComponent(artistName)}`);
  };

  return (
    <DesktopWrapper>
      {/* Εικονίδια για κάθε καλλιτέχνη */}
      {filteredArtists.map(artist => (
        <FolderIcon 
          key={artist.Name} 
          name={artist.Name} 
          onClick={() => handleOpenWindow(artist.Name)} 
        />
      ))}

      {/* Παράθυρα για τους ανοιχτούς καλλιτέχνες */}
      {openWindows.map(artistName => {
        const artist = artists.find(a => a.Name === artistName);
        if (!artist) return null;
        return (
          <ArtistWindow 
            key={artist.Name} 
            artist={artist} 
            onClose={() => handleCloseWindow(artist.Name)} 
          />
        );
      })}

      {/* Γραμμή Εργασιών (Taskbar) */}
      <AppBar style={{ top: 'auto', bottom: 0 }}>
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button style={{ fontWeight: 'bold' }}>
              <img src="/images/kchc.ico" alt="Start" style={{ height: '20px', marginRight: '5px' }} />
              Start
            </Button>
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
    </DesktopWrapper>
  );
}

export default Desktop;
