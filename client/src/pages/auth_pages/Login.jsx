import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { start, failure, success } from '../../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../../component/OAuth';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formdata, setformdata] = useState({});
    const { loading, error } = useSelector((state) => state.user);

    const handlechange = (e) => {
        setformdata({ ...formdata, [e.target.name]: e.target.value });
    };

    const handlesubmit = async (e) => {
        dispatch(start());
        e.preventDefault();

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(formdata),
        });

        const data = await res.json();
        if (data.success === false) {
            dispatch(failure(data.message));
            return;
        }
        navigate('/');
        dispatch(success(data.other));
    };

    return (
        <div className="flex flex-col justify-start items-center w-screen h-[92vh]">
            <h2 className="text-xl font-bold mb-4">Login to Your Account</h2>
            <form onSubmit={handlesubmit} className="flex flex-col justify-center items-center">
                <label className="absolute left-[-1000000px]" htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    value={formdata.username}
                    placeholder="Username"
                    required
                    className="h-[6vh] w-[70vw] max-w-[400px] min-h-[40px] border-2 border-dotted border-black rounded-lg bg-gradient-to-b from-[#ffad00] via-[#e89149] to-[#fab972] text-[1.2rem] pl-2 placeholder-black/60"
                    onChange={handlechange}
                />
                <br />

                <label className="absolute left-[-1000000px]" htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    value={formdata.password}
                    placeholder="Password"
                    required
                    className="h-[6vh] w-[70vw] max-w-[400px] min-h-[40px] border-2 border-dotted border-black rounded-lg bg-gradient-to-b from-[#ffad00] via-[#e89149] to-[#fab972] text-[1.2rem] pl-2 placeholder-black/60"
                    onChange={handlechange}
                />
                <br />

                <input
                    className={`h-[6vh] w-[70vw] max-w-[200px] min-h-[40px] border-2 rounded-full text-white cursor-pointer ${
                        loading ? 'bg-gray-400 border-gray-400' : 'bg-[#09122C] border-black'
                    }`}
                    type="submit"
                    value={loading ? 'Loading...' : 'Login'}
                />
            </form>

            {error && <span className="text-red-500 text-xl font-semibold mt-2">{error}</span>}

            <div className="relative flex justify-center items-center w-[70vw] max-w-[400px]">
                <span className="absolute left-0 top-1/2 w-[20vw] border-2 border-black rounded-md bg-black"></span> <span className="relative my-2 text-center">OR</span>
                <span className="absolute right-0 top-1/2 w-[20vw] border-2 border-black rounded-md bg-black"></span>
            </div>

            <OAuth />

            <span className="text-[rgb(79,51,9)] cursor-pointer font-bold mt-2">
                <Link to={'/auth/signup'}>Create an account!</Link>
            </span>
        </div>
    );
};

export default Login;
