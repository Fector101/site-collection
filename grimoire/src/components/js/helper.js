// A collection of Helpful Independent Functions
import {nanoid} from 'nanoid'
/**
 *  Computes list to give string with space at front if str_or_list is not undefined
 * @param {string[]|string} str_or_list - classes set the parent element class.
 * @returns {string} A String
 */
export function returnClass(str_or_list){
	if(!str_or_list){return ''}
	else if (typeof str_or_list === 'string'){
	  return ' ' + str_or_list
	}
	else if (Array.isArray(str_or_list)){
	  return ' ' + str_or_list.join(' ')
	}
}
export function boxMath(container,SetBoxes){
	
  if(!container)return
  // const con_size=container.getBoundingClientRect()
  const con_size={height:container.clientHeight,width:container.clientWidth}
  // console.log(con_size)
  // const box_size=(7 * 280.078125 * 291) / (con_size.width*con_size.height)
  const box_size =15 //Same width and height
  const margin = 2
  const actual_size=box_size+margin
  const rows = Math.trunc(con_size.height /actual_size)   
  const columns = Math.trunc(con_size.width / actual_size)
  const totalCells = rows * columns;
  document.querySelector('.high-score').textContent=totalCells+' blocks'
  
  let boxes_=[]
  for (let i = 1; i <= totalCells; i++) {
	  boxes_.push(<div className='box' style={{minWidth:box_size+'px',minHeight:box_size+'px',maxWidth:box_size+'px',maxHeight:box_size+'px'}} key={nanoid()}></div>)
  }
  SetBoxes(boxes_)
  return [rows,columns]
}

export function randInt(start=0,end){
  const gen = ()=> Math.trunc(Math.random() * end)
  let int_= gen()
  if(int_ < start){
	randInt()
  }
  return int_
}


export function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

/**
   *  Creates App Generic Button
   * @param {string} coord - Can be 'x' or 'y'
   * @param {Number} pixels_to_move - The current block position i.e 'top' and 'left' neg or pos, positive if going right and vice verse
   * @returns {Boolean} a boolean that blah blah
   */
export function inBounds(coord = "", pixels_to_move = 0) {
  // For dynamic screen size
  const container__ = document.querySelector(".screen .game").getBoundingClientRect();
  const current_block = document.querySelector(".game .block.current")
  const current_block_cells = Array.from(document.querySelectorAll(".game .block.current .cell"))
  const current_block_cells_bounds = current_block_cells.map(e=>e.getBoundingClientRect())
  const cur_block_bounds = current_block.getBoundingClientRect()
  let state = true
  function inScreen(){
	if ( coord === "x" && (cur_block_bounds.x + pixels_to_move < container__.x || cur_block_bounds.x + pixels_to_move > container__.right - cur_block_bounds.width)
	) {
	  document.querySelector(".cur-score").textContent = "foul";
	  return false;
	} else if ( coord === "y" && (cur_block_bounds.y + pixels_to_move < container__.y || cur_block_bounds.bottom + pixels_to_move > container__.bottom)) {
	  document.querySelector(".cur-score").textContent = "foul";
	  return false;
	}
	
	// console.log('--------------------')
	document.querySelector(".cur-score").textContent = "pass";
	return true;
  }
  
  function notCollidingWithAnotherBlock(){
	const all_blocks = Array.from(document.querySelectorAll('.block:not(.current) .cell')) // All Blocks Except Current Block.
	if(all_blocks.length === 0 )return true
	// Checking a range of values.
	
	let willCollideY=false
	let willCollideX=false
	function checkY(){
		let blocks_under=[]
		const blockUnder = (down_cell_x,down_cell_width) =>{
			// return current_block_cells_bounds.some((bounds,i)=>{
			let cells = []//cells of the current_block that have cells under it
			// The Blocks Already On Screen and placed not currebt block Tips
			const isLeftTip =(A1,B1,B2) => A1 <= B2 && B1 >= B2
			const isRightTip =(A1,B1,A2) =>B1 >= A2 && A1 <= A2
			for (let i = 0; i < current_block_cells_bounds.length; i++) {
				const bounds=current_block_cells_bounds[i]
				const A1 = down_cell_x
				const B1 = A1+down_cell_width
				const A2 =  bounds.x
				const B2 =  A2 + bounds.width
				if(isLeftTip(A1,B1,B2)||isRightTip(A1,B1,A2)){
					cells.push(current_block_cells[i])
				}
			}
			// Finding Closest to bottom 
			let lowest_cell = cells[0]
			cells.forEach(each=> {
				if(each.getBoundingClientRect().bottom > lowest_cell.getBoundingClientRect().bottom){
					lowest_cell = each
				}
			})
			return lowest_cell
		}
		const hasMeetTallest = (T1,B2_nd_pixels_to_move) => T1 <= B2_nd_pixels_to_move //Top_1 Bottom_2
		for (let index = 0; index < all_blocks.length; index++) {
			const each_cell = all_blocks[index]
			const each_cell_bounds = each_cell.getBoundingClientRect()
			const top_axis_for_cell_down = each_cell_bounds.top

			// Some Won't Check Blocks Above
			const block_is_below = current_block_cells_bounds.some(each=>top_axis_for_cell_down >= each.bottom)
			if(block_is_below){	//Not Checking Elements Above or in Same Y of it.
				const cell_at_top = blockUnder(each_cell_bounds.x,each_cell_bounds.width)
				if(cell_at_top){ // Checks if block is right under
					// console.log(cell_at_top)
					willCollideY = hasMeetTallest(top_axis_for_cell_down,cell_at_top.getBoundingClientRect().bottom + pixels_to_move)
				}else{willCollideY=false}
			}
			if(willCollideY){ blocks_under.push(each_cell) }
		}
		willCollideY = Boolean(blocks_under.length)
	}
	function checkX(){
		const alreadyPlacedBlockAt_Left=(down_cell_left, falling_cell)=>down_cell_left < falling_cell.getBoundingClientRect().left
		const alreadyPlacedBlockAt_Right=(down_cell_right, falling_cell)=>down_cell_right > falling_cell.getBoundingClientRect().right
		const blockAtSide = (down_cell_left,down_cell_right,down_cell_top,down_cell_height) =>{
		let cells = []
		const isAtSide =(A1,B1,A2,B2) => A1 === A2 && B1 === B2
		current_block_cells_bounds.forEach( (bounds, i) =>{
			const A1 = down_cell_top
			const B1 = A1 + down_cell_height
			const A2 = bounds.top
			const B2 = A1 + bounds.height
			if(isAtSide(A1,B1,A2,B2)){
				cells.push(current_block_cells[i])
			}
		})
		let closest_cell = cells[0]
		// console.log(cells)
		cells.forEach(falling_cell=> {
			console.log(falling_cell)
			if(alreadyPlacedBlockAt_Left(down_cell_left, falling_cell) && falling_cell.getBoundingClientRect().left < closest_cell.getBoundingClientRect().left){
				closest_cell=falling_cell
			}else if(alreadyPlacedBlockAt_Right(down_cell_right, falling_cell) && falling_cell.getBoundingClientRect().right > closest_cell.getBoundingClientRect().right){	// Therefore it's coming from right
				closest_cell=falling_cell
			}
		})
		return closest_cell				
		}
		
		const canNotMoveRight = (placed_cell_left,falling_cell_moving_pxs) => falling_cell_moving_pxs > placed_cell_left
		const canNotMoveLeft = (placed_cell_right, falling_cell_moving_pxs) => falling_cell_moving_pxs < placed_cell_right
		
		let elements_that_will_collide_at_side=[]
		for (let index = 0; index < all_blocks.length; index++) {
			const each_block = all_blocks[index]
			const placed_cell_bounds = each_block.getBoundingClientRect()
			const closest_falling_cell = blockAtSide(placed_cell_bounds.left,placed_cell_bounds.right,placed_cell_bounds.top,placed_cell_bounds.height)
			if(closest_falling_cell){
				// console.log(closest_falling_cell)
				console.log('checking...')
				if(alreadyPlacedBlockAt_Right(placed_cell_bounds.right,closest_falling_cell)){
					willCollideX = canNotMoveRight(placed_cell_bounds.left,closest_falling_cell.getBoundingClientRect().right + pixels_to_move)
					console.log('Old cell at Right')
				}else{	// Therefore cell is at Left
					console.log('Old cell at Left')
					willCollideX = canNotMoveLeft(placed_cell_bounds.right,closest_falling_cell.getBoundingClientRect().left + pixels_to_move)
				}
				if(willCollideX){
					elements_that_will_collide_at_side.push(each_block)
					console.log(each_block, closest_falling_cell)
				}
			}
			willCollideX = Boolean(elements_that_will_collide_at_side.length)

		}

	}
	coord === 'y' ? checkY() : checkX()


	if ( coord === "x" && willCollideX ) {
	  return false;
	} else if (coord === "y"  && willCollideY) {// This Means it right Under
		return false
	}
	
	// console.log('--------------------')
	document.querySelector(".cur-score").textContent = "pass";
	return true;
  }
  state = notCollidingWithAnotherBlock() && inScreen()
  return state
}