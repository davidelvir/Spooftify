import {apiSuccess} from "../actions/api";
import { LOGIN } from "../actions/auth";

export const appMiddleware = ({ dispatch }) => next => action => {
    next(action);
    switch (action.type) {
        case LOGIN: {
            dispatch(apiSuccess({ response: action.token }))
            break;
        }
        default:
            break;
    }
};