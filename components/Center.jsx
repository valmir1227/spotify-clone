import React, { useEffect, useState } from "react";
import { UsersIcon, MusicNoteIcon } from "@heroicons/react/solid";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "../components/Songs";
import UserLogin from "../components/UserLogin";
import colors from "../utils/colors";
import { useRouter } from "next/router";

export default function Center() {
  const spotifyApi = useSpotify();
  const router = useRouter();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId, router]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.log("Something went wrong!", err));
  }, [spotifyApi, playlistId]);

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black
        ${color} h-80 text-white padding-8 w-full`}
      >
        <UserLogin />
        <img
          className="w-44 h-44 shadow-2xl"
          src={
            playlist?.images
              ? playlist?.images?.[0]?.url
              : "https://demo.tutorialzine.com/2015/03/html5-music-player/assets/img/default.png"
          }
          alt=""
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold">
            {playlist?.name ? playlist?.name : "Pick a Playlist"}
          </h1>
          <p className="text-gray-400 my-3">{playlist?.description}</p>
          <p className="flex space-x-4 my-3">
            <span className="flex items-center gap-1 ">
              <UsersIcon className="w-4 h-4" /> {playlist?.followers?.total}{" "}
              followers
            </span>
            <span className="flex items-center gap-1 ">
              <MusicNoteIcon className="w-4 h-4" />
              {playlist?.tracks?.total} songs
            </span>
          </p>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  );
}
