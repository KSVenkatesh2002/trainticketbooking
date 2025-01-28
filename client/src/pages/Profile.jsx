import { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import style from '../css/Signup.module.css'
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
        <div className='flex flex-col items-center h-[92vh] w-screen justify-center bg-gradient-to-br from-[rgba(245,227,190,0.5)] via-[rgba(233,182,139,0.55)] to-[rgba(254,188,116,0.55)]'>
            <h2 className='mb-3.5'>Update Profile</h2>
            <form onSubmit={(e) => handlesubmit(e)}>

                {/* <img src={currentUser.photoURL} alt="dp" onClick={() => fileref.current.click()} className='mb-4 w-40 rounded-full bg-cover cursor-pointer' /> */}
                <label htmlFor="username"> name</label>
                <input
                    type="text"
                    name="username"
                    value={formdata.username}
                    placeholder='username'
                    required
                    onChange={(e) => handlechange(e)}
                /><br />
                <label htmlFor="email"> email</label>
                <input
                    type="email"
                    name="email"
                    value={formdata.email}
                    placeholder='email'
                    required
                    onChange={(e) => handlechange(e)}
                /><br />
                <label htmlFor="dob"> dob </label>
                <input
                    type="date"
                    name="dob"
                    value={formdata.dob}
                    max={max}
                    required
                    onChange={(e) => handlechange(e)}
                /><br />
                <label htmlFor="password"> password</label>
                <input
                    type="password"
                    name="password"
                    value={formdata.password}
                    placeholder='password'
                    required
                    onChange={(e) => handlechange(e)}
                /><br />
                <input
                    style={{ background: loading ? '#b9bdcb' : '#09122C' }}
                    className={style.submitbtn}
                    type="submit"
                    value={loading ? 'loading' : 'update'}
                />
                <input
                    style={{ background: loading ? '#b9bdcb' : '#09122C' }}
                    className={style.signoutbtn}
                    type="button"
                    onClick={() => handleSignout()}
                    value={loading ? 'loading' : 'sign out'}
                />
            </form>
            <span>{error}</span>
        </div>
    )
}
export default Profile
