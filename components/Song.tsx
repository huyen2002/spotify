interface Props {
  track: SpotifyApi.PlaylistTrackObject;
  index: number;
}

const Song = (prop: Props) => {
  return (
    <div className="my-4 flex h-[50px] w-full text-left text-[1rem] visited:bg-[#3e3e3e] hover:bg-[#3e3e3e]">
      <p>{prop.index + 1}</p>
      <div className="ml-10 flex">
        <img
          src={prop.track?.track?.album.images[0].url}
          alt="song-image"
          className="mr-4 h-12 w-12 object-cover"
        />
        <div>
          <p>{prop.track?.track?.name}</p>
          {prop.track?.track?.artists.map((artist, index) => (
            <p className="text-sm text-gray-300" key={index}>
              {artist.name}
            </p>
          ))}
        </div>
      </div>
      <p>{prop.track.track?.album.name}</p>
      <p>{prop.track.added_at}</p>
      <p> {((prop.track?.track?.duration_ms as number) / 60000).toFixed(2)}</p>
    </div>
  );
};
export default Song;
