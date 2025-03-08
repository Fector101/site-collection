import { Eye } from "lucide-react"
import { Link } from "react-router-dom"

export default function LoginComponent () {
    return (
        <div className="case flex">
            <h3>Login</h3>
            <p className="msg">For More Refined & Personalized Recommendations </p>
            <form className="flex">
                <label htmlFor='email'> Email </label>
                <input id="email" placeholder="Enter your email" />

                <label htmlFor='password'> Password </label>
                <div className="password-input-box flex">
                    <input type="password" id="password" placeholder="Enter your password" />
                    <button className="flex"> <Eye /> </button>
                </div>

                <button className="outline-white sign-in">Login</button>
            </form>
            <div className="flex sign-up-box">
                <p>Need an account?</p>
                <Link className='sign-up-link' to='/signup'>Sign Up</Link>
            </div>
        </div>
    )
}