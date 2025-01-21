import { useSearchParams } from "react-router-dom";
import { top_movies_data } from "../components/js/api_data"
import { nanoid } from "nanoid";
import { getGenreName } from "../components/js/helper";
import ImgwithPL from "../components/js/ImgwithPL";
import './../components/css/moviepage.css'
import { PlayCircle, UserCircle2Icon } from "lucide-react";
import { BookmarkActionButton } from "../components/ui/buttons/buttons";
function Castmember({member_data}){
    return(
        <div className="cast-member">
            <ImgwithPL pl_type='svg' placeholder_src={<UserCircle2Icon/>} src={`https://cast/${member_data.img}`} alt={member_data.name} /> 
            <p> {member_data.name || "Loerm ipm"} </p>
            <p> {member_data.character   || "Joe"} </p>
        </div>
    )
}
export default function Moviepage(){
    const [searchParams] = useSearchParams();
    const movie_id = searchParams.get('id');
    const movie_data ={...top_movies_data.results.find(({id}) => id === +movie_id)} //{...object.value} clones main object value
    
    const { 
            adult,
            backdrop_path,
            genre_ids,
            id,
            media_type,
            original_language,
            original_title,
            overview,
            popularity,
            poster_path,
            release_date,
            video,
            vote_average,
            vote_count,
        } = movie_data
    delete movie_data.title
    const cast = [
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
    return (
        <div className="movie-page margin-auto flex-page">

            <section  style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`}} className="movie-poster-case">

                <h3> {original_title} </h3>
                <div className="sub-details">
                    <p> {release_date} </p>
                    <div className="genres-box">
                        {genre_ids.map(genre_id=><p key={nanoid()} className={genre_id}>{getGenreName(genre_id)}</p>)}
                    </div>
                    <p> {vote_average} </p>
                </div>
                <button className="play-btn">
                  <PlayCircle/>
                </button>
                <BookmarkActionButton/>
            </section>

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
        </div>
    )
}
// {/* {Object.entries(movie_data).map(each=><p key={nanoid()}>{each.join(': ')}</p>)} */}