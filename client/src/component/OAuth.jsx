import{GoogleAuthProvider, signInWithPopup, getAuth} from "firebase/auth";
import { app } from "../firebase";
import {start, failure, success} from "../redux/user/userSlice";
import {useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleAuth = async () => {
        dispatch(start());
        try{
            
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            const userdata={
                username: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
            }
            console.log(userdata);
            const res = await fetch("/api/auth/OAuth",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(userdata),
            })
            const data = await res.json();
            if(res.success===false){
                throw new Error(data.message);
            }
            dispatch(success(data.other));
            navigate("/");
        } catch(error) {
            dispatch(failure(error));
        }
        
    }
    return (
        <button 
            onClick={()=>handleGoogleAuth()}
            className="bg-red-700 text-white p-2 w-[70vw] max-w-[400px] hover:opacity-80 rounded-md uppercase"
        >Google</button>
    )
}
