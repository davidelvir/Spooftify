import { SET_LOADER } from "../actions/ui";
import {API_SUCCESS, API_ERROR, GOT_NEW_RELEASES,GOT_USER,GOT_RESULTS} from "../actions/api";
import { GOT_SONG, REMOVED_SONG } from "../actions/actions";
import { LOGOUT } from "../actions/auth";

const reducer = (
    state = {
        isAuthUser: !!localStorage.getItem("token"),
        token: JSON.parse(localStorage.getItem("token")) || '',
        user: {},
        expires_in: JSON.parse(localStorage.getItem("expires_in")) || '',
        token_type: JSON.parse(localStorage.getItem("token_type")) || '',
        isLoading: false,
        releases: [],
        myLibrary: [],
        searchResults: [],
        error: null
    },
    action
) => {
    switch (action.type) {
        case API_SUCCESS:
            localStorage.setItem("token", JSON.stringify(action.payload.access_token));
            localStorage.setItem("expires_in", JSON.stringify(action.payload.expires_in));
            localStorage.setItem("token_type", JSON.stringify(action.payload.token_type));
            return { ...state, isAuthUser: true, token: action.payload.access_token, expires_in: action.payload.expires_in, token_type: action.payload.token_type };
        case API_ERROR:
            return { ...state, error: action.payload };
        case SET_LOADER:
            return { ...state, isLoading: action.payload };
        case LOGOUT:
            localStorage.removeItem("token");
            localStorage.removeItem("expires_in");
            localStorage.removeItem("token_type");
            console.log('logout');
            return { ...state, isAuthUser: false, token: '', expires_in: '', token_type: '' };
        case GOT_NEW_RELEASES:
            return { ...state, releases: action.payload };
        case GOT_USER:
            return { ...state, user: action.payload };
        case GOT_SONG:
            return { ...state, myLibrary: state.myLibrary.concat([action.payload]) };
        case REMOVED_SONG:
            return { ...state, myLibrary: state.myLibrary.filter(s => s.id !== action.payload.id) };
        case GOT_RESULTS:
            return { ...state, searchResults: action.tracks };
        default:
            return state;
    }
};

export default reducer;