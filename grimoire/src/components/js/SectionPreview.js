import { nanoid } from "nanoid"
import "./../css/SectionPreview.css"
import { ChevronLeft,ArrowBigUp,ArrowBigDown,Bookmark, ChevronRight} from 'lucide-react'
// import { ChevronLeft,ArrowBigUp,ArrowBigDown,LucideListPlus, ChevronRight} from 'lucide-react'
import { useState } from "react"
// import { Star, Bookmark,ThumbsUp,ThumbsDown,Plus} from 'lucide-react'
import card_img_placeholder from  "./../imgs/card-img-pl1.png"
import ImgwithPL from "./ImgwithPL"
import { Link, useNavigate } from "react-router-dom"
// import { Link } from "react-router-dom";

function Card({movie_data,onClick}){
    let {poster_path,release_date,title, vote_average,rated='PG',id} = movie_data
    // let {poster_path,title, release_date,media_type, vote_average,rated='PG'} = movie_data
    function takeVote(element){
        element.stopPropagation()
        const clicked_btn = element.target.closest('button')
        if (!clicked_btn) return
        
        const card = element.target.closest('.card')
        const user_vote = [...clicked_btn.classList].filter(class_name=> ['up','down'].includes(class_name))[0]
        
        if (user_vote === 'up'){
            card.querySelector('.rate-btns-case .vote-btn.down').classList.remove('clicked')
        }else if (user_vote === 'down'){
            card.querySelector('.rate-btns-case .vote-btn.up').classList.remove('clicked')
        }
        clicked_btn.classList.toggle('clicked')
    }
    const navigate = useNavigate()
    const goToMovie = () => {
      navigate(`/movie?id=${id}`);
    };
    return (
        <li className="card cursor-pointer" tabIndex="0" onClick={goToMovie}>
            <div className="bookmark-btn-case">
                <button className="add-to-list-btn">
                    <Bookmark/>
                </button>
            </div>
            <ImgwithPL alt={title} src={`https://image.tmdb.org/t/p/original${poster_path}`} placeholder_src={card_img_placeholder} />
            <div className="card-info">
                <div className="title-box-pc">
                    <p className="title"> {title} </p>
                </div>
                <div className="details-box">


                    <div className="details-case-1">
                        <p className="title"> {title} </p>
                        <div className="btns-box">
                            <p className="sutle-card-btn"> {release_date.split('-')[0]} </p>
                            <p className="sutle-card-btn not-hv-effect"> {rated} </p>
                        </div>
                    </div>
                    <div className="details-case-2">
                        <div className="display-flex rate-text-case"> <p className="rate-txt"> {(+vote_average).toFixed(2)} </p> </div>
                        <div className="display-flex rate-btns-case">
                            <button onClick={takeVote} className="vote-btn down"> <ArrowBigDown /> </button>
                            <button onClick={takeVote} className="vote-btn up"> <ArrowBigUp /> </button>
                        </div>
                    </div>
                </div>

            </div>
        </li>
    )
}
export default function SectionPreview({data,title, icon,data_info,url}){
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

                {data.map((each_movie,i)=> <Card movie_data={each_movie} key={i} /> ) }

                <button className="collection-right-btn"> <ChevronRight /> </button>
            </ol>
            {url && <Link to={url} className="view-all-link">View all</Link>}
        </section>
    )
}
