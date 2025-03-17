import { CheckCircle, Dot, Mail } from 'lucide-react'
import '../components/css/forgotpspage.css'
import { useEffect, useState } from 'react'
import { InputCom } from '../components/ui/form-comps/Inputs'
import './../components/css/form.css'

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


function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}


export default function ForgotPSPage({ email, username, phone_no }) {
    const identifier = username || email || phone_no
    const [count_down, setCountDown] = useState(10)
    username = 1
    email = 'fabi*****063@gmail.com'
    // if `username` get right and wrong emails and display choices
    // `email` sent back will be genrated by from the username
    //  that is the first and last 4 letters for the email and i won't send link if email is wrong 
    // so i won't be flagged as spammer
    useEffect(function () {
        function countDown() {
            setCountDown(old_value => {
                if (old_value <= 1) {
                    clearInterval(timer)
                    return 0
                }
                return old_value - 1
            })
        }
        const timer = setInterval(countDown, 1 * 1000)
        return () => clearInterval(timer)
    }, [])
    return (
        <div className="forgot-password-page flex-page margin-auto flex">
            <h1>Forgot Password {identifier} </h1>
            <div className="flex prompt-box">
                {/* <div className="flex prompt-box"> */}
                {
                    username &&
                    <>
                        <CheckCircle className='sent-icon' />
                        <h3>Successfully</h3>
                        <h3>Sent Link to Reset To:</h3>
                        <p className='sent-email'>
                            <Mail/>
                            {email}</p>
                        <p className='long-msg'>
                            Check your email and click on the link to reset your password. The link will expire in 1 hour.
                        </p>
                        <p className='didnt-recieve-msg'>Didn't recieve Link? </p>
                        <button className={'outline-white resend' + (count_down ? ' disabled-btn' : '')}>
                            {count_down ? formatTime(count_down) : 'Resend'}
                        </button>
                    </>
                    // <InputCom title="Email" type='text' placeholder="Enter your email" />
                    // <SendRightEmail />

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