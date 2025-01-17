import style from '../css/Signup.module.css'

const Signup = () =>{
    const currentD = new Date()
    const max = new Date(`${currentD.getFullYear()-18}-${currentD.getMonth()+1}-${currentD.getDate()}`)
    console.log('daaate     '+max)
    return(
        <>
            <form action="">
                <label htmlFor="name"> name</label>         <input type="text" name="username" id="name" placeholder='username'/><br />
                <label htmlFor="email"> email</label>       <input type="email" name="email" id="emailID" placeholder='email'/><br />
                <label htmlFor="dob"> dob </label>          <input type="date" name="dob" id="dob"  max={max} placeholder='dob'/><br />
                <label htmlFor="password"> password</label> <input type="password" name="password" id="password" placeholder='password'/> <br />
                <input type="submit" value="signup" className="btn"/>
            </form>
        </>
    )
}
export default Signup;