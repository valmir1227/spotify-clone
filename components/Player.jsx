import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify";
import useSongInfo from "../hooks/useSongInfo";

export default function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [crurrentTrack, setCurrentTrack] = useRecoilState(currentTrackIdState);

  const [isPlaying, setIsplaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(70);

  const songInfo = useSongInfo();

  return (
    <div>
      {/**Left */}
      <div>
        <img
          className="hidden md:inline h-10 w-10"
          src={songInfo?.album.images?.[0]?.url}
          alt=""
        />
      </div>
    </div>
  );
}
