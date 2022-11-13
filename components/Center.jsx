import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "../components/Songs";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

export default function Center() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.log("Error", err));
  }, [spotifyApi, playlistId]);

  return (
    <div className="flex-grow">
      <header className="absolute top-5 right-8">
        <div
          className={`flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 
          cursor-pointer
        rounded-full p-1 pr-2 `}
        >
          <img
            className="rounded-full w-10 h-10"
            src={session?.user.image}
            alt=""
          />
          <h2 className="text-white">{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5 text-white" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black
       ${color} h-80 text-white padding-8 w-full`}
      >
        <img
          className="w-44 h-44 shadow-2xl"
          src={
            playlist.images
              ? playlist?.images?.[0]?.url
              : "https://demo.tutorialzine.com/2015/03/html5-music-player/assets/img/default.png"
          }
          alt=""
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist.name ? playlist.name : "Pick a Playlist"}
          </h1>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  );
}
