
// const opts = (secs:number) => ({ duration: secs * 1000, easing: "ease-in-out", fill: "forwards" })
const opts = (secs: number): KeyframeAnimationOptions => ({ duration: secs * 1000, easing: "ease-in-out", fill: "forwards" as FillMode })

function fixBtnsTabIndex(slide: HTMLElement, visible: boolean) {
    [...slide.querySelectorAll('.btns-case button')].forEach(btn => {
        (btn as HTMLButtonElement).tabIndex = visible ? 0 : -1;
    });
}
export { opts, fixBtnsTabIndex}

// let carousel_wait_time = 6
// const carousel = document.querySelector('.case')
// let timer=undefined
// let info={}
// const slides = Array.from(document.querySelectorAll('.case div'))

// function promiseMoveSilentlyToRight(current_slide){
//     return new Promise((resolve,reject) =>{
//         // console.log(current_slide)
//         let percent=undefined
//         const i = +current_slide.dataset.index
//         if(i === 1){
//             percent = 0
//         }else{
//             percent = -(i-1)*100
//         }
//         const keyframes=[
//         {transform: info[i]},
//         {transform: `translateX(${percent}%)`}
//         ]
//         info[i]=`translateX(${percent}%)`

//         const opts = (secs)=>({duration:secs*1000,easing:"ease-in-out",fill:"forwards"})
//         const animation = current_slide.animate(keyframes,opts(0))
//         animation.onfinish=()=>{
//             resolve('')
//         }
//         current_slide.querySelector('p').textContent='M'
//     })
// }
// function start(secs,slide_index){
//     timer=setTimeout(()=>moveForward(secs===0.5?slide_index:undefined),secs*1000)
// }
// function startMovingThemRight(secs,slide_index){
//     timer=setTimeout(()=>moveBackForward(secs===0.5?slide_index:undefined),secs*1000)
// }

// async function moveBackForward(slide_index=undefined){
//         const secs = slide_index !== undefined? 0.5 :3
//         const cur_ele = document.querySelector('.current')
//         const cur_slide_index = +cur_ele.dataset.index
//         cur_ele.classList.remove('current')

//         let percent=(cur_slide_index-1)*-100// no need to check zero
//         const keyframes=[
//             {transform: info[cur_slide_index]},
//             {transform: `translateX(${percent}%)`}
//         ]
//         info[cur_slide_index]=`translateX(${percent}%)`
//         cur_ele.animate(keyframes,opts(secs))

//         let new_slide_index=cur_slide_index-1   // no need to check for at index 0
//         const next_ele=document.querySelector(`.case div[data-index="${new_slide_index}"]`)
//         let new_percent = -new_slide_index*100
//         const keyframes1=[
//             {transform: info[new_slide_index]},
//             {transform: `translateX(${new_percent}%)`}
//         ]
//         info[new_slide_index]=`translateX(${new_percent}%)`
//         next_ele.querySelector('p').textContent=new_slide_index
//         next_ele.classList.add('current')
//         next_ele.animate(keyframes1,opts(secs))

//         if(slide_index !== undefined && slide_index !== new_slide_index){
//            // Basically saying next here 
//             startMovingThemRight(slide_index !== undefined? 0.5 :carousel_wait_time,slide_index)
//         }

//         document.querySelector('.slider button.current').classList.remove('current')
//         document.querySelector(`.slider button[data-slide-index="${new_slide_index}"]`).classList.add('current')

// }
// async function moveForward(slide_index=undefined){
//         const secs = slide_index !== undefined? 0.5 :3
//         const cur_ele = document.querySelector('.current')
//         const cur_slide_index = +cur_ele.dataset.index
//         cur_ele.classList.remove('current')


//         const keyframes=[
//             {transform: info[cur_slide_index]},
//             {transform: `translateX(${(cur_slide_index+1)*-100}%)`}
//         ]
//         info[cur_slide_index]=`translateX(${(cur_slide_index+1)*-100}%)`
//         cur_ele.animate(keyframes,opts(secs))

//         const new_slide_index=cur_slide_index === slides.length-1?0:cur_slide_index+1
//         const next_ele=document.querySelector(`.case div[data-index="${new_slide_index}"]`)
//         let new_percent = new_slide_index !==0?-new_slide_index*100:0

//         if(info[new_slide_index] === `translateX(${(new_slide_index+1)*-100}%)`){   // Checking if It's Been Moving to the FutherMost Left pervious
//             await promiseMoveSilentlyToRight(next_ele)
//         }
//         const keyframes1=[
//             {transform: info[new_slide_index]},
//             {transform: `translateX(${new_percent}%)`}
//         ]
//         info[new_slide_index]=`translateX(${new_percent}%)`
//         next_ele.querySelector('p').textContent=new_slide_index
//         next_ele.classList.add('current')
//         next_ele.animate(keyframes1,opts(secs))

//         if(slide_index === undefined){
//             start(slide_index !== undefined? 0.5 :carousel_wait_time,slide_index)
//         }else if(slide_index !== new_slide_index){  //  If it's not undefined means we stop at given slide_index
//             start(slide_index !== undefined? 0.5 :carousel_wait_time,slide_index)
//         }


//         document.querySelector('.slider button.current').classList.remove('current')
//         document.querySelector(`.slider button[data-slide-index="${new_slide_index}"]`).classList.add('current')

// }

// carousel.addEventListener('mouseenter',function(e){
//     console.log('entered')
//     clearTimeout(timer)
// })

// carousel.addEventListener('mouseleave',function(e){
//     console.log('left')
//     start()
// })
// function goToSlide(slide_index){
//     clearTimeout(timer)
//     const cur_slider_index=+document.querySelector('div.current').dataset.index
//     if(slide_index > cur_slider_index){
//         moveForward(slide_index)
//     }
//     else{
//         moveBackForward(slide_index)
//     }
// }
// document.querySelector('span.slider').addEventListener('click',function(e){
//     const target = e.target.closest('button')
//     if(!target)return
//     const slide_index=+target.dataset.slideIndex
//     goToSlide(slide_index)
// })
