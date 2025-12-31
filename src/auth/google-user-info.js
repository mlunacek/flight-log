export async function fetchGoogleUserEmail(accessToken) {
  const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error(`Failed to fetch userinfo: HTTP ${res.status}`);
  const data = await res.json();
  if (!data.email) throw new Error("No email returned (check scopes)");
  return data.email;
}