import { TrendingUp, Tv, ChartNoAxesColumn } from "lucide-react"
import Carousel from "../ui/carousel/Carousel"
import SectionPreview from "../ui/SectionPreview"
import Recommendations from "../assets/js/Recommendations"
import LoginComponent from "../ui/login-signup/LoginForm"
import AddToListPopup from "../ui/popups/AddToList";
import { IMovieData } from "../assets/js/api_data"
import { useState } from "react"
import { IAddToListModalData } from "../assets/js/myTypes"

export default function HomePage({ top_movies_data }: { top_movies_data: IMovieData[] }) {
    const [add_to_watchlist_modal_data,setAddToWatchListModalData] = useState<IAddToListModalData>({item_id:0,item_name:'',state:false})
    
    return (
        <div className="home-page page">
            <main>
                {top_movies_data && <Carousel data={top_movies_data?.slice(0, 7)} />}
            </main>
            {top_movies_data &&
                <>
                    {add_to_watchlist_modal_data.state && <AddToListPopup setStateToFalse={()=>setAddToWatchListModalData(old=> ({...old,state:false}))} item_name={add_to_watchlist_modal_data.item_name} itemId={add_to_watchlist_modal_data.item_name} />}

                    <SectionPreview title={'Trending'} icon={<TrendingUp />} data_info={{ types: ['Movies', 'TV Shows'], active: 'Movies' }} data={top_movies_data} url='trending' setAddToWatchListModalData={setAddToWatchListModalData}/>
                    <SectionPreview title={'Top'} icon={<ChartNoAxesColumn />} data_info={{ types: ['Movies', 'TV Shows'], active: 'Movies' }} data={top_movies_data} url='top' setAddToWatchListModalData={setAddToWatchListModalData}/>
                    <SectionPreview title={'Ongoing'} icon={<Tv />} data_info={{ types: ['TV Shows'], active: 'TV Shows' }} data={top_movies_data} url='ongoing' setAddToWatchListModalData={setAddToWatchListModalData}/>
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