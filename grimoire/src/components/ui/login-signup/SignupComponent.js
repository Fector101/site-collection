import { Link } from "react-router-dom"
import './../../css/form.css'
import { InputCom,PasswordInput } from "../form-comps/Inputs"



export default function LoginComponent () {
    return (
        <div id="signup-case" className="form-container">
            <h3>Signup</h3>
            <p className="form-top-msg">For More Refined & Personalized Recommendations </p>
            
            <form className="flex">

                <InputCom title="Email" type='email' placeholder="Enter your email"/>
                <InputCom title="Username" type='text' placeholder="Mr. Wick"/>
                <PasswordInput title="Password" placeholder="Enter your password" />
                
                <div className="form-row constent">
                    <input type="checkbox" required/>
                    <p> I accept the <Link to='policy'>Privacy Policy</Link> </p>
                </div>
                <button className="outline-white form-submit-btn">Signup</button>
            </form>

            <div className="form-btm-msg-section">
                <p className="msg">Need an account?</p>
                <Link className='sign-up-link' to='/signup'>Sign Up</Link>
            </div>

        </div>
    )
}