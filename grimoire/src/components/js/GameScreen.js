import { useRef, useEffect, useState, startTransition } from "react";
import Confetti from "react-confetti";
import { randBlockName, classes, Block } from "./blocks_construct";
import { boxMath, } from "./helper";

export function GameScreen({ rows_and_columns_,handleKeyUp_,blocks_, setBlockStr_, speed_}) {
    let [boxes, setBoxes] = useState([]);
    let timer = useRef();
    let [confetti_size, setSize] = useState({ width: 0, height: 0 });
    let [last, setLast] = useState(false);
    let [ongoing,setOngoing] = useState(true)

    function startAnimation(){
      if(!ongoing) return
      // console.log('once')
      // setInterval(()=>handleKeyUp_('down'),speed_)
    }
    // useEffect(function(){ setLast(blocks_[] === classes.at(-1)?true:false)}, [blocks_] );
    useEffect(function(){
      const container__ = document.querySelector(".screen .game");
  
      // Dev
      const con = document.querySelector(".screen").getBoundingClientRect();
      setSize({ width: con.width, height: con.height})
  
      rows_and_columns_.current = boxMath(container__, setBoxes);
      function resizeFun() {
        clearTimeout(timer.current); // To prevent Lag
        timer.current = setTimeout(() => rows_and_columns_.current= boxMath(container__, setBoxes), 500);
      }
      window.addEventListener("resize", resizeFun);
      // document.querySelector(".high-score").textContent = block;
      startAnimation()
      return () => window.removeEventListener("resize", resizeFun);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    function dev() {
      setBlockStr_((name) => {
        if (name === classes.at(-1)) {
          setLast(true);
        }
        return randBlockName("dev");
      });
    }
    return (
      <div className="screen">
        {last && <Confetti width={confetti_size.width} height={confetti_size.height} />}

        <div className="game">
          {blocks_}
          {boxes}
        </div>

        <div className="right-side">
          <div className="score-box">
            <p>SCORE</p>
            <p className="cur-score">0</p>
            <p>HI-SCORE</p>
            <p className="high-score">{}</p>
          </div>
  
          <div className="incoming-box" onClick={dev}>
            <p style={{ margin: "46% 0" }}>Next</p>
          </div>
  
          <div className="lvl_nd_speed">
            <p>
              LEVEL <span className="cur-lvl">1</span>
            </p>
            <p>
              SPEED <span className="cur-speed">1</span>
            </p>
          </div>
          <div className="gif-box"></div>
          <div className="info-box"></div>
        </div>
      </div>
    );
  }