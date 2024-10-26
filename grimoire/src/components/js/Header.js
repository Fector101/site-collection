import {useState, React} from "react";
import "./../css/header.css"
import { Search } from "lucide-react";


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
export default function Header({class_}){
    return (
        <header className={class_||''}>
            <p className="title">Grimoire</p>
            <SearchInput placeholder="Search movies and TV shows"/>
            <div className="side-content"></div>
        </header>
    )
}