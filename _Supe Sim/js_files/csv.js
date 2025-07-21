
function createArrayFromCSV(CSVstring) {
	let workingString = CSVstring;
	let pos1 = 0;
	let pos2 = 0;

	let arr = [];
	let row = 0;
	let col = 0;
	let flag1 = true;
	let flag2 = true;

	while(flag1) {
		pos1 = findNext(workingString,"\n");
		if(pos1 == -1) {
			pos1 = workingString.length;
			flag1 = false;
		}
		let cutRowString = workingString.substring(0, pos1);
		workingString = workingString.substring(pos1 + 1);
			arr[row] = [];
			col = 0

		while(flag2) {
			pos2 = findNext(cutRowString, ",");
			if(pos2 == -1){
				pos2 = cutRowString.length;
				flag2 = false;
			}
			let cell = cutRowString.substring(0, pos2);
			cutRowString = cutRowString.substring(pos2 + 1);
			arr[row][col] = cell;

			col++;
		
		}
		row++;
		flag2 = true
		
	}

	return arr;
}



function findNext(string, toFind) {
  let char = "";
  let hasYetToFind = true;
  let pos = 0;

  while(hasYetToFind) {
    char = string.charAt(pos);
    if (char == toFind){
      hasYetToFind = false;
    }
    else
      pos++;
    
    if(pos > string.length - 1) {
      return -1;
    }
  }
  return pos;

}