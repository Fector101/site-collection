// It will get data by itself from context file or straight from server
import { List, Plus, Search, X } from 'lucide-react'
import './watchlist.css'
import { useEffect, useState } from 'react';
import { IWatchList } from '../../assets/js/myTypes';
import ImgwithPL from '../images/ImgwithPL';
import { WatchListMarker } from '../WatchListMarker';
import CreateWatchListPopup from './CreateWatchListPopup';

interface IAddToListProps {
    itemId?: number|string;
    item_name: string;
    setStateToFalse: ()=>void;
}

function SearchInput1({ placeholder }: { placeholder: string }) {
    return (
        <div className="search-input-1-box flex">
            <Search className="search-icon" />
            <input type="text" placeholder={placeholder} />
        </div>
    );
}
export default function AddToList({ itemId, item_name,setStateToFalse }: IAddToListProps) {
    const [watchlists, setWatchLists] = useState<IWatchList[] | undefined>()
    const [create_list_state, setCreateListState] = useState<boolean>(() => false)
    console.log('Use itemId to add to database:', itemId)

    
    function clickedOption(event: React.MouseEvent<HTMLLIElement>, id: string) {
        document.querySelector('.add-to-list-item.active')?.classList.remove('active');
        (event.target as HTMLElement).closest('li.add-to-list-item')?.classList.add('active');

        if (id) {
            console.log(`Clicked on list with ID: ${id}`);
            // add the item to the list
            // context?.addItemToList(itemId, listId);
        }
    }

    useEffect(() => {
        // Attaching ESC key event listener to close the popup
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key !== 'Escape') { return }
            console.log(create_list_state)
            if (create_list_state) {
                setCreateListState(false);
            }
            else {
                setStateToFalse();
                console.log('Add to list popup closed');
            }
        };
        document.addEventListener('keyup', handleKeyDown);
        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('keyup', handleKeyDown);
        };
        // List useful i think context is causing re-rendering setting create_list_state to false
        //  even with const [create_list_state, , setCreateListState] = useState<boolean>(() => false)
    }, [create_list_state,setStateToFalse]);



    // const [current_filter, setCurrentFilter] = useState<string>("All Lists")
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
        <>
            <div className="add-to-list-popup popup-modal flex">

                <main className='flex'>
                    <button className='close-btn' onClick={setStateToFalse} title='Close'>
                        <X />
                    </button>
                    <h3 className='truncate-1-line'>Add "{item_name || 'Inception'}" to a watchlist</h3>
                    <SearchInput1 placeholder='Search your watchlists' />
                    <ol>
                        {
                            watchlists?.map(list => {
                                return (
                                    <li key={list._id} className="add-to-list-item flex cursor-pointer" onClick={(e) => clickedOption(e, list._id)}>
                                        <ImgwithPL src={`https://picsum.photos/200/300?random=${list._id}`} alt={list.title} />
                                        <div className="desc">
                                            <p className="title">{list.title}</p>
                                            <div className="count-box flex algin-items-cen">
                                                <List />
                                                <p className="count">{list.length} items</p>
                                            </div>
                                        </div>
                                        <WatchListMarker text={list.status[0]} />
                                    </li>
                                )
                            })
                        }
                    </ol>
                    <button className='cursor-pointer create-btn' onClick={() => setCreateListState(true)} title='Create new watchlist'>
                        <Plus />
                        <p>Create new watchlist</p>
                    </button>
                    <div className="btm-action-btns flex">
                        <button className="cursor-pointer flex algin-items-cen cancel-btn" onClick={setStateToFalse} title='Close'>Cancel</button>
                        <button className="cursor-pointer flex algin-items-cen fill-btn">Add to watchlist</button>
                    </div>
                </main>

            </div>
            {create_list_state && <CreateWatchListPopup setStateToFalse={() => setCreateListState(false)} />}

        </>

    )
}