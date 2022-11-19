import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePlaylistContext } from "../contexts/PlaylistContext";
import useSpotify from "../hooks/useSpotify";
import MenuAccount from "./MenuAccount";
import Song from "./Song";

const ContentPlaylist = () => {
  const spotifyApi = useSpotify();
  const {
    playlistContextState: { selectedPlaylist },
  } = usePlaylistContext();

  const { data: session } = useSession();
  console.log("Session", session);
  console.log("Selected Playlist", selectedPlaylist);
  return (
    <div className="h-full w-full bg-[#121212] text-white">
      <header>
        <div className="absolute right-10 top-10">
          <MenuAccount
            userName={session?.user?.name}
            userImage={session?.user?.image}
          />
        </div>
        <div className="m-20 flex">
          <img
            src={selectedPlaylist?.images[0].url}
            alt="Playlist Image"
            className=" h-52 w-52 object-cover"
          />
          <div className="mx-8">
            <p className="text-[1rem] font-semibold uppercase">Playlist</p>
            <h1 className="text-[4rem] font-bold">{selectedPlaylist?.name}</h1>
            <p>
              {session?.user?.name}, {selectedPlaylist?.tracks.items.length}{" "}
              songs
            </p>
          </div>
        </div>
      </header>

      <main className="ml-20 w-full">
        <header className="flex w-full font-roboto uppercase">
          <span className="mr-10">#</span>
          <span className="mr-[">Title</span>
          <span>Album</span>
          <span>Date Added</span>
          <span>
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
        </header>
        <div>
          {selectedPlaylist?.tracks.items.map((track, index) => (
            <Song track={track} index={index} key={index}></Song>
          ))}
        </div>
      </main>
    </div>
  );
};
export default ContentPlaylist;
