import { useEffect, useState } from "react";
import { actions } from "../actions";
import { useAuth } from "../hooks/useAuth";
import { useProfile } from "../hooks/useProfile";
import ProfileImage from "../components/profile/ProfileImage";
import Bio from "../components/profile/Bio";
import useAxios from "../hooks/useAxios";
import BlogCard from "../components/blog/BlogCard";

const ProfilePage = () => {
  const { api } = useAxios();
  const { state, dispatch } = useProfile();
  const { auth } = useAuth();
  const authorName = (state?.firstName ?? '') + " " + (state?.lastName ?? '');


  useEffect(() => {
    dispatch({ type: actions.profile.DATA_FETCHING });
    const fetchProfile = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
        );
        if (response.status === 200) {
          dispatch({
            type: actions.profile.DATA_FETCHED,
            data: response.data,
          });
        }
      } catch (error) {
        dispatch({
          type: actions.profile.DATA_FETCH_ERROR,
          error: "An error occurred please try again later",
        });
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <main className="mx-auto max-w-[1020px] py-8">
        <div className="container">
          <div className="flex flex-col items-center py-8 text-center">
            <ProfileImage />
            <div>
              <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
                {authorName}
              </h3>
              <p className="leading-[231%] lg:text-lg">{state?.email}</p>
            </div>
            <Bio />
            <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
          </div>
          {
            state?.blogs?.length > 0 ? <>
              <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Blogs</h4>
              <div className="my-6 space-y-4">
               { state?.blogs?.map((singleBlog,index)=> <BlogCard key={index} blog={singleBlog}/>)}
              </div>


            </> : <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl text-center text-red-400">No Blogs Found</h4>
          }

        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
