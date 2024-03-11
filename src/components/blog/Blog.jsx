import { useEffect, useRef, useState } from "react";
import { useBlog } from "../../hooks/useBlog";
import { actions } from "../../actions";
import { useParams } from "react-router-dom";
import likeIcon from "../../assets/icons/like.svg";
import likeFilledIcon from "../../assets/icons/like-filled.svg";
import heartIcon from "../../assets/icons/heart.svg";
import commentIcon from "../../assets/icons/comment.svg";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../hooks/useAuth";

const Blog = () => {
    const {api} = useAxios();
    const comment = useRef();
    const { state, dispatch } = useBlog();
    const {auth} = useAuth();
    const [liked, setLiked] = useState(false);
    console.log(liked, "likedlikedlikedlikedlikedliked");
    const isLoggedIn = auth?.user?.id ? true : false;
    const blog = state?.blogDetail ?? [];
    const totalLikes = blog?.likes?.length ?? 0;
    const authorName = (blog?.author?.firstName ?? '') + " " + (blog?.author?.lastName ?? '');
    const firstLetterOfAuthor = authorName?.charAt(0) ?? '';
    const getFirstLetterOfAuthor = (authorName) => {
        return authorName?.charAt(0) ?? '';
    }
    const getFullName = (firstName, lastName) => {
        return (firstName ?? '') + " " + (lastName ?? '');
    }
    const formatDate = (nonForamtDate) => {
        if (!nonForamtDate) return;
        const createdAt = nonForamtDate;
        const date = new Date(createdAt);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        
        return formattedDate;
        
    }
    let { blogId } = useParams();
    const fetchBlog = async () => {
        try {
         dispatch({
             type: actions.blogDetail.DATA_FETCHING,
         });
         const response = await api.get(
             `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}/`
         );
         console.log(response?.data);
         if (response.status === 200) {
             dispatch({
                 type: actions.blogDetail.DATA_FETCHED,
                 data: response?.data ?? {},
             });
             if (isLoggedIn) {
                    const isLiked = response?.data?.likes?.findIndex((like) => like?.author === auth?.user?.id);
                    if (isLiked !== -1) {
                        setLiked(true);
                    }
             }
         }
        } catch (error) {
            console.log(error?.response?.data);
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
                console.log(response?.data);
                fetchBlog();
            }
        } catch (error) {
            console.error(error);
            // setLiked(false);
        }
    };
    
    return (
        <div>
            <main>
                <section>
                    <div className="container text-center py-8">
                        <h1 className="font-bold text-3xl md:text-5xl">
                           {blog?.title}
                        </h1>
                        <div className="flex justify-center items-center my-4 gap-4">
                            <div className="flex items-center capitalize space-x-2">
                                <div className="avater-img bg-indigo-600 text-white">
                                    <span className="">{firstLetterOfAuthor}</span>
                                </div>
                                <h5 className="text-slate-500 text-sm">{authorName}</h5>
                            </div>
                            <span className="text-sm text-slate-700 dot">{formatDate(blog?.createdAt)}</span>
                            <span className="text-sm text-slate-700 dot">{totalLikes} Likes</span>
                        </div>
                        <img
                            className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96"
                            src={`${
                                import.meta.env.VITE_SERVER_BASE_URL
                            }/uploads/blog/${blog?.thumbnail}`}
                            alt=""
                        />

                        <ul className="tags">
                            {
                                blog?.tags?.split(",")?.map((tag,index)=> <li key={index}>{tag}</li>)
                            }
                        </ul>

                        <div className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left">
                          {blog?.content}
                        </div>
                    </div>
                </section>

                <section id="comments" ref={comment}>
                    <div className="mx-auto w-full md:w-10/12 container">
                        <h2 className="text-3xl font-bold my-8">Comments ({blog?.comments?.length ?? "0"})</h2>
                        <div className="flex items -center space-x-4">
                            <div className="avater-img bg-indigo-600 text-white">
                                <span className="">S</span>
                            </div>
                            <div className="w-full">
                                <textarea
                                    className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
                                    placeholder="Write a comment"
                                ></textarea>
                                <div className="flex justify-end mt-4">
                                    <button className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200">
                                        Comment
                                    </button>
                                </div>
                            </div>
                        </div>
                        {
                            blog?.comments?.map((comment)=> (
                                <div key={comment?.id} className="flex items-start space-x-4 my-8">
                                <div className="avater-img bg-orange-600 text-white">
                                    <span className="">{getFirstLetterOfAuthor(comment?.author?.firstName)}</span>
                                </div>
                                <div className="w-full">
                                    <h5 className="text-slate -500 font-bold">{getFullName(comment?.author?.firstName, comment?.author?.lastName)}</h5>
                                    <p className="text-slate-300">
                                        {comment?.content}
                                    </p>
                                </div>
                            </div>
                            ))
                        }
                       
                    </div>
                </section>
            </main>

            <div className="floating-action">
                <ul className="floating-action-menus">
                    <li  onClick={()=> handleLike()}>
                        <img src={liked ? likeFilledIcon : likeIcon} alt="like" />
                        {/* <img src={likeFilledIcon} alt="" /> */}
                        <span>{totalLikes}</span>
                    </li>

                    <li>
                        <img src={heartIcon} alt="Favourite" />
                    </li>
                    <button onClick={()=> comment?.current?.scrollIntoView({behavior: 'smooth'})}>
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
