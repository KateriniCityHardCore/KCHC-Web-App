export interface Artist {
  Name: string;
  PhotoPath: string;
  Description: string;
  ExtraDescription?: string;
  IsABand?: boolean;
  YoutubeAccountUrl?: string;
  SpotifyAccountUrl?: string;
  BandCampAccountUrl?: string;
  SoundcloudAccountUrl?: string;
  SongkickUrl?: string;
  TrovoAccountUrl?: string;
  TwitchAccountUrl?: string;
  Songs?: string[];
}
