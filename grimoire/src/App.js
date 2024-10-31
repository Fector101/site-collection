// import { useEffect, useRef, useState } from "react";
import "./components/css/App.css";
// import { Camera } from "lucide-react";
import Homepage from "./components/js/Homepage";
import "./components/css/responsive.css"
import { top_movies_data } from "./components/js/api_data";
// console.log(top_movies_data)
function App() {
  return (
    <div className="App">
      <Homepage top_movies_data__={top_movies_data.results.slice(0,3)}/>
      {/* <Camera color="red" size={48}/> */}
    </div>
  )
}

export default App