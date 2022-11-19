import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { usePlaylistContext } from "../contexts/PlaylistContext";
import useSpotify from "../hooks/useSpotify";
import SidebarItems from "./SidebarItems";

type Props = {};

function Sidebar() {
  const {
    playlistContextState: { playlists },
    updatePlaylistContextState,
  } = usePlaylistContext();

  const spotifyApi = useSpotify();

  const setSelectedPlaylist = async (playlistId: string) => {
    const playlistResponse = await spotifyApi.getPlaylist(playlistId);
    updatePlaylistContextState({
      selectedPlaylist: playlistResponse.body,
      selectedPlaylistId: playlistId,
    });

    console.log("Playlist", playlistResponse.body);
    // console.log("header", playlistResponse.headers);
  };
  // console.log("Playlists", playlists);

  return (
    <div className=" m-0 h-full w-52 p-0 text-white">
      <div className="mt-12 flex flex-col items-center justify-center">
        <h1 className="mb-12 text-center text-2xl font-bold ">Spotify</h1>
        <div className="space-y-8 ">
          {SidebarItems.map((item) => (
            <div className="flex items-center space-x-2" key={item.id}>
              {item.icon}
              <Link
                href={item.link}
                className="hover:text-[rgba(255,255,255,0.8)]"
              >
                {item.name}
              </Link>
            </div>
          ))}

          {playlists?.map((playlist) => (
            <div
              key={playlist.id}
              onClick={() => setSelectedPlaylist(playlist.id)}
              className="cursor-pointer hover:text-[rgba(255,255,255,0.8)]"
            >
              <p>{playlist.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
