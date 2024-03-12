import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

const LoginPage = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();
    const submitForm = async (formData) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`, formData);

            if (response.status === 200) {
                const { token, user } = response.data;
                if (token) {
                    const authToken = token.accessToken;
                    const refreshToken = token.refreshToken;

                    setAuth({ user, authToken, refreshToken });

                    navigate("/");
                }
            }
        } catch (error) {
            console.error(error);
            setError("root.random", {
                type: "random",
                message: `User with email ${formData.email} is not found`,
            })
        }
    }
    return (
        <section className="container">

            <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
                <h2 className="text-2xl font-bold mb-6">Login</h2>
                <form onSubmit={handleSubmit(submitForm)}>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2">Email</label>
                        <input
                            {...register("email", { required: "Email ID is Required" })}
                            // type="email"
                            id="email"
                            name="email"
                            className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                   
                    
                    <div role="alert" className='text-red-600'>{errors?.email?.message}</div>
                    
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2">Password</label>
                        <input
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Your password must be at least 8 characters",
                                },
                            })}
                            type="password"
                            id="password"
                            name="password"
                            className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
                        />
                        
                            <div role="alert" className='text-red-600'>{errors?.password?.message}</div>
                        

                    </div>
                    <p>{errors?.root?.random?.message}</p>
                    <div className="mb-6">
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                        >
                            Login
                        </button>
                    </div>
                    <p className="text-center">
                        Don't have an account? <Link to="/register" className="text-indigo-600 hover:underline">Register</Link>
                    </p>
                </form>
            </div>
        </section>
    )
}

export default LoginPage