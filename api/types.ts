import { Model } from 'mongoose';


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

export interface UserFields{
  username: string;
  password:string
  token:string
}

export interface UserMethods{
  checkPassword(password:string):Promise<boolean>;
  generateToken():void
}
export type UserModel = Model<UserFields, {} , UserMethods>