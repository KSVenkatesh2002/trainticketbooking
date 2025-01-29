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
            console.log('updated',data)
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
        <div className="flex flex-col items-center h-[92vh] w-screen justify-center bg-gradient-to-br from-[rgba(245,227,190,0.5)] via-[rgba(233,182,139,0.55)] to-[rgba(254,188,116,0.55)]">
            <h2 className="mb-3.5 text-2xl font-semibold">Update Profile</h2>
            <form onSubmit={handlesubmit} className="flex flex-col items-center w-full max-w-lg">
                
                {/* <img src={currentUser.photoURL} alt="dp" onClick={() => fileref.current.click()} className='mb-4 w-40 rounded-full bg-cover cursor-pointer' /> */}
                
                <label className="absolute left-[-1000000px]" htmlFor="username">Name</label>
                <input
                    type="text"
                    name="username"
                    value={formdata.username}
                    placeholder="Username"
                    required
                    className="h-[6vh] w-[70vw] max-w-[400px] min-h-[40px] border-2 border-dotted border-black rounded-lg bg-gradient-to-b from-[#ffad00] via-[#e89149] to-[#fab972] text-[1.2rem] pl-2 placeholder-black/60 mb-3"
                    onChange={handlechange}
                />
                
                <label className="absolute left-[-1000000px]" htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formdata.email}
                    placeholder="Email"
                    required
                    className="h-[6vh] w-[70vw] max-w-[400px] min-h-[40px] border-2 border-dotted border-black rounded-lg bg-gradient-to-b from-[#ffad00] via-[#e89149] to-[#fab972] text-[1.2rem] pl-2 placeholder-black/60 mb-3"
                    onChange={handlechange}
                />
                
                <label className="absolute left-[-1000000px]" htmlFor="dob">Date of Birth</label>
                <input
                    type="date"
                    name="dob"
                    value={formdata.dob}
                    max={max}
                    required
                    className="h-[6vh] w-[70vw] max-w-[400px] min-h-[40px] border-2 border-dotted border-black rounded-lg bg-gradient-to-b from-[#ffad00] via-[#e89149] to-[#fab972] text-[1.2rem] pl-2 placeholder-black/60 mb-3"
                    onChange={handlechange}
                />
                
                <label className="absolute left-[-1000000px]" htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    value={formdata.password}
                    placeholder="Password"
                    required
                    className="h-[6vh] w-[70vw] max-w-[400px] min-h-[40px] border-2 border-dotted border-black rounded-lg bg-gradient-to-b from-[#ffad00] via-[#e89149] to-[#fab972] text-[1.2rem] pl-2 placeholder-black/60 mb-3"
                    onChange={handlechange}
                />
                
                <input
                    type="submit"
                    value={loading ? 'Loading...' : 'Update'}
                    className={`h-[6vh] w-[70vw] max-w-[200px] min-h-[40px] border-2 rounded-full text-white cursor-pointer ${loading ? 'bg-gray-400' : 'bg-[#09122C]'}`}
                />
                
                <input
                    type="button"
                    onClick={handleSignout}
                    value={loading ? 'Loading...' : 'Sign Out'}
                    className={`h-[6vh] w-[70vw] max-w-[200px] min-h-[40px] border-2 rounded-full text-white cursor-pointer mt-4 ${loading ? 'bg-gray-400' : 'bg-red-600'}`}
                />
            </form>

            {error && <span className="text-red-500 text-xl font-semibold mt-4">{error}</span>}
        </div>
    );
}
export default Profile
