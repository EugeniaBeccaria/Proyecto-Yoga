import axios from "axios";
import { useEffect, useRef,useState,type JSX } from "react";
import { useNavigate } from "react-router-dom";


export default function ProfessorRoutes({children}: {children: JSX.Element}){
    const [isProfessor, setIsProfessor] = useState(false);
    const navigate = useNavigate()
    const hasFetched = useRef(false); 
    const verifyUser = async ()=>{
        try{
        const response = await axios("http://localhost:3000/auth/isProfessor", {
        withCredentials: true
    })

        console.log(response)
        return (response.status === 200) ? setIsProfessor(true) :navigate("/", {replace:true})
        }
        catch(err){
            console.log(err)
            return navigate("/", {replace:true})
    }
    }

    useEffect(()=>{
        if (hasFetched.current) return;
        hasFetched.current = true;
        verifyUser()
    },[])
return <>{isProfessor ? children : null}</>
}