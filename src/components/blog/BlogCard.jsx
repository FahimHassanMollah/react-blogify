/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
    const navigate = useNavigate();

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
                src={`${
                    import.meta.env.VITE_SERVER_BASE_URL
                }/uploads/blog/${blog?.thumbnail}`}
                alt=""
            />
            <div className="mt-2">
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
                </div>
            </div>
        </div>
    )
}

export default BlogCard