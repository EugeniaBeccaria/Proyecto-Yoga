import axios from "axios";
import { useEffect, useRef,type JSX } from "react";
import { useNavigate } from "react-router-dom";



export default function AdminRoutes({children}: {children: JSX.Element}){
    const navigate = useNavigate()
    const hasFetched = useRef(false); //  Para evitar doble fetch
    const verifyUser = async ()=>{
        try{
        const response = await axios("http://localhost:3000/auth/authorized", {
        withCredentials: true
    })

        console.log(response)
        return (response.status === 200) ? children : navigate("/LoginPage", {replace:true})
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
return <></>
}