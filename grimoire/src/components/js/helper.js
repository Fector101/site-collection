// A collection of Helpful Independent Functions
/**
 *  Computes list to give string with space at front if str_or_list is not undefined
 * @param {string[]|string} str_or_list - classes set the parent element class.
 * @returns {string} A String
 */
function returnClass(str_or_list){
	if(!str_or_list){return ''}
	else if (typeof str_or_list === 'string'){
	  return ' ' + str_or_list
	}
	else if (Array.isArray(str_or_list)){
	  return ' ' + str_or_list.join(' ')
	}
}
/**
 * 
 * @param {Number} start 
 * @param {Number} end 
 * @returns {Number} A random Number from given range.
 */
function randInt(start=0,end){
  const gen = ()=> Math.trunc(Math.random() * end)
  let int_= gen()
  if(int_ < start){
	randInt()
  }
  return int_
}


function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}
/**
 * 
 * @param {Number|String} secs__ 
 * @returns {String}
 */
function toHHMMSS(secs__){
	let sec_num = parseInt(secs__, 10)
	let hrs=Math.floor(sec_num/3600)
	let mins = Math.floor((sec_num - (hrs * 3600)) / 60)
	let secs=sec_num - (hrs*3600)-(mins*60)
	let format = (arg)=>arg.toString().padStart(2, '0')
	return `${format(hrs)}:${format(mins)}:${format(secs)}`
}

export {isTouchDevice,returnClass,randInt, toHHMMSS}