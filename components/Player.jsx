import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify";
import useSongInfo from "../hooks/useSongInfo";

export default function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentIdTrack, setCurrentIdTrack] =
    useRecoilState(currentTrackIdState);

  const [isPlaying, setIsplaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(70);

  const songInfo = useSongInfo();
  console.log("songInfo", songInfo);

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        console.log("Now playing", data.body?.item);
        setCurrentIdTrack(data.body?.item?.id);

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsplaying(data.body?.is_playing);
        });
      });
    }
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentIdTrack) {
      {
        fetchCurrentSong();
        setVolume(70);
      }
    }
  }, [currentTrackIdState, spotifyApi, session]);

  return (
    <div
      className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3
      text-xs md:text-base px-2 md:px-8
    "
    >
      {/**Left */}
      <div className="flex items-center space-x-4">
        <img
          className="hidden md:inline h-10 w-10"
          src={songInfo?.album.images?.[0]?.url}
          alt=""
        />
      </div>

      <div>
        <h3>{songInfo?.name}</h3>
        <p>{songInfo?.artists?.[0]?.name}</p>
      </div>
    </div>
  );
}
