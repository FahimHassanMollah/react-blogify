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
                if (response.data.blogs.length === 0) {
                    setHasMoreData(false);
                }
                setPage((prevPage) => {
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