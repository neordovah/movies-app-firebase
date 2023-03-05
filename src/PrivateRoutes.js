import { Outlet, useNavigate, Navigate } from "react-router";
import { getCookie } from "./handle-user-cookie";

const PrivateRoutes = () => {
    let user = getCookie()
    let navigate = useNavigate()

    return (
        user ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes