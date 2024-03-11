import { useRef } from "react";
import { useProfile } from "../../hooks/useProfile";
import { actions } from "../../actions";
import { getFirstLetter } from "../../utils";
import editIcon from "../../assets/icons/edit.svg";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../hooks/useAuth";

const ProfileImage = () => {
    const { api } = useAxios();
    const { auth, setAuth } = useAuth();
    const { state, dispatch } = useProfile();
    const fileUploaderRef = useRef();

    const handleImageUpload = (event) => {
        event.preventDefault();

        fileUploaderRef.current.addEventListener("change", updateImageDisplay);
        fileUploaderRef.current.click();
    };
    const updateImageDisplay = async () => {
        try {
            const formData = new FormData();
            for (const file of fileUploaderRef.current.files) {
                formData.append("avatar", file);
            }

            const response = await api.patch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/profile/`,
                formData
            );
            console.log(response);
            if (response.status === 200) {
                dispatch({
                    type: actions.profile.IMAGE_UPDATED,
                    data: response?.data?.user,
                });
                setAuth({
                    ...auth,
                    user: { ...auth.user, avatar: response?.data?.user?.avatar },
                });
            }
        } catch (error) {
            dispatch({
                type: actions.profile.DATA_FETCH_ERROR,
                error: error.message,
            });
        }
    };

    return (
        <>
            <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
                <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
                    {state?.avatar ? (
                        <img
                        className="w-full h-full object-cover rounded-full"
                            src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${state?.avatar
                                }`}
                            alt=""
                        />
                    ) : (
                        <span className="">{getFirstLetter(state?.firstName)}</span>
                    )}
                </div>

                <button
                    onClick={handleImageUpload}
                    className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80"
                >
                    <img src={editIcon} alt="Edit" />
                </button>
                <input id="file" type="file" ref={fileUploaderRef} hidden />
            </div>
        </>
    );
};

export default ProfileImage;
