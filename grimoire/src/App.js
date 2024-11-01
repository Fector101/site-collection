// import { useEffect, useRef, useState } from "react";
import "./components/css/App.css";
// import { Camera } from "lucide-react";
import Homepage from "./components/js/Homepage";
import "./components/css/responsive.css"
import { top_movies_data } from "./components/js/api_data";
import { useEffect, useState } from "react";
// console.log(top_movies_data)

async function apiCall(){
  const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.REACT_APP_TEST
    }
  };

  const res = await fetch(url, options)
  const data = await res.json()
  return data
}
// PUBLIC_URL=/site-collection/

function App() {
  let [top_10_movies,setTop10Movies]=useState([])
  useEffect(function(){
    apiCall().then(data=>setTop10Movies(data))
    // apiCall().then(data=>console.log(data))
  },[])
  return (
    <div className="App">
      <Homepage top_movies_data__={top_10_movies.results?.slice(0,7)}/>
      {/* <Camera color="red" size={48}/> */}
    </div>
  )
}

export default App
