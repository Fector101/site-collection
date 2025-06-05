import { Bookmark } from "lucide-react";


function BookmarkActionButton({className,onClick}:{className?:string,onClick:React.MouseEventHandler<HTMLButtonElement>}){
    
    return (
        <button className={'beating-bookmark-btn' + (className? ' '+className:'')} onClick={onClick}>
            <Bookmark className='svg-white-fill first-svg'/>
            <Bookmark className='svg-white-fill'/>
        </button>
    )
}
export  {BookmarkActionButton}