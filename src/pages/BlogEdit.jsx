import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { useEffect, useRef, useState } from "react";
import { useBlog } from "../hooks/useBlog";
import { actions } from "../actions";
import { Link, useParams } from "react-router-dom";

const BlogEdit = () => {
    const { blogId } = useParams();
    const [orginalBlogData, setOrginalBlogData] = useState()
    const { state, dispatch } = useBlog();
    const fileUploaderRef = useRef();
    const { api } = useAxios();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        setError,
        clearErrors
    } = useForm();
   
    const submitForm = async (formData) => {
        try {
            const newFormData = new FormData();
            if (fileUploaderRef.current.files[0]) {
                newFormData.append("thumbnail", fileUploaderRef.current.files[0]);
            }
            newFormData.append("title", formData.title);
            newFormData.append("tags", formData.tags);
            newFormData.append("content", formData.content);

            const response = await api.patch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}`,
                newFormData
            );

            if (response.status === 200) {
                // making this delay because the local server has some issue 
               setTimeout(() => {
                navigate(`/blog/${response.data?.id}`);
               }, 1000);
            }
        } catch (error) {
            setError("root.random", {
                type: "random",
                message: `Something went wrong. Please try again later.`,
            });
        }
    };

    const handleFile = (event) => {
        event.preventDefault();
        fileUploaderRef.current.addEventListener("change", onFileChange);
        fileUploaderRef.current.click();
    };
    const onFileChange = () => {
      if (fileUploaderRef.current?.files[0]) {
        clearErrors("root.thumbnail");
      }
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
                setValue("title", response?.data?.title);
                setValue("tags", response?.data?.tags);
                setValue("content", response?.data?.content);
                setOrginalBlogData(response?.data)
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

    

    return (
        <main>
            <section>
                <div className="container">
                    <form onSubmit={handleSubmit(submitForm)} className="createBlog">
                    {
                        fileUploaderRef.current?.files[0] ? "" : <img className="w-full" src={`${import.meta.env.VITE_SERVER_BASE_URL
                        }/uploads/blog/${orginalBlogData?.thumbnail}`} alt="" />
                    }
                        <div className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4">
                            <div onClick={handleFile} className="flex items-center gap-4 hover:scale-110 transition-all cursor-pointer">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                    />
                                </svg>
                                <p>Upload Your Image</p>
                                
                            </div>
                           
                            <input 
                                id="file" type="file" ref={fileUploaderRef} hidden  />

                            <div role="alert" className='text-red-600'>{errors?.root?.thumbnail?.message}</div>

                        </div>
                        
                        <div className="mb-6">
                            <input
                                {...register("title", {
                                    required: "Title  is Required",
                                })}
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Enter your blog title"
                            />
                            <div role="alert" className='text-red-600'>{errors?.title?.message}</div>

                        </div>

                        <div className="mb-6">
                            <input

                                {...register("tags", {
                                    required: "Tags  is Required",
                                })}
                                type="text"
                                id="tags"
                                name="tags"
                                placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
                            />
                            <div role="alert" className='text-red-600'>{errors?.tags?.message}</div>

                        </div>

                        <div className="mb-6">
                            <textarea
                                {...register("content", {
                                    required: "Content  is Required",
                                })}
                                id="content"
                                name="content"
                                placeholder="Write your blog content"
                                rows="8"
                            ></textarea>
                        </div>
                        <div role="alert" className='text-red-600'>{errors?.content?.message}</div>

                        <p>{errors?.root?.random?.message}</p>

                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                        >
                            Update Blog
                        </button>
                    </form>
                   
                </div>
            </section>
        </main>
    );
};

export default BlogEdit;
