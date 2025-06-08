import { Link } from "react-router";
import card_img_placeholder from "../assets/imgs/card-img-pl1.png"
import '../assets/css/list-page.css'
import { BookmarkCheck, Clock, Eye, FilterX, List, Plus, Search } from "lucide-react";
import ImgwithPL from "../ui/images/ImgwithPL";
import { MouseEventHandler, useEffect, useState } from "react";
import { IWatchList } from "../assets/js/myTypes";
import { WatchListMarker } from "../ui/WatchListMarker";
import CreateWatchListPopup from "../ui/popups/CreateWatchListPopup";
interface IWatchListLink {
    title: string;
    desc: string;
    index: number;
    length: number;
    _id: string;
    status: string[];
}

// import SearchBar from "../ui/gpt/SearchBar";

function WatchListLink({ title, desc, length, index, _id, status }: IWatchListLink) {
    return (
        <li className={"watchlist-item flex"}>
            <Link key={index} to={`/lists/${_id}`} className="flex fd-column">
                <div className="status-box flex fd-column">
                    {status.map((stat, i) => <WatchListMarker key={i} text={stat} />)}
                </div>
                <ImgwithPL placeholder_src={card_img_placeholder} src={`https://picsum.photos/200/300?random=${index}`} alt={title + ' img'} />
                <div className="watchlist-item-text-box flex fd-column">
                    <h2 className="ellipsis">{title}</h2>
                    {desc && <p className="desc ellipsis-2">{desc}</p>}
                    <div className="count-box flex algin-items-cen">
                        <List />
                        <p className="count">{length} items</p>
                    </div>
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
    type?: 'filter' | 'action'

}

function FilterButton({ name, icon, index, className, onClick, type }: IFilterButton) {

    return (
        <button
            onClick={onClick}
            className={
                "filter-btn algin-items-cen cursor-pointer" 
                + (className ? ' ' + className : '') 
                + (type === 'action' ? ' border-radius-7' : '')
            }
            key={index}>
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


export default function WatchListsPage({ text }: { text: string }) {
    const [watchlists, setWatchLists] = useState<IWatchList[] | undefined>()
    const [current_filter, setCurrentFilter] = useState<string>("All Lists")
    const [create_watch_list_modal_state, setCreateWatchListModalState] = useState<boolean>(false)

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
            { _id: '9', title: 'Horror Movies', desc: '', length: 9, status: ['Watching'] },
            { _id: '10', title: 'Romantic Movies', desc: '', length: 11, status: ['Watching'] },

        ])
    }, [])


    return (
        <div className="list-page margin-auto flex-page page">
            {create_watch_list_modal_state && <CreateWatchListPopup setStateToFalse={closeCreateWatchlistPopup()} />}
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
                            [
                                { name: "All Lists", icon: <FilterX />, type: 'sys' },
                                { name: "Watching", icon: <Eye />, type: 'sys' },
                                { name: 'Completed', icon: <BookmarkCheck />, type: 'sys' },
                                // { name: "Public Lists", icon: <Users /> },
                                { name: "Planning", icon: <Clock />, type: 'sys' },
                                { name: "Create", icon: <Plus />, type: 'action', func: () => setCreateWatchListModalState(true) }
                            ].map((filter, index) => {
                                return <FilterButton
                                    onClick={() => {
                                        if (filter?.func) {
                                            filter.func()
                                        } else {
                                            setCurrentFilter(filter.name)
                                        }
                                    }}
                                    key={index}
                                    className={filter.name === current_filter ? 'active' : ''}
                                    name={filter.name} icon={filter.icon} index={index}
                                    type={filter.type as 'filter' | 'action'}
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
                        if (current_filter == 'All Lists' || list.status.includes(current_filter)) {
                            return <WatchListLink key={index} {...list} index={index} />
                        } else {
                            return <></>
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

    function closeCreateWatchlistPopup(): (event: React.MouseEvent<HTMLButtonElement>) => void {
        return () => setCreateWatchListModalState(false);
    }
}
