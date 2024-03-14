import { useEffect } from "react";
import { useBlog } from "../../hooks/useBlog";
import { actions } from "../../actions";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router-dom";

const FavouriteBlogList = () => {
    const { api } = useAxios();
    const { state, dispatch } = useBlog();
    const blogs = state?.popularBlogs ?? [];

    useEffect(() => {
        const fetchFavouriteBlogs = async () => {
            const response = await api.get(
                `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/favourites/`
            );
            if (response.status === 200) {
                dispatch({
                    type: actions.favouriteBlog.DATA_FETCHED,
                    data: response?.data?.blogs ?? [],
                });
            }
        };
        fetchFavouriteBlogs();
    }, []);
    return (
        <div className="sidebar-card">
            <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
                Your Favourites ❤️
            </h3>

            <ul className="space-y-5 my-5">
                {blogs?.map((blog, index) => (
                    <li key={index}>
                        <Link to={`/blog/${blog?.id}`}>
                            <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer"></h3>{" "}
                            {blog?.title}
                        </Link>
                        <p className="text-slate-600 text-sm">
                            {blog?.tags?.split(",")?.map((tag, index) => (
                                <span key={index}>{tag}</span>
                            ))}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FavouriteBlogList;
