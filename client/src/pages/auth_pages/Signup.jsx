import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { start, failure, success } from '../../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../../component/OAuth';

const Signup = () => {
    const currentD = new Date();
    const old = new Date(currentD.getFullYear() - 18, currentD.getMonth(), currentD.getDate());
    const max = old.toISOString().split('T')[0];

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formdata, setformdata] = useState({ dob: max });
    const { loading, error } = useSelector((state) => state.user);

    const handlechange = (e) => {
        setformdata({ ...formdata, [e.target.name]: e.target.value });
        console.log(formdata);
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        dispatch(start());

        const res = await fetch('/api/auth/signup', {
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
        navigate('/auth/login');
        dispatch(success(data.other));
    };

    return (
        <div className="flex flex-col justify-start items-center w-full h-[92vh]">
            <h2 className="text-xl font-bold mb-4">Create An Account</h2>
            <form onSubmit={handlesubmit} className="flex flex-col justify-center items-center">
                <label className="absolute left-[-1000000px]" htmlFor="username">name</label>
                <input
                    type="text"
                    name="username"
                    value={formdata.username}
                    placeholder="Username"
                    required
                    className="h-[6vh] w-[70vw] max-w-[400px] min-h-[40px] border-2 border-black rounded-lg "
                    onChange={handlechange}
                />
                <br />
                
                <label className="absolute left-[-1000000px]" htmlFor="email">email</label>
                <input
                    type="email"
                    name="email"
                    value={formdata.email}
                    placeholder="Email"
                    required
                    className="h-[6vh] w-[70vw] max-w-[400px] min-h-[40px] border-2  border-black rounded-lg "
                    onChange={handlechange}
                />
                <br />

                <label className="absolute left-[-1000000px]" htmlFor="dob">dob</label>
                <input
                    type="date"
                    name="dob"
                    max={max}
                    value={formdata.dob}
                    required
                    className="h-[6vh] w-[70vw] max-w-[400px] min-h-[40px] border-2  border-black rounded-lg"
                    onChange={handlechange}
                />
                <br />

                <label className="absolute left-[-1000000px]" htmlFor="password">password</label>
                <input
                    type="password"
                    name="password"
                    value={formdata.password}
                    placeholder="Password"
                    required
                    className="h-[6vh] w-[70vw] max-w-[400px] min-h-[40px] border-2  border-black rounded-lg "
                    onChange={handlechange}
                />
                <br />

                <input
                    className={`h-[6vh] w-[70vw] max-w-[200px] min-h-[40px] border-2 rounded-full text-white cursor-pointer ${
                        loading ? 'bg-gray-400 border-gray-400' : 'bg-[#09122C] border-black'
                    }`}
                    type="submit"
                    value={loading ? 'Loading...' : 'Sign Up'}
                />
            </form>

            {error && <span className="text-red-500 mt-2">{error}</span>}
            
            <div className="relative flex justify-center items-center w-7/10 max-w-[400px]">
                <span className="absolute left-0 top-1/2 w-40 border-2 border-black rounded-md bg-black"></span> <span className="relative my-2 text-center">OR</span>
                <span className="absolute right-0 top-1/2 w-40 border-2 border-black rounded-md bg-black"></span>
            </div>

            <OAuth />

            <span className="text-[rgb(79,51,9)] cursor-pointer font-bold mt-2">
                <Link to={'/auth/login'}>Already have an account!</Link>
            </span>
        </div>
    );
};

export default Signup;
