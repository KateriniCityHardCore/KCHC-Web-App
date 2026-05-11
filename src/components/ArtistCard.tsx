import { Link } from 'react-router-dom';
import type { Artist } from '../types';
import './ArtistCard.css';

interface Props {
  artist: Artist;
  index: number;
}

export function ArtistCard({ artist, index }: Props) {
  // Use a fallback image if PhotoPath is weird, or just point to the public images folder.
  // The images in JSON have names like "Akatalogistoi.jpg", we put them in /images/
  const imageUrl = `/images/${artist.PhotoPath}`;
  
  return (
    <Link 
      to={`/artist/${encodeURIComponent(artist.Name)}`}
      className="artist-card glass-panel animate-fade-in"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="image-container">
        <img src={imageUrl} alt={artist.Name} loading="lazy" />
        <div className="overlay">
          <h3 className="artist-name">{artist.Name}</h3>
          <p className="artist-desc">{artist.Description}</p>
        </div>
      </div>
    </Link>
  );
}
