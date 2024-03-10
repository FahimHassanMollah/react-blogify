// import { useAuth } from "../hooks/useAuth"
import { Outlet, Navigate } from "react-router-dom";
const PrivateRoutes = () => {
//   const { auth } = useAuth();
  const { auth } = false;


  return (
    <>
        {
            auth?.user ? (
                <Outlet />
            ) : (
                <Navigate to="/login" />
            )
        }
    </>
  )
}

export default PrivateRoutes;