import SignUpCompoment from "../components/ui/login-signup/SignupComponent"
import './../components/css/signuppage.css'
import niceImg from "./../components/imgs/rotten_tomato.png"

console.log(niceImg,' nice-img')
export default function SignupPage(){
    return(
        <div className="signup-page flex-page">
            <SignUpCompoment className="signup-form"/>
            <div className="responsive-backdrop" style={{backgroundImage: `url(${niceImg})`}}></div>
        </div>
    )
}