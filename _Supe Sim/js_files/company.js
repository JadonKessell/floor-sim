

function CompanyOBJ (money, payroll, bays, tool_backlog, products, techs, recentActions, demand, events, quarter, shift, time) {
	this.money = money;
	this.payroll = payroll;

	this.bays = bays;
	this.tool_backlog = tool_backlog;
	this.products = products;
	this.techs = techs;
	this.recentActions = recentActions;

	this.demand = demand;

	this.quarter = quarter;
	this.shift = shift;
	this.time = time;
	this.events = events
	
	this.addToMoney = function(m) {
		this.money = this.money + m

		if(this.money < 0) {gameOver() }
	}
	this.printBays = function() {
		let s = "bays:"+this.bays.length+"<br>";

		for (var i = 0; i < this.bays.length; i++) {
			s=s+this.bays[i].print()+"<br>";
		}
		return s;
	}
	this.updateTime = function() {
		if(debugFlag1) {
			if(!debug_FAST_MODE) {
				clearInterval(main_loop);
				main_loop = setInterval(updateAll, 80); 
				debug_FAST_MODE = !debug_FAST_MODE;
			} else {
				clearInterval(main_loop);
				main_loop = setInterval(updateAll, 1000);
				debug_FAST_MODE = !debug_FAST_MODE;
			}
			debugFlag1 = false;
		}


		this.time++; //1 represents 15min; 1 / 48 (12*4)
		
		if(this.time > 47) {
			this.updateShift()
		}
	}
	this.updateShift = function() {	
		this.time = 0;
		this.shift++;

		if(this.shift % 180 == 0) { //3 months; 90*2=180
			this.quarter++;
		}
		this.payShift();
		if(this.shift%14==0) this.doPayroll();
	}
	this.payShift = function() {
		for(let i = 0; i <  this.techs.length; i++) {
			this.payroll += this.techs[i].wage * 12
		}
	}

	this.doPayroll = function(){
		let m = this.payroll;
		this.addToMoney(-1 * this.payroll);
		this.addAct("💸 Payroll, minus " + m);
		this.payroll = 0;
	}
	this.addAct = function(s) {
		this.recentActions.push(s);
		if(this.recentActions.length > 20)
			this.recentActions.shift();
	}
	this.update = function() {
		this.updateTime();
		doWorkEachBay();
	}
}















function Calendar () {
	this.events = [];

}











