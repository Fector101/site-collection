import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import "./components/css/App.css";
import "./components/css/responsive.css";
// import Homepage from "./Homepage";
import { Camera } from "lucide-react";
import Header from "./components/js/Header";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <Camera color="red" size={48}/> */}
    </div>
  )
}

export default App