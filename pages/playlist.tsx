import Content from "../components/ContentPlaylist";
import Player from "../components/Player";
import Sidebar from "../components/Sidebar";
import PlaylistContextProvider from "../contexts/PlaylistContext";
import styles from "../styles/Home.module.css";

const Playlist = () => {
  return (
    <div className={styles.container}>
      <PlaylistContextProvider>
        <main className="flex h-[calc(100vh-4rem)] bg-black">
          <Sidebar />
          <Content />
        </main>

        <Player />
      </PlaylistContextProvider>
    </div>
  );
};
export default Playlist;
