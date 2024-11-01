import Carousel from "./Carousel"
import Header from "./Header"
import './../css/homepage.css'

export default function Homepage({top_movies_data__}){
    return (
        <>
            <Header class_='homepage-header'/>
            <main>
                {top_movies_data__&&<Carousel data={top_movies_data__}/>}
            </main>
        </>
    )
}