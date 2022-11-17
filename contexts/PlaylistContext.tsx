import { useSession } from "next-auth/react";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import { IPlaylistContext, PlaylistContextState } from "../types";



const defaultPlaylistContextState: PlaylistContextState = {
  playlists: []
};

export const PlaylistContext = createContext<IPlaylistContext>({
  playlistContextState : defaultPlaylistContextState,
});

export const usePlaylistContext = () => useContext(PlaylistContext);

 const PlaylistContextProvider = ({ children }: {children: ReactNode}) => {
 
   const { data: session } = useSession();
   
   const spotifyApi = useSpotify();

   const [playlistContextState, setPlaylistContextState] = useState(defaultPlaylistContextState);

   useEffect(() => {
     const getPlaylists = async () => {
       const userPlaylists = await spotifyApi.getUserPlaylists();
       setPlaylistContextState({
         playlists: userPlaylists.body.items,
       });
       console.log("Playlists", userPlaylists);
     };
     
     if(spotifyApi.getAccessToken()) {
       getPlaylists();
     }
   }, [session, spotifyApi]);

  const playlistContextProviderData = {
    playlistContextState,
  }
  return (
    <PlaylistContext.Provider value={playlistContextProviderData}>
      {children}
    </PlaylistContext.Provider>
 )
};
export default PlaylistContextProvider;