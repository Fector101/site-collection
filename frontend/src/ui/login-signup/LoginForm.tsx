import { Link } from "react-router"
import '../../assets/css/form.css'
import { InputCom, PasswordInput } from "../form-comps/Inputs"

export default function LoginForm({ className }:{ className?:string }) {
    const additional_class = className ? ' ' + className : ''

    return (
        <div className={"form-container" + additional_class}>
            <h3>Login</h3>
            <p className="form-top-msg">For More Refined & Personalized Recommendations </p>
            <form className="flex">
                <InputCom title="Email|Username" type='text' placeholder="Enter your email or UserName" />
                <PasswordInput title="Password" placeholder="Enter your password" />
                <div className="form-row constent">
                    <input type="checkbox" className="checkbox" required />
                    <p> Remember Me</p>
                    <Link className='margin-left-auto sign-up-link' to='/forgot-ps'>Forgot Password?</Link>
                </div>
                <button className="outline-white form-submit-btn">Login</button>
            </form>
            <div className="form-btm-msg-section">
                <p className="msg">Need an account?</p>
                <Link className='sign-up-link' to='/signup'>Sign Up</Link>
            </div>
        </div>
    )
}