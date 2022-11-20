import { useRecoilState, useRecoilValue } from "recoil";
import useSpotify from "../hooks/useSpotify";
import { milisToMinutesAndSeconds } from "../lib/time";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";

export default function Song({ order, track }) {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(track.track.id),
      setIsPlaying(true),
      spotifyApi.play({
        uris: [track.track.uri],
      });
  };

  return (
    <div
      className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900
     rounded-lg cursor-pointer"
    >
      <div className="flex items-center space-x-4" onClick={() => playSong()}>
        <p>{order + 1}</p>
        <img
          className="w-10 h-10"
          src={track.track.album?.images[0].url}
          alt=""
        />
        <div>
          <p className="w-36 lg:w-64 truncate text-white">{track.track.name}</p>
          <p className="w-40">{track.track.artists[0].name}</p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-40 hidden md:inline">{track.track.album.name}</p>
        <p>{milisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  );
}
