
/** @typedef {{success: boolean, data: {guid: string, tokens: string[], fileName: string, file: {name: string, size: number, type: string, data: Buffer}}}} file_data */

/**
 * 
 * @param {file_data} org 
 * @returns {file_data}
 */
function dataForCommonUser(org) {
	if(org?.tokens) org.tokens = ["MR. Hacker"];
	if(org?.file?.data) org.file.data = Buffer.from("MR. Hacker");

	return org;
}

module.exports = {
	dataForCommonUser
}