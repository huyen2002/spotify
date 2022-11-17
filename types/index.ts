import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

export interface ExtendedToken extends JWT {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  user: User;
  error ?: string;
}

export interface ExtendedSession extends Session {
  accessToken: ExtendedToken["accessToken"];
  refreshToken: ExtendedToken["refreshToken"];
  error: ExtendedToken["error"];
}

export interface PlaylistContextState {
  playlists: any[]
}
export interface IPlaylistContext {
  playlistContextState: PlaylistContextState;
}