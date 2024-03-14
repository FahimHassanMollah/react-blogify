import { actions } from "../actions";

const initialState = {
    blogs: {
        blogs: [],
        limit: 10,
        page: 1,
        total: 10
    },
    popularBlogs: [],
    favouriteBlogs: [],
    blogDetail: {},
    loading: false,
    error: null,
};

const blogReducer = (state, action) => {
    switch (action.type) {
        case actions.blog.DATA_FETCHING: {
            return {
                ...state,
                loading: true,
            };
        }

        case actions.blog.DATA_FETCHED: {
            return {
                ...state,
                blogs: {...action.data,blogs: [...(state?.blogs?.blogs ?? []),...action.data.blogs]},
                loading: false,
            };
        }
        case actions.blog.DATA_RESET_BLOG_BLOG_LIST: {
            return {
                ...state,
                blogs: {
                    blogs: [],
                    limit: 10,
                    page: 1,
                    total: 10
                },
                loading: false,
            };
        }

        case actions.blog.DATA_FETCH_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }

        case actions.blog.DATA_CREATED: {
            return {
                ...state,
                loading: false,
                blogs: [...state.blogs, action.data],
            };
        }
        case actions.blog.COMMENT_CREATED: {
            return {
                ...state,
                loading: false,
                blogDetail: {
                    ...state.blogDetail,
                    comments: [...state.blogDetail.comments, action.data],
                },
            };
        }

        case actions.blog.BLOG_DELETED: {
            return {
                ...state,
                loading: false,
                blogs: {...state.blogs,blogs: state?.blogs?.blogs?.filter((item) => item.id !== action.data) ?? []},
                favouriteBlogs: state?.favouriteBlogs?.filter((item) => item.id !== action.data) ?? [],
                popularBlogs: state?.popularBlogs?.filter((item) => item.id !== action.data) ?? [],
            };
        }

        case actions.blog.DATA_EDITED: {
            return {
                ...state,
                loading: false,
                user: action.data,
            };
        }

        case actions.popularBlog.DATA_FETCHED: {
            return {
                ...state,
                popularBlogs: action.data,
            };
        }
        case actions.favouriteBlog.DATA_FETCHED: {
            return {
                ...state,
                favouriteBlogs: action.data,
            };
        }
        case actions.blogDetail.DATA_FETCHING: {
            return {
                ...state,
                loading: true,
            };
        }

        case actions.blogDetail.DATA_FETCHED: {
            return {
                ...state,
                blogDetail: action.data,
                loading: false,
            };
        }

        case actions.blogDetail.DATA_FETCH_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }

        default: {
            return state;
        }
    }
};

export { initialState, blogReducer };