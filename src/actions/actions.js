export const ADD_TO_LIBRARY = "ADD_TO_LIBRARY";
export const GOT_SONG = "GOT_SONG";
export const REMOVE_FROM_LIBRARY = "REMOVE_FROM_LIBRARY";
export const REMOVED_SONG = "REMOVED_SONG";

export const addToLibrary = (song) => {
    return {
        type: GOT_SONG,
        payload: song
    };
};
export const removeFromLibrary = (song) => {
    return {
        type: REMOVED_SONG,
        payload: song
    };
};