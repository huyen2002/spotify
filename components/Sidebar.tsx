
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { usePlaylistContext } from "../contexts/PlaylistContext";
import SidebarItems from "./SidebarItems";

type Props = {};

function Sidebar() {
  const { data: session, status } = useSession();
  // console.log("Session", session);
  
  const { playlistContextState: {playlists}} = usePlaylistContext();
 
  console.log("Playlists", playlists);
  
  return (
    <div className="w-52 p-0 m-0 h-full text-white">
      <div className="flex flex-col items-center justify-center mt-12">
        {status === 'authenticated' && (
          <button onClick={() => signOut()}>
            {session.user?.name}-log out{" "}
          </button>
        )}
        <h1 className="text-2xl font-bold mb-12 text-center ">Spotify</h1>
        <div className="space-y-8 ">
          {SidebarItems.map((item) => (
            <div className="flex items-center space-x-2" key={item.id}>
              {item.icon}
              <Link href={item.link} className="hover:text-gray-300">
                {item.name}
              </Link>
            </div>
          ))}

          {playlists?.map((playlist) => (
            <div key= {playlist.id}>
              <Link href={`/playlist/${playlist.id}`}>{playlist.name}</Link>
           </div>
         ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
