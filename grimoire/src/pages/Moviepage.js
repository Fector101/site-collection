import { useSearchParams } from "react-router-dom";
import { top_movies_data } from "../components/js/api_data"

export default function Moviepage(){
    const [searchParams] = useSearchParams();
    const movie_id = searchParams.get('id');
    const movie_data =top_movies_data.results.find(({id}) => id === +movie_id)
    console.log(movie_data)
    return (
        <div style={{background: 'yellow'}} className="margin-auto">

        </div>
    )
}