let carousel_wait_time = 10
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
        // if (current_slide_index !== i){
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
    current_slide.querySelector('p').textContent='M'
}
function start(secs,slide_index){
    timer=setTimeout(()=>moveFoward(secs===0.1?slide_index:undefined),secs*1000)
}
// btn.addEventListener('click', function(){
function moveFoward(slide_index=undefined){
        const secs = slide_index !== undefined? 0.1 :1.5
        const cur_ele = document.querySelector('.current')
        const i = +cur_ele.dataset.index
        cur_ele.classList.remove('current')
        let old_index=i+1
        const keyframes=[
            {transform: info[i]},
            {transform: `translateX(${-(i+1)*100}%)`}
        ]
        info[i]=`translateX(${-(i+1)*100}%)`

        const opts = (secs)=>({duration:secs*1000,easing:"ease-in-out",fill:"forwards"})
        animation = cur_ele.animate(keyframes,opts(secs))
        info.ongoinganimation=animation
        animation.addEventListener('finish',ani0Onfinish)

        function ani0Onfinish(){
            info.ongoinganimation1=''
            // if(i )
            // cur_ele.style.transform = `translateX(${-(i+1)*100}%)`
            // console.log(111)
        }
        if(i == slides.length-1){
            old_index=0
        }
        const next_ele=document.querySelector(`.case div[data-index="${old_index}"]`)
        const new_i = +next_ele.dataset.index
        let new_percent = new_i !==0?-new_i*100:0
        // next_ele.style.transform = `translateX(${new_percent}%)`
        const keyframes1=[
            {transform: info[new_i]},
            {transform: `translateX(${new_percent}%)`}
        ]
        info[new_i]=`translateX(${new_percent}%)`
        next_ele.querySelector('p').textContent=new_i
        next_ele.classList.add('current')
        animation1 = next_ele.animate(keyframes1,opts(secs))
        info.ongoinganimation1=animation
        function ani1Onfinish(){
            info.ongoinganimation1=''
            // next_ele.style.transform = `translateX(${new_percent}%)`
            // reset(next_ele)
            moveRight(cur_ele)

        }
        animation1.addEventListener('finish',ani1Onfinish)
        document.querySelector('.slider button.current').classList.remove('current')
        document.querySelector(`.slider button[data-slide-index="${new_i}"]`).classList.add('current')
        console.log(slide_index,new_i)
        if(slide_index === new_i){
            clearTimeout(timer)
            return
        }
        // else{
            start(slide_index !== undefined? 0.1 :carousel_wait_time,slide_index)
        // }
}
timer=setTimeout(moveFoward,carousel_wait_time*1000)
// })

carousel.addEventListener('mouseenter',function(e){
  console.log('entered')
    // clearTimeout(timer)
    // animation && animation.cancel()
    // animation1 && animation1.cancel()
})

carousel.addEventListener('mouseleave',function(e){
    console.log('left')
    // start()
})
function goToSlide(slide_index){
    // if()
    console.log(slide_index)
    console.log(typeof slide_index)
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