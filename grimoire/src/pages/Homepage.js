import {TrendingUp, Tv, ChartNoAxesColumn} from "lucide-react"
import Carousel from "../components/ui/carousel/Carousel"
import SectionPreview from "./../components/js/SectionPreview"
import Recommendations from "./../components/js/Recommendations"
import LoginComponent from "../components/ui/login-signup/LoginComponent"

export default function Homepage({top_movies_data__}){

    return (
        <div className="home-page page">
            <main>
                {top_movies_data__&&<Carousel data={top_movies_data__.results?.slice(0,7)}/>}
            </main>
            {top_movies_data__&&
            <>
            <SectionPreview title={'Trending'} icon={<TrendingUp />} data_info={{types:['Movies','TV Shows'],active:'Movies'}} data={top_movies_data__.results} url='trending'/>
            <SectionPreview title={'Top'} icon={<ChartNoAxesColumn />} data_info={{types:['Movies','TV Shows'],active:'Movies'}} data={top_movies_data__.results} url='top'/>
            <SectionPreview title={'Ongoing'} icon={<Tv />} data_info={{types:['TV Shows']}} data={top_movies_data__.results} url='ongoing'/>
            <Recommendations data={top_movies_data__.results.slice(0,6)}/>
            <div className="SectionPreview">
                <LoginComponent />
            </div>
            </>
            }
        </div>
    )
}
// {/* add ongoing,top,trending,Upcoming to Movies/Shows page */}
// {/* <SectionPreview title={'Upcoming'} icon={<Clock3 />} data_info={{types:['Movies','TV Shows'],active:'Movies'}} data={top_movies_data__.results}/> */}