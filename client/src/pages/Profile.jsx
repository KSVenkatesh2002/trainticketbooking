import { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { start, failure, success, signout } from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux';

const Profile = () => {
    const currentD = new Date();
    const old = new Date(currentD.getFullYear() - 18, currentD.getMonth(), currentD.getDate());
    const max = old.toISOString().split('T')[0];

    const { currentUser } = useSelector((state) => state.user)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const fileref = useRef(null)
    const [formdata, setformdata] = useState({
        username: currentUser.username,
        email: currentUser.email,
        dob: currentUser.dob,
        password: '' // Initialize the password property
    });
    const { loading, error } = useSelector((state) => state.user)

    const handlechange = (e) => {
        setformdata({ ...formdata, [e.target.name]: e.target.value })
    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        dispatch(start())
        try {
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(formdata)
            })
            const data = await res.json()
            if (data.success === false) {
                dispatch(failure(data.message))
                return;
            }
            dispatch(success(data))
            navigate('/')
        } catch (err) {
            dispatch(failure(err.message))
        }
    }

    const handleSignout = async () => {
        dispatch(start())
        try {
            const res = await fetch('/api/auth/signout', {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                }
            })
            if(res.success === false){ 
                dispatch(failure(res.json.message))
                return;
            }
            dispatch(signout())
            navigate('/')
        } catch (error) {
            dispatch(failure(error))
        }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-[#09122C] text-white">
            <div className="w-full max-w-md p-6 bg-[#151D3B] rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-4">Update Profile</h2>
                <form onSubmit={handlesubmit} className="flex flex-col gap-4">
                    
                    <label className="text-sm" htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formdata.username}
                        placeholder="Username"
                        required
                        className="p-2 rounded bg-[#1F2A49] border border-gray-600 text-white"
                        onChange={handlechange}
                    />
                    
                    <label className="text-sm" htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formdata.email}
                        placeholder="Email"
                        required
                        className="p-2 rounded bg-[#1F2A49] border border-gray-600 text-white"
                        onChange={handlechange}
                    />
                    
                    <label className="text-sm" htmlFor="dob">Date of Birth</label>
                    <input
                        type="date"
                        name="dob"
                        value={formdata.dob}
                        max={max}
                        required
                        className="p-2 rounded bg-[#1F2A49] border border-gray-600 text-white"
                        onChange={handlechange}
                    />
                    
                    <label className="text-sm" htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formdata.password}
                        placeholder="Password"
                        required
                        className="p-2 rounded bg-[#1F2A49] border border-gray-600 text-white"
                        onChange={handlechange}
                    />
                    
                    <button
                        type="submit"
                        disabled={loading}
                        className="p-2 bg-[#0084FF] rounded text-white font-semibold hover:bg-[#005FCC] disabled:bg-gray-500"
                    >
                        {loading ? 'Loading...' : 'Update'}
                    </button>

                    <button
                        type="button"
                        onClick={handleSignout}
                        disabled={loading}
                        className="p-2 bg-red-600 rounded text-white font-semibold hover:bg-red-700 disabled:bg-gray-500"
                    >
                        {loading ? 'Loading...' : 'Sign Out'}
                    </button>

                    {error && <span className="text-red-400 text-center">{error}</span>}
                </form>
            </div>
        </div>
    );
}

export default Profile;
