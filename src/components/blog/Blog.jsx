import { useEffect, useRef, useState } from "react";
import { useBlog } from "../../hooks/useBlog";
import { actions } from "../../actions";
import { Link, useParams } from "react-router-dom";
import likeIcon from "../../assets/icons/like.svg";
import likeFilledIcon from "../../assets/icons/like-filled.svg";
import heartIcon from "../../assets/icons/heart.svg";
import heartFilled from "../../assets/icons/heart-filled.svg";
import commentIcon from "../../assets/icons/comment.svg";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../hooks/useAuth";
import Comment from "./Comment";

const Blog = () => {
    const { api } = useAxios();
    const comment = useRef();
    const { state, dispatch } = useBlog();
    const { auth } = useAuth();
    const [liked, setLiked] = useState(false);
    const [isFavourite, setIsFavourite] = useState(false);
    const [totalLikes, setTotalLikes] = useState(0);
    const { blogId } = useParams();
    const isLoggedIn = auth?.user?.id ? true : false;
    const blog = state?.blogDetail ?? [];
    const authorName = (blog?.author?.firstName ?? '') + " " + (blog?.author?.lastName ?? '');
    const firstLetterOfAuthor = authorName?.charAt(0) ?? '';
    const formatDate = (nonForamtDate) => {
        if (!nonForamtDate) return;
        const createdAt = nonForamtDate;
        const date = new Date(createdAt);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);

        return formattedDate;

    }
    const fetchBlog = async () => {
        try {
            dispatch({
                type: actions.blogDetail.DATA_FETCHING,
            });
            const response = await api.get(
                `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}/`
            );
            if (response.status === 200) {
                dispatch({
                    type: actions.blogDetail.DATA_FETCHED,
                    data: response?.data ?? {},
                });
                setTotalLikes(response?.data?.likes?.length ?? 0);
                if (isLoggedIn) {
                    const isLiked = response?.data?.likes?.findIndex((like) => like?.id === auth?.user?.id);
                    if (isLiked !== -1) {
                        setLiked(true);
                    }
                    else {
                        setLiked(false);
                    }
                    const isFavourite = response?.data?.isFavourite ?? false;
                    setIsFavourite(isFavourite);
                }
            }
        } catch (error) {
            dispatch({
                type: actions.blogDetail.DATA_FETCH_ERROR,
                error: error?.message ?? 'Something went wrong',
            });
        }
    };
    useEffect(() => {
        fetchBlog();
    }, []);

    const handleLike = async () => {
        if (!isLoggedIn) {
            alert("You need to login to like this blog");
            return;
        }
        try {
            const response = await api.post(
                `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}/like`
            );

            if (response.status === 200) {
                setLiked(response?.data?.isLiked);
                setTotalLikes(response?.data?.likes?.length ?? 0);
            }
        } catch (error) {
            console.error(error);
        }
    };
    const handleFavourite = async() => {
        if (!isLoggedIn) {
            alert("You need to login to add this blog to your favourite list");
            return;
        }
        try {
            const response = await api.patch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}/favourite`
            );
            if (response.status === 200) {
                setIsFavourite(response?.data?.isFavourite);
            }
        } catch (error) {
            console.error(error);
        }
    }
    

    return (
        <div>
            <main>
                <section>
                    <div className="container text-center py-8">
                        <h1 className="font-bold text-3xl md:text-5xl">
                            {blog?.title}
                        </h1>
                        <div className="flex justify-center items-center my-4 gap-4">
                            <Link to={`/profile/${blog?.author?.id}`}  className="flex items-center capitalize space-x-2">
                                <div className="avater-img bg-indigo-600 text-white">
                                    <span className="">{firstLetterOfAuthor}</span>
                                </div>
                                <h5 className="text-slate-500 text-sm">{authorName}</h5>
                            </Link>
                            <span className="text-sm text-slate-700 dot">{formatDate(blog?.createdAt)}</span>
                            <span className="text-sm text-slate-700 dot">{totalLikes} Likes</span>
                        </div>
                        <img
                            className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96"
                            src={`${import.meta.env.VITE_SERVER_BASE_URL
                                }/uploads/blog/${blog?.thumbnail}`}
                            alt=""
                        />

                        <ul className="tags">
                            {
                                blog?.tags?.split(",")?.map((tag, index) => <li key={index}>{tag}</li>)
                            }
                        </ul>

                        <div className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left">
                            {blog?.content}
                        </div>
                    </div>
                </section>

                <section id="comments" ref={comment}>
                    <Comment/>
                </section>
            </main>

            <div className="floating-action">
                <ul className="floating-action-menus">
                    <li onClick={() => handleLike()}>
                        <img src={liked ? likeFilledIcon : likeIcon} alt="like" />
                        <span>{totalLikes}</span>
                    </li>

                    <li onClick={() => handleFavourite()}>
                        <img src={isFavourite? heartFilled : heartIcon} alt="Favourite" />
                    </li>
                    <button onClick={() => comment?.current?.scrollIntoView({ behavior: 'smooth' })}>
                        <li>
                            <img src={commentIcon} alt="Comments" />
                            <span>{blog?.comments?.length ?? "0"}</span>
                        </li>
                    </button>
                </ul>
            </div>
        </div>
    );
};

export default Blog;
