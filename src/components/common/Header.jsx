import logo from '../../assets/logo.svg';
import searchIcon from '../../assets/icons/search.svg';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import { getFirstLetter } from '../../utils';

const Header = () => {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();

    console.log(auth, "auth");
    const isLoggedIn = auth?.user?.id && auth?.authToken && auth?.refreshToken;

    const handleAuth = () => {
        if (isLoggedIn) {
            setAuth({});
        }
        navigate('/login')

    }

    return (
        <header>
            <nav className="container">

                <div>
                    <Link to="/">
                        <img className="w-32" src={logo} alt="lws" />
                    </Link>
                </div>


                <div>
                    <ul className="flex items-center space-x-5">
                        <li>
                            <a
                                href="./createBlog.html"
                                className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                            >
                                Write
                            </a>
                        </li>
                        {
                            isLoggedIn && (
                                <li>
                                    <a href="./search.html" className="flex items-center gap-2 cursor-pointer">
                                        <img src={searchIcon} alt="Search" />
                                        <span>Search</span>
                                    </a>
                                </li>
                            )
                        }
                        <li>
                            <button onClick={handleAuth} className="text-white/50 hover:text-white transition-all duration-200"> {isLoggedIn ? 'Logout' : 'Login'} </button>
                        </li>
                        {
                            isLoggedIn && <li onClick={()=> navigate("/profile")} className="flex items-center cursor-pointer">

                                <div className="avater-img bg-orange-600 text-white">
                                    <span className="">{getFirstLetter(auth?.user?.firstName)}</span>
                                </div>
                                <span className="text-white ml-2">
                                    {auth?.user?.firstName} {auth?.user?.lastName}
                                </span>
                            </li>
                        }
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header