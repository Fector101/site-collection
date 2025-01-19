import "./../css/CalltoAction.css"
export default function CalltoAction(){
   return (
     <div className="call-to-action SectionPreview">
        <div className="case flex">
            <h3>Sign Up</h3>
            <p>For More Refined & Personalized Recommendations </p>
            <form className="flex">
                {/* <div className="row flex"> */}
                    <label> Email </label>
                    <input placeholder="Enter your email"/>
                {/* </div>
                <div className="row"> */}
                    <label> Password </label>
                    <input placeholder="Enter your password"/>
                {/* </div> */}
            </form>
            {/* <button className="outline-white sign-up">Sign Up</button> */}
            <div className="flex sign-in-box">
                <p>Already Have an Account?</p>
                <button className="outline-white sign-in">Login</button>
            </div>
        </div>
    </div>
   )
}