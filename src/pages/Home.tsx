import artistsData from '../data/artists.json';
import { ArtistCard } from '../components/ArtistCard';
import type { Artist } from '../types';
import './Home.css';

export function Home() {
  const artists = artistsData as Artist[];

  return (
    <main className="home-container">
      <header className="hero">
        <img src="/images/kchc.ico" alt="KCHC Logo" className="hero-logo animate-fade-in" />
        <h1 className="title animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Katerini City Hardcore
        </h1>
      </header>

      <section className="grid-section">
        <div className="artists-grid">
          {artists.map((artist, index) => (
            <ArtistCard key={artist.Name} artist={artist} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
