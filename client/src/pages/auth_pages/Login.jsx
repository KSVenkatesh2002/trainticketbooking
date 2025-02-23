import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { start, failure, success } from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../../component/OAuth";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formdata, setformdata] = useState({});
    const { loading, error } = useSelector((state) => state.user);

    const handleChange = (e) => {
        setformdata({ ...formdata, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(start());

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(formdata),
        });

        const data = await res.json();
        if (data.success === false) {
            dispatch(failure(data.message));
            return;
        }
        navigate("/");
        dispatch(success(data.other));
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4 text-white">Welcome Back!</h2>

            <form onSubmit={handleSubmit} className="flex flex-col w-full mb-4">
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    required
                    className="input-field"
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    className="input-field"
                    onChange={handleChange}
                />

                <button type="submit" className="btn-submit mt-4">
                    {loading ? "Loading..." : "Login"}
                </button>
            </form>

            {error && <span className="text-red-500 mt-2">{error}</span>}

            <OAuth />

            <span className="mt-2 text-blue-400">
                <Link to="/auth/signup">Create an account!</Link>
            </span>
        </div>
    );
};

export default Login;
