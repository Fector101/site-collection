import { Dot } from 'lucide-react'
import '../components/css/forgotpspage.css'
import { useState } from 'react'
function SendRightEmail() {
    const [email1, setEmail1] = useState('')
    const [email2, setEmail2] = useState('')
    // fetch emails

    function handleSettedEmail(event) {
        const clicked_btn = event.target
        if (clicked_btn) {
            event.target.closest('.choose-email-btn-box').querySelector('.selected')?.classList.remove('selected')
            document.querySelector('.choose-email-container .submit').classList.remove('disabled-btn')
        }
        event.target.classList.add('selected')
    }
    return (
        <div className="choose-email-container">
            <h3>Choose Right Email</h3>

            <div className='choose-email-btn-box flex'>
                <button onClick={handleSettedEmail} value={email1} className='cursor-pointer'>fabi*****063@gmail.com</button>
                <button onClick={handleSettedEmail} value={email2} className='cursor-pointer'>fec*****101@gmail.com</button>
            </div>
            <button className="disabled-btn outline-white submit align-self-cen">Next</button>

        </div>
    )
}
export default function ForgotPSPage({ email, username, phone_no }) {
    const identifier = username || email || phone_no
    username = 1
    // if `username` get right and wrong emails and display choices
    // `email` sent back will be genrated by from the username
    //  that is the first and last 4 letters for the email and i won't send link if email is wrong 
    // so i won't be flagged as spammer
    return (
        <div className="forgot-password-page flex-page margin-auto flex">
            <h1>Forgot Password {identifier} </h1>
            <div className="flex prompt-box">
                {
                    username &&
                    <SendRightEmail />

                }

                {/* <div className="login-without-ps">

                    <h3>Login without Password</h3>
                    {
                        username ?
                            <SendRightEmail />
                            : <></>
                    }

                </div> */}

            </div>
            <span className='flex progress-box'>
                <button> <Dot /> </button>
                <button> <Dot /> </button>
                <button> <Dot /> </button>
            </span>
        </div >
    )
}