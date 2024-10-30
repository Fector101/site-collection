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
function Myprogress({current_slide_index__, number_of_slides,setSlider}){
    return(
        <div className='carousel-progress'>
            {[...Array(number_of_slides).keys()].map(i=><div onClick={()=>setSlider(i)} key={i} className={i===current_slide_index__?'active':''}></div>)}
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
function Slide({title_,class_, overview_, vote_average_, secs_,index}){
    let translateX=''
    if(index !== 0 && index !== 1){
        translateX=`translateX(${-(index-1)*100}%)`
    }
    return (
        <div className={'carousel-content-case'+class_} data-index={index} style={{transform: translateX}}>
            <div className="texts">
                <h3 className="title">{title_}</h3>
                <div className="sub-box">
                    <p>{toHHMMSS(secs_)} hrs</p>
                    <div className="rating-stars"> 
                        {<ComputedStars rating={vote_average_/2} />}
                    </div>
                    <p>{vote_average_}</p>
                </div>
                <p className="description">{overview_.split(' ').slice(0,42).join(' ')+'...'}</p>
            </div>
            <div className='btns-case'>
                <CarouselBtn class_="icon watch-icon" text='watch trailer' icon={<Play/>}/>
                <CarouselBtn class_="icon add-icon" text='add list' icon={<Plus className='plus-icon'/>}/>
            </div>
        </div>
            
    )
}
export default function Carousel({data}){
    let [current_slide_index, setCurrentSlideIndex] = useState(0)
    let timer = useRef()
    let carousel_wait_time = useRef(5)
    function moveSliderForward(){
        const current_element = document.querySelector('.current')
        let old_index = Number(current_element.dataset.index)
        let new_index = undefined
        if(old_index === data.length-1){
            new_index = 0
        }else{
            new_index = old_index + 1
        }
        setCurrentSlideIndex(new_index)
        current_element.classList.remove('current')
        
        const keyframes=[
            {transform:''},
            {transform:`translateX(${-(old_index+1)*100}%)`}
        ]
        const opts={
            duration:3000,
            easing: "ease-in-out",
            fill:"forwards"
        }
        // animation.onfinish=()=>{
            // current_element.style.transform= `translateX(${-(old_index-1)*100}%)`
            // current_element.style.opacity='0'
        // }
        // current_element.classList.add('move-left')
        // current_element.style.transform = "translateX(-800%)"
        // current_element.style.transform= `translateX(${-(old_index+1)*100}%)`
        
        const new_current = document.querySelector(`.carousel-content-case[data-index='${new_index}']`)
        new_current.classList.add('current')
        
        const keyframes1=[
            {transform: ''},
            {transform:`translateX(${-new_index*100}%)`},
        ]
        // console.log(keyframes1)
        const animation = current_element.animate(keyframes,opts)
        new_current.animate(keyframes1,opts)
        // new_current.style.transform= `translateX(${-new_index*100}%)`

        // new_current.classList.remove('move-right')
        


    }
    function moveSliderBackward(){
        // clearTimeout(timer.current) // Clearing Timer for when User clicks button
        const current_element = document.querySelector('.current')
        let old_index = Number(current_element.dataset.index)
        let new_index = undefined
    
        if(old_index === 0){
            new_index = data.length - 1
        }else{
            new_index = old_index - 1
        }
        current_element.classList.remove('current')
        current_element.classList.add('move-right')
        const new_current = document.querySelector(`.carousel-content-case[data-index='${new_index}']`)

        new_current.classList.add('current','move-right')
        new_current.classList.remove('move-left')
    }
    function startAnimation(){
        // Start fade-out animation
        // end fade-out animation
        // change slide
        // console.log(carousel_wait_time.current)
        // timer.current = setTimeout(moveSliderForward,carousel_wait_time.current*1000)
        timer.current = setInterval(moveSliderForward,carousel_wait_time.current*1000)
        // Start fade-in animation
        // end fade-in animation
    }
    function stopCarouselAnimation(){clearTimeout(timer.current)}
    function restartCarouselAnimation(){
        stopCarouselAnimation()
        startAnimation()
    }
    function increaseCarouselWaitTime(){
        carousel_wait_time.current = 20 
        restartCarouselAnimation()
    }
    function resetCarouselWaitTime(){
        carousel_wait_time.current = 10
        restartCarouselAnimation()
    }
    useEffect(function(){
        startAnimation()
        return stopCarouselAnimation
    // eslint-disable-next-line
    },[])
    

    return (
        <div className="carousel-case" style={{backgroundImage: ``}}>
        {/* // <div onMouseLeave={resetCarouselWaitTime} onMouseEnter={increaseCarouselWaitTime} className="carousel-case" style={{backgroundImage: `url(${img1})`}}> */}
            <button onClick={moveSliderBackward} className='carousel-left-btn carousel-dir-btn'><Triangle/></button>
            {data.map(({overview, title, vote_average,secs = 2000},index)=>{
                    let class_=''
                    if(index === 0 ){
                        class_=' current'
                    }else{
                        // class_=' move-right'
                    }
                    const slide = <Slide index={index} class_={class_} title_={title} key={title} moveSliderBackward_={moveSliderBackward} moveSliderForward_={moveSliderForward} overview_={overview} vote_average_={vote_average} secs_={secs}/>
                    return slide
                })
            }
            <Myprogress current_slide_index__={current_slide_index} number_of_slides={data.length} setSlider={setCurrentSlideIndex}/>
            <button onClick={moveSliderForward} className='carousel-right-btn carousel-dir-btn'><Triangle/></button>
        </div>
)

}