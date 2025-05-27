import SignupForm from "../ui/login-signup/SignupForm"
import '../assets/css/login-signuppage.css'
import niceImg from "../assets/imgs/rotten_tomato.png"
import GoToTop from "../assets/js/GoToTop";

export default function SignupPage() {
    // flex-page dosen't add flex display to page it's important to format pages properly
    return (
        <div className="signup-page margin-auto flex algin-items-cen fd-row width100per flex-page">
            <GoToTop />
            <SignupForm className="margin-auto" />
            <div className="responsive-backdrop" style={{ backgroundImage: `url(${niceImg})` }}></div>
        </div>
    )
}