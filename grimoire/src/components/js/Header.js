import {useState, React} from "react";
import "./../css/header.css"
import { Search, User2, ChevronDown, BellIcon } from "lucide-react"

function SearchInput({placeholder}){
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const isActive = isFocused || inputValue.length > 0;
  
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
export default function Header({class_,userName}){
    return (
        <header className={class_||''}>
            <p className="title">Grimoire</p>
            <SearchInput placeholder="Search movies and TV shows"/>
            <div className="side-content">
                {
                userName === undefined?
                    <>
                    <button className="outline-black">Sign Up</button>
                    <button className="outline-black">Sign in</button>
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
    )
}