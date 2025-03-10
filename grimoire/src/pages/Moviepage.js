import { useSearchParams } from "react-router-dom";
import { top_movies_data } from "../components/js/api_data"
import { nanoid } from "nanoid";
import { getGenreName, randInt } from "../components/js/helper";
import ImgwithPL from "../components/js/ImgwithPL";
import './../components/css/moviepage.css'
import { PlayCircle, User2, ArrowBigDown, ArrowBigUp, Clock, Calendar, Languages, Eye, PlusCircle, Heart, HeartCrack, Dot, Play} from "lucide-react";
import { BookmarkActionButton } from "../components/ui/buttons/buttons";
import rottenTomatoImg from './../components/imgs/rotten_tomato.png'
import imdbSvg from './../components/imgs/imdb.svg'
import logoPng from './../components/imgs/logo.png'
import { useEffect, useState } from "react";

function formatTime(secs){
  
	const format = (arg)=>arg.toString().padStart(2, '0')

  let time = ''
	let sec_num = parseInt(secs, 10)
	let hrs=Math.floor(sec_num/3600)
	let mins = Math.floor((sec_num - (hrs * 3600)) / 60)
	let secs__=sec_num - (hrs*3600)-(mins*60)
	if (hrs > 0) time += `${format(hrs)} ${hrs===1?'hr':'hrs'}`
  if (mins > 0) time += ` ${format(mins)} ${mins===1?'min':'mins'}`
  if (secs__ > 0) time += ` ${format(secs__)} ${secs__===1?'sec':'secs'}`

	return time

}
function ActionBtns({btns_data,className,icon}){
  return(
    <div className={"large-btns-box"+ (className? ' '+className:'')}>
      {btns_data.map(({title,icon,func,className})=> <button key={title} onClick={func} className={"outline-white"+ (className? ' '+className:'')}> {icon} {title}</button> )}
    </div>
  )
}
function formatDate(date){
    
  const dateObj = new Date(date);

  // Get the day, month, and year
  const month = dateObj.toLocaleString('default', { month: 'short' }); // Abbreviated month
  const year = dateObj.getFullYear();

  function getOrdinalSuffix(day) {
    if (day >= 11 && day <= 13) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }
  let day = dateObj.getDate();
  day+=getOrdinalSuffix(day)

  return `${day} of ${month}, ${year}`;
}
function Castmember({member_data}){
    return(
        <div className="cast-member">
            <ImgwithPL pl_type='svg' placeholder_src={<User2 style={{color:'#bdbaba'}}/>} src={`https://cast/${member_data.img}`} alt={member_data.name} /> 
            <p> {member_data.name || "Loerm ipm"} </p>
            <p> {member_data.character   || "Joe"} </p>
        </div>
    )
}
function Details({secs,original_language,release_date,className}){
  return(
    <ul className={"sub-details" +  (className? ' '+className:'')}>

                        <li className="inline-flex">
                          <Clock />
                          <p>{formatTime(secs)}</p>
                        </li>
                        <li className="lang inline-flex">
                          { className !== "for-smaller-screen" && <p className="dot"> &#x2022; </p> }
                          {/* <Dot className="dot"/> */}
                          <Languages />
                          <p className=""> lang: {original_language} </p>
                        </li>

                        <li className="flex">
                          <Calendar />
                          <p className=""> Released: {formatDate(release_date)} </p>
                        </li>
                        {/* <p className="inline-block"> {vote_average} </p> */}
                      </ul>
  )
}

export default function Moviepage(){
    const [searchParams] = useSearchParams();
    const movie_id = searchParams.get('id');
    let movie_data ={...top_movies_data.results.find(({id}) => id === +movie_id)} //{...object.value} clones main object value
    // movie_data ={}
    function takeVote(element){
        element.stopPropagation()
        const clicked_btn = element.target.closest('button')
        if (!clicked_btn) return

        const btn_box = element.target.closest('.rate-btns-case')
        const user_vote = [...clicked_btn.classList].filter(class_name=> ['up','down'].includes(class_name))[0]

        if (user_vote === 'up'){
            btn_box.querySelector('.vote-btn.down').classList.remove('clicked')
        }else if (user_vote === 'down'){
            btn_box.querySelector('.vote-btn.up').classList.remove('clicked')
        }
        clicked_btn.classList.toggle('clicked')
    }
    const { 
            adult,
            backdrop_path,
            genre_ids,
            id,
            media_type,
            original_language,
            title,
            original_title,
            overview,
            popularity,
            poster_path,
            release_date,
            video,
            vote_average,
            vote_count,
        } = movie_data
    // delete movie_data.title
    let cast = [
        {
          "id": 6193,
          "name": "Leonardo DiCaprio",
          "character": "Dom Cobb",
          "profile_path": "/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg"
        },
        {
          "id": 24045,
          "name": "Joseph Gordon-Levitt",
          "character": "Arthur",
          "profile_path": "/4U9G4YwTlIEbAymBaseltwUs4OF.jpg"
        },
        {
          "id": 2537,
          "name": "Elliot Page",
          "character": "Ariadne",
          "profile_path": "/gJcw8SgLqMQ2XQLvhtdmBz3F3Ma.jpg"
        },
        {
          "id": 2524,
          "name": "Tom Hardy",
          "character": "Eames",
          "profile_path": "/6S0dmVVZc1YCt8bEQcDQWEyQ5ga.jpg"
        },
        {
          "id": 3896,
          "name": "Ken Watanabe",
          "character": "Saito",
          "profile_path": "/d7UY8jRV3z6m97lF2sjJ04nOylP.jpg"
        },
        {
          "id": 3897,
          "name": "Cillian Murphy",
          "character": "Robert Fischer",
          "profile_path": "/nvTujOMoJuSsbI5G9l83dkfWtQ3.jpg"
        },
        {
          "id": 3897,
          "name": "Cillian Murphy",
          "character": "Robert Fischer",
          "profile_path": "/nvTujOMoJuSsbI5G9l83dkfWtQ3.jpg"
        },
        {
          "id": 3897,
          "name": "Cillian Murphy",
          "character": "Robert Fischer",
          "profile_path": "/nvTujOMoJuSsbI5G9l83dkfWtQ3.jpg"
        },
        {
          "id": 3897,
          "name": "Cillian Murphy",
          "character": "Robert Fischer",
          "profile_path": "/nvTujOMoJuSsbI5G9l83dkfWtQ3.jpg"
        }
      ]
    // cast = []
    let [cover_img,SetCoverImg] = useState('linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0.5), transparent)')
    useEffect(()=>{
        const img = new Image()
        img.src = `https://image.tmdb.org/t/p/original${backdrop_path}`
        img.onload = ()=>SetCoverImg(`url(${img.src})`)
    },[backdrop_path])
    const secs = randInt(3600, 7200)
    const action_btns_data = [{title:'Watched It',icon:<Eye/>}, {title:'Add to List',icon: <PlusCircle/>, className: 'watchlist-btn'}, {title:'Favourites', icon: <Heart/>}]
    return (
        <div className="movie-page margin-auto flex-page">

            <section  style={{backgroundImage: cover_img}} className="movie-poster-case">
                
                <button className="play-btn"> <Play/> </button>
                <div className="content flex">
                  <div className="details">
                      <h3> {title} </h3>
                      {original_title !== title && <p>AKA: {original_title}</p>}
                      <Details className="for-lager-screen" secs={secs} original_language={original_language} release_date={release_date} />
                      <div className="genres-box flex"> {genre_ids?.map(genre_id=><p key={nanoid()} className={genre_id + '0'}>{getGenreName(genre_id)}</p>)} </div>
                  </div>

                  <BookmarkActionButton className='bookmark-btn'/>
                  <ActionBtns className="large-screens-btns" btns_data={action_btns_data}/>
                </div>
            </section>
            <Details className="for-smaller-screen" secs={secs} original_language={original_language} release_date={release_date} />
            <ActionBtns className="medium-screens-btns" btns_data={action_btns_data}/>
            
            <section className="overview-box">
                <h4>Overview</h4>
                <p>{overview}</p>
            </section>

            <section>
                <h3>Cast</h3>
                <div className="cast-box">
                    {cast.map(each_member=><Castmember key={nanoid()} member_data={each_member}/>)}
                </div>
            </section>

            <section className="rating-box">
                <h4>Ratings</h4>
                        <div className="display-flex rate-btns-case">
                            <button onClick={takeVote} className="vote-btn down"> <ArrowBigDown /> </button>
                            <button onClick={takeVote} className="vote-btn up"> <ArrowBigUp /> </button>
                        </div>
                <table>
                    <tbody>
                        <tr>
                            <td> Site </td>
                            <td> Rating </td>
                            <td> People</td>
                        </tr>
                        <tr>
                            <td>
                              <img src={imdbSvg} alt="IMDB"/>
                              <p>IMDB</p>
                              </td>
                            <td>{vote_average}</td>
                            <td>10k</td>
                        </tr>
                        <tr>
                            <td> 
                                <img src={rottenTomatoImg} alt="Rotten Tomato"/>
                                <p>Rotten Tomato</p>
                              </td>
                            <td>{popularity}</td>
                            <td>11.1k</td>
                        </tr>
                        <tr>
                            <td>
                              <img src={logoPng} alt="Grimoire"/>
                              <p>Grimoire</p>
                              </td>
                            <td>{vote_count}</td>
                            <td>1m</td>
                        </tr>
                        
                        {/* <tr>   Download the logo and add it to the project
                            <td>
                              <img src={logoPng} alt="themoviedb"/>
                              <p>themoviedb</p>
                              </td>
                            <td>{vote_average}</td>
                            <td>{vote_count}</td>
                        </tr> */}
                    </tbody>  

                </table>
            </section>

            
        </div>
    )
}
// {/* {Object.entries(movie_data).map(each=><p key={nanoid()}>{each.join(': ')}</p>)} */}
