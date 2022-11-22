import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import Player from "../components/Player";

function MyApp({ Component, session, pageProps }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
        <div className="sticky bottom-0">
          <Player />
        </div>
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
