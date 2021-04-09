
/**
 * 
 * @param {string} pattern 
 * @returns {string}
 */
function generateFrom(pattern, id = 0) {
	id = id || Math.random();
	let i = 0;
	return pattern.replace(/[xy]/g, function(c) {
		var r = (id + (++i / 16)) * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

/**
 * 
 * @returns {string}
 */
function uuidvL0() {
	return generateFrom('1xxxy-4xxxy-0xxxy-3xxxy');
};

function tokenvL0(id) {
	return generateFrom('14yxxyxxyxxyxx03', id);
};

function validatedTokenvL0() {
	const limiter = 100_000;
	const id = Math.floor(Math.random() * limiter) / limiter;
	const token = tokenvL0(id);
	return `${token}-${(id * limiter).toString(16)}`;
}

/**
 * 
 * @param {string} token 
 */
function validateTokenL0(token) {
	const parts = token.split("-");
	if(parts.length !== 2) return false;

	const limiter = 100_000;
	const id = parseInt(parts[1], 16) / limiter;
	if(isNaN(id)) return false;

	const newToken = tokenvL0(id);
	if(newToken !== token) return false;

	return true;
}



if(require.main !== module) {
	module.exports = {
		L0: {
			generate: uuidvL0
		}
	}
} else {
	console.log(validatedTokenvL0());
}