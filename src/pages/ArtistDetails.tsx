import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Music, Radio, Tv, MonitorPlay } from 'lucide-react';
import artistsData from '../data/artists.json';
import type { Artist } from '../types';
import { AudioPlayer } from '../components/AudioPlayer';
import './ArtistDetails.css';

export function ArtistDetails() {
  const { name } = useParams<{ name: string }>();
  const artists = artistsData as Artist[];
  const artist = artists.find(a => a.Name === decodeURIComponent(name || ''));

  if (!artist) {
    return (
      <div className="home-container">
        <h2>Καλλιτέχνης δεν βρέθηκε!</h2>
        <Link to="/" className="back-link"><ArrowLeft /> Επιστροφή</Link>
      </div>
    );
  }

  const imageUrl = `/images/${artist.PhotoPath}`;

  return (
    <main className="artist-details-page">
      <div className="back-nav">
        <Link to="/" className="back-link animate-fade-in"><ArrowLeft /> Επιστροφή</Link>
      </div>

      <article className="artist-profile glass-panel animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="profile-header">
          <div className="profile-image">
            <img src={imageUrl} alt={artist.Name} />
          </div>
          <div className="profile-info">
            <h1 className="title">{artist.Name}</h1>
            <p className="profile-desc">{artist.Description}</p>
            {artist.IsABand && <span className="badge">Μπάντα</span>}
          </div>
        </div>

        <div className="profile-body">
          {artist.ExtraDescription && (
            <div className="extra-desc">
              <h3>Περισσότερα</h3>
              <p>{artist.ExtraDescription}</p>
            </div>
          )}

          {artist.Songs && artist.Songs.length > 0 && (
            <AudioPlayer songs={artist.Songs} />
          )}

          <div className="social-links">
            {artist.YoutubeAccountUrl && (
              <a href={artist.YoutubeAccountUrl} target="_blank" rel="noopener noreferrer" className="social-btn youtube">
                <Play size={24} /> YouTube
              </a>
            )}
            {artist.SpotifyAccountUrl && (
              <a href={artist.SpotifyAccountUrl} target="_blank" rel="noopener noreferrer" className="social-btn spotify">
                <Music size={24} /> Spotify
              </a>
            )}
            {artist.BandCampAccountUrl && (
              <a href={artist.BandCampAccountUrl} target="_blank" rel="noopener noreferrer" className="social-btn bandcamp">
                <Radio size={24} /> Bandcamp
              </a>
            )}
            {artist.SoundcloudAccountUrl && (
              <a href={artist.SoundcloudAccountUrl} target="_blank" rel="noopener noreferrer" className="social-btn soundcloud">
                <Music size={24} /> SoundCloud
              </a>
            )}
            {artist.TwitchAccountUrl && (
              <a href={artist.TwitchAccountUrl} target="_blank" rel="noopener noreferrer" className="social-btn twitch">
                <MonitorPlay size={24} /> Twitch
              </a>
            )}
            {artist.TrovoAccountUrl && (
              <a href={artist.TrovoAccountUrl} target="_blank" rel="noopener noreferrer" className="social-btn trovo">
                <Tv size={24} /> Trovo
              </a>
            )}
            {artist.SongkickUrl && (
              <a href={artist.SongkickUrl} target="_blank" rel="noopener noreferrer" className="social-btn songkick">
                <Music size={24} /> Songkick
              </a>
            )}
          </div>
        </div>
      </article>
    </main>
  );
}
