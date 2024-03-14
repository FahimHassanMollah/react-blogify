/* eslint-disable react/prop-types */

import { Link,useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import theedDotIcon from "../../assets/icons/3dots.svg";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../api";
import { useBlog } from "../../hooks/useBlog";
import { actions } from "../../actions";
import { useProfile } from "../../hooks/useProfile";
const BlogCard = ({ blog }) => {
    const location = useLocation()
    const navigate = useNavigate();
    const { auth } = useAuth();
    const { state, dispatch } = useBlog();
     const { state:profileState, dispatch:profileDispatch} = useProfile();
    
    const [openAction, setOpenAction] = useState(false);
    const [isMyBlog, setIsMyBlog] = useState(blog?.author?.id === auth?.user?.id);
    const totalLikes = blog?.likes?.length ?? 0;
    const authorName =
        (blog?.author?.firstName ?? "") + " " + (blog?.author?.lastName ?? "");
    const formatDate = (nonForamtDate) => {
        if (!nonForamtDate) return;
        const createdAt = nonForamtDate;
        const date = new Date(createdAt);
        const options = { year: "numeric", month: "long", day: "numeric" };
        const formattedDate = date.toLocaleDateString("en-US", options);
        return formattedDate;
    };
    const firstLetterOfAuthor = authorName?.charAt(0) ?? "";
    const goToProfile = (event) => {
        event.stopPropagation();
        navigate(`/profile/${blog?.author?.id}`);
    };
    const goToBlogDetails = () => {
        navigate(`/blog/${blog?.id}`);
    };
    const handleDeleteBlog = async(e) => {
        e.stopPropagation();
        try {
          const response = await api.delete(`/blogs/${blog?.id}`);
            if (response.status === 200) {
                if (location.pathname ===  "/") {
                    dispatch({
                        type: actions.blog.BLOG_DELETED,
                        data: blog?.id,
                    });
                }
                else{
                    profileDispatch({
                        type: actions.profile.PROFILE_BLOG_DELETED,
                        data: blog?.id,
                    } )
                }
               
            }

        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div onClick={goToBlogDetails} className="blog-card">
            <img
                className="blog-thumb"
                src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${blog?.thumbnail
                    }`}
                alt=""
            />
            <div className="mt-2 relative">
                <h3 className="text-slate-300 text-xl lg:text-2xl">
                    <Link to={`/blog/${blog?.id}`}>{blog?.title}</Link>
                </h3>
                <p className="mb-6 text-base text-slate-500 mt-1">{blog?.content}</p>

                <div className="flex justify-between items-center">
                    <div
                        onClick={goToProfile}
                        className="flex items-center capitalize space-x-2"
                    >
                        <div className="avater-img bg-indigo-600 text-white">
                            <span className="">{firstLetterOfAuthor}</span>
                        </div>

                        <div>
                            <h5 className="text-slate-500 text-sm">
                                <span>{authorName}</span>
                            </h5>
                            <div className="flex items-center text-xs text-slate-700">
                                <span>{formatDate(blog?.createdAt)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-sm px-2 py-1 text-slate-700">
                        <span>{totalLikes} Likes</span>
                    </div>
                    {isMyBlog && (
                        <div className="absolute right-0 top-0">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenAction(!openAction);
                                }}
                            >
                                <img src={theedDotIcon} alt="3dots of Action" />
                            </button>

                            {openAction && (
                                <div className="action-modal-container">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/blog/edit/${blog?.id}`);
                                        }}
                                        className="action-menu-item hover:text-lwsGreen"
                                    >
                                        <img src={editIcon} alt="Edit" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={handleDeleteBlog}
                                        className="action-menu-item hover:text-red-500"
                                    >
                                        <img src={deleteIcon} alt="Delete" />
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
