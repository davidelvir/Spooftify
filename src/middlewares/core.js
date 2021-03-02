import axios from "axios";
import { API_REQUEST, apiError, apiSuccess, GET_NEW_RELEASES, getNewReleases, GET_USER, gotUser } from "../actions/api";
import { ADD_TO_LIBRARY, addToLibrary, REMOVE_FROM_LIBRARY, removeFromLibrary } from "../actions/actions";
import { setLoader } from "../actions/ui";
import { db } from "../firebase/firebase";

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
                    dispatch(apiError(true));
                    dispatch(setLoader(false));
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
                        }).catch(error => {
                        dispatch(apiError(true));
                        dispatch(setLoader(false));
                    });
                    });
                await Promise.all(promisedSongs).then(r => {
                    const newReleases = r.map(song => ({ artist: song.artists[0].name, name: song.name, id: song.id, image: song.images[0].url }));
                    dispatch(getNewReleases(newReleases));
                });
            }).catch(error => {
                dispatch(apiError(true));
                dispatch(setLoader(false));
            });
            break;
        case GET_USER:
            dispatch(setLoader(true));
            axios.get(`${SPOTIFY_API_URL}/me`, {
                headers: {
                    Authorization: `Bearer ${action.authToken}`
                }
            }).then(async response => {
                db.ref(`/users/${response.data.id}/library`).on('value', snapshot => {
                    dispatch(setLoader(false));
                    const val = snapshot.val();
                    dispatch(gotUser({ user: response.data, library: val }));
                });
            }).catch(error => {
                dispatch(apiError(true));
                dispatch(setLoader(false));
            });
            break;
        case ADD_TO_LIBRARY:
            const library = action.song.library.concat([action.song.song]);
            db.ref(`/users/${action.song.user.id}/library`).set(library).then();
            dispatch(addToLibrary(library));
            break;
        case REMOVE_FROM_LIBRARY:
            const newLibrary = action.song.library.filter(s => s.id !== action.song.song.id);
            db.ref(`/users/${action.song.user.id}/library`).set(newLibrary).then();
            dispatch(removeFromLibrary(newLibrary));
            break;
        default:
            break;
    }
};