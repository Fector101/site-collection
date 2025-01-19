import Carousel from "../components/ui/carousel/Carousel"
import Footer from "../components/ui/footer/Footer"
// import Header from "./../components/Header/Header"
import SectionPreview from "./../components/js/SectionPreview"
import Recommendations from "./../components/js/Recommendations"
import CalltoAction from "./../components/ui/call-to-action/CalltoAction"
import {TrendingUp, Tv, ChartNoAxesColumn,Clock3, Smile, SmilePlus} from "lucide-react"
// import { TrendingUp, Tv, ChartNoAxesColumn,Film,Clapperboard } from "lucide-react"

export default function Homepage({top_movies_data__}){

    return (
        <div className="home-page page">
            {/* <Header class_='homepage-header'/> */}
            <main>
                {top_movies_data__&&<Carousel data={top_movies_data__.results?.slice(0,7)}/>}
            </main>
            {top_movies_data__&&
            <>
            <SectionPreview title={'Trending'} icon={<TrendingUp />} data_info={{types:['Movies','TV Shows'],active:'Movies'}} data={top_movies_data__.results} url='trending'/>
            <SectionPreview title={'Top'} icon={<ChartNoAxesColumn />} data_info={{types:['Movies','TV Shows'],active:'Movies'}} data={top_movies_data__.results} url='top'/>
            <SectionPreview title={'Ongoing'} icon={<Tv />} data_info={{types:['TV Shows']}} data={top_movies_data__.results} url='ongoing'/>
            <Recommendations data={top_movies_data__.results.slice(0,6)}/>
            <CalltoAction />
            <Footer />
            </>
            }
        </div>
    )
}
// {/* add ongoing,top,trending,Upcoming to Movies/Shows page */}
// {/* <SectionPreview title={'Upcoming'} icon={<Clock3 />} data_info={{types:['Movies','TV Shows'],active:'Movies'}} data={top_movies_data__.results}/> */}