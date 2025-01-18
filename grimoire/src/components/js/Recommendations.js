import { SignalMedium, StarHalf, Star, Zap, Eye, Bookmark } from "lucide-react"
import './../css/Recommendations.css'
import { Link } from 'react-router-dom'
import ImgwithPL from "./ImgwithPL"
import card_img_placeholder from "./../imgs/card-img-pl1.png"
import { genreId } from "./api_data"

import { toHHMMSS, parseDecimalSide, randInt } from './helper'


/**
 * Assume's rating starts from 0 to 5
 */
function ComputedStars({ rating }) {
  const decimal_path = parseDecimalSide(rating)
  const rating__ = Math.trunc(rating)
  const numberFrmHalfStar = () => decimal_path >= 0.5 ? 1 : 0
  const empty_star = 5 - (rating__ + numberFrmHalfStar())
  // console.log(decimal_path,rating__,numberFrmHalfStar(0,empty_star))
  return (
    <>
      {[...Array(rating__).keys()].map(each => <Star className='svg-solid-yellow' key={each} />)}
      {numberFrmHalfStar() !== 0 && <StarHalf className='svg-outline-yellow solid-yellow' />}
      {empty_star &&
        [...Array(empty_star).keys()].map(each => <Star className='star-grey' key={each} />)
      }
    </>
  )
}



function Card4Recommend({ data }) {
  let { poster_path, release_date, overview, secs = 7200, title, vote_average, rated = 'PG' } = data
  console.log('https://image.tmdb.org/t/p/original' + poster_path)
  return (
    <div className="hori-card flex overflow-hidden" key={title}>
        <div className="g"></div>
      	<ImgwithPL className="img-div" src= {`https://image.tmdb.org/t/p/original${poster_path})`}/>
		<div className="content flex">
        	<h3>{title}</h3>
        	
			<div className="overview">
          		<p>{overview}</p>
        	</div>
        	
			<p className="duration-txt">{toHHMMSS(7200)}</p>
			
			<div className="genres-box flex">
				{['Animation','Action','Adventure'].map(each_genre=><p key={each_genre} className="genre-txt">{each_genre}</p>)}
			</div>

			<div className="btm-box flex">
				<div className="rating-box">
					<ComputedStars rating={vote_average/2}/>
				</div>
				<button className="bookmark-btn flex">
					<Bookmark/>
				</button>
			</div>

      </div>
    </div>
  )
}

export default function Recommendations({ data }) {
  return (

    <section className="SectionPreview recommendations-main-case">
      <div className="header">
		<p>---</p>
        <Zap />
        <h3>Recommendations</h3>
		<p>---</p>
      </div>
      <ol className="collection  horizontal-scrollbar__items--faded-end horizontal-scrollbar__items--faded-start horizontal-scrollbar__items--faded">

        {data.map((each_movie, i) => <Card4Recommend data={each_movie} key={i} />)}
      </ol>
      <Link to='recommendations' className="view-all-link">View all</Link>
    </section>
  )
}


// import React from "react";
// import { Link } from "react-router-dom";
// import "./Recommendations.css"; // Import your custom CSS for styles
// import {SignalMedium, StarHalf,StarOff,Star,Zap} from "lucide-react"

// function ComputedStars({ rating }) {
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating % 1 >= 0.5;
//   const emptyStars = 5 - (fullStars + (hasHalfStar ? 1 : 0));

//   return (
//     <div className="stars">
//       {[...Array(fullStars)].map((_, i) => (
//         <Star key={`full-${i}`} className="star full"/>
//       ))}
//       {hasHalfStar && (
//         <StarHalf  key="half" className="star half"/>
//       )}
//       {[...Array(emptyStars)].map((_, i) => (
//             <Star key={`empty-${i}`} className="star empty"/>
//         ))}
//     </div>
//   );
// }

// function MovieCard({ data }) {
//   const { poster_path, title, vote_average } = data;

//   const handlePreview = () => {
//     alert(`Loading preview for ${title}...`);
//   };

//   return (
//     <div className="movie-card">
//       <div 
//         className="movie-poster" 
//         style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${poster_path})` }}
//       ></div>
//       <div className="movie-overlay">
//         <button onClick={handlePreview} className="preview-button">Preview</button>
//       </div>
//       <div className="movie-details">
//         <h3 className="movie-title">{title}</h3>
//         <ComputedStars rating={vote_average / 2} />
//       </div>
//     </div>
//   );
// }

// export default function Recommendations({ data }) {
//   return (
//     <section className="recommendations">
//       <div className="recommendations-header">
//         {/* <Zap/> */}
//         <h2>Recommendations</h2>
//         <Link to="/recommendations" className="view-all">View all</Link>
//       </div>
//       <div className="recommendations-list">
//         {data.map((movie, i) => (
//           <MovieCard key={i} data={movie} />
//         ))}
//       </div>
//     </section>
//   );
// }
