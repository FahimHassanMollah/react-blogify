import { useEffect } from "react";
import { useBlog } from "../../hooks/useBlog";
import { actions } from "../../actions";
import axios from "axios";

const PopularBlogList = () => {
    const { state, dispatch } = useBlog();
    const blogs = state?.popularBlogs ?? [];

    useEffect(() => {
        const fetchPopularBlogs = async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/popular/`
            );
            if (response.status === 200) {
                dispatch({
                    type: actions.popularBlog.DATA_FETCHED,
                    data: response?.data?.blogs ?? [],
                });
            }
        };
        fetchPopularBlogs();
    }, []);
    return (
        <>
            {blogs?.length > 0 && (
                <div className="sidebar-card">
                    <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
                        Most Popular 👍️
                    </h3>

                    <ul className="space-y-5 my-5">
                        {blogs?.map((blog, index) => (
                            <li key={index}>
                                <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                                    {blog?.title}
                                </h3>
                                <p className="text-slate-600 text-sm">
                                    by
                                    <a href="./profile.html">
                                        {blog?.author?.firstName} {blog?.author?.lastName}
                                    </a>
                                    <span>·</span> {blog?.likes?.length ?? "0"} Likes
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default PopularBlogList;
