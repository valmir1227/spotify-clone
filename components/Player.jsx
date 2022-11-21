import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify";
import useSongInfo from "../hooks/useSongInfo";
import { ReplyIcon, SwitchHorizontalIcon } from "@heroicons/react/outline";
import { VolumeUpIcon as VolumeDownIcon } from "@heroicons/react/outline";
import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  RewindIcon,
  VolumeUpIcon,
  VolumeOffIcon,
} from "@heroicons/react/solid";

export default function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentIdTrack, setCurrentIdTrack] =
    useRecoilState(currentTrackIdState);

  const [isPlaying, setIsplaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);

  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
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
        setVolume(50);
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
          src={songInfo?.album?.images?.[0]?.url}
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>
      {/*Center*/}
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon className="button" />

        {isPlaying ? (
          <PauseIcon
            className="button w-7 h-7"
            onClick={() => setIsplaying(false)}
          />
        ) : (
          <PlayIcon
            className="button w-7 h-7"
            onClick={() => setIsplaying(true)}
          />
        )}
        <FastForwardIcon className="button" />
        <ReplyIcon className="button" />
      </div>
      {/*Right*/}
      <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
        {volume > 0 ? (
          <VolumeDownIcon
            className="button"
            onClick={() => {
              volume > 0 && setVolume(volume - 10);
            }}
          />
        ) : (
          <VolumeOffIcon className="button fill-red-500" />
        )}

        <input
          className="w-14 md:w-18"
          type="range"
          value={volume}
          min={0}
          max={100}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
        <VolumeUpIcon
          className="button"
          onClick={() => {
            volume <= 100 && setVolume(volume + 10);
          }}
        />
      </div>
    </div>
  );
}
