import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePlaylistContext } from "../contexts/PlaylistContext";
import useSpotify from "../hooks/useSpotify";
import MenuAccount from "./MenuAccount";

const ContentHome = () => {
  const spotifyApi = useSpotify();
  const {
    playlistContextState: { selectedPlaylist },
  } = usePlaylistContext();

  const { data: session } = useSession();

  return (
    <div className="h-full w-full bg-[#121212] text-white">
      <header>
        <div className="absolute right-10 top-10">
          <MenuAccount
            userName={session?.user?.name}
            userImage={session?.user?.image}
          />
        </div>
      </header>
    </div>
  );
};
export default ContentHome;
