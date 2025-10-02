import axios from "axios";
import { useEffect, useRef,type JSX } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function PrivateRoutes({children}: {children: JSX.Element}){
    const [isUser, setIsUser] = useState(false);
    const navigate = useNavigate()
    const hasFetched = useRef(false); //  Para evitar doble fetch
    const verifyUser = async ()=>{
        try{
        const response = await axios("http://localhost:3000/auth/authorized", {
        withCredentials: true
    })

        console.log(response)
        return (response.status === 200) ? setIsUser(true) : navigate("/LoginPage", {replace:true})
        }
        catch(err){
            console.log(err)
            return navigate("/LoginPage", {replace:true})
    }
    }

    useEffect(()=>{
        if (hasFetched.current) return;
        hasFetched.current = true;
        verifyUser()
    },[])
return <>{isUser ? children : null}</>
}