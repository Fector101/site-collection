import "./../css/SectionPreview.css"
import { Star, Bookmark,ThumbsUp,ThumbsDown,Plus} from 'lucide-react'

function Card({movie_data}){
    let {poster_path,title, media_type, vote_average,rated='PG'} = movie_data
    
    return (
        <li className="card cursor-pointer">
            <div className="bookmark-btn-case">
                <button className="add-to-list-btn">
                    <Plus/>
                </button>
            </div>
            <img alt={title} loading="lazy" src={`https://image.tmdb.org/t/p/original${poster_path}`} />
            {/* <img alt={title}/> */}
            <div className="card-info">
                <button className="rated-pg not-hov-effect">
                    {/* <Link to={`${media_type}\:${rated}`}>{rated}</Link>     */}
                    {rated}  
                </button>
                <div className="side-case">
                    <div className="display-flex rate-status-case">
                        <Star className="svg-solid-yellow" />
                        <p className="">{(+vote_average).toFixed(2)}</p>
                    </div>
                    <div className="display-flex rate-btns-case">
                        <button className="rate-btn"> <ThumbsDown /> </button>
                        <button className="rate-btn"> <ThumbsUp /> </button>
                    </div>
                </div>
            </div>
        </li>
    )
}
export default function SectionPreview({data,title, icon}){
    return (
        <section className="SectionPreview">
            <div className="header">
                {icon && icon}
                <h3>{title}</h3>
            </div>
            <ol className="collection  horizontal-scrollbar__items--faded-end horizontal-scrollbar__items--faded-start horizontal-scrollbar__items--faded">

                {data.map((each_movie,i)=> <Card movie_data={each_movie} key={i}/> ) }
                
            </ol>
        </section>
    )
}