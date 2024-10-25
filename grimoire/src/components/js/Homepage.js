import Carousel from "./Carousel"
import Header from "./Header"
import './../css/homepage.css'

export default function Homepage(){
    return (
        <>
            <Header class_='homepage-header'/>
            <main>
                <Carousel />
            </main>
        </>
    )
}