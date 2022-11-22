import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";

export default function Sidebar({ shoulMatchExactHref = false, ...rest }) {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div
      className="text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900
    overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12rem] lg:max-w-[16rem] 
    hidden md:inline-flex pb-36 "
    >
      <div className="space-y-4">
        <button className="flex items-center  space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <Link href="/">
            <p>Home</p>
          </Link>
        </button>

        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>

        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>

        <button
          className="flex items-center space-x-2 
        text-green-400 "
        >
          <HeartIcon className="h-5 w-5" />
          <Link href="/likedsongs">
            <p>Liked Songs</p>
          </Link>
        </button>

        <button className="flex items-center space-x-2 text-blue-400">
          <RssIcon className="h-5 w-5" />
          <p>Your Episodes </p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        {playlists.map((playlist) => (
          <p
            key={playlist.id}
            className="cursor-pointer hover:text-white "
            onClick={() => setPlaylistId(playlist.id)}
          >
            <Link href="/">{playlist.name}</Link>
          </p>
        ))}
      </div>
    </div>
  );
}
