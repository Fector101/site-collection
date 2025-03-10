import { genreIds } from "./api_data"

/**
 *  Changes String first letter to Captial Case
 * @param {string} str
 * @returns {string} string in Title Case
 */const toTitleCase = str => str.slice(0, 1) + str.slice(1)


// A collection of Helpful Independent Functions
/**
 *  Computes list to give string with space at front if str_or_list is not undefined
 * @param {string[]|string} str_or_list - classes set the parent element class.
 * @returns {string} A String
 */
function returnClass(str_or_list) {
	if (!str_or_list) { return '' }
	else if (typeof str_or_list === 'string') {
		return ' ' + str_or_list
	}
	else if (Array.isArray(str_or_list)) {
		return ' ' + str_or_list.join(' ')
	}
}
/**
 * 
 * @param {Number} start 
 * @param {Number} end 
 * @returns {Number} A random Number from given range.
 */
function randInt(start = 0, end) {
	const gen = () => Math.trunc(Math.random() * end)
	let int_ = gen()
	if (int_ < start) {
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
function toHHMMSS(secs__) {
	let sec_num = parseInt(secs__, 10)
	let hrs = Math.floor(sec_num / 3600)
	let mins = Math.floor((sec_num - (hrs * 3600)) / 60)
	let secs = sec_num - (hrs * 3600) - (mins * 60)
	let format = (arg) => arg.toString().padStart(2, '0')

	return `${format(hrs)}:${format(mins)}:${format(secs)}`
}
/**
 * 
 * @param {Number} decimal_number if input is 5.0 output will be 0
 * @returns {Number} if input is 5.12 output will be 0.12
 */
export function parseDecimalSide(decimal_number) {
	decimal_number = decimal_number.toString()
	if (decimal_number.includes('.')) {
		let list_of_values_nd_dot = decimal_number.split('.')
		let value = list_of_values_nd_dot[list_of_values_nd_dot.length - 1]
		return Number('0.' + value)
	}
	else { return 0 }
}

function getGenreName(id) {
	return genreIds[id]
}



// For Scroll   Disabling/Enableing

let __keys = { 37: 1, 38: 1, 39: 1, 40: 1 }
function preventDefault(e) {
	e.preventDefault()
}

let here;
function preventDefaultForScrollKeys(e) {
	if (__keys[e.keyCode]) {
		preventDefault(e)
		here = 'here'

		return false
	}
}
let supportPassive = false
try {
	// TODO Gotten from my electro player google what means later 
	window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
		get: function () { supportPassive = true }
	}))
} catch (e) {
	console.log(e)
}
let wheelOpt = supportPassive ? { passive: false } : false;
let wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
function disableScroll() {
	window.addEventListener('DOMMouseScroll', preventDefault, false)// older
	window.addEventListener(wheelEvent, preventDefault, wheelOpt)
	window.addEventListener('touchmove', preventDefault, wheelOpt) //For mobile
	window.addEventListener('keydown', preventDefaultForScrollKeys, false)

}
async function enableScroll() {
	here = 'there'
	window.removeEventListener('DOMMouseScroll', preventDefault, false)// older

	window.removeEventListener(wheelEvent, preventDefault, wheelOpt)
	window.removeEventListener('touchmove', preventDefault, wheelOpt) //For mobile
	window.removeEventListener('keydown', preventDefaultForScrollKeys, false)

}










export { isTouchDevice, returnClass, randInt, toHHMMSS, toTitleCase, getGenreName,disableScroll,enableScroll }