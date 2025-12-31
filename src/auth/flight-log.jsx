
const ENDPOINT = "https://script.google.com/macros/s/AKfycbzIdhdy6w39P_GhgsKPocL-DzQDh_5K4SkRCA5vtG0UIo2um4JTO0PEQAY5KbW9jQmh/exec";
const API_KEY = "a1b2c3d4-e5f6-7890-1234-567890abcdef";

export async function fetchFlightLogSummary({ accessToken, email, merge }) {

    const payload = {
        api_key: API_KEY,
        access_token: accessToken,
        dataset: { merge },
    };

    const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
    }

    return res.json();
}

export async function getFlightLog() {



}