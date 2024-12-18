import { nanoid } from "nanoid"
import "./../css/SectionPreview.css"
import { ChevronLeft,ArrowBigUp,ArrowBigDown,Bookmark, ChevronRight} from 'lucide-react'
// import { ChevronLeft,ArrowBigUp,ArrowBigDown,LucideListPlus, ChevronRight} from 'lucide-react'
import { useState } from "react"
// import { Star, Bookmark,ThumbsUp,ThumbsDown,Plus} from 'lucide-react'

function Card({movie_data}){
    let {poster_path,release_date,title, vote_average,rated='PG'} = movie_data
    // let {poster_path,title, media_type, vote_average,rated='PG'} = movie_data
    
    return (
        <li className="card cursor-pointer">
            <div className="bookmark-btn-case">
                <button className="add-to-list-btn">
                    <Bookmark/>
                </button>
            </div>
            <img alt={title} loading="lazy" src={`https://image.tmdb.org/t/p/original${poster_path}`} />
            {/* <img alt={title} loading="lazy" srcSet={`https://via.placeholder.com/320x480`} src={`https://image.tmdb.org/t/p/original${poster_path}`} /> */}
            <div className="card-info">
                <button className="sutle-card-btn">
                    {/* <Link to={`${media_type}\:${rated}`}>{rated}</Link>     */}
                        {release_date.split('-')[0]}
                </button>
                <button className="sutle-card-btn not-hv-effect"> {rated} </button>
                <div className="side-case">
                    <div className="display-flex rate-text-case">
                        {/* <Star className="svg-solid-yellow" /> */}
                        <p className="rate-txt">{(+vote_average).toFixed(2)}</p>
                    </div>
                    <div className="display-flex rate-btns-case">
                        <button onClick={(e)=>{ e.target.closest('.card').querySelector('.vote-btn.clicked')?.classList.remove('clicked'); e.target.closest('button').classList.toggle('clicked')}} className="vote-btn down"> <ArrowBigDown /> </button>
                        <button onClick={(e)=>{ e.target.closest('.card').querySelector('.vote-btn.clicked')?.classList.remove('clicked'); e.target.closest('button').classList.toggle('clicked')}} className="vote-btn up"> <ArrowBigUp /> </button>
                    </div>
                </div>
            </div>
        </li>
    )
}
export default function SectionPreview({data,title, icon,data_info}){
    let [activePreview, setActivePreview] = useState(()=>data_info.active||data_info.types[0])
    function switchPreview(e){
        const clicked_tab = e.target
        if(!clicked_tab)return
        setActivePreview(clicked_tab.innerText)
        // document.querySelector('.preview-media-type-btns-case button.active').classList.remove('active')
        // clicked_tab.classList.add('active')

    }
    return (
        <section className="SectionPreview">
            <div className="header">
                {icon && icon}
                <h3>{title}</h3>
                <div className="display-flex preview-media-type-btns-case">
                    {data_info.types.map((each,i,arr)=> <button onClick={switchPreview} id={nanoid()} key={nanoid()} className={`cursor-pointer `+ (each===activePreview? "btn-fill-white active" : "btn-outline-white") + (arr.length ===1 ?' one-type':'') }>{each}</button> )}
                </div>
            </div>
            <ol className="collection  horizontal-scrollbar__items--faded-end horizontal-scrollbar__items--faded-start horizontal-scrollbar__items--faded">
                <button className="collection-left-btn"> <ChevronLeft/> </button>

                {data.map((each_movie,i)=> <Card movie_data={each_movie} key={i}/> ) }

                <button className="collection-right-btn"> <ChevronRight /> </button>
            </ol>
        </section>
    )
}
