import { Outlet, useNavigate, Navigate } from "react-router";
import { getCookie } from "./handle-user-cookie";

const PrivateRoutesLogged = () => {
    let user = getCookie()
    let navigate = useNavigate()

    return (
        user ? <Navigate to="/"/> : <Outlet/>
    )
}

export default PrivateRoutesLogged