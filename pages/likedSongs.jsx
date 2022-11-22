import { useSession } from "next-auth/react";
import { useState } from "react";
import { useEffect } from "react";
import useSpotify from "../hooks/useSpotify";
import Song from "../components/Song";

export default function LikedSongs() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [savedTracks, setSavedTracks] = useState([]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getMySavedTracks().then((data) => {
        setSavedTracks(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div className="text-white">
      {savedTracks.map((tracks) => (
        <Song key={tracks.track?.album.id} order={0} track={tracks} />
      ))}
    </div>
  );
}
