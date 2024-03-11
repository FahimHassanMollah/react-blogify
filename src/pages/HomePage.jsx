
import BlogList from "../components/blog/BlogList";
import FavouriteBlogList from "../components/blog/FavouriteBlogList";
import PopularBlogList from "../components/blog/PopularBlogList";
import { useAuth } from "../hooks/useAuth";

const HomePage = () => {
   const {auth} = useAuth();
    return (
        <main>
            <section>
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                        <div className="space-y-3 md:col-span-5">
                            <BlogList/>
                        </div>

                        <div className="md:col-span-2 h-full w-full space-y-5">
                           
                            <PopularBlogList/>
                            {
                                auth?.user?.id ? <FavouriteBlogList/> : ""
                            }
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default HomePage;
