import {useState, React, useEffect} from "react";
import "./../css/header.css"
import { Search, User2, ChevronDown, BellIcon } from "lucide-react"
import { Link, Outlet } from "react-router-dom"

function SearchInput({placeholder}){
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const isActive = isFocused || inputValue.length > 0;
    useEffect(function(){
        function noMoreInCarouselBoundsDesign(){
            const carousel = document.querySelector('.carousel-case')
            if(!carousel)return
            const header = document.querySelector('header')
            const header_btm = header.getBoundingClientRect().bottom
            const carousel_btm = carousel.getBoundingClientRect().bottom
            if(header_btm > carousel_btm){
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
        window.addEventListener('scroll',noMoreInCarouselBoundsDesign)
        return ()=>window.removeEventListener('scroll',noMoreInCarouselBoundsDesign)
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
                className="search-input"
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
function MynavBar({links,current_page_name}){
    return (
        <nav className="side-content left">
                {links.map((each_page,i)=>{
                    return  <ol key={i}>
                                <li className={each_page.name === current_page_name ? "current-page":''}>
                                    <Link to={each_page.link} state="Hi" className="link">{each_page.name}</Link>
                                    <hr className={`${each_page.name === current_page_name ? 'current-page-ruler' : ''}`}/>
                                </li>
                            </ol>
                })}
                    
        </nav>
    )
}
export default function Header({class_,userName}){
    return (
        <>
        <header className={class_||''}>
            <p className="title">Grimoire</p>

            <MynavBar links={[{link:'/',name:'Home'},{link:'/lists', name:'Lists'},{link:'/shows', name:'Tv shows'},{link:'/Cartoons', name:'Cartoons'}]} current_page_name={'Home'}/>
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
        <Outlet context={ {foxxy:()=> 'Wisdow Seekers', user_name: "Fabian - UserName From HeaderSticky"} }/>
        </>)
}