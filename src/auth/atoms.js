
import { atom, useSetAtom, useAtomValue } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

export const accessTokenAtom = atomWithStorage("access_token", null);
export const userEmailAtom = atomWithStorage("user_email", null);

export const flightLogSummaryAtom = atomWithStorage(
    "flight_log_summary_v1",
    null
);

export const isLoggedInAtom = atom((get) => {
    const token = get(accessTokenAtom);
    const email = get(userEmailAtom);
    return Boolean(token && email);
});

import { fetchFlightLogSummary } from "./flight-log";

export function useFlightLogSummary({ year = 2025 } = {}) {
    const accessToken = useAtomValue(accessTokenAtom);
    const email = useAtomValue(userEmailAtom);

    return useQuery({
        queryKey: ["flightLogSummary", email, year],
        queryFn: () =>
            fetchFlightLogSummary({ accessToken, email, year }),
        enabled: Boolean(accessToken && email),
        staleTime: 5 * 60 * 1000,
        retry: (count, err) => {
            const msg = String(err?.message || "");
            if (msg.includes("HTTP 401") || msg.includes("HTTP 403")) return false;
            return count < 2;
        },
    });
}

export function useFlightLogSummaryManual(options = {}) {

    const { merge = false } = options;
    const accessToken = useAtomValue(accessTokenAtom);
    const email = useAtomValue(userEmailAtom);
    const setStoredSummary = useSetAtom(flightLogSummaryAtom);

    const mutation = useMutation({
        mutationKey: ["flightLogSummaryManual", merge ? "merge" : "replace"],
        mutationFn: async () => {
            if (!accessToken || !email) throw new Error("Not logged in");
            return fetchFlightLogSummary({ accessToken, email, merge });
        },
        onSuccess: (data) => {
            setStoredSummary(data); // ✅ persists in storage
        },
    });

    return {
        // atom-backed data
        dataAtomSetter: setStoredSummary, // optional if you want to clear/reset
        refetch: mutation.mutate,          // call on button click
        isLoading: mutation.isPending,
        isFetching: mutation.isPending,
        error: mutation.error,
    };
}