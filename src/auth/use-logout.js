import { googleLogout } from "@react-oauth/google";
import { useSetAtom } from "jotai";
import { accessTokenAtom, userEmailAtom } from "./atoms";

export function useLogout() {
    const setAccessToken = useSetAtom(accessTokenAtom);
    const setUserEmail = useSetAtom(userEmailAtom);

    return () => {
        // Clear your app's session first (this is what prevents "logged back in" on refresh)
        setAccessToken(null);
        setUserEmail(null);

        // Then logout from the library session
        googleLogout();

        // If you're using Google One Tap anywhere, also do this:
        // window.google?.accounts?.id?.disableAutoSelect?.();
    };
}