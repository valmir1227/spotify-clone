import React from "react";
import { useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import Song from "./Song";
export default function Songs() {
  const playlist = useRecoilValue(playlistState);

  console.log(playlist);
  return (
    
    <div className="text-white">
      {playlist?.tracks?.items.map((track, i) => (
        <Song key={track.track.id} order={i} track={track} />
      ))}
    </div>
  );
}
