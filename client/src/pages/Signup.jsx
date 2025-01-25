import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import style from '../css/Signup.module.css'
import {start, failure, success} from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux';

const Signup = () =>{
    const currentD = new Date();
    const old = new Date(currentD.getFullYear()-18, currentD.getMonth(), currentD.getDate());
    const max = old.toISOString().split('T')[0];

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formdata,setformdata] = useState({})
    const {loading, error} = useSelector((state)=> state.user)

    const handlechange = (e) => {
        setformdata({...formdata, [e.target.id] : e.target.value})
    }
    const handlesubmit = async (e) => {
        e.preventDefault();
        dispatch(start())
        const res = await fetch('/api/auth/signup',{
            method: 'POST',
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

    return(
        <div className={style.signup}>
            
            <h2>Create An Account</h2>
            <form onSubmit={handlesubmit}>
                <label htmlFor="username"> name</label>         
                    <input 
                        type="text" 
                        name="username" 
                        id="username" 
                        value={formdata.username} 
                        placeholder='username' 
                        required 
                        onChange={(e)=>handlechange(e)}
                /><br />
                <label htmlFor="email"> email</label>       
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        value={formdata.email}
                        placeholder='email' 
                        required 
                        onChange={(e)=>handlechange(e)}
                /><br />
                <label htmlFor="dob"> dob </label>          
                    <input 
                        type="date" 
                        name="dob" 
                        id="dob"  
                        max={max} 
                        value={formdata.dob}
                        required 
                        onChange={(e)=>handlechange(e)}/><br />
                <label htmlFor="password"> password</label> 
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        value={formdata.password} 
                        placeholder='password'
                        required 
                        onChange={(e)=>handlechange(e)}/> <br />
                <input 
                    style={ {background: loading &&'#b9bdcb' ||'#09122C' }}
                    className={style.submitbtn} 
                    type="submit" 
                    value={loading && 'loading' || 'signup'}/>
            </form>
            <span>{error}</span>
            <span className={style.or}>or</span>
            <div className={style.OAuth}>google</div>
            <span className={style.moveToSignin}>Already have an account!</span>
        </div>
    )
}
export default Signup;