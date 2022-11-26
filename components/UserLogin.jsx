import { signOut, useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/outline";

export default function UserLogin() {
  const { data: session } = useSession();
  return (
    <header className="absolute top-5 right-8">
      <div
        className={`flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 
          cursor-pointer
        rounded-full p-1 pr-2 `}
        onClick={() => signOut({ callbackUrl: "/login" })}
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
  );
}
