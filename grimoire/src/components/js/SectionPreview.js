import "./../css/SectionPreview.css"
import { Star, Bookmark,ThumbsUp,ThumbsDown} from 'lucide-react'

function Card({movie_data}){
    let {poster_path,title, media_type, vote_average, secs=7200} = movie_data
    
    return (
        <li className="card cursor-pointer">
            <div className="bookmark-btn-case hidden">
                <button className="bookmark">
                    <Bookmark/>
                </button>
            </div>
            <img alt={title} src={`https://image.tmdb.org/t/p/original${poster_path}`} />
            {/* <img alt={title}/> */}
            <div className="card-info-texts hidden">
                <p>{title}</p>    
                <div className="sub-case">
                    <p>{media_type}</p>
                    <Star className="svg-solid-yellow" />
                    <p>{(+vote_average).toFixed(2)}</p>
                    <button className="rate-btn"> <ThumbsDown /> </button>
                    <button className="rate-btn"> <ThumbsUp /> </button>
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