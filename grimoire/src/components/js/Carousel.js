import './../css/carousel.css'
import img1 from './../imgs/img.png'
import { Star, StarHalf, Plus, Play , Triangle } from 'lucide-react'
// import { nanoid } from 'nanoid'
// import { useEffect } from 'react'
import {toHHMMSS, parseDecimalSide} from './helper'
import { useEffect, useRef, useState } from 'react'
import {opts} from './Carousel_helper'
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
function Slide({style,title_,class_, overview_, vote_average_, secs_,index}){
    
    return (
        <div className={'carousel-content-case'+class_} data-index={index} data-name={'name '+index} style={style}>
            {/* <p>{index}</p> */}
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
    let info = useRef({})
    const slide_through_secs=1
    let carousel_wait_time = useRef(6)
    
    function promiseMoveSilentlyToRight(current_slide){
        return new Promise((resolve,reject) =>{
            // console.log(current_slide)
            let percent=undefined
            const i = +current_slide.dataset.index
            if(i === 1){
                percent = 0
            }else{
                percent = -(i-1)*100
            }
            // console.log(info.current,info.current[i])
            const slide_name = current_slide.dataset.name
            const keyframes=[
            {transform: info.current[slide_name]},
            {transform: `translateX(${percent}%)`}
            ]
            info.current[slide_name]=`translateX(${percent}%)`

            const opts = (secs)=>({duration:secs*1000,easing:"ease-in-out",fill:"forwards"})
            const animation = current_slide.animate(keyframes,opts(0))
            animation.onfinish=()=>{
                resolve('')
            }
        })
    }
    let you = useRef(0)
    // useEffect(function(){console.log(info)},[info])
    function startSlidesMovingFoward(secs,slide_index=undefined){
        timer.current=setTimeout(()=>moveSlidesForward(slide_index),secs*1000)
    }
    async function moveSlidesForward(slide_index = undefined){
        const secs = slide_index !== undefined? slide_through_secs :3
        
        const current_element = document.querySelector('.current')
        const cur_slide_name=current_element.dataset.name
        let old_index = Number(current_element.dataset.index)
        current_element.classList.remove('current')
        
        // console.log(info.current[cur_slide_name])
        const keyframes=[
            {transform: info.current[cur_slide_name]},
            {transform: `translateX(${(old_index+1)*-100}%)`}
        ]
        // console.log(keyframes)
        info.current[cur_slide_name]=`translateX(${(old_index+1)*-100}%)`
        current_element.animate(keyframes,opts(secs))

        let new_slide_index = old_index === data.length-1 ? 0 : old_index + 1
        setCurrentSlideIndex(new_slide_index)
        const new_slide = document.querySelector(`.carousel-content-case[data-index='${new_slide_index}']`)
        const slide_name = new_slide.dataset.name
        let new_percent = new_slide_index !==0?-new_slide_index*100:0

        if(info.current[slide_name] === `translateX(${(new_slide_index+1)*-100}%)`){   // Checking if It's Been Moving to the FutherMost Left pervious
            await promiseMoveSilentlyToRight(new_slide)

        }
        const keyframes1=[
            {transform: info.current[slide_name]},
            {transform: `translateX(${new_percent}%)`}
        ]
        info.current[slide_name]=`translateX(${new_percent}%)`
        // console.log(info.current)
        you.current+=1
        new_slide.classList.add('current')
        new_slide.animate(keyframes1,opts(secs))
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
        const secs = slide_index !== undefined? slide_through_secs :carousel_wait_time.current
        const current_slide = document.querySelector('.current')
        const cur_slide_name=current_slide.dataset.name
        const cur_slide_index = +current_slide.dataset.index
        current_slide.classList.remove('current')

        let percent=(cur_slide_index-1)*-100// no need to check zero
        const keyframes=[
            {transform: info.current[cur_slide_name]},
            {transform: `translateX(${percent}%)`}
        ]
        info.current[cur_slide_name]=`translateX(${percent}%)`
        current_slide.animate(keyframes,opts(secs))

        let new_slide_index=cur_slide_index-1   // no need to check for at index 0
        setCurrentSlideIndex(new_slide_index)
        // const next_slide=document.querySelector(`.case div[data-index="${new_slide_index}"]`)
        const next_slide = document.querySelector(`.carousel-content-case[data-index='${new_slide_index}']`)

        const slide_name = next_slide.dataset.name
        let new_percent = -new_slide_index*100
        const keyframes1=[
            {transform: info.current[slide_name]},
            {transform: `translateX(${new_percent}%)`}
        ]
        info.current[slide_name]=`translateX(${new_percent}%)`
        next_slide.classList.add('current')
        next_slide.animate(keyframes1,opts(secs))

        if(slide_index !== undefined && slide_index !== new_slide_index){
           // Basically saying next here 
            startMovingBackForward(slide_through_secs,slide_index)
        }
    }
    function moveSliderBackwardOnce(){

    }
    function moveSliderForwardOnce(){

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
    function increaseCarouselWaitTime(){
        carousel_wait_time.current = 10
        console.log('increased')
        restartCarouselAnimation()
    }
    function resetCarouselWaitTime(){
        carousel_wait_time.current = 6
        restartCarouselAnimation()
    }
    useEffect(function(){
        startSlidesMovingFoward(carousel_wait_time.current)
        return stopCarouselAnimation
    // eslint-disable-next-line
    },[])
    

    return (
        // <div className="carousel-case" style={{backgroundImage: ``}}>
        <div onMouseLeave={resetCarouselWaitTime} onMouseEnter={increaseCarouselWaitTime} className="carousel-case" style={{backgroundImage: `url(${img1})`}}> 
            <button onClick={moveSliderBackwardOnce} className='carousel-left-btn carousel-dir-btn'><Triangle/></button>
            {data.map(({overview, title, vote_average,secs = 2000},index)=>{
                    let class_=''
                    if(index === 0 ){
                        class_=' current'
                    }
                    let style={transform: ``}
                    if (index !== 0 && index !== 1){
                        style.transform = `translateX(${(index-1)*-100}%)`
                        info.current['name '+index]=info.current['name '+index]||`translateX(${(index-1)*-100}%)`
                    }else{
                        style.transform='translateX(0%)'
                        info.current['name '+index]=info.current['name '+index]||'translateX(0%)'
                    }
                    const slide = <Slide style={style} index={index} class_={class_} title_={title} key={title} overview_={overview} vote_average_={vote_average} secs_={secs}/>
                    return slide
                })
            }
            <Myprogress current_slide_index__={current_slide_index} number_of_slides={data.length} setSlider={goToSlide}/>
            <button onClick={moveSliderForwardOnce} className='carousel-right-btn carousel-dir-btn'><Triangle/></button>
        </div>
)

}