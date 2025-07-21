
const company = {
	money:STARTING_MONEY,
	shift:1,
	time:0,
	bays:[],
	tool_backlog:[],
	products:[],
	techs:[],
	recentActions:[],
	payroll:0,
	demand:0,
	quarter:1,

	addToMoney: function(m){
		this.money = this.money + m

		if(this.money < 0) {gameOver() }
	},
	printBays: function() {
		let s = "bays:"+this.bays.length+"<br>";

		for (var i = 0; i < this.bays.length; i++) {
			s=s+this.bays[i].print()+"<br>";
		}
		return s;
	}
}





function progressHour() {
	if(debugFlag1) {
		if(!debug_FAST_MODE) {
			clearInterval(main_loop);
			main_loop = setInterval(progressTime, 80); 
			debug_FAST_MODE = !debug_FAST_MODE;
		} else {
			clearInterval(main_loop);
			main_loop = setInterval(progressTime, 1000);
			debug_FAST_MODE = !debug_FAST_MODE;
		}
		debugFlag1 = false;
	}
	company.time++;

	if(company.time > 11) {
		newShift()
	}
}




function progressTime() {
	
	progressHour();
	doWorkEachBay();

	redraw();
}






function addAct(s) {
	company.recentActions.push(s);
	if(company.recentActions.length > 20)
		company.recentActions.shift();
}

function newShift() {

	company.time=0;
	company.shift++;

	if(company.shift % 180 == 0) {
		company.quarter++;
	}
	payShift();
	if(company.shift%14==0) doPayroll();
}


function payShift() {
	for(let i = 0; i <  company.techs.length; i++) {
		company.payroll += company.techs[i].wage * 12
	}
}

function doPayroll(){
	let m = company.payroll;
	company.addToMoney(-1*company.payroll);
	addAct("💸 Payroll, minus " + m);
	company.payroll = 0;
}
