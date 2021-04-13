
const lut = []; for (var i=0; i<256; i++) { lut[i] = (i<16?'0':'')+(i).toString(16); }

function getLut(d, i) {return lut[d>>i&0xff]};

/**
 * 
 * @param {number} r0 
 * @param {number} r1 
 * @param {number} r2 
 * @param {number} r3  
 * @returns {string}
 */
function uuidL0(r0, r1, r2, r3) {
    var d0 = r0 * 0xffffffff | 0;
    var d1 = r1 * 0xffffffff | 0;
    var d2 = r2 * 0xffffffff | 0;
    var d3 = r3 * 0xffffffff | 0;
    return "14" + 
		getLut(d0, 0) + getLut(d0, 8) + getLut(d2, 16) + getLut(d2, 24) + 
		getLut(d1, 0) + getLut(d1, 8) + getLut(d3, 16) + getLut(d3, 24) +
		"03";
}

/**
 * @param {string} id
 * @param {string} val
 * @returns {string}
 */
function generateFrom(id = "", val = "") {
	id = id || generateId();
	val = val || generateValidator();

	let r0S = [...val].splice(0, 2);
	let r1S = [...val].splice(2, 2);
	let r2S = [...val].splice(4, 2);
	let r3S = [...val].splice(6, 2);

	let r0 = parseInt(r0S, 16) / 500 + parseInt(id, 16) / 131_070;
	let r1 = parseInt(r1S, 16) / 500 + parseInt(id, 16) / 131_070;
	let r2 = parseInt(r2S, 16) / 500 + parseInt(id, 16) / 131_070;
	let r3 = parseInt(r3S, 16) / 500 + parseInt(id, 16) / 131_070;

	return uuidL0(r0, r1, r2, r3);
}

/**
 * 
 * @returns {string}
 */
 function generateValidator() {
	const p = () => (Math.floor(Math.random() * 16).toString(16));
	return p()+p() + p()+p() + p()+p() + p()+p();
}

/**
 * 
 * @returns {string}
 */
 function generateId() {
	const p = () => (Math.floor(Math.random() * 16).toString(16));
	return p() + p() + p() + p();
}

/**
 * 
 * @returns {string}
 */
function uuidvL0() {
	return generateFrom();
};

function tokenvL0(id, validator) {
	return generateFrom(id, validator);
};

function validatedTokenvL0() {
	const id = generateId();
	const validator = generateValidator();
	const token = tokenvL0(id, validator);
	return `${token}-${id}-${validator}`;
}

/**
 * 
 * @param {string} str 
 * @param {number} init 
 * @param {number} length 
 * @returns {string}
 */
function getString(str, init, length) {
	return [...str].splice(init, length).join("");
}

/**
 * 
 * @param {string} token 
 */
function validateTokenL0(token) {
	const parts = token.split("-");
	if(parts.length !== 3) return false;
	
	const target = parts[0];
	if(!target || (getString(target, 0, 2) !== "14" && getString(target, target.length - 2, 2) !== "03")) return false; 

	const id = parts[1];
	if(!id) return false;

	const validator = parts[2];
	if(!validator) return false;

	const newToken = tokenvL0(id, validator);
	if(newToken !== target) return false;

	return true;
}


module.exports = {
	L0: {
		uuid: uuidvL0,
		token: {
			generate: validatedTokenvL0,
			validate: validateTokenL0
		}
	}
}