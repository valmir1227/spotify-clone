import Sidebar from "../../components/Sidebar";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
export default function Playlists() {
  const router = useRouter();

  return (
    <div className="flex  bg-black h-screen overflow-hidden">
      <main className="flex ">
        <Sidebar />
        <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
          <header className="w-screen  h-24 relative top-0 bg-gray-800 flex items-center">
            <div className="flex space-x-2 ml-8">
              <ChevronLeftIcon
                className="w-7 h-7 text-white bg-gray-900 rounded-full  hover:scale-105 cursor-pointer"
                onClick={() => router.back()}
              />
              <ChevronRightIcon className="w-7 h-7 text-white bg-gray-900 rounded-full hover:scale-105 cursor-pointer" />
            </div>
            <div className="flex ml-8 gap-5 ">
              <p className="font-bold text-white hover:text-green-400 cursor-pointer">
                PlayLists
              </p>
              <p className="font-bold text-white hover:text-green-400 cursor-pointer">
                Podcasts
              </p>
              <p className="font-bold text-white hover:text-green-400 cursor-pointer">
                Artists
              </p>
              <p className="font-bold text-white hover:text-green-400 cursor-pointer">
                Albuns
              </p>
            </div>
          </header>
        </div>
      </main>
    </div>
  );
}
