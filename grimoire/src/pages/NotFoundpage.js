import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './../components/css/page-not-found.css'
export default function NotFoundpage(){
    const {'*':url_extension} = useParams()
    const navigate = useNavigate()
    const max_timeout=5
    let [i, Seti] = useState(max_timeout)

    useEffect(function(){
        Seti(max_timeout)
        const interval = setInterval(()=>{
            Seti(old_count=>{
                console.log(old_count)
                if (old_count === 1)clearInterval(interval)
                return old_count-1
            })
            } ,1*1000)
        setTimeout(()=>{
            // navigate(-1) // To Go to last page.
            // navigate('/',{state: 'Page not found'})
        },1000)

        return () => clearInterval(interval)
    // eslint-disable-next-line
    },[url_extension])


    return(
        <div className="not-found-page-ui">
            <p>Going back main page in</p>
            <p style={{fontSize: '2.1rem'}}>{i} {i>1?'Secs':'Sec'}</p>
            <p> {url_extension} does not exist</p>

        </div>
        // To Redirect
        // <Navigate to="/grimoire"/>
    )
}