import {useState, React, useEffect} from "react";
import "./../css/header.css"
import { Search, User2, ChevronDown, BellIcon, Menu } from "lucide-react"
import { Link, Outlet } from "react-router-dom"
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

function MynavBar({links,for_,current_page_name}){
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
                                return  <li key={nanoid()} className={each_page.name === current_page_name ? "current-page":''}>
                                    <Link id={nanoid()} to={each_page.link} onClick={swicthPage} state="Hi">{each_page.name}</Link>
                                    <hr />
                                </li>
                    })}
                </ol>
                    
        </nav>
    )
}
export default function Header({class_,userName}){
    // userName='Dev'
    return (
        <>
        <header className={class_||''}>
            <button className="menu-btn">
                <Menu/>
                {/* <Ham/> */}
            </button>
            {/* <p> */}
                <Link to={userName?'/':'landing-page'} className="title">
                Grimoire
                </Link>
            {/* </p> */}

            <MynavBar for_="title-bar-nav" links={[{link:'/',name:'Home'},{link:'/lists', name:'Lists'},{link:'/shows', name:'Tv shows'},{link:'/Cartoons', name:'Cartoons'}]} current_page_name={'Home'}/>
            <SearchInput placeholder="Search movies and TV shows"/>
            <div className="side-content right">
                {
                userName === undefined?
                    <>
                    <button className="outline-white">Sign Up</button>
                    <button className="outline-white">Sign in</button>
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
        {/* <section className="side-menu-modal">
            <div className="side-menu-content-box">
                <MynavBar for_="side-menu" links={[{link:'/',name:'Home'},{link:'/lists', name:'Lists'},{link:'/shows', name:'Tv shows'},{link:'/Cartoons', name:'Cartoons'}]} current_page_name={'Home'}/>
            </div>
        </section> */}
        <Outlet context={ {foxxy:()=> 'Wisdow Seekers', user_name: "Fabian - UserName From HeaderSticky"} }/>
        </>
    )
}