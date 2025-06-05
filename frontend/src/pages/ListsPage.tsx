import { Link } from "react-router";
import card_img_placeholder from "../assets/imgs/card-img-pl1.png"
import '../assets/css/list-page.css'
import { BookmarkCheck, Eye, FilterX, Search, Users } from "lucide-react";
import ImgwithPL from "../ui/images/ImgwithPL";
import { MouseEventHandler, useEffect, useState } from "react";
// import SearchBar from "../ui/gpt/SearchBar";

function Marker({ text }: { text: string }) {
    let defaultIcon = <FilterX className="filter-icon" />;
    if (text === 'Watching') {
        defaultIcon = <Eye className="filter-icon" />;
    } else if (text === 'Completed') {
        defaultIcon = <BookmarkCheck className="filter-icon" />;
    } else if (text === 'Public Lists') {
        defaultIcon = <Users className="filter-icon" />;
    }
    return (
        <div className={`flex algin-items-cen marker ${text.toLowerCase().replace(' ', '-')}`} key={text}>
            {defaultIcon}
            {text}
        </div>
    );
}

function WatchListLink({ title, desc, length, index, _id, status }: { title: string, desc: string, index: number, length: number, _id: string, status: string[] }) {
    return (
        <li className="watchlist-item flex">
            <Link key={index} to={`/lists/${_id}`} className="flex fd-column">
                <div className="status-box flex fd-column">
                    {status.map((stat, i) => <Marker key={i} text={stat} />)}
                </div>
                <ImgwithPL placeholder_src={card_img_placeholder} src={`https://picsum.photos/200/300?random=${index}`} alt={title + ' img'} />
                {/* // <img src={`https://picsum.photos/200/300?random=${index}`} alt={title + ' img'} /> */}

                <div className="watchlist-item-text-box flex fd-column">
                    <h2 className="ellipsis">{title}</h2>
                    {desc && <p className="desc ellipsis-2">{desc}</p>}
                    <p className="count">{length} items</p>
                </div>

            </Link>
        </li>
    );
}
function SearchInput1({ placeholder }: { placeholder: string }) {
    return (
        <div className="search-input-1-box flex">
            <Search className="search-icon" />
            <input type="text" placeholder={placeholder} />
            {/* <button className="search-btn">Search</button> */}
        </div>
    );
}

interface IFilterButton {
    name: string;
    icon: React.ReactNode;
    index: number;
    className: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

function FilterButton({ name, icon, index, className,onClick }: IFilterButton) {

    return (
        <button onClick={onClick} className={"filter-btn algin-items-cen" + (className ? ' ' + className : '')} key={index}>
            {icon}
            <span>{name}</span>
        </button>
    );
}
// const itemList = [
//     'Apple',
//     'Banana',
//     'Cherry',
//     'Date',
//     'Elderberry',
//     'Fig',
//     'Grape',
//     'Honeydew',
//     'Indian Fig',
//     'Jackfruit',
//     'Kiwi',
//     'Lemon',
//     'Mango'
//   ];
interface IWatchList {
    _id: string;
    title: string;
    desc: string;
    length: number;
    status: string[];
}

export default function ListsPage({ text }: { text: string }) {
    const [watchlists, setWatchLists] = useState<IWatchList[] | undefined>()
    const [current_filter, setCurrentFilter] = useState<string>("All Lists")
    useEffect(function () {
        setWatchLists([
            { _id: '1', title: 'Best Movies', desc: 'This is the first list', length: 5, status: ['Watching'] },
            { _id: '2', title: 'Top 19 Movies', desc: 'This is the second list', length: 10, status: ['Completed'] },
            { _id: '3', title: 'Movies to Watch', desc: '', length: 3, status: ['Watching'] },
            { _id: '4', title: "My Favorite Movies", desc: 'A list of my favorite movies', length: 8, status: ['Watching'] },
            { _id: '5', title: 'Action Movies', desc: 'A list of action movies', length: 12, status: ['Planning',] },
            { _id: '6', title: 'Comedy Movies', desc: '', length: 7, status: ['Watching'] },
            { _id: '7', title: 'Drama Movies', desc: 'A list of drama movies', length: 4, status: ['Public Lists', 'Completed'] },
            { _id: '8', title: 'Sci-Fi Movies', desc: 'Some long description of the list that is not too long', length: 6, status: ['Completed'] },
            { _id: '9', title: 'Horror Movies', desc: '', length: 9, status: ['Watching', 'Completed'] },
            { _id: '10', title: 'Romantic Movies', desc: '', length: 11, status: ['Watching'] },

        ])
    }, [])
    // function filterList(filter_name){
    //     // if ()
    // }

    return (
        <div className="list-page margin-auto flex-page page">
            <div className="header flex">
                <div className="texts flex fd-column">
                    <h1>My Watchlists</h1>
                    <p>Browse and manage your collection of watchlists</p>
                </div>
                <div className="components flex fd-column">
                    {/* <SearchBar data={itemList}/> */}
                    <SearchInput1 placeholder="Find a list" />
                    <div className="filters-box flex flex-wrap">
                        {
                            // ['All Lists', 'Watching', 'Completed', 'Public Lists']
                            [{ name: "All Lists", icon: <FilterX /> }, { name: "Watching", icon: <Eye /> }, { name: 'Completed', icon: <BookmarkCheck /> }, { name: "Public Lists", icon: <Users /> }].map((filter, index) => {
                                return <FilterButton 
                                            onClick={()=>setCurrentFilter(filter.name)}
                                            key={index} 
                                            className={filter.name === current_filter ? 'active' : ''} 
                                            name={filter.name} icon={filter.icon} index={index} 
                                        />
                            }
                            )
                        }
                    </div>
                </div>
            </div>

            <ol className="watchlist-scroll-container flex">
                {
                    watchlists?.map((list, index) => {
                    if (current_filter == 'All Lists' || list.status.includes(current_filter)){
                        return <WatchListLink key={index} {...list} index={index} />
                    }else{
                        return<></>
                    }
                })
                }
            </ol>
            {/* <Link to="/lists/movie1">List 1</Link>
            <Link to="/lists/movie2">List 2</Link>
            <Link to="/lists/Testing Space and caps"> Testing Space and caps </Link>
            <Link to="/lists/new-list">Create Movie</Link> */}
            {!text && <p>{text}</p>}
            {/* 'replace' Keyword means we're Removing current page from links visted (i.e We can't come back to the page with the link about to be clicked)
            <Link to="/lists/movie1" replace>List 1</Link> */}
        </div>
    )
}
