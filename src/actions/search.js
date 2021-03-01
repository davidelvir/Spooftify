import axios from "axios";
import { gotResults } from "./api";

const SPOTIFY_API_URL = process.env.REACT_APP_SPOTIFY_API_URL

export const searchResult = (term, authToken, dispatchFunction) => {
    axios.get(`${SPOTIFY_API_URL}/search?q=${term}&type=track`, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }}).then(response => {
        const rawTracks = response.data.tracks.items;
        const tracks = rawTracks.slice(0,10).map(track => ({ name: track.name, artist: track.artists[0].name, id: track.id, image: track.album.images[0].url, album: track.album.name, duration: track.duration_ms }));
        dispatchFunction(tracks);
    });
}