let carousel_wait_time = 4
let animation=undefined
let animation1=undefined
const carousel = document.querySelector('.case')
const opts = (secs)=>({duration:secs*1000,easing:"ease-in-out",fill:"forwards"})

function carouselSlider(){
    const slider = document.createElement('span')
    slider.classList.add('slider')
    const btns=()=>[...Array(5).keys()].map(i=>`<button data-slide-index="${i}" class="${!i&& 'current'}" ></button>`).join('')
    slider.innerHTML=btns()
    document.querySelector('.case').insertAdjacentElement('beforeend',slider)
}
carouselSlider()
const slides = Array.from(document.querySelectorAll('.case div'))
let slide_at_right={0: "translateX(100%)", 1: "translateX(0%)", 2: "translateX(-100%)", 3: "translateX(-200%)", 4: "translateX(-300%)"}
let slide_at_left={0: "translateX(-100%)", 1: "translateX(-200%)", 2: "translateX(-300%)", 3: "translateX(-400%)", 4: "translateX(-500%)"}
let slide_at_middle={0: "translateX(0%)", 1: "translateX(100%)", 2: "translateX(-200%)", 3: "translateX(-300%)", 4: "translateX(-400%)"}


let info={
    ongoinganimation:'',
    ongoinganimation1:''
}
slides.forEach((each,i,arr)=>{
    if (i !== 0 && i !== 1){
        each.style.transform = `translateX(${-((i-1)*100)}%)`
        info[i]=`translateX(${-((i-1)*100)}%)`
    }else{
        each.style.transform = `translateX(0%)`
        info[i]=`translateX(0%)`
    }
    each.querySelector('p').textContent=i
})
const btn = document.querySelector('button')
let timer=undefined

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
        const keyframes=[
        {transform: info[i]},
        {transform: `translateX(${percent}%)`}
        ]
        info[i]=`translateX(${percent}%)`

        const opts = (secs)=>({duration:secs*1000,easing:"ease-in-out",fill:"forwards"})
        const animation = current_slide.animate(keyframes,opts(0))
        animation.onfinish=()=>{
            resolve('')
        }
        current_slide.querySelector('p').textContent='M'
    })
}
function start(secs,slide_index){
    timer=setTimeout(()=>moveFoward(secs===0.5?slide_index:undefined),secs*1000)
}
// btn.addEventListener('click', function(){
async function moveBackFoward(slide_index=undefined){
        const secs = slide_index !== undefined? 0.5 :3
        const cur_ele = document.querySelector('.current')
        const old_slide_index = +cur_ele.dataset.index
        cur_ele.classList.remove('current')

        // no need to check zero
        let percent=(old_slide_index-1)*-100
        const keyframes=[
            {transform: info[old_slide_index]},
            {transform: `translateX(${percent}%)`}
        ]
        info[old_slide_index]=`translateX(${percent}%)`
        info.ongoinganimation=animation
        animation = cur_ele.animate(keyframes,opts(secs))
        animation.addEventListener('finish',ani0Onfinish)

        function ani0Onfinish(){
            info.ongoinganimation=''
        }
        let new_slide_index=old_slide_index-1
        // no need to check for at index 0

        const next_ele=document.querySelector(`.case div[data-index="${new_slide_index}"]`)
        // console.log(new_slide_index,'ainmated')
        let new_percent = -new_slide_index*100
        const keyframes1=[
            {transform: info[new_slide_index]},
            {transform: `translateX(${new_percent}%)`}
        ]
        info[new_slide_index]=`translateX(${new_percent}%)`
        next_ele.querySelector('p').textContent=new_slide_index
        next_ele.classList.add('current')
        animation1 = next_ele.animate(keyframes1,opts(secs))
        info.ongoinganimation1=animation

        function ani1Onfinish(){
            info.ongoinganimation1=''
        }
        animation1.addEventListener('finish',ani1Onfinish)
        if(new_slide_index===4){
        // if(slide_index === new_slide_index){
            // clearTimeout(timer)
        }
        if(slide_index !== undefined && slide_index !== new_slide_index){
           // Basically saying next here 
            start(slide_index !== undefined? 0.5 :carousel_wait_time,slide_index)
        }


        document.querySelector('.slider button.current').classList.remove('current')
        document.querySelector(`.slider button[data-slide-index="${new_slide_index}"]`).classList.add('current')
        
}
async function moveFoward(slide_index=undefined){
        const secs = slide_index !== undefined? 0.5 :3
        const cur_ele = document.querySelector('.current')
        const old_slide_index = +cur_ele.dataset.index
        cur_ele.classList.remove('current')
        let keyframes=undefined
        if(slide_index === undefined && info[old_slide_index] === slide_at_left[old_slide_index]){
            console.log('pstt');
            
            await promiseMoveSilentlyToRight(cur_ele)
        }
        keyframes=[
            {transform: info[old_slide_index]},
            {transform: `translateX(${-(old_slide_index+1)*100}%)`}
        ]
        info[old_slide_index]=`translateX(${-(old_slide_index+1)*100}%)`
        animation = cur_ele.animate(keyframes,opts(secs))
        info.ongoinganimation=animation
        animation.addEventListener('finish',ani0Onfinish)

        function ani0Onfinish(){
            info.ongoinganimation=''
        }
        let new_slide_index=old_slide_index == slides.length-1?0:old_slide_index+1
        const next_ele=document.querySelector(`.case div[data-index="${new_slide_index}"]`)
        // console.log(new_slide_index,'ainmated')
        let new_percent = new_slide_index !==0?-new_slide_index*100:0
        const keyframes1=[
            {transform: info[new_slide_index]},
            {transform: `translateX(${new_percent}%)`}
        ]
        info[new_slide_index]=`translateX(${new_percent}%)`
        next_ele.querySelector('p').textContent=new_slide_index
        next_ele.classList.add('current')
        animation1 = next_ele.animate(keyframes1,opts(secs))
        info.ongoinganimation1=animation

        function ani1Onfinish(){
            info.ongoinganimation1=''
        }
        animation1.addEventListener('finish',ani1Onfinish)
        if(new_slide_index===4){
        // if(slide_index === new_slide_index){
            clearTimeout(timer)
        }
        if(slide_index !== undefined && slide_index !== new_slide_index){
            start(slide_index !== undefined? 0.5 :carousel_wait_time,slide_index)
        }


        document.querySelector('.slider button.current').classList.remove('current')
        document.querySelector(`.slider button[data-slide-index="${new_slide_index}"]`).classList.add('current')
        
}
// timer=setTimeout(moveFoward,carousel_wait_time*1000)
// })

carousel.addEventListener('mouseenter',function(e){
//   console.log('entered')
    clearTimeout(timer)
    // animation && animation.cancel()
    // animation1 && animation1.cancel()
})

carousel.addEventListener('mouseleave',function(e){
    // console.log('left')
    // start()
})
function goToSlide(slide_index){
    // if()
    // console.log(slide_index)
    // console.log(typeof slide_index)
    clearTimeout(timer)
    const cur_slider_index=+document.querySelector('div.current').dataset.index
    if(slide_index > cur_slider_index){
        moveFoward(slide_index)
    }
    else{
        moveBackFoward(slide_index)
    }
    // console.log(info[slide_index])
    // console.log(slide_index)
    // if(info.ongoinganimation)

    // info.ongoinganimation1

}
document.querySelector('span.slider').addEventListener('click',function(e){
    const target = e.target.closest('button')
    if(!target)return
    const slide_index=+target.dataset.slideIndex
    goToSlide(slide_index)
})