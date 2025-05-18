import { TrendingUp, Tv, ChartNoAxesColumn } from "lucide-react"
import Carousel from "../ui/carousel/Carousel"
import SectionPreview from "../ui/SectionPreview"
import Recommendations from "../assets/js/Recommendations"
import LoginComponent from "../ui/login-signup/LoginForm"
import { IMovieData } from "../assets/js/api_data"


export default function HomePage({ top_movies_data}:{top_movies_data: IMovieData[]}) {

    return (
        <div className="home-page page">
            <main>
                {top_movies_data && <Carousel data={top_movies_data?.slice(0, 7)} />}
            </main>
            {top_movies_data &&
                <>
                    <SectionPreview title={'Trending'} icon={<TrendingUp />} data_info={{ types: ['Movies', 'TV Shows'], active: 'Movies' }} data={top_movies_data} url='trending' />
                    <SectionPreview title={'Top'} icon={<ChartNoAxesColumn />} data_info={{ types: ['Movies', 'TV Shows'], active: 'Movies' }} data={top_movies_data} url='top' />
                    <SectionPreview title={'Ongoing'} icon={<Tv />} data_info={{ types: ['TV Shows'], active:'TV Shows' }} data={top_movies_data} url='ongoing' />
                    <Recommendations data={top_movies_data.slice(0, 6)} />
                    <div className="SectionPreview">
                        <LoginComponent />
                    </div>
                </>
            }
        </div>
    )
}
// {/* add ongoing,top,trending,Upcoming to Movies/Shows page */}
// {/* <SectionPreview title={'Upcoming'} icon={<Clock3 />} data_info={{types:['Movies','TV Shows'],active:'Movies'}} data={top_movies_data.results}/> */}