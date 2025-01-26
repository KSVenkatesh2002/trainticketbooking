import { useEffect, useState } from 'react';
import style from '../css/Signup.module.css'
import { useNavigate, Link } from 'react-router-dom';
import {start, failure, success} from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux';

const Login = () =>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formdata,setformdata] = useState({})
    const {loading, error} = useSelector((state)=> state.user)


    const handlechange = (e) => {
        setformdata({...formdata, [e.target.id] : e.target.value})
    }
    const handlesubmit = async (e) => {
        dispatch(start())
        e.preventDefault();
        const res = await fetch('/api/auth/login',{
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
            <h2>Login into An Account</h2>
            <form onSubmit={handlesubmit}>
                <label htmlFor="username"> name</label>         
                    <input 
                        type="text" 
                        name="username" id="username" 
                        value={formdata.username} 
                        placeholder='username' 
                        required 
                        onChange={(e)=>handlechange(e)}
                /><br />
                <label htmlFor="password">password</label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        value={formdata.password} 
                        placeholder='password' 
                        required 
                        onChange={(e)=>handlechange(e)}/> <br />
                <input 
                    
                    style={ {background: loading &&'#b9bdcb' || '#09122C'}}
                    className={style.submitbtn} 
                    type="submit" 
                    value={loading && 'loading' || 'login'}/>
            </form>
            <span class='text-red-500 text-xl font-semibold'>{error}</span>
            <span className={style.or}>or</span>
            <div className={style.OAuth}>google</div>
            <span className={style.moveToSignin}><Link to={'/auth/signup'}>create an account!</Link></span>
        </div>
    )
}
export default Login;