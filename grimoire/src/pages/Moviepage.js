import { useSearchParams } from "react-router-dom";
import { top_movies_data } from "../components/js/api_data"
import { nanoid } from "nanoid";

export default function Moviepage(){
    const [searchParams] = useSearchParams();
    const movie_id = searchParams.get('id');
    const movie_data ={...top_movies_data.results.find(({id}) => id === +movie_id)} //{...object.value} clones main object value
    
    // const { 
    //         adult,
    //         backdrop_path,
    //         genre_ids,
    //         id,
    //         media_type,
    //         original_language,
    //         original_title,
    //         overview,
    //         popularity,
    //         poster_path,
    //         release_date,
    //         video,
    //         vote_average,
    //         vote_count,
    //     } = movie_data
        delete movie_data.title
    return (
        <div style={{background: ''}} className="movie-page margin-auto flex-page">
            {Object.entries(movie_data).map(each=><p key={nanoid()}>{each.join(': ')}</p>)}
        </div>
    )
}