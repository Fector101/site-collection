// import { useEffect, useRef, useState } from "react";
import "./components/css/App.css";
import Homepage from "./pages/Homepage";
import "./components/css/responsive.css"
import { top_movies_data } from "./components/js/api_data";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Listspage from './pages/Listspage'
import Listpage from './pages/Listpage'
import CreateListpage from './pages/CreateListpage'
import NotFoundpage from "./pages/NotFoundpage";
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
// /site-collection/
function App() {
  let [top_10_movies,setTop10Movies]=useState([])
  useEffect(function(){
    // apiCall().then(data=>setTop10Movies(data))
  },[])
  return (
    <Routes>
      <Route path="/grimoire" element={ <Homepage top_movies_data__={top_movies_data}/> }/>
      <Route path="/lists" element={ <Listspage text='Frm App Component to Route'/> }/>
      <Route path="/lists/:list_name" element={ <Listpage text='Frm App Component to Route'/> }/>
      <Route path="/lists/new-list" element={ <CreateListpage text='Frm App Component to Route'/> }/>
      <Route path="*" element={ <NotFoundpage/>} />

      
    </Routes>
    // <div className="App">
      // <Homepage top_movies_data__={top_movies_data}/>
      // {/* <Homepage top_movies_data__={top_10_movies.results?.slice(0,7)}/> */}
    // </div>
  )
}

export default App
