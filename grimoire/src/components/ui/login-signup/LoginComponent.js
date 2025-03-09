import { Link } from "react-router-dom"
import './../../css/form.css'
import { InputCom, PasswordInput } from "../form-comps/Inputs"

export default function LoginComponent ({className}) {
    let additional_class = className ? ' ' + className : ''

    return (
        <div className={"form-container"+additional_class}>
            <h3>Login</h3>
            <p className="form-top-msg">For More Refined & Personalized Recommendations </p>
            <form className="flex">
                <InputCom title="Email" type='email' placeholder="Enter your email" />
                <PasswordInput/>
                <button className="outline-white form-submit-btn">Login</button>
            </form>
            <div className="form-btm-msg-section">
                <p className="msg">Need an account?</p>
                <Link className='sign-up-link' to='/signup'>Sign Up</Link>
            </div>
        </div>
    )
}