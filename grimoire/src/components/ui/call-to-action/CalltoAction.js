import { Link } from "react-router-dom"
import "./CalltoAction.css"
import { Eye } from "lucide-react"
export default function CalltoAction(){
   return (
     <div className="call-to-action SectionPreview">
        <div className="case flex">
            <h3>Login</h3>
            <p className="msg">For More Refined & Personalized Recommendations </p>
            <form className="flex">
                {/* <div className="row flex"> */}
                    <label htmlFor='email'> Email </label>
                    <input id="email" placeholder="Enter your email"/>
                {/* </div>
                <div className="row flex"> */}

                    <label htmlFor='password'> Password </label>
                    <div className="password-input-box flex">
                        <input type="password" id="password" placeholder="Enter your password"/>
                        <button className="flex"> <Eye /> </button>
                    </div>
                {/* </div> */}
            </form>
            {/* <button className="outline-white sign-up">Sign Up</button> */}
            <div className="flex sign-up-box">
                <p>Need an account?</p>
                {/* <p>Login</p> */}
                <Link className='sign-up-link' to='/signup'>Sign Up</Link>
                {/* <button className="outline-white sign-in">Login</button> */}
            </div>
        </div>
    </div>
   )
}