import { useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import { returnClass,isTouchDevice } from "./helper";
import { Block } from "./blocks_construct";
/**
 *  Creates App Generic Button
 * @param {string} size - The size of the Button.
 * @param {string[]|string} classes - classes set the parent element class.
 * @param {string} text - this the button text.
 * @returns {Element} A react Element
 */
function MovementBtn({
    speed__,
    resetSpeed__,
    pressEvent,
    size,
    classes,
    text,
  }) {
    let timer = useRef();
    function action() {
      pressedBtn(undefined, 250 / speed__.current);
      // if (speed__.current < 7 ){
      speed__.current = 5;
      // }
    }
    function pressedBtn(_, ms = 250) {
      pressEvent();
      // document.querySelector('.high-score').textContent=Math.random().toFixed(2)
      timer.current = setTimeout(action, ms);
    }
    function raisedBtn() {
      resetSpeed__();
      clearTimeout(timer.current);
    }
  
    return (
      <div className={size + " gen-btn" + returnClass(classes)}>
        <div
          onTouchStart={pressedBtn}
          onTouchEnd={raisedBtn}
          // onMouseDown={ ()=>{isTouchDevice()?pressEvent():pressedBtn()}}
          onMouseDown={() => {
            !isTouchDevice() && pressedBtn();
          }}
          onMouseUp={raisedBtn}
          className="outer"
        >
          <div className="inner"></div>
        </div>
        {Array.isArray(text) ? (
          text.map((each) => <p key={nanoid()}>{each.toUpperCase()}</p>)
        ) : (
          <p>{text.toUpperCase()}</p>
        )}
      </div>
    );
  }
  
  /**
   *  Creates App Generic Button
   * @param {string} size - The size of the Button.
   * @param {string[]|string} classes - classes set the parent element class.
   * @param {string} text - this the button text.
   * @returns {Element} A react Element
   */
function MyBtn({ pressEvent, size, classes, text }) {
  
    return (
      <div className={size + " gen-btn" + returnClass(classes)}>
        <div
          onMouseDown={pressEvent}
          className="outer"
        >
          <div className="inner"></div>
        </div>
        {Array.isArray(text) ? (
          text.map((each) => <p key={nanoid()}>{each.toUpperCase()}</p>)
        ) : (
          <p>{text.toUpperCase()}</p>
        )}
      </div>
    );
}
  
export function ControlsCase({handleKeyUp_, resetSpeed_, speed_, setBlocks_}) {
    const setting_btns = [
      ["start", "pause"],
      "sound",
      "setting",
      ["exit", "game"],
    ];

    function rotateBlock(e){
    if (typeof e === "string") { e = { key: e } }
    if(e.key !== 'k')return

    setBlocks_(old_blocks=>{
      const last_block =  old_blocks.pop()
      let new_blocks = [...old_blocks]
      let classes_=structuredClone(last_block.props.class_)
      const cur_block = document.querySelector('.block.current')
      const position = {top: cur_block.style.top, left:cur_block.style.left}

      let block_name=classes_.replaceAll('block','')
      block_name = block_name.replaceAll('current','')
      block_name = block_name.replaceAll('delay','')
      block_name = block_name.replaceAll(' ','')
      // if(block_name.includes('shifted-cube') || block_name.includes("h-line")){
      if(['shifted-cube-1', 'shifted-cube', "h-line"].includes(block_name.replace('-R','')) ){ // For blocks that can only be rotated Once
        if(classes_.includes('-R')){
          block_name = block_name.replace('-R' ,'')
        }else{ block_name += '-R' }
      }else if(['cube'].includes(block_name)){
        // pass
      }else{// For block that can only be rotated Thrice
        if(classes_.includes('-R2')){ 
          block_name = block_name.replace('-R2','')
        }
        else if(classes_.includes('-R1')){
          block_name = block_name.replace('-R1','-R2')
        }
        else if(classes_.includes('-R')){
          block_name = block_name.replace('-R','-R1')
        }else{ block_name += '-R' }
      }
      new_blocks.push(<Block key={nanoid()} class_={block_name} top={position.top} left={position.left} />)
      
      return new_blocks
    })
  }
    useEffect(function () {
      window.addEventListener("keydown", handleKeyUp_)
      window.addEventListener("keyup",rotateBlock)
      
      return () => {
        window.removeEventListener("keyup",rotateBlock)
        window.removeEventListener("keydown", handleKeyUp_)
      }
      // console.log(e,this)
      // eslint-disable-next-line
    }, []);
    return (
      <div className="controls-case">
        <section className="dir-case">
          <div className="first">
            <MovementBtn
              speed__={speed_}
              resetSpeed__={resetSpeed_}
              pressEvent={() => handleKeyUp_("ArrowUp")}
              text="up / level"
            />
          </div>
          <div className="second">
            <MovementBtn
              speed__={speed_}
              resetSpeed__={resetSpeed_}
              pressEvent={() => handleKeyUp_("ArrowLeft")}
              text={["left", "prev game"]}
              size="mid"
            />
            <MovementBtn
              speed__={speed_}
              resetSpeed__={resetSpeed_}
              pressEvent={() => handleKeyUp_("ArrowRight")}
              text={["right", "next game"]}
              size="mid"
            />
          </div>
          <div className="third">
            <MovementBtn
              speed__={speed_}
              resetSpeed__={resetSpeed_}
              pressEvent={() => handleKeyUp_("ArrowDown")}
              text="down / speed"
              size="mid"
            />
          </div>
        </section>
  
        <section className="settings-btns-rotate-btn-case">
          <div className="settings-case">
            {setting_btns.map((each) => (
              <MyBtn
                speed__={speed_}
                resetSpeed__={() => console.log("Bad Component")}
                pressEvent={() => console.log("Very Bad Component")}
                key={nanoid()}
                size="small"
                text={each}
              />
            ))}
          </div>
          <MyBtn
            classes="rotate-btn-case"
            pressEvent={() => rotateBlock('k')}
            text={["rotate", "direction"]}
            size="big"
          />
        </section>
      </div>
    );
}
  