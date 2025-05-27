import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./header.css"
import "./header-responsive.css"
import { Search, User2, ChevronDown, BellIcon, Menu, HomeIcon, Bookmark, Tv, Activity, Film, ChevronRight, XCircle } from "lucide-react"
import { Link, Outlet, useLocation, useParams } from "react-router"
import { nanoid } from "nanoid";
import LoginForm from "../login-signup/LoginForm";
import SignupForm from "../login-signup/SignupForm";
import { disableScroll, enableScroll } from "../../assets/js/helper";
// import useCarouselStore from "../carousel/useCarouselStore";
import { UserContext } from "../../assets/js/UserContextInstance";

import { ILinks } from "../../assets/js/myTypes.ts"

function SearchInput({ placeholder }: { placeholder: string }) {
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const isActive = isFocused || inputValue.length > 0;
    useEffect(function () {
        function headerDesignAccordingToPos() {
            const carousel = document.querySelector('.carousel-case')
            const header = document.querySelector('header') as Element
            if (!carousel) {
                header.classList.add('left-carousel-bounds')
                return
            }
            const header_btm = header.getBoundingClientRect().bottom
            // const carousel_btm = carousel.getBoundingClientRect().bottom
            const carousel_texts_con_btm = document.querySelector('.carousel-content-case .title')?.getBoundingClientRect().top || 0
            if (header_btm > carousel_texts_con_btm) {
                header.classList.add('left-carousel-bounds')
            }
            else if (header.getBoundingClientRect().top > carousel.getBoundingClientRect().top) {
                header.classList.add('left-carousel-top')
                header.classList.remove('left-carousel-bounds')
            }
            else {
                header.classList.remove('left-carousel-bounds', 'left-carousel-top')
            }
        }
        headerDesignAccordingToPos()
        window.addEventListener('scroll', headerDesignAccordingToPos)
        return () => window.removeEventListener('scroll', headerDesignAccordingToPos)
    }, [])
    return (
        <div className="search-input-box">
            <button className="input-btn">
                <Search className={`search-icon ${isActive ? 'active' : ''}`} />
            </button>
            <div className="input-box">
                <input
                    type="text"
                    id="search"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <label htmlFor="search" className={`search-label ${isActive ? 'active' : ''}`}> {placeholder} </label>
            </div>
        </div>
    )
}

function MyNavBar({ links, for_ }: { links: ILinks[], for_: string }) {
    const location = useLocation()
    const current_page_link = location.pathname

    function switchPage(e: React.MouseEvent<HTMLAnchorElement>) {
        const clicked_link = e.target
        if (!clicked_link) return
        document.querySelector('.current-page')?.classList.remove('current-page');
        (e.target as HTMLElement).closest('li')?.classList.add('current-page');

    }
    return (
        <nav className={for_}>
            <ol >
                {links.map((each_page) => {
                    return <li key={nanoid()} className={each_page.url === current_page_link ? "current-page" : ''}>
                        <Link id={nanoid()} to={each_page.url} onClick={switchPage} state="Hi">{each_page.name}</Link>
                        <hr />
                    </li>
                })}
            </ol>

        </nav>
    )
}

function MySidenavBar({ links, for_ }: { links: ILinks[], for_: string }) {
    const location = useLocation()
    const current_page_link = location.pathname

    return (
        <nav className={for_}>
            {links.map((each_page: ILinks) => {
                return <Link id={nanoid()} key={nanoid()} to={each_page.url} state="Hi" className={each_page.url === current_page_link ? "current-page" : ''}>
                    {each_page.icon}
                    <p>{each_page.name}</p>
                    {each_page.url !== current_page_link && <ChevronRight className="to-page-chevron" />}
                </Link>
            })}

        </nav>

    )
}


function ModalEle({ modal, setModal }: { modal: string, setModal: React.Dispatch<React.SetStateAction<string>> }) {
    // TODO Bind Esc Key to close Modal
    const navigate = useNavigate()
    const context = useContext(UserContext);

    const timer = context?.timer
    // const timer = useCarouselStore((state) => state.timer);
    const [component, setComponent] = useState<React.ReactNode>(null);



    function displayComponent(modal: string) {
        if (modal === 'login') {   // Not using tertanry operator because might add others elements
            setComponent(<LoginForm className='margin-auto' />)
        } else if (modal === 'signup') {
            setComponent(<SignupForm className='margin-auto' />)
        }
    }
    function closeModal() {
        enableScroll()
        setModal('')

    }
    if (component) {
        clearInterval(timer)
        disableScroll()
    } else {
        enableScroll()
    }
    useEffect(function () {
        displayComponent(modal)
    }, [modal])

    useEffect(function () {
        const modal_ = document.querySelector('.popup-modal')

        function closeModalOnLinkClink(event: MouseEvent) {
            const link = (event.target as HTMLElement).closest('a')
            if (link) {
                event.preventDefault()
                const sigup_or_login_link = link.getAttribute("href")?.slice(1)
                if (sigup_or_login_link && ['login', 'signup'].includes(sigup_or_login_link)) {
                    displayComponent(sigup_or_login_link)
                } else {
                    closeModal()
                    const route = link.getAttribute("href")
                    if (route) navigate(route)
                }
            }
        }
        modal_?.addEventListener('click', closeModalOnLinkClink as EventListener)
        return () => modal_?.removeEventListener('click', closeModalOnLinkClink as EventListener)
        // eslint-disable-next-line
    }, [])
    return (
        <section className='popup-modal'>
            <span>
                <button className='cursor-pointer close-btn margin-left-auto'>
                    <XCircle onClick={closeModal} />
                </button>
                {component}
            </span>
        </section>
    )
}


export default function Header({ class_, userName }: { class_?: string, userName?: string }) {
    // userName='Dev'
    const { '*': url_extension } = useParams()
    console.log(url_extension, 'header')
    const [modal, setModalEle] = useState('')

    useEffect(function () {
        function forSideMenu() {
            // if(e.target === document.querySelector('.side-menu-modal')){
            // if(e.target === document.querySelector('.side-menu-modal')){
            document.querySelector('.side-menu-modal')?.classList.add('display-none')
            // }
        }

        function forSideMenu1() {
            document.querySelector('.side-menu-modal')?.classList.remove('display-none')
        }

        document.querySelector('.side-menu-modal')?.addEventListener('mouseup', forSideMenu)
        document.querySelector('.menu-btn')?.addEventListener('click', forSideMenu1)
        return function(){
            document.querySelector('.side-menu-modal')?.removeEventListener('mouseup', forSideMenu)
            document.querySelector('.menu-btn')?.removeEventListener('click', forSideMenu1)
        }
    }, [])
    return (
        <>
            <header className={class_}>
                <button className="menu-btn">
                    <Menu />
                    {/* <Ham/> */}
                </button>
                {/* <p> */}
                <Link to={userName ? '/' : 'landing-page'} className="title">
                    Grimoire
                </Link>
                {/* </p> */}

                <MyNavBar for_="title-bar-nav" links={[{ url: '/', name: 'Home' }, { url: '/lists', name: 'Lists' }, { url: '/Movies', name: 'Movies' }, { url: '/shows', name: 'Tv shows' }]} />
                <SearchInput placeholder="Search movies and TV shows" />
                <div className="side-content right">
                    <Link className="btn lists-header-btn-link" to='lists' state="Hi">
                        <Bookmark className="svg-white-fill" />
                    </Link>

                    {
                        userName === undefined ?
                            <>
                                <button className="outline-white sign-up" onClick={() => setModalEle('signup')}>Sign Up</button>
                                <button className="outline-white sign-in" onClick={() => setModalEle('login')}>Sign in</button>
                            </>
                            :
                            <>
                                <button className="subscribe-btn">Subscribe</button>
                                <button className="noti-btn"><BellIcon /></button>
                                <div className="user-menu-box">
                                    <button>
                                        <User2 />
                                    </button>
                                    <button>
                                        <ChevronDown />
                                    </button>
                                </div>
                            </>
                    }
                </div>

            </header>
            <section className="side-menu-modal display-none">
                <div className="side-menu-content-box">
                    <MySidenavBar for_="side-menu" links={[{ url: '/', name: 'Home', icon: <HomeIcon /> }, { url: '/lists', name: 'Lists', icon: <Bookmark /> }, { url: '/shows', name: 'Tv shows', icon: <Tv /> }, { url: '/Movies', name: 'Movies', icon: <Film /> }, { url: '/Cartoons', name: 'Cartoons', icon: <Activity /> }, { url: '/Search', name: 'Search', icon: <Search /> }]} />
                    <button className="outline-white sign-up" onClick={() => setModalEle('signup')}>Sign Up</button>

                </div>
            </section>
            {
                modal && <ModalEle modal={modal} setModal={setModalEle} />

            }
            <Outlet context={{ foxxy: () => 'Wisdow Seekers', user_name: "Fabian - UserName From HeaderSticky" }} />
        </>
    )
}
