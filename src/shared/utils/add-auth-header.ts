export const addAuthHeader = (headers: Headers, bearerToken: string | null): Headers => {
    if (bearerToken) {
        headers.set("Authorization", `Bearer ${bearerToken}`);
    }
    return headers;
}