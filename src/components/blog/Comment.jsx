import { useBlog } from '../../hooks/useBlog';
import { getFirstLetter } from '../../utils';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { useParams } from 'react-router-dom';
import { actions } from '../../actions';

const Comment = () => {
    const { blogId } = useParams();
    const { auth } = useAuth();
    const {api} = useAxios();
    const { state, dispatch } = useBlog();
    const [comment, setComment] = useState("");
    const getFullName = (firstName, lastName) => {
        return (firstName ?? '') + " " + (lastName ?? '');
    }

    const handleAddComment = async() => {
        try {
            const response = await api.post(
                `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}/comment`,{content:comment}
            );
            if (response.status === 200) {
                dispatch({
                    type: actions.blogDetail.DATA_FETCHED,
                    data: response?.data ?? {},
                });
                setComment("");
            }
        } catch (error) {
            console.error(error);
        }
    }
    

    return (
        <div className="mx-auto w-full md:w-10/12 container">
            <h2 className="text-3xl font-bold my-8">Comments ({state?.blogDetail?.comments?.length ?? "0"})</h2>
            <div className="flex items -center space-x-4">
                <div className="avater-img bg-indigo-600 text-white">
                    <span className="">S</span>
                </div>
                <div className="w-full">
                    <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                        className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
                        placeholder="Write a comment"
                    ></textarea>
                    <div className="flex justify-end mt-4">
                        <button onClick={handleAddComment} disabled={!auth?.user?.id} className="disabled:bg-indigo-300 bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200">
                            Comment
                        </button>
                    </div>
                </div>
            </div>
            {
                state?.blogDetail?.comments?.map((comment) => (
                    <div key={comment?.id} className="flex items-start space-x-4 my-8">
                        <div className="avater-img bg-orange-600 text-white">
                            <span className="">{getFirstLetter(comment?.author?.firstName)}</span>
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
    )
}

export default Comment