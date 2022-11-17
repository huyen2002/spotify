import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { spotifyApi } from "../lib/spotify";
import { ExtendedSession } from "../types";

const useSpotify = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if(!session) return;

    if ((session as ExtendedSession).error === "RefreshAccessTokenError") {
      signIn("spotify");
    }

    spotifyApi.setAccessToken((session as ExtendedSession).accessToken);
  }, [session]);

  return spotifyApi;
};

export default useSpotify;