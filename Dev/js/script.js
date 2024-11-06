"use strict";


let readMoreBtn = document.querySelector(".read-more");
let textEl = String(document.querySelector(".plot").textContent);
let plotSpanEl = document.querySelector(".plot");
let originalText = textEl;
let viewing_more = false;


let movies = {
  "ready player one": {
    year: 2018,
    genre: "Scifi/Adventure",
    duration: "2h 20m",
    ratings: { IMDb: "7.4/10", "Rotten Tomatoes": "72%" },
    director: "Steven Spielberg",
    watched: true,
    want_to_watched: false,
    Adapted_from: "Ready Player One",
    cast: [
      ["Tye Sheridan", "Wade Watts"],
      ["Oliva Cooke", "Samantha Evelyn"],
      ["Mark Rylance", "Anorak"],
      ["Ben Mendelsohn", "Sorrento"],
      ["T.J. Miller", "i-R0k"],
      ["T.J. Miller", "i-R0k"],
      ["T.J. Miller", "i-R0k"],
      ["T.J. Miller", "i-R0k"],
    ],
  },
};
let movieNameEl = document.querySelector('.movie-name')
let movieDateEl = document.querySelector('.date')
let movieGenEl = document.querySelector('.genre')
let movieAboutEl = document.querySelector('.about')
let movieDirEl = document.querySelector('.director')
let movieStarCastEl = document.querySelector('.starCast')
let movieratingsCastEl = document.querySelector('.rating')
const carousel = document.querySelector(".carousel");

for (let each of Object.entries(movies)){
  console.log(each[1]);
  movieNameEl.textContent = each[0]
  // console.log(movieDateEl.textContent);
  // movieDateEl.innerHTML=`<em>Released</em>: ${each[1].year}`
  // movieGenEl.innerHTML = `<em>Genre</em>: ${each[1].genre}`
  // movieAboutEl.innerHTML = `<em>About</em>:<span class="plot" > fricpppdvdgsrbhbthbtehbrgrgwefrergppgtgtrhtbhrtbtrbtbfjytuyiyiuftbgb gbfnhnh hnhnb egthbt h100yny ion last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last last</span><button class="read-more">read more</button>`
  movieDirEl.innerHTML = `<em>Director:</em> ${each[1].director}`
  movieStarCastEl.innerHTML = `<em>Starcast:</em>${each[1].cast.map((each) => ' '+each[0]).slice(0,5)}`
  movieratingsCastEl.innerHTML = `
  <em>🎬${Object.keys(each[1].ratings)[0]}:</em> ${each[1].ratings[String(Object.keys(each[1].ratings)[0])]}
  <em style="margin-left: 8px">🍅🍅${Object.keys(each[1].ratings)[1]}:</em> ${each[1].ratings[String(Object.keys(each[1].ratings)[1])]}`
}

// console.log(Object.entries(movies)[0][0])
let carouselHTML = ''
let index =0
let castImgs = ['artist.jpg','artist1.jpg',"artist2.jpg","artist3.jpg","artist4.jpg","movie_img.png","movie_img.png","movie_img.png"]
for (let i of movies["ready player one"]['cast']){
  let img =index < 1?'artist1.jpg':"movie_img.png"
  carouselHTML +=`<div class="build inline-block">
  <img class="artist" src=${'imgs/'+castImgs[index]} alt="" srcset="" />
  <h3 class="margin0 artist-name">${i[0]}</h3>
  <h4 class="margin0 artist-char">${i[1]}</h4>
</div>`
index++
  // console.log(i);
}
carousel.querySelector('button.left-btn').insertAdjacentHTML('afterend', carouselHTML)


//  Info
let displayingInfo = false
let infoDiv = document.querySelector('.info')
let infoDataEl = document.querySelector('.info-list')
let infoDpBtn = document.querySelector('.info-dd-btn')
function toggleInfo(){
  let displayedIcon = displayingInfo? `<i class="fa-solid fa-chevron-down"></i>`:`<i class="fa-solid fa-chevron-up"></i>`
  infoDpBtn.innerHTML=displayedIcon
  infoDataEl.classList.toggle('display-none')
  displayingInfo=!displayingInfo
}
infoDpBtn.addEventListener('click',toggleInfo)
// toggleInfo()

//  Read More
function strip(text, len) {
  let list = [];
  let str = "";
  Array.from(text).forEach((each, i) => {
    list.push(`${i}each`);

    if (list.every((a) => a == " ") && each === " ") {
    } else {
      // if (list.every((a) => a != " ")) {
      str += each;
    }
  });
  let dots = len <= 220 ? "..." : "";
  return str.slice(0, len) + dots;
}
// if ($(".plot").text().length > 200) {
//   plotSpanEl.textContent = strip(textEl, 220);
// }
readMoreBtn.addEventListener("click", function () {
  if (viewing_more) {
    plotSpanEl.textContent = strip(originalText, 220);
    this.textContent = "read more";

    console.log(this);
  } else {
    plotSpanEl.textContent = strip(originalText, originalText.length);
    this.textContent = "see less";
  }
  viewing_more = !viewing_more;
});

//  Carousel
window.addEventListener("resize", () => {
  let carousel_width = window.innerWidth - 460 + "px";
  let about_width = window.innerWidth - 480 + "px";
  $(".movie-about").css("width", about_width);
  $(".cast").css("width", carousel_width);
});
let timer;
let cancel = () => clearInterval(timer);
let move_left = function () {
  carousel.scrollLeft -= 10;
  timer = setInterval(() => (carousel.scrollLeft -= 10), 40);
};
let move_right = function (e) {
  console.log(e);
  carousel.scrollLeft += 10;
  timer = setInterval(() => (carousel.scrollLeft += 10), 40);
};
document.querySelector(".left-btn").onpointerup = cancel;
document.querySelector(".left-btn").onpointerdown = move_left;
document.querySelector(".right-btn").onpointerup = cancel;
document.querySelector(".right-btn").onpointerdown = move_right;

let movies1 =[]
function doFetch() {
  fetch('http://www.omdbapi.com/?i=tt3896198&apikey=9fa6058b', {
      method: "get"
  }).then(function (response) {
      return response.text();
  }).then(function (text) {
      let json = JSON.parse(text);
      let data = { Title: json.Title, Plot: json.Plot }
      console.log('json',json);
      movies1.push(data);
      console.log('data',data);
  });
}
// doFetch()
console.log(movies1);