import '../components/css/forgotpspage.css'
export default function ForgotPSPage({ email, username, phone_no }) {
    const identifier = username || email || phone_no
    username=1
    // if `username` get right and wrong emails and display choices
    // `email` sent back will be genrated by from the username
    //  that is the first and last 4 letters for the email and i won't send link if email is wrong 
    // so i won't be flagged as spammer
    return (
        <div className="forgot-password-page flex-page margin-auto flex">
            <h1>Forgot Password {identifier} </h1>
            <div className="flex choices">
                <div className="login-without-ps">

                    <h3>Login without Password</h3>
                    {
                        username?
                        <>
                            <p>Choose The Right Email</p>
                            <div className='choose-email-box flex'>
                            <p>fabi*****063@gmail.com</p>
                            <p>fec*****101@gmail.com</p>
                            </div>
                        </>
                        :<></>
                    }

                </div>
                <div className="reset-ps">
                    <h3>Reset Password</h3>
                    {
                        username&&
                        <>
                            <p>Choose The Right Email</p>
                            <div className='choose-email-box flex'>
                            <p>fabi*****063@gmail.com</p>
                            <p>fec*****101@gmail.com</p>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}