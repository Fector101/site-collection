let carousel_wait_time = 4
let animation=undefined
let animation1=undefined
const carousel = document.querySelector('.case')

function carouselSlider(){
    const slider = document.createElement('span')
    slider.classList.add('slider')
    const btns=()=>[...Array(5).keys()].map(i=>`<button data-slide-index="${i}" class="${!i&& 'current'}" ></button>`).join('')
    slider.innerHTML=btns()
    document.querySelector('.case').insertAdjacentElement('beforeend',slider)
}
carouselSlider()
const slides = Array.from(document.querySelectorAll('.case div'))

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

function moveRight(current_slide){
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
    animation = current_slide.animate(keyframes,opts(0))
    current_slide.querySelector('p').textContent='M'
}
function start(secs,slide_index){
    timer=setTimeout(()=>moveFoward(secs===0.5?slide_index:undefined),secs*1000)
}
// btn.addEventListener('click', function(){
function moveFoward(slide_index=undefined){
        const secs = slide_index !== undefined? 0.5 :3
        const cur_ele = document.querySelector('.current')
        const old_slide_index = +cur_ele.dataset.index
        cur_ele.classList.remove('current')
        let new_slide_index=old_slide_index+1
        const keyframes=[
            {transform: info[old_slide_index]},
            {transform: `translateX(${-(old_slide_index+1)*100}%)`}
        ]
        info[old_slide_index]=`translateX(${-(old_slide_index+1)*100}%)`

        const opts = (secs)=>({duration:secs*1000,easing:"ease-in-out",fill:"forwards"})
        animation1&&animation1.cancel()
        animation&&animation.cancel()
        animation = cur_ele.animate(keyframes,opts(secs))
        info.ongoinganimation=animation
        animation.addEventListener('finish',ani0Onfinish)

        function ani0Onfinish(){
            info.ongoinganimation1=''
            if(new_slide_index===slides.length-1){
                console.log('all right')
                slides.slice(0,-1).forEach(each=>moveRight(each))
            }else if(new_slide_index===slides.length - 2){
                moveRight(slides[slides.length-1])
            }
            // if(i )
            // cur_ele.style.transform = `translateX(${-(i+1)*100}%)`
            // console.log(111)
        }
        if(old_slide_index == slides.length-1){
            new_slide_index=0
        }
        const next_ele=document.querySelector(`.case div[data-index="${new_slide_index}"]`)
        // console.log(new_slide_index,'ainmated')
        let new_percent = new_slide_index !==0?-new_slide_index*100:0
        // next_ele.style.transform = `translateX(${new_percent}%)`
        const keyframes1=[
            {transform: info[new_slide_index]},
            {transform: `translateX(${new_percent}%)`}
        ]
        info[new_slide_index]=`translateX(${new_percent}%)`
        next_ele.querySelector('p').textContent=new_slide_index
        next_ele.classList.add('current')
         animation1 = next_ele.animate(keyframes1,opts(secs))
        // console.log(keyframes1,opts(secs))

        function ani1Onfinish(){
            info.ongoinganimation1=''
            // next_ele.style.transform = `translateX(${new_percent}%)`
            // reset(next_ele)
            // console.log(new_i,slides.length-2,'buzz----')
            // console.log(slides.length - 2,new_i===slides.length-2)
            if(new_slide_index===slides.length-1){
                console.log('all right')
                slides.slice(0,-1).forEach(each=>moveRight(each))
            }else if(new_slide_index===slides.length - 2){
                moveRight(slides[slides.length-1])
            }
        }
        animation1.addEventListener('finish',ani1Onfinish)
        if(slide_index === new_slide_index){
            clearTimeout(timer)
        }
        if(slide_index !== undefined && slide_index !== new_slide_index){
            start(slide_index !== undefined? 0.5 :carousel_wait_time,slide_index)
        }


        info.ongoinganimation1=animation
        document.querySelector('.slider button.current').classList.remove('current')
        document.querySelector(`.slider button[data-slide-index="${new_slide_index}"]`).classList.add('current')
        
        // else{
        // }
}
timer=setTimeout(moveFoward,carousel_wait_time*1000)
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
    moveFoward(slide_index)
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