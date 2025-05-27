import LoginForm from "../ui/login-signup/LoginForm"
import '../assets/css/login-signuppage.css'
import niceImg from "../assets/imgs/rotten_tomato.png"
import GoToTop from "../assets/js/GoToTop";

export default function LoginPage() {
    // flex-page dosen't add flex display to page it's important to format pages properly
    return (
        <div className="login-page flex-page flex algin-items-cen margin-auto fd-row width100per">
            <GoToTop />
            <LoginForm className="margin-left-auto" />
            <div className="responsive-backdrop" style={{ backgroundImage: `url(${niceImg})` }}></div>
        </div>
    )
}