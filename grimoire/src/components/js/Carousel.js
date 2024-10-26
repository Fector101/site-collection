import './../css/carousel.css'
import img1 from './../imgs/img.png'
import { Star, StarHalf, Plus, Play } from 'lucide-react'
// import { nanoid } from 'nanoid'
// import { useEffect } from 'react'
import {toHHMMSS} from './helper'
function CarouselBtn({text,icon,class_}){
    
    return(
        <button className={class_}>
            {icon}
            <p>{text}</p>
        </button>
    )
}
export default function Carousel(){
    const trending = [
        {secs:2222,description: `Follow Uhtred of Bebbanburg's quest for revenge and redemption in this epic historical drama based on Bernard Cornwell's novels.`, id: 1, title: 'The Last Detective', rating: 4.8, image_url: '/api/placeholder/200/300', type: 'TV Series' },
        // {description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias odit suscipit odio ad ab eveniet illum? Ab aliquam a nam at doloribus, et, deserunt vitae veritatis esse sint magnam? Nisi!', id: 2, title: 'Space Warriors', rating: 4.6, image_url: '/api/placeholder/200/300', type: 'Movie' },
        // {description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias odit suscipit odio ad ab eveniet illum? Ab aliquam a nam at doloribus, et, deserunt vitae veritatis esse sint magnam? Nisi!', id: 3, title: 'City Lights', rating: 4.9, image_url: '/api/placeholder/200/300', type: 'Movie' },
        // {description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias odit suscipit odio ad ab eveniet illum? Ab aliquam a nam at doloribus, et, deserunt vitae veritatis esse sint magnam? Nisi!',      id: 4, title: 'The Dark Path', rating: 4.7, image_url: '/api/placeholder/200/300', type: 'TV Series' }
    ]
    return (
        trending.map(({description, title, rating, image_url,secs}) =>
            {   return (
                // <div key={title} className="carousel-case" style={{backgroundImage: ``}}>
                <div key={title} className="carousel-case" style={{backgroundImage: `url(${img1})`}}>
                    <div className='carousel-content-case'>
                        <div className="texts">
                            <h3 className="title">{title}</h3>
                            <div className="sub-box">
                                <p>{toHHMMSS(secs)} hrs</p>
                                <div className="rating-stars"> 
                                        {[...Array(Math.trunc(rating)).keys()].map(each=><Star/>)}
                                </div>
                                <p>{rating}</p>
                            </div>
                            <p className="description">{description}</p>
                        </div>
                        <div className='btns-case'>
                            <CarouselBtn class_="icon watch-icon" text='watch trailer' icon={<Play/>}/>
                            <CarouselBtn class_="icon add-icon" text='add list' icon={<Plus/>}/>
                        </div>
                    </div>
                </div>)
            })
    )

}