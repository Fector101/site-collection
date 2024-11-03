import Carousel from "./Carousel"
import Header from "./Header"
import SectionPreview from "./SectionPreview"
import { TrendingUp } from "lucide-react"

export default function Homepage({top_movies_data__}){
    return (
        <>
            <main>
            <Header class_='homepage-header'/>
                {top_movies_data__&&<Carousel data={top_movies_data__}/>}
            </main>
            {top_movies_data__&&<SectionPreview title={'Trending'} icon={<TrendingUp />} data={top_movies_data__}/>}
        </>
    )
}