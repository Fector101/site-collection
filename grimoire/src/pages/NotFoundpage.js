import { useEffect } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";

export default function NotFoundpage(){
    const {'*':url_extension} = useParams()
    const navigate = useNavigate()
    useEffect(function(){
        setTimeout(()=>{
            // navigate(-1) // To Go to last page.
            navigate('/grimoire',{state: 'Page not found'})
        },1000)
    // eslint-disable-next-line
    },[])
    return(
        <p> {url_extension} does not exist, It a lie </p>
        // To Redirect
        // <Navigate to="/grimoire"/>
    )
}