/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import theedDotIcon from "../../assets/icons/3dots.svg";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import { useState } from "react";
const BlogCard = ({ blog }) => {
    const navigate = useNavigate();
    const [openAction, setOpenAction] = useState(false)
    const totalLikes = blog?.likes?.length ?? 0;
    const authorName = (blog?.author?.firstName ?? '') + " " + (blog?.author?.lastName ?? '');
    const formatDate = (nonForamtDate) => {
        if (!nonForamtDate) return;
        const createdAt = nonForamtDate;
        const date = new Date(createdAt);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);

        return formattedDate;

    }
    const firstLetterOfAuthor = authorName?.charAt(0) ?? '';
    const goToProfile = (event) => {
        event.stopPropagation();
        navigate(`/profile/${blog?.author?.id}`)
    }
    const goToBlogDetails = () => {
        navigate(`/blog/${blog?.id}`)
    }
    return (
        <div onClick={goToBlogDetails} className="blog-card">
            <img
                className="blog-thumb"
                src={`${import.meta.env.VITE_SERVER_BASE_URL
                    }/uploads/blog/${blog?.thumbnail}`}
                alt=""
            />
            <div className="mt-2 relative">
                <h3 className="text-slate-300 text-xl lg:text-2xl">
                    <Link to={`/blog/${blog?.id}`} >{blog?.title}</Link>
                </h3>
                <p className="mb-6 text-base text-slate-500 mt-1">
                    {blog?.content}
                </p>

                <div className="flex justify-between items-center">
                    <div onClick={goToProfile} className="flex items-center capitalize space-x-2">
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
                    <div className="absolute right-0 top-0">
                        <button onClick={(e)=> {
                            e.stopPropagation();
                            setOpenAction(!openAction)
                        }}>
                            <img
                                src={theedDotIcon}
                                alt="3dots of Action"
                            />
                        </button>


                       {
                        openAction &&  <div className="action-modal-container">
                        <button
                            className="action-menu-item hover:text-lwsGreen"
                        >
                            <img
                                src={editIcon}
                                alt="Edit"
                            />
                            Edit
                        </button>
                        <button
                            onClick={(e)=> {
                                e.stopPropagation();
                                console.log('delete');
                            }}
                            className="action-menu-item hover:text-red-500"
                        >
                            <img
                                src={deleteIcon}
                                alt="Delete"
                            />
                            Delete
                        </button>
                    </div>
                       }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default BlogCard