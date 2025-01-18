import style from '../css/Signup.module.css'

const Signup = () =>{
    const currentD = new Date()
    const max = new Date(`${currentD.getFullYear()-18}-${currentD.getMonth()+1}-${currentD.getDate()}`)
    console.log('daaate     '+max)
    return(
        <div className={style.signup}>
            <header className={style.accHeader}>
                <h2>Sign Up</h2>
                <h2>Sign In</h2>
            </header>
            <h2>Create An Account</h2>
            <form action="">
                <label htmlFor="name"> name</label>         
                    <input type="text" name="username" id="name" placeholder='username'/><br />
                <label htmlFor="email"> email</label>       
                    <input type="email" name="email" id="emailID" placeholder='email'/><br />
                <label htmlFor="dob"> dob </label>          
                    <input type="date" name="dob" id="dob"  max={max} placeholder='dob'/><br />
                <label htmlFor="password"> password</label> 
                    <input type="password" name="password" id="password" placeholder='password'/> <br />
                <input className={style.submitbtn} type="submit" value="signup"/>
            </form>
            <span className={style.or}>or</span>
            <div className={style.OAuth}>google</div>
            <span className={style.moveToSignin}>Already have an account!</span>
        </div>
    )
}
export default Signup;