import Carousel from "./../components/js/Carousel"
import Header from "./../components/js/Header"
import SectionPreview from "./../components/js/SectionPreview"
import { TrendingUp } from "lucide-react"

export default function Homepage({top_movies_data__}){
    return (
        <div className="home-page App">
            <main>
                <Header class_='homepage-header'/>
                {top_movies_data__&&<Carousel data={top_movies_data__.results?.slice(0,7)}/>}
            </main>
            {top_movies_data__&&<SectionPreview title={'Trending'} icon={<TrendingUp />} data={top_movies_data__.results}/>}
        </div>
    )
}