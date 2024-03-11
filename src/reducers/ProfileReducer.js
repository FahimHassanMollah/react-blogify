import { actions } from "../actions";

const initialState = {
    avatar: "",
    bio: "",
    blogs: [],
    email: "",
    favourites: [],
    firstName: "",
    lastName: "",
    loading: false,
    error: null,
};

const profileReducer = (state, action) => {
    switch (action.type) {
        case actions.profile.DATA_FETCHING: {
            return {
                ...state,
                loading: true,
            };
        }

        case actions.profile.DATA_FETCHED: {
            return {
                ...state,
                loading: false,
                error: null,
                ...action.data,
               
            };
        }

        case actions.profile.DATA_FETCH_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }

        case actions.profile.USER_DATA_EDITED: {
            return {
                ...state,
                loading: false,
                error: null,
                ...action.data,
            };
        }

        case actions.profile.DATA_UPDATE_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }

        case actions.profile.IMAGE_UPDATED: {
            return {
                ...state,
                loading: false,
                error: null,
                avatar: action.data.avatar,
            };
        }

        default: {
            return state;
        }
    }
};

export { initialState, profileReducer };