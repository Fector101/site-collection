"use strict;"
const sectionRow_2=document.querySelector('section.row-2')
const castBox=document.querySelector('div.cast')
const castBox_elements=castBox.innerHTML

function arrangeLayout(){
    if(window.innerWidth<=800){
        sectionRow_2.innerHTML=castBox_elements
        castBox.innerHTML=''
    }
    else{
        castBox.innerHTML=castBox_elements
        sectionRow_2.innerHTML=''
    }
}
arrangeLayout()
window.addEventListener('resize', arrangeLayout)
