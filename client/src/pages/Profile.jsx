import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import style from '../css/Signup.module.css'
import {start, failure, signout} from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import { current } from '@reduxjs/toolkit';

const Profile = () => {
    const currentD = new Date();
    const old = new Date(currentD.getFullYear()-18, currentD.getMonth(), currentD.getDate());
    const max = old.toISOString().split('T')[0];

    const { currentUser } = useSelector((state) => state.user)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formdata,setformdata] = useState({...currentUser})
    const {loading, error} = useSelector((state)=> state.user)

    const handlechange = (e) => {
        setformdata({...formdata, [e.target.name] : e.target.value})
    }
    const handlesubmit = async (e) => {
        e.preventDefault();
        dispatch(start())
        const res = await fetch('/api/auth/update',{
            method: 'PUT',
            headers: {
                'content-type' :'application/json',
            },
            body: JSON.stringify(formdata)
        })

        const data = await res.json()
        if(data.success === false) {
            dispatch(failure(data.message))
            return;
        }
        navigate('/')
        dispatch(success(data.other))
    }
    const handleSignout = async () => {
        dispatch(start())
        try{
            const res = await fetch('/api/auth/signout',{
                method: 'GET',
                headers: {
                    'content-type' :'application/json',
                }
            })
        } catch(error){
            dispatch(failure(error))
        }
        dispatch(signout())
        navigate('/')
        

    }

    return(
        <div className='flex flex-col items-center h-[92vh] w-screen justify-center bg-gradient-to-br from-[rgba(245,227,190,0.5)] via-[rgba(233,182,139,0.55)] via-[rgba(228,182,140,0.55)] via-[rgba(184,148,114,0.55)] to-[rgba(254,188,116,0.55)]'>
            
            <h2 className='mb-3.5'>Update Profile</h2>
            <form onSubmit={handlesubmit}>
                <label htmlFor="username"> name</label>         
                    <input 
                        type="text" 
                        name="username" 
                        value={formdata.username} 
                        placeholder='username' 
                        required 
                        onChange={(e)=>handlechange(e)}
                /><br />
                <label htmlFor="email"> email</label>       
                    <input 
                        type="email" 
                        name="email" 
                        value={formdata.email}
                        placeholder='email' 
                        required 
                        onChange={(e)=>handlechange(e)}
                /><br />
                <label htmlFor="dob"> dob </label>          
                    <input 
                        type="date" 
                        name="dob" 
                        value={formdata.dob}
                        max={max}
                        required 
                        onChange={(e)=>handlechange(e)}/><br />
                <label htmlFor="password"> password</label> 
                    <input 
                        type="password" 
                        name="password"
                        value={formdata.password} 
                        placeholder='password'
                        required 
                        onChange={(e)=>handlechange(e)}/> <br />
                <input 
                    style={ {background: loading && '#b9bdcb' || '#09122C' }}
                    className={style.submitbtn} 
                    type="submit" 
                    value={loading && 'loading' || 'update'}/>
                <input 
                    style={ {background: loading && '#b9bdcb' || '#09122C' }}
                    className={style.signoutbtn} 
                    type="button" 
                    onClick={()=>handleSignout()}
                    value={loading && 'loading' || 'sign out'}/>
            </form>
            <span>{error}</span>
        </div>
    )
}
export default Profile
