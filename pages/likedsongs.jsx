import { useSession } from "next-auth/react";
import { useState } from "react";
import { useEffect } from "react";
import useSpotify from "../hooks/useSpotify";
import Song from "../components/Song";
import Sidebar from "../components/Sidebar";
import UserLogin from "../components/UserLogin";
import { playlistIdState } from "../atoms/playlistAtom";
import { useRecoilValue } from "recoil";
import { shuffle } from "lodash";
import colors from "../utils/colors";

export default function LikedSongs() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [savedTracks, setSavedTracks] = useState([]);

  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getMySavedTracks().then((data) => {
        setSavedTracks(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  console.log(savedTracks);

  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex">
        <Sidebar />
        <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
          <UserLogin />
          <section
            className={`flex items-end space-x-7 bg-gradient-to-b to-black
       ${color} h-80 text-white padding-8 w-full `}
          >
            <img
              className="w-44 h-44 shadow-2xl "
              src="https://misc.scdn.co/liked-songs/liked-songs-300.png"
            />
            <div>
              <p>PLAYLIST</p>
              <h1 className="text-3xl md:text-5xl xl:text-6xl font-bold">
                Liked Songs
              </h1>
              <p className="flex space-x-4 my-3">
                <span className="flex items-center gap-1 ">
                  <img src="" alt="" />
                  {session?.user.name}
                </span>
                <span className="flex items-center gap-1 ">
                  {savedTracks.length} {" Songs"}
                </span>
              </p>
            </div>
          </section>
          <div className="text-white">
            {savedTracks.map((tracks, i) => (
              <Song key={tracks.track?.album.id} order={i} track={tracks} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
