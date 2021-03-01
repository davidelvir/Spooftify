import axios from "axios";
import { API_REQUEST, apiError, apiSuccess, GET_NEW_RELEASES, getNewReleases, GET_USER, gotUser, GOT_RESULTS, resultsDone } from "../actions/api";
import { ADD_TO_LIBRARY, addToLibrary, REMOVE_FROM_LIBRARY, removeFromLibrary } from "../actions/actions";
import { setLoader } from "../actions/ui";

const SPOTIFY_API_URL = process.env.REACT_APP_SPOTIFY_API_URL
export const apiMiddleware = ({ dispatch }) => next => action => {
    next(action);

    switch (action.type) {
        case API_REQUEST:
            dispatch(setLoader(true));
            const { url, method, data } = action.meta;
            axios({
                method,
                url,
                data
            })
                .then(({ data }) => dispatch(apiSuccess({ response: data })))
                .catch(error => {
                    console.log(error);
                    dispatch(apiError({ error: error.response.data }));
                });
            break;
        case GET_NEW_RELEASES:
            dispatch(setLoader(true));
            axios.get(`${SPOTIFY_API_URL}/browse/new-releases`,{
                headers: {
                    Authorization: `Bearer ${action.authToken}`
                }
            }).then(async response => {
                const albums = response.data.albums.items.map((album)=> (album));
                const promisedSongs = albums.map( album => {
                    return axios.get(`${SPOTIFY_API_URL}/albums/${album.id}/tracks`, {
                        headers: {
                            Authorization: `Bearer ${action.authToken}`
                        }}).then(response => {
                            response.data.items[0].images = album.images;
                            return response.data.items[0];
                        })
                    });
                await Promise.all(promisedSongs).then(r => {
                    const newReleases = r.map(song => ({ artist: song.artists[0].name, name: song.name, id: song.id, image: song.images[0].url }));
                    dispatch(getNewReleases(newReleases));
                });
            })
            break;
        case GET_USER:
            dispatch(setLoader(true));
            axios.get(`${SPOTIFY_API_URL}/me`, {
                headers: {
                    Authorization: `Bearer ${action.authToken}`
                }
            }).then(response => {
                dispatch(gotUser(response.data));
            })
            break;
        case ADD_TO_LIBRARY:
            dispatch(addToLibrary(action.song));
            break;
        case REMOVE_FROM_LIBRARY:
            dispatch(removeFromLibrary(action.song));
            break;
        default:
            break;
    }
};