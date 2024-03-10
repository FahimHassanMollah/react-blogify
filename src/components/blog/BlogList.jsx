import { useEffect, useRef, useState } from "react";
import { useBlog } from "../../hooks/useBlog";
import { actions } from "../../actions";
import axios from "axios";
import BlogCard from "./BlogCard";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

const BlogList = () => {
    const [hasMoreData, setHasMoreData] = useState(true);
    const [page, setPage] = useState(1);
    const loaderRef = useRef(null);
    const { state, dispatch } = useBlog();
    const blogs = state.blogs?.blogs;
    // console.log(state);
    const fetchBlogs = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/?page=${page}&limit=5`
            );
            if (response.status === 200) {
                dispatch({
                    type: actions.blog.DATA_FETCHED,
                    data: response.data,
                });
                console.log(response.data.blogs);
                if (response.data.blogs.length === 0) {
                    setHasMoreData(false);
                }
                // console.log('called',page);
                setPage((prevPage) => {
                    console.log('prevPage',prevPage);
                    return prevPage + 1;
                
                });

            }
        } catch (error) {
            console.error(error);
            dispatch({
                type: actions.blog.DATA_FETCH_ERROR,
                error: error.message,
            });
        }
    };
    useInfiniteScroll(loaderRef, hasMoreData, fetchBlogs);

    useEffect(() => {
        fetchBlogs();
    }, []);
    return (
        <>
            {
                blogs?.map((singleBlog,index)=> <BlogCard key={index} blog={singleBlog}/>)
            }
            {
                blogs?.length !== 0 && hasMoreData ?  <div ref={loaderRef}>
                <h2>Loading...</h2> 
                </div> : 'No more data to load'
            }
           
        </>
    )
}

export default BlogList

// {
//     <div>
//         {/* <div className="blog-card">
//         <img
//             className="blog-thumb"
//             src="./assets/blogs/React-Roadmap.jpg"
//             alt=""
//         />
//         <div className="mt-2 relative">
//             <a href="./single-blog.html">
//                 <h3 className="text-slate-300 text-xl lg:text-2xl">
//                     <a href="./single-blog.html">React Roadmap in 2024</a>
//                 </h3>
//             </a>
//             <p className="mb-6 text-base text-slate-500 mt-1">
//                 Aenean eleifend ante maecenas pulvinar montes lorem et pede
//                 dis dolor pretium donec dictum. Vici consequat justo enim.
//                 Venenatis eget adipiscing luctus lorem.
//             </p>

//             <div className="flex justify-between items-center">
//                 <div className="flex items-center capitalize space-x-2">
//                     <div className="avater-img bg-indigo-600 text-white">
//                         <span className="">S</span>
//                     </div>

//                     <div>
//                         <h5 className="text-slate-500 text-sm">
//                             <a href="./profile.html">Saad Hasan</a>
//                         </h5>
//                         <div className="flex items-center text-xs text-slate-700">
//                             <span>June 28, 2018</span>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="text-sm px-2 py-1 text-slate-700">
//                     <span>100 Likes</span>
//                 </div>
//             </div>

//             <div className="absolute right-0 top-0">
//                 <button>
//                     <img
//                         src="./assets/icons/3dots.svg"
//                         alt="3dots of Action"
//                     />
//                 </button>

//                 <div className="action-modal-container">
//                     <button className="action-menu-item hover:text-lwsGreen">
//                         <img src="./assets/icons/edit.svg" alt="Edit" />
//                         Edit
//                     </button>
//                     <button className="action-menu-item hover:text-red-500">
//                         <img src="./assets/icons/delete.svg" alt="Delete" />
//                         Delete
//                     </button>
//                 </div>
//             </div>
//         </div>
//     </div> */}

//         <div className="blog-card">
//             <img
//                 className="blog-thumb"
//                 src="./assets/blogs/Underrated Video.jpg"
//                 alt=""
//             />
//             <div className="mt-2">
//                 <h3 className="text-slate-300 text-xl lg:text-2xl">
//                     <a href="./single-blog.html">React Fetch API</a>
//                 </h3>
//                 <p className="mb-6 text-base text-slate-500 mt-1">
//                     Aenean eleifend ante maecenas pulvinar montes lorem et pede
//                     dis dolor pretium donec dictum. Vici consequat justo enim.
//                     Venenatis eget adipiscing luctus lorem.
//                 </p>

//                 <div className="flex justify-between items-center">
//                     <div className="flex items-center capitalize space-x-2">
//                         <div className="avater-img bg-indigo-600 text-white">
//                             <span className="">S</span>
//                         </div>

//                         <div>
//                             <h5 className="text-slate-500 text-sm">
//                                 <a href="./profile.html">Saad Hasan</a>
//                             </h5>
//                             <div className="flex items-center text-xs text-slate-700">
//                                 <span>June 28, 2018</span>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="text-sm px-2 py-1 text-slate-700">
//                         <span>100 Likes</span>
//                     </div>
//                 </div>
//             </div>
//         </div>



//     </div>
// }