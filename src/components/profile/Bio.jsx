import { useProfile } from '../../hooks/useProfile';
import editIcon from "../../assets/icons/edit.svg";
import { useEffect, useState } from 'react';
import checkIcon from "../../assets/icons/check.svg";
import { actions } from '../../actions';
import { useAuth } from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';


const Bio = () => {
    const { api } = useAxios();
    const { auth } = useAuth();
    const { state, dispatch } = useProfile();
    const [bio, setBio] = useState("");
    const [editMode, setEditMode] = useState(false);


    useEffect(() => {
        setBio(state?.bio);
    }, [state?.bio]);

    const updateBio = () => {

        const updateBio = async () => {
            let formdata = new FormData();
            formdata.append("bio", bio);
            console.log(formdata);
            try {
                const response = await api.patch(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/profile/`,
                     formdata 
                );
                console.log(response);
                if (response.status === 200) {
                    dispatch({
                        type: actions.profile.DATA_UPDATED,
                        data: response?.data?.user,
                    });
                    setEditMode(false);
                }
            } catch (error) {
                dispatch({
                    type: actions.profile.DATA_UPDATE_ERROR,
                    error: error?.response?.data?.error ?? "An error occurred",
                });
            }
        };

        updateBio();
    }

    return (
        <>
            <div className="mt-4 flex items-start gap-2 lg:mt-6 w-full">
                <div className="flex-1">
                    {
                        editMode ? <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className='p-2 leading-[188%] text-gray-600 lg:text-lg rounded-md w-full'
                        /> : <p className="leading-[188%] text-gray-400 lg:text-lg">
                            {bio}
                        </p>
                    }
                </div>
                {
                    editMode ? <button
                        className="flex-center h-7 w-7 rounded-full"
                        onClick={updateBio}
                    >
                        <img src={checkIcon} alt="Edit" />
                    </button> : <button className="flex-center h-7 w-7 rounded-full">
                        <img onClick={() => setEditMode(true)} src={editIcon} alt="Edit" />
                    </button>
                }

            </div>
            <div role="alert" className='text-red-600'>{state?.error}</div>

        </>
    )
}

export default Bio