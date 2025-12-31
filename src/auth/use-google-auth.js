import { useGoogleLogin } from "@react-oauth/google";
import { useSetAtom } from "jotai";
import { accessTokenAtom, userEmailAtom } from "./atoms";
import { fetchGoogleUserEmail } from "./google-user-info";

export function useGoogleAuth() {
    const setAccessToken = useSetAtom(accessTokenAtom);
    const setUserEmail = useSetAtom(userEmailAtom);

    const login = useGoogleLogin({
        scope: "openid email profile",
        onSuccess: async (tokenResponse) => {
            const token = tokenResponse.access_token;

            // store token first
            setAccessToken(token);

            // fetch & store email
            const email = await fetchGoogleUserEmail(token);
            setUserEmail(email);
        },
        onError: () => {
            console.error("Google login failed");
            setAccessToken(null);
            setUserEmail(null);
        },
    });

    return { login };
}