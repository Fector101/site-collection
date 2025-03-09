import SignupForm from "../components/ui/login-signup/SignupForm"
import './../components/css/login-signuppage.css'
import niceImg from "./../components/imgs/rotten_tomato.png"

export default function SignupPage(){
    // flex-page dosen't add flex display to page it's important to format pages properly
    return(
        <div className="signup-page margin-auto flex algin-items-cen fd-row width100per flex-page">
            <SignupForm className="margin-left-auto"/>
            <div className="responsive-backdrop" style={{backgroundImage: `url(${niceImg})`}}></div>
        </div>
    )
}