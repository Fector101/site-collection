import { Bookmark } from "lucide-react";

function BookmarkActionButton({className}:{className?:string}){
    return (
        <button className={'beating-bookmark-btn' + (className? ' '+className:'')}>
            <Bookmark className='svg-white-fill first-svg'/>
            <Bookmark className='svg-white-fill'/>
        </button>
    )
}
export  {BookmarkActionButton}