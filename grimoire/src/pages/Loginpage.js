import LoginForm from "../components/ui/login-signup/LoginForm"
import './../components/css/login-signuppage.css'
import niceImg from "./../components/imgs/rotten_tomato.png"
import GoToTop from "../components/js/GoToTop";

export default function SignupPage(){
    // flex-page dosen't add flex display to page it's important to format pages properly
    return(
        <div className="login-page flex-page flex algin-items-cen margin-auto fd-row width100per">
            <LoginForm className="margin-left-auto"/>
            <div className="responsive-backdrop" style={{backgroundImage: `url(${niceImg})`}}></div>
              <GoToTop />
        </div>
    )
}