import {useState, React, useEffect} from "react";
import "./header.css"
import "./header-responsive.css"
import { Search, User2, ChevronDown, BellIcon, Menu, HomeIcon, Bookmark, Tv, Activity, Film, ChevronRight } from "lucide-react"
import { Link, Outlet, useLocation, useParams } from "react-router-dom"
import { nanoid } from "nanoid";

function SearchInput({placeholder}){
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const isActive = isFocused || inputValue.length > 0;
    useEffect(function(){
        function headerDesignAccordingToPos(){
            const carousel = document.querySelector('.carousel-case')
            if(!carousel)return
            const header = document.querySelector('header')
            const header_btm = header.getBoundingClientRect().bottom
            // const carousel_btm = carousel.getBoundingClientRect().bottom
            const carousel_texts_con_btm=document.querySelector('.carousel-content-case .title').getBoundingClientRect().top
            if(header_btm > carousel_texts_con_btm){
                header.classList.add('left-carousel-bounds')
            }
            else if(header.getBoundingClientRect().top > carousel.getBoundingClientRect().top){
                header.classList.add('left-carousel-top')
                header.classList.remove('left-carousel-bounds')
            }
            else{
                header.classList.remove('left-carousel-bounds','left-carousel-top')
            }
        }
        headerDesignAccordingToPos()
        window.addEventListener('scroll',headerDesignAccordingToPos)
        return ()=>window.removeEventListener('scroll',headerDesignAccordingToPos)
    },[])
    return(
        <div className="search-input-box">
            <button className="input-btn">
                <Search className={`search-icon ${isActive ? 'active' : ''}`}/>
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

function MynavBar({links,for_}){
    const location = useLocation()
    const current_page_link=location.pathname

    function swicthPage(e){
        const clicked_link = e.target
        if(!clicked_link)return
        document.querySelector('.current-page').classList.remove('current-page')
        clicked_link.closest('li').classList.add('current-page')

    }
    return (
<nav className={for_}>
    <ol >
        {links.map((each_page,i)=>{
            return  <li key={nanoid()} className={each_page.link === current_page_link ? "current-page":''}>
                <Link id={nanoid()} to={each_page.link} onClick={swicthPage} state="Hi">{each_page.name}</Link>
                <hr />
            </li>
        })}
    </ol>
        
</nav>
    )
}

function MySidenavBar({links,for_}){
    const location = useLocation()
    const current_page_link=location.pathname
    console.log(current_page_link)
    function swicthPage(e){
        const clicked_link = e.target
        if(!clicked_link)return
        document.querySelector('.current-page').classList.remove('current-page')
        clicked_link.closest('a').classList.add('current-page')

    }
    return (
<nav className={for_}>
        {links.map((each_page)=>{
            return  <Link id={nanoid()} key={nanoid()} to={each_page.link} onClick={swicthPage} state="Hi"  className={each_page.link === current_page_link ? "current-page":''}>
                        {each_page.icon}
                        <p>{each_page.name}</p>
                        {each_page.link !== current_page_link && <ChevronRight className="to-page-chevron" />}
                    </Link>
        })}
        
</nav>

    )
}
export default function Header({class_,userName}){
    // userName='Dev'
    const {'*':url_extension} = useParams()
    console.log(url_extension,'header')
    
    useEffect(function(){
        
        document.querySelector('.side-menu-modal').addEventListener('mouseup',function(e){
            // if(e.target === document.querySelector('.side-menu-modal')){
            // if(e.target === document.querySelector('.side-menu-modal')){
            document.querySelector('.side-menu-modal').classList.add('display-none')
            // }
        })
        document.querySelector('.menu-btn').addEventListener('click',function(){
            document.querySelector('.side-menu-modal').classList.remove('display-none')
        })

    },[])
    return (
        <>
        <header className={class_}>
            <button className="menu-btn">
                <Menu/>
                {/* <Ham/> */}
            </button>
            {/* <p> */}
                <Link to={userName?'/':'landing-page'} className="title">
                Grimoire
                </Link>
            {/* </p> */}

            <MynavBar for_="title-bar-nav" links={[{link:'/',name:'Home'},{link:'/lists', name:'Lists'},{link:'/Movies', name:'Movies'},{link:'/shows', name:'Tv shows'}]}/>
            <SearchInput placeholder="Search movies and TV shows"/>
            <div className="side-content right">
                <Link className="btn lists-header-btn-link" to='lists' state="Hi">
                    <Bookmark className="svg-white-fill" />
                </Link>
                
                {
                userName === undefined?
                    <>
                    <button className="outline-white sign-up">Sign Up</button>
                    <button className="outline-white sign-in">Sign in</button>
                    </>
                :
                    <>
                        <button className="subscribe-btn">Subscribe</button>
                        <button className="noti-btn"><BellIcon/></button>
                        <div className="user-menu-box">
                            <button>
                                <User2/>
                            </button>
                            <button>
                                <ChevronDown/>
                            </button>
                        </div>
                    </>
                }
            </div>
 
        </header>
        <section className="side-menu-modal display-none">
            <div className="side-menu-content-box">
                <MySidenavBar for_="side-menu" links={[{link:'/',name:'Home',icon:<HomeIcon />},{link:'/lists', name:'Lists',icon:<Bookmark />},{link:'/shows', name:'Tv shows', icon:<Tv/>},{link:'/Movies', name:'Movies',icon:<Film />},{link:'/Cartoons', name:'Cartoons',icon:<Activity />},{link:'/Search', name:'Search',icon:<Search />}]}/>
                <button className="outline-white sign-up">Sign Up</button>

            </div>
        </section>
        <Outlet context={ {foxxy:()=> 'Wisdow Seekers', user_name: "Fabian - UserName From HeaderSticky"} }/>
        </>
    )
}