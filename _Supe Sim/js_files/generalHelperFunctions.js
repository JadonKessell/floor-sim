

 function randVari(num) {
	let r = 0;
	if(num == null)
		num = 21;
	if(chance(50))
		r = -1 ;
	return r * getRandIncl(0,num);
}



function generateRandBen () {
    let rd = Math.floor(Math.random() * 10);
    let b = "" + rd +""+ Math.floor(Math.random() * 10) +
    ""+ Math.floor(Math.random() * 10) +""+ Math.floor(Math.random() * 10) +
    ""+ Math.floor(Math.random() * 10) +""+ Math.floor(Math.random() * 10) +
    ""+ Math.floor(Math.random() * 10) +""+ Math.floor(Math.random() * 10);

    return b;
}



function drawSpansAndDrawBar(min, max, length, char, color1, color2) {
	return "<span class='menu_bar'>" +
	drawBar(min, max, length, char, color1, color2) + 
	"</span>";
}




function drawBar(min, max, length, char, color1, color2) {
	let p = Math.min(Math.floor((min/max)*length), length);

	let r = "<span style='color:" + color1 + "'>";
	for(let i = 0; i < p; i++) {
		r = r + char;
	}
	r = r + "</span><span style='color:" + color2 + "'>";
	for(let i = p; i < length; i++) {
		r = r + char;
	}
	r = r + "</span>";

	return r;
}






function formatMoney(num) {
	let n = Math.floor(num/1000);
	let r = "" + n;
	let s = ""+num;
	r = r + ",<span style='font-size:90%'>" + s.slice(-3) + "</span>";
return r;
}





function setDPI(canvas, dpi) {
    // Set up CSS size.
    canvas.style.width = canvas.style.width || canvas.width + 'px';
    canvas.style.height = canvas.style.height || canvas.height + 'px';

    // Get size information.
    var scaleFactor = dpi / 96;
    var width = parseFloat(canvas.style.width);
    var height = parseFloat(canvas.style.height);

    // Backup the canvas contents.
    var oldScale = canvas.width / width;
    var backupScale = scaleFactor / oldScale;
    var backup = canvas.cloneNode(false);
    backup.getContext('2d').drawImage(canvas, 0, 0);

    // Resize the canvas.
    var ctx = canvas.getContext('2d');
    canvas.width = Math.ceil(width * scaleFactor);
    canvas.height = Math.ceil(height * scaleFactor);

    // Redraw the canvas image and scale future draws.
    ctx.setTransform(backupScale, 0, 0, backupScale, 0, 0);
    ctx.drawImage(backup, 0, 0);
    ctx.setTransform(scaleFactor, 0, 0, scaleFactor, 0, 0);
}





function pop_i(arr, i) {
	arr.copyWithin(i,i+1,arr.length);
	arr.pop();
}

function chance(perc) {
	
	return perc > Math.floor(Math.random() * 100);
}

function getRandIncl(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}





function toggleSpeed() {
	debugFlag1=true;
}



function gameOver () {
	
//document.getElementById("body").innerHTML = "GAME OVER";
alert("Game Over");
clearInterval(main_loop);
}


function displayTable(array, opt){

	let c = "class='techID'";
	if(opt == 2)
		c= "";
	let ret = "<table "+c+">";
	for (let i = 0; i+1 < array.length; i += 2) {
		ret = ret + "<tr><td class='displayTableKey'>" + array[i] + ":  " + "</td><td class='displayTableValue'>" + array[i+1] + "</tr>";
		
	}
	return ret + "</table>";

}