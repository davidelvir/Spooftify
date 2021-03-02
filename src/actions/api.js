export const API_REQUEST = "API_REQUEST";
export const API_SUCCESS = "API_SUCCESS";
export const API_ERROR = "API_ERROR";
export const CANCEL_API_REQUEST = "CANCEL_API_REQUEST";
export const GET_NEW_RELEASES = "GET_NEW_RELEASES";
export const GOT_NEW_RELEASES = "GOT_NEW_RELEASES";
export const GET_USER = "GET_USER";
export const GOT_USER = "GOT_USER";
export const GOT_RESULTS = "GOT_RESULTS";
export const RESULTS_DONE = "RESULTS_DONE";


// action creators
export const gotResults = (tracks) => {
    return {
        type: GOT_RESULTS,
        payload: tracks
    };
};
export const resultsDone = (tracks) => {
    return {
        type: RESULTS_DONE,
        payload: tracks
    };
};
export const apiRequest = ({ url, method }) => {
    return {
        type: API_REQUEST,
        meta: { url, method }
    };
};
export const getNewReleases = (newReleases) => {
    return {
        type: GOT_NEW_RELEASES,
        payload: newReleases
    };
};
export const gotUser = (user) => {
    return {
        type: GOT_USER,
        payload: user
    };
};
export const cancelApiRequest = () => {
    return {
        type: CANCEL_API_REQUEST
    };
};

export const apiSuccess = ({ response }) => ({
    type: API_SUCCESS,
    payload: response
});

export const apiError = (error) => ({
    type: API_ERROR,
    payload: error
});