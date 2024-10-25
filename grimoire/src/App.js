import { useEffect, useRef, useState } from "react";
import "./components/css/App.css";
import "./components/css/responsive.css";
// import { Camera } from "lucide-react";
import Homepage from "./components/js/Homepage";

function App() {
  return (
    <div className="App">
      <Homepage />
      {/* <Camera color="red" size={48}/> */}
    </div>
  )
}

export default App