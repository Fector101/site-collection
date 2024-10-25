import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import "./components/css/App.css";
import "./components/css/controls.css";
import "./components/css/screen.css";
import "./components/css/blocks.css";
import "./components/css/responsive.css";
import { randBlockName, Block} from "./components/js/blocks_construct.js";
import { ControlsCase } from "./components/js/ControlCase.js";
import { GameScreen } from "./components/js/GameScreen.js";
import { inBounds } from "./components/js/helper.js";

function App() {
  let init_x= '3px'
  let init_y = '2.5px'
  let speed = useRef(1);
  let rows_and_columns = useRef([]);
  let [blocks, setBlocks] = useState(()=>[<Block key={nanoid()} class_={randBlockName('dev')} top={init_y} left={init_x} />]);
  
  function checkRow(){
    const container = document.querySelector('.screen .game')
    const boxes=Array.from(container.querySelectorAll('.box'))
    const blocks=Array.from(container.querySelectorAll('.block'))
    
    // Check is there are blocks in same X
    // Then Check the blocks each cell if in same x 
    const in_same_X = blocks.filter(function(each){

    })
    const first_box= boxes[0].style.backgroundColor='red'
    const last_box= boxes.at(-1).style.backgroundColor='yellow'

    const all_cells_Y = blocks.map(function(each_block){
      // List of each cell 'x'
      const block_cells_Y= Array.from(each_block.querySelectorAll('.cell')).map(each_cell=>each_cell.getBoundingClientRect().y)
      return block_cells_Y
    })
    function isEqualToWidth(){
      const y_axes_begin_occupied = [...new Set(all_cells_Y.flat())]
      const y_axes = all_cells_Y.flat()
      let stats= {}
      y_axes_begin_occupied.forEach(each=>stats[each] = 0)
      for(let i = 0; i < y_axes.length; i++){
        const each = y_axes[i]
        stats[each] += 1
      }
      // console.log(rows_and_columns)
      // console.log(stats)
    }
    isEqualToWidth()
  }
  
  function ANOTHER_(){
    // const parent = document.querySelector('.screen .game')
    
    // setBlocks(old=>[...old,<Block key={nanoid()} class_={randBlockName('dev')} top={init_y} left={init_x} />])
    document.querySelector('.block.current').classList.add('delay')
    setTimeout(()=>{
      document.querySelector('.block.current').classList.remove('current','delay')
      setBlocks(old=>[...old,<Block key={nanoid()} class_={randBlockName('dev')} top={init_y} left={init_x} />])
      console.log('breathe of fresh air');
    },500)

  }
  
  function handleKeyUp(e) {
    const current_block = document.querySelector(".game .block.current")
    // console.log(current_block)
    // const block = blocks.at(-1)
    if (!current_block) return;
    if (typeof e === "string") {
      let cup = e;
      e = { key: cup };
    }
    // So No lag if function becomes larger
    if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key))
      return;
    const px = 17;
    if (["ArrowUp", "ArrowDown"].includes(e.key)) {
      const prevY = parseFloat(current_block.style.top)
      let newY = ''
      if (e.key === "ArrowUp") {
        newY = inBounds("y", -px) ? prevY - px : prevY;
      } else if (e.key === "ArrowDown") {
        newY = inBounds("y", px) ? prevY + px : prevY;
      }
      // console.log(block,newY)
      newY= newY+'px'
      current_block.style.top = newY
      if(e.key === "ArrowDown" && !inBounds('y',px)){
        if(!current_block.classList.contains('delay')){ANOTHER_()}
        checkRow()
      }
      
      return newY;
    } else if (["ArrowLeft", "ArrowRight"].includes(e.key)) {
        const prevX = parseFloat(current_block.style.left)
        let newX = ''
        if (e.key === "ArrowLeft") {
          newX = inBounds("x", -px) ? prevX - px : prevX;
        } else if (e.key === "ArrowRight") {
          newX = inBounds("x", px) ? prevX + px : prevX;
        }
        newX= newX+'px'
        current_block.style.left = newX
        return newX;
    }
  }

  const resetSpeed = () =>  speed.current = 1;
  return (
    <div className="App">
      <GameScreen rows_and_columns_={rows_and_columns} handleKeyUp_={handleKeyUp} speed_={speed} blocks_={blocks} setBlockStr_={setBlocks} />
      <ControlsCase setBlocks_={setBlocks} handleKeyUp_={handleKeyUp} speed_={speed} resetSpeed_={resetSpeed}/>
    </div>
  );
}

export default App;
// The link was a dream,
// A shadow of what once was—
// Now, nothing remains.