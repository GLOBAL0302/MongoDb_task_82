export interface IArtistMutation {
  title: string;
  image: string | null;
  description: string;
}

export interface IAlbumMutation {
  title: string;
  artist: string;
  created_at: string;
  image: string | null;
}

export interface ITrackMutations {
  title: string;
  album: string;
  duration: string;
}

export interface UserField{
  username: string;
  password:string
}

export interface ITrackHistory{
  user:string
  track:string
  date:Date
}
