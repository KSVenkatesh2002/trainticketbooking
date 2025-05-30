import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRouter = () => {
    const { currentUser } = useSelector((state) => state.user)
    return (
        currentUser ?  <Outlet/> : <Navigate to='/auth/signup'/>
    )
}

export default PrivateRouter