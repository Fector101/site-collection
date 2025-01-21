import { Bookmark } from "lucide-react";

function BookmarkActionButton(){
    return (
        <button className='beating-bookmark-btn'>
            <Bookmark className='svg-white-fill first-svg'/>
            <Bookmark className='svg-white-fill'/>
        </button>
    )
}
export  {BookmarkActionButton}