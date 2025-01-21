import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import './../components/css/page-not-found.css'


export default function NotFoundpage({redirect_path,timeout_secs}){
    timeout_secs= timeout_secs || 5
    redirect_path = redirect_path || '/'
    
    const {'*':url_extension} = useParams()
    const navigate = useNavigate()
    let [seconds_remaining, setSecondsRemaining] = useState(timeout_secs)

    useEffect(function(){
        setSecondsRemaining(timeout_secs)
        const timeout = setTimeout(()=>{
            // navigate(-1) // To Go to last page.
            navigate(redirect_path,{state: 'Page not found'})
        },1000 * timeout_secs)
        const interval = setInterval(()=>{
            setSecondsRemaining(prev=>{
                if (prev === 1)clearInterval(interval)
                return prev-1
            })
            } ,1000)
        

        return () => {clearInterval(interval); clearTimeout(timeout);}
    // eslint-disable-next-line
    },[url_extension])


    return(
        <div className="not-found-page-ui flex-page">
            <h1>Page Not Found</h1>
            <p>Going back to <Link to={redirect_path}>main page</Link> in</p>
            <p className="secs-txt">{seconds_remaining} {seconds_remaining>1?'seconds':'second'}</p>
            <p> {url_extension} does not exist</p>
        </div>

        // To Redirect
        // <Navigate to="/grimoire"/>
    )
}