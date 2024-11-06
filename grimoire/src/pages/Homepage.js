import Carousel from "./../components/js/Carousel"
import Header from "./../components/js/Header"
import SectionPreview from "./../components/js/SectionPreview"
import { TrendingUp, Tv, ChartNoAxesColumn,Clock3} from "lucide-react"
// import { TrendingUp, Tv, ChartNoAxesColumn,Film,Clapperboard } from "lucide-react"

export default function Homepage({top_movies_data__}){

    return (
        <div className="home-page page">
            <Header class_='homepage-header'/>
            <main>
                {top_movies_data__&&<Carousel data={top_movies_data__.results?.slice(0,7)}/>}
            </main>
            {top_movies_data__&&
            <>
            <SectionPreview title={'Trending'} icon={<TrendingUp />} data={top_movies_data__.results}/>
            <SectionPreview title={'Top'} icon={<ChartNoAxesColumn />} data={top_movies_data__.results}/>
            <SectionPreview title={'Ongoing'} icon={<Tv />} data={top_movies_data__.results}/>
            <SectionPreview title={'Upcoming'} icon={<Clock3 />} data={top_movies_data__.results}/>
          
         
                    
            </>
            }
        </div>
    )
}