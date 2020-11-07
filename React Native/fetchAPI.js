import API from "./App"
export function fetchFeed(API) {
    const url = 'https://api.imgur.com/3/gallery/top/top/week/1/?showViral=true}&mature=true&album_previews=true';
    return fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${API.access_token}`
        }
    }).then((response) => response.json())
        .catch((error) => console.error(error));
}