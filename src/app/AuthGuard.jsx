import { Outlet } from "react-router-dom";
import { useAtomValue } from "jotai";
import { isLoggedInAtom } from '@/auth/atoms';
import LoginScreen from "@/auth/login-screen";

export default function AuthGuard() {
    const isLoggedIn = useAtomValue(isLoggedInAtom);

    if (!isLoggedIn) {
        return <LoginScreen />;
    }

    return <Outlet />;
}