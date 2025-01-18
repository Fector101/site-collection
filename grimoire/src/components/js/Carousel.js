import './../css/carousel.css'
// import img1 from './../imgs/img.png'
import {Timer, Star, StarHalf, LucideListPlus, Play , Triangle, Bookmark } from 'lucide-react'
// import { nanoid } from 'nanoid'
// import { useEffect } from 'react'
import {toHHMMSS, parseDecimalSide, randInt} from './helper'
import { useEffect, useRef, useState } from 'react'
import {opts} from './Carousel_helper'
import rot_img from './../imgs/rot.png'
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
function Slide({pos_info__, class_, movie_data, index}){
    let {backdrop_path,title, overview, vote_average, secs=7200} = movie_data
    let style={transform: ``}
    let translateX = ''
    if (index !== 0 && index !== 1){
        translateX =pos_info__.current['name '+index]||`translateX(${(index-1)*-100}%)`
        style.transform = translateX
        pos_info__.current['name '+index]= translateX
    }else{
        translateX =pos_info__.current['name '+index]||'translateX(0%)'
        style.transform=translateX
        pos_info__.current['name '+index]=translateX
    }
    style['backgroundImage']=`url(https://image.tmdb.org/t/p/original${backdrop_path})`

    const clipText=(text)=>{
        let new_text = text.split(' ').slice(0,32).join(' ')
        if(!new_text.endsWith('.')){ new_text+='...' }
        return new_text
    }
    return (
        <div className={'carousel-content-case'+class_} data-index={index} data-name={'name '+index} style={style}>
            {/* <p>{index}</p> */}
            {/* {#TODO A Big play button in the middle looks better (the btn will be round with border-radius and icon of color white)} */}
            <div className="texts">
                <h3 className="title">{title}</h3>
                <div className="sub-box">
                    {/* <Timer className='duration-svg'/> */}
                    <p className='duration-txt'>{toHHMMSS(secs)} hrs</p>
                    <div className="rating"> 
                        <img src={rot_img} alt={title+' poster'} className='rot-img img'/>
                        <p>{((+vote_average)*10).toFixed(2)}%</p>
                        {/* {<ComputedStars rating={vote_average/2} />} */}
                        <svg xmlns="http://www.w3.org/2000/svg" className='imdb-img img' viewBox="0 0 448 512">
                            <path fill="#FFD43B" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM21.3 229.2H21c.1-.1 .2-.3 .3-.4zM97 319.8H64V192h33zm113.2 0h-28.7v-86.4l-11.6 86.4h-20.6l-12.2-84.5v84.5h-29V192h42.8c3.3 19.8 6 39.9 8.7 59.9l7.6-59.9h43zm11.4 0V192h24.6c17.6 0 44.7-1.6 49 20.9 1.7 7.6 1.4 16.3 1.4 24.4 0 88.5 11.1 82.6-75 82.5zm160.9-29.2c0 15.7-2.4 30.9-22.2 30.9-9 0-15.2-3-20.9-9.8l-1.9 8.1h-29.8V192h31.7v41.7c6-6.5 12-9.2 20.9-9.2 21.4 0 22.2 12.8 22.2 30.1zM265 229.9c0-9.7 1.6-16-10.3-16v83.7c12.2 .3 10.3-8.7 10.3-18.4zm85.5 26.1c0-5.4 1.1-12.7-6.2-12.7-6 0-4.9 8.9-4.9 12.7 0 .6-1.1 39.6 1.1 44.7 .8 1.6 2.2 2.4 3.8 2.4 7.8 0 6.2-9 6.2-14.4z"/>
                        </svg>
                        <p>{((+vote_average)-randInt(2,3)).toFixed(2)}/10</p>
                    </div>
                </div>
                <p className="description">{overview}</p>
            </div>
            <div className='btns-case'>
                <CarouselBtn class_="icon cursor-pointer watch-icon" text='Watch Trailer' icon={<Play/>}/>
                <CarouselBtn class_="icon cursor-pointer add-icon" text='Add to Watchlist' icon={<LucideListPlus className='plus-icon'/>}/>
            </div>
            <button className='phone-bookmark-btn display-none' style={{zIndex:1}}>
                <Bookmark className='svg-white-fill svg1'/>
                <Bookmark className='svg-white-fill'/>
            </button>
        </div>
            
    )
}
export default function Carousel({data}){
    let [current_slide_index, setCurrentSlideIndex] = useState(0)
    let timer = useRef()
    let pos_info = useRef({})
    let animation = useRef()
    let animation_1 = useRef()
    const slide_through_secs=0.5
    let carousel_wait_time = useRef(6)
    let you = useRef(0)
    // eslint-disable-next-line
    function stopAllOngoingAnimations(){
        animation.current?.cancel()
        animation_1.current?.cancel()
    }
    function promiseMoveSilentlyToRight(current_slide){
        return new Promise((resolve,reject) =>{
            // console.log(current_slide)
            const i = +current_slide.dataset.index
            let percent = i === 1 ? 0 : -(i-1)*100
            
            // console.log(info.current,info.current[i])
            const slide_name = current_slide.dataset.name
            const keyframes=[
            {transform: pos_info.current[slide_name]},
            {transform: `translateX(${percent}%)`}
            ]
            pos_info.current[slide_name]=`translateX(${percent}%)`

            const animation = current_slide.animate(keyframes,opts(0))
            animation.onfinish=()=>{
                resolve('')
            }
        })
    }
    function promiseMoveSilentlyToLeft(current_slide){
        return new Promise((resolve,reject) =>{
            // console.log(current_slide)
            const i = +current_slide.dataset.index
            let percent = (i+1)*-100
            // console.log(info.current,info.current[i])
            const slide_name = current_slide.dataset.name
            const keyframes=[
            {transform: pos_info.current[slide_name]},
            {transform: `translateX(${percent}%)`}
            ]
            pos_info.current[slide_name]=`translateX(${percent}%)`

            const animation = current_slide.animate(keyframes,opts(0))
            animation.onfinish=()=>{
                resolve('')
            }
        })
    }
    // useEffect(function(){console.log(info)},[info])
    function startSlidesMovingFoward(secs,slide_index=undefined){
        timer.current=setTimeout(()=>moveSlidesForward(slide_index),secs*1000)
    }
    async function moveSlidesForward(slide_index = undefined){
        // stopAllOngoingAnimations()
        const secs = slide_index !== undefined? slide_through_secs :3
        // if(current_slide_index === 2)return      // <dev>
        const current_element = document.querySelector('.current')
        const cur_slide_name=current_element.dataset.name
        let old_index = Number(current_element.dataset.index)
        current_element.classList.remove('current')
        
        // console.log(info.current[cur_slide_name])
        const keyframes=[
            {transform: pos_info.current[cur_slide_name]},
            {transform: `translateX(${(old_index+1)*-100}%)`}
        ]
        // console.log(keyframes)
        pos_info.current[cur_slide_name]=`translateX(${(old_index+1)*-100}%)`
        animation.current = current_element.animate(keyframes,opts(secs))

        let new_slide_index = old_index === data.length-1 ? 0 : old_index + 1
        setCurrentSlideIndex(new_slide_index)
        
        const new_slide = document.querySelector(`.carousel-content-case[data-index='${new_slide_index}']`)
        const slide_name = new_slide.dataset.name
        let new_percent = new_slide_index !==0?-new_slide_index*100:0

        if(pos_info.current[slide_name] === `translateX(${(new_slide_index+1)*-100}%)`){   // Checking if It's Been Moving to the FutherMost Left pervious
            await promiseMoveSilentlyToRight(new_slide)

        }
        const keyframes1=[
            {transform: pos_info.current[slide_name]},
            {transform: `translateX(${new_percent}%)`}
        ]
        pos_info.current[slide_name]=`translateX(${new_percent}%)`
        // console.log(info.current)
        you.current+=1
        new_slide.classList.add('current')
        animation_1.current =new_slide.animate(keyframes1,opts(secs))
        // console.log(keyframes1)
        // console.log(info.current)
        
        // if(you.current === 2)return
        if(slide_index === undefined){
            startSlidesMovingFoward(carousel_wait_time.current)
        }else if(slide_index !== new_slide_index){  //  If it's not undefined means we stop at given slide_index
            startSlidesMovingFoward(slide_through_secs,slide_index)
        }else if(slide_index === new_slide_index){
            startSlidesMovingFoward(carousel_wait_time.current) // Go back to old Flow Speed
        }

    }
        
    function startMovingBackForward(secs,slide_index=undefined){
        timer.current=setTimeout(()=>moveSlidesBackward(slide_index),secs*1000)
    }
    async function moveSlidesBackward(slide_index=undefined){
        // stopAllOngoingAnimations()
        const secs = slide_index !== undefined? slide_through_secs :carousel_wait_time.current
        const current_slide = document.querySelector('.current')
        const cur_slide_name=current_slide.dataset.name
        const cur_slide_index = +current_slide.dataset.index
        current_slide.classList.remove('current')

        let percent=(cur_slide_index-1)*-100
        const keyframes=[
            {transform: pos_info.current[cur_slide_name]},
            {transform: `translateX(${percent}%)`}
        ]
        pos_info.current[cur_slide_name]=`translateX(${percent}%)`
        animation.current =current_slide.animate(keyframes,opts(secs))

        let new_slide_index=cur_slide_index === 0?data.length - 1:cur_slide_index-1   // no need to check for at index 0
        setCurrentSlideIndex(new_slide_index)
        const next_slide = document.querySelector(`.carousel-content-case[data-index='${new_slide_index}']`)
        const slide_name = next_slide.dataset.name
        
        if(pos_info.current[slide_name] === `translateX(${(new_slide_index-1)*-100}%)`){   // Checking if It's Been Moving to the FutherMost Left pervious
            await promiseMoveSilentlyToLeft(next_slide)
        }
        let new_percent = -new_slide_index*100
        const keyframes1=[
            {transform: pos_info.current[slide_name]},
            {transform: `translateX(${new_percent}%)`}
        ]
        pos_info.current[slide_name]=`translateX(${new_percent}%)`
        next_slide.classList.add('current')
        animation_1.current =next_slide.animate(keyframes1,opts(secs))

        if(slide_index !== undefined && slide_index !== new_slide_index){
           // Basically saying next here 
            startMovingBackForward(slide_through_secs,slide_index)
        }else if(slide_index === new_slide_index){
            startSlidesMovingFoward(carousel_wait_time.current) // Go back to old Flow Speed
        }
    }
    function moveSliderBackwardOnce(){
        clearTimeout(timer.current)
        const current_slide = document.querySelector('.current')
        const slide_index= Number(current_slide.dataset.index)
        const next_index = slide_index === 0 ?  data.length-1 : slide_index-1
        // goToSlide(next_index)
        moveSlidesBackward(next_index)
    }
    function moveSliderForwardOnce(){
        clearTimeout(timer.current)
        const current_slide = document.querySelector('.current')
        const slide_index= Number(current_slide.dataset.index)
        const next_index = slide_index === data.length-1?0:slide_index+1
        // goToSlide(next_index)
        moveSlidesForward(next_index)
    }
    
    function goToSlide(slide_index){
        clearTimeout(timer.current)
        const cur_slider_index=+document.querySelector('.current').dataset.index
        if(slide_index > cur_slider_index){
            moveSlidesForward(slide_index)
        }
        else{
            moveSlidesBackward(slide_index)
        }
    }
    function stopCarouselAnimation(){clearTimeout(timer.current)}
    function restartCarouselAnimation(){
        stopCarouselAnimation()
        startSlidesMovingFoward(carousel_wait_time.current)

    }
    // eslint-disable-next-line
    function increaseCarouselWaitTime(){
        carousel_wait_time.current = 10
        console.log('increased')
        restartCarouselAnimation()
    }
    // eslint-disable-next-line
    function resetCarouselWaitTime(){
        carousel_wait_time.current = 6
        restartCarouselAnimation()
    }
    useEffect(function(){
        // startSlidesMovingFoward(carousel_wait_time.current)
        return stopCarouselAnimation
    // eslint-disable-next-line
    },[])
    

    // <div onMouseLeave={resetCarouselWaitTime} onMouseEnter={increaseCarouselWaitTime} className="carousel-case"> 
    return (
        <div className="carousel-case" style={{backgroundImage: ``}}>
            <button onClick={moveSliderBackwardOnce} className='carousel-left-btn carousel-dir-btn'><Triangle/></button>
            
            {data.map((each_data,i)=> <Slide pos_info__={pos_info} index={i} movie_data={each_data} class_={i === current_slide_index ? ' current' : ''} key={i}/> ) }
            
            <Myprogress current_slide_index__={current_slide_index} number_of_slides={data.length} setSlider={goToSlide}/>
            
            <button onClick={moveSliderForwardOnce} className='carousel-right-btn carousel-dir-btn'><Triangle/></button>
        </div>
)

}
