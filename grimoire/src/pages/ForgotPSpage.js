import { CheckCircle, Dot, Mail } from 'lucide-react'
import '../components/css/forgotpspage.css'
import { useEffect, useState } from 'react'
import { InputCom } from '../components/ui/form-comps/Inputs'

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
function SentResetPSEmailLoading() {
    return (
        <div className='loading-box'>
            <span className='sent-icon-loading'></span>
            <span className='header-loading'></span>
            <span className='h3-msg-loading'></span>
            <span className='sent-email-loading'></span>
            <span className='long-msg-loading'></span>
            <span className='didnt-recieve-msg-loading' ></span>
            <span className='submit-loading'></span>
        </div>
    )
}
function SentResetPSEmail({ email, user_choice }) {
    // user_choice:'sign-in' | 'reset-ps'
    const [count_down, setCountDown] = useState(10)
    const [loading, setLoading] = useState(10)

    useEffect(function () {
        setTimeout(() => setLoading(0), 1000 * 3)
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
    // ON-ENTER Add Loading Snipper When Pinging Server with `email` Or Show Boxes or widgets Loading
    const session = { expire_time: '1 hour' }
    return (
        // <div className='sent-password-reset-email'>
        <>
            {loading ?
                <SentResetPSEmailLoading /> :
                <>
                    <CheckCircle className='sent-icon' />
                    <h3>Successfully</h3>
                    <h3>Sent {user_choice === 'sign-in' ? 'a sign in link to:' : 'password reset Link to:'}</h3>
                    <p className='sent-email'>
                        <Mail />
                        {email}</p>
                    <p className='long-msg'>
                        Check your email and click on the {user_choice === 'sign-in' ? 'link to sign in to your account' : 'link to reset your password'}. The link will expire in {session.expire_time}.
                    </p>
                    <p className='didnt-recieve-msg'>Didn't recieve Link? </p>
                    <button disabled={count_down} className={'outline-white submit' + (count_down ? ' disabled-btn' : '')}>
                        {count_down ? formatTime(count_down) : 'Resend'}
                    </button>
                </>
            }

        </>
        // </div>
    )
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function ChoicesBoxLoading() {
    return (
        <div className='loading-box'>
            <span className='header-loading'></span>
            <span className='long-msg-loading'></span>
            <div className='btns-box flex width100per no-shimmer'>
                <span className='width100per'></span>
                <span className='width100per'></span>
            </div>
            <span className='sent-email-loading'></span>
            <span className='choice-btn'></span>
        </div>
    )
}
function ChoicesBox({ email, user_choice, setChoice, setSlide }) {
    // user_choice:'sign-in' | 'reset-ps'
    const [loading, setLoading] = useState(1)
    function handleSettedChoice(event) {
        const clicked_btn = event.target
        if (clicked_btn) {
            setChoice(user_choice === 'sign-in' ? 'reset-ps' : 'sign-in')
            event.target.closest('.choices-btns-box').querySelector('.selected')?.classList.remove('selected')
            // document.querySelector('.reset-ps-choice-form .submit').classList.remove('disabled-btn')
        }
        event.target.classList.add('selected')
    }
    useEffect(function () {
        setTimeout(() => setLoading(0), 1000 * 3)
    }, [])
    return (
        <>
            {loading ?
                <ChoicesBoxLoading /> :
                <>
                    <h3>Account Recovery</h3>
                    <p className='long-msg'>Choose an option to access your account</p>
                    <div className='choices-btns-box'>
                        <button onClick={handleSettedChoice} className={'choice outline-white' + (user_choice === 'reset-ps' ? ' selected' : '')}>Reset password</button>
                        <button onClick={handleSettedChoice} className={'choice outline-white' + (user_choice === 'sign-in' ? ' selected' : '')}>Sign-in without password</button>
                    </div>
                    <p className='sent-email'>Email: {email}</p>
                    <button onClick={() => setSlide(2)} className="mt-8px outline-white submit">{user_choice === 'sign-in' ? 'Send Sign-in Link' : 'Send Reset Link'}</button>

                </>
            }
        </>
    )
}
function EnterMethod({ email, user_choice_, setChoice, setSlide }) {
    // This Component is incase user has two emails attached to email
    const [loading, setLoading] = useState(10)
    const [user_choice, setUserChoice] = useState(user_choice_|| 'email')
    // user_choice:'username' | 'email'
    function handleSettedChoice(event) {
        const clicked_btn = event.target
        if (clicked_btn) {
            setUserChoice(user_choice === 'email' ? 'username' : 'email')
            event.target.closest('.choices-btns-box').querySelector('.selected')?.classList.remove('selected')
            // document.querySelector('.reset-ps-choice-form .submit').classList.remove('disabled-btn')
        }
        event.target.classList.add('selected')
    }
    useEffect(function () {
        setTimeout(() => setLoading(0), 1000)
    }, [])
    return (
        <>
            {loading ?
                <ChoicesBoxLoading /> :
                <>
                    <h3>Account Recovery</h3>
                    <p className='long-msg'>Choose a tag to access your account</p>
                    <div className='choices-btns-box'>
                        <button onClick={handleSettedChoice} className={'choice outline-white' + (user_choice === 'email' ? ' selected' : '')}>Email</button>
                        <button onClick={handleSettedChoice} className={'choice outline-white' + (user_choice === 'username' ? ' selected' : '')}>Username</button>
                    </div>
                    <form className='flex method-input-box'>
                        <label>{user_choice === 'email' ? 'Email' : 'Username'}: {email}</label>
                        <input required type={user_choice === 'email' ? 'email' : 'text'} placeholder={user_choice === 'email' ? 'Enter Email here' : 'Enter Username here'}/>
                        <button className="mt-8px outline-white submit">submit</button>
                    </form>
                    {/* <button onClick={() => setSlide(1)} className="mt-8px outline-white submit">submit</button> */}

                </>
            }
        </>
    )
}
export default function ForgotPSPage({ email, username, phone_no }) {
    const identifier = username || email || phone_no
    const [user_choice, setUserChoice] = useState('reset-ps') // 'sign-in' | 'reset-ps'
    const [pos, setPos] = useState(0) // 0|1|2
    username = 1
    email = 'fabi*****063@gmail.com'
    // if `username` get right and wrong emails and display choices
    // `email` sent back will be genrated by from the username
    //  that is the first and last 4 letters for the email and i won't send link if email is wrong 
    // so i won't be flagged as spammer
    function returnTab(pos) {
        let tab;
        if (pos === 0) {
            tab = <EnterMethod setSlide={setPos} />
        }
        else if (pos === 1) {
            tab = <ChoicesBox email={email} user_choice={user_choice} setSlide={setPos} setChoice={setUserChoice} />
        }
        else if (pos === 2) {
            tab = <SentResetPSEmail user_choice={user_choice} email={email} />
        }
        return tab
    }
    return (
        <div className="forgot-password-page flex-page margin-auto flex">
            <h1>Forgot Password {identifier} </h1>
            <div className="flex prompt-box">
                {returnTab(pos)}

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
                <button onClick={() => setPos(0)}> <Dot className={pos === 0 ? 'active' : ''} /> </button>
                <button onClick={() => setPos(1)}> <Dot className={pos === 1 ? 'active' : ''} /> </button>
                <button onClick={() => setPos(2)}> <Dot className={pos === 2 ? 'active' : ''} /> </button>
            </span>
        </div >
    )
}
