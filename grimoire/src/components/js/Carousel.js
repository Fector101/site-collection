import './../css/carousel.css'
import img1 from './../imgs/img.png'
import { Star, StarHalf, Plus, Play , Triangle } from 'lucide-react'
// import { nanoid } from 'nanoid'
// import { useEffect } from 'react'
import {toHHMMSS, parseDecimalSide} from './helper'
import { useEffect, useRef, useState } from 'react'
function CarouselBtn({text,icon,class_}){
    
    return(
        <button className={class_}>
            {icon}
            <p>{text}</p>
        </button>
    )
}
function Myprogress({current_slide_index__, number_of_slides}){
    return(
        <div className='carousel-progress'>
            {[...Array(number_of_slides).keys()].map(i=><div key={i} className={i===current_slide_index__?'active':''}></div>)}
        </div>
    )
}
/**
 * Assume's rating starts from 0 to 5
 */
function ComputedStars({rating}){
    const decimal_path=parseDecimalSide(rating)
    const rating__= Math.trunc(rating)
    const numberFrmHalfStar=()=>decimal_path>= 0.5?1:0
    const empty_star = 5 - (rating__ + numberFrmHalfStar() )
    return (
        <>
        {[...Array(rating__).keys()].map(each=><Star className='svg-solid-yellow' key={each}/>)}
        {numberFrmHalfStar() !== 0 && <StarHalf className='svg-outline-yellow solid-yellow' />}
        {empty_star&& 
            [...Array(empty_star).keys()].map(each=><Star className='svg-outline-yellow' key={each} />)
        }
        </>
    )
}
export default function Carousel({data}){
    let [current_slide_index, setCurrentSlideIndex] = useState(0)
    let timer = useRef()
    function moveSliderForward(){
        clearTimeout(timer.current) // Clearing Timer for when User clicks button
        setCurrentSlideIndex(old_index=> {
            if(old_index === data.length-1){
                return 0
            }else{
                return old_index + 1
            }
        })
    }
    function moveSliderBackward(){
        clearTimeout(timer.current) // Clearing Timer for when User clicks button
        setCurrentSlideIndex(old_index=> {
            if(old_index === 0){
                return data.length - 1
            }else{
                return old_index - 1
            }
        })
    }
    function startAnimation(){
        // Start fade-out animation
        // end fade-out animation
        // change slide
        moveSliderForward()
        // Start fade-in animation
        // end fade-in animation
    }
    useEffect(function(){
        // timer.current = setTimeout(startAnimation,3*1000)
        return ()=>clearTimeout(startAnimation)
    },[current_slide_index])
    let {overview, title, vote_average, image_url,secs = 2000}=data[current_slide_index]
    return (
        // <div key={title} className="carousel-case" style={{backgroundImage: ``}}>
        <div key={title} className="carousel-case" style={{backgroundImage: `url(${img1})`}}>
            <button onClick={moveSliderBackward} className='carousel-left-btn carousel-dir-btn'><Triangle/></button>
            <div className='carousel-content-case'>
                <div className="texts">
                    <h3 className="title">{title}</h3>
                    <div className="sub-box">
                        <p>{toHHMMSS(secs)} hrs</p>
                        <div className="rating-stars"> 
                            {<ComputedStars rating={vote_average/2} />}
                        </div>
                        <p>{vote_average}</p>
                    </div>
                    <p className="description">{overview.split(' ').slice(0,42).join(' ')+'...'}</p>
                </div>
                <div className='btns-case'>
                    <CarouselBtn class_="icon watch-icon" text='watch trailer' icon={<Play/>}/>
                    <CarouselBtn class_="icon add-icon" text='add list' icon={<Plus className='plus-icon'/>}/>
                </div>
            </div>
            <button onClick={moveSliderForward} className='carousel-right-btn carousel-dir-btn'><Triangle/></button>
            <Myprogress current_slide_index__={current_slide_index} number_of_slides={data.length}/>
        </div>
)

}