// import { useEffect, useRef, useState } from "react";
import "./components/css/quick-style.css"
import "./components/css/App.css";
import Homepage from "./pages/Homepage";
import { top_movies_data } from "./components/js/api_data";
import {Route, Routes, useNavigate } from "react-router-dom";
import NotFoundpage from "./pages/NotFoundpage";
import ListRoutes from "./pages/LIstRoutes";
import Header from "./components/ui/header/Header";
import "./components/css/responsive.css"
import Footer from "./components/ui/footer/Footer";
import Moviepage from "./pages/Moviepage";
import { useEffect } from "react";

// async function apiCall(){
//   const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
//   const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization: process.env.REACT_APP_TEST
//     }
//   };

//   const res = await fetch(url, options)
//   const data = await res.json()
//   return data
// }
// /site-collection/
function App() {
  // let [top_10_movies,setTop10Movies]=useState([])
  const navigate = useNavigate()
  const goToMovie = () => {
    navigate('/movie?id=933260');
  };
  useEffect(function(){
    // goToMovie()
  //   apiCall().then(data=>setTop10Movies(data))
  },[])
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={ <Homepage top_movies_data__={top_movies_data}/> }/>
        <Route path="/movie" element={ <Moviepage /> }/>
        <Route path="/list/*" element={<ListRoutes />} /> 
        <Route path="*" element={ <NotFoundpage/>} />
      </Routes>
      <Footer/>
    </>
    // <div className="App">
      // <Homepage top_movies_data__={top_movies_data}/>
      // {/* <Homepage top_movies_data__={top_10_movies.results?.slice(0,7)}/> */}
    // </div>
  )
}

export default App
