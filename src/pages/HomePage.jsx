
import BlogList from "../components/blog/BlogList";
import PopularBlogList from "../components/blog/PopularBlogList";

const HomePage = () => {
   
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
                            <div className="sidebar-card">
                                <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
                                    Your Favourites ❤️
                                </h3>

                                <ul className="space-y-5 my-5">
                                    <li>
                                        <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                                            How to Auto Deploy a Next.js App on Ubuntu from GitHub
                                        </h3>
                                        <p className="text-slate-600 text-sm">
                                            #tailwindcss, #server, #ubuntu
                                        </p>
                                    </li>

                                    <li>
                                        <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                                            How to Auto Deploy a Next.js App on Ubuntu from GitHub
                                        </h3>
                                        <p className="text-slate-600 text-sm">
                                            #tailwindcss, #server, #ubuntu
                                        </p>
                                    </li>

                                    <li>
                                        <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                                            How to Auto Deploy a Next.js App on Ubuntu from GitHub
                                        </h3>
                                        <p className="text-slate-600 text-sm">
                                            #tailwindcss, #server, #ubuntu
                                        </p>
                                    </li>

                                    <li>
                                        <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                                            How to Auto Deploy a Next.js App on Ubuntu from GitHub
                                        </h3>
                                        <p className="text-slate-600 text-sm">
                                            #tailwindcss, #server, #ubuntu
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default HomePage;
