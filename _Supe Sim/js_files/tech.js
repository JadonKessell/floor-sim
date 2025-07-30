
function Tech(name, level, exp, aP, tP, qtP, admP, aPG, tPG, qtPG, admPG, mor, lastProg, assignTo, role, vari, wage, reli) {
	this.name				 = name;
	this.level				 = 0; //every 100 exp
	this.experiencePerc		 = 0; //added every sec
	this.assembProf			 = aP;
	this.assembProfGrowth	 = aPG;
	this.testProf			 = tP;
	this.qtProf				 = qtP;
	this.testProfGrowth		 = tPG;
	this.adminProf			 = admP;
	this.adminProfGrowth	 = admPG;
	this.qtProfGrowth		 = qtPG;
	this.morale				 = mor;
	this.lastProg			 = lastProg;
	this.assignedTo			 = assignTo;
	this.role				 = role;
	this.vari				 = getRandIncl(0,1);
	this.wage 				 = wage;
	this.reliability		 = reli;
	this.gainExp = function(ex) {
		this.experiencePerc = this.experiencePerc + ex;
		if(this.experiencePerc >= 100) this.levelUp();
	}
	this.levelUp = function() {
		this.level++;
		let s = "";
		this.experiencePerc -= 100;
		if(chance(this.assembProfGrowth*10)) {
			this.assembProf=Math.min(8, this.assembProf+1);
			s = s+ " +1 point to Assembly Prof."
		}
		if(chance(this.testProfGrowth*10)) {
			this.testProf=Math.min(8, this.testProf+1);
			s = s+ " +1 point to Test Prof."
		}
		if(chance(this.qtProfGrowth*10)) {
			this.qtProf=Math.min(8, this.qtProf+1);
			s = s+ " +1 point to QT Prof."
		}
		Company.addAct("🔼 " + this.name + " leveled up!" + s);
		if(this.level % 4 == 0) this.morale--;
	}
	this.setMorale = function(num) {
		this.morale = Math.min(12, Math.max(num + this.morale, 0));
	}
	this.calcWage = function() {
		this.wage = roleWageArray[this.role] + this.ap + this.tp + this.admP + this.qtP;
	}

}











function doTechWork(req_role, bay_i, techs_arr) {
	let prog = 0;

	let total_prog = 0;
	let traineeCanWork = true;
	
	for(let i = 0; i < techs_arr.length; i++) {

		Company.techs[techs_arr[i]].lastProg = 0;
		traineeCanWork = true;

		//checking for trainee
		if(Company.techs[techs_arr[i]].role == 3) {
			traineeCanWork = false;
			for(let ii = 0; ii < techs_arr.length; ii++) {
				//finding other techs that aren't a trainee
				if(Company.techs[techs_arr[ii]].role != 3) {
					traineeCanWork = true;
				}
			}
		}
		

		if(traineeCanWork && req_role == -1 || Company.techs[techs_arr[i]].role == req_role) {
			let varname = cheatArray[req_role];
			if(req_role==-1)
				varname = cheatArray[0];
			prog = (Company.techs[techs_arr[i]][varname] / 8)
			
			prog = prog * (Company.techs[i].morale / 10);


			Company.bays[bay_i].assignedTool.increasePerc(prog);
			Company.bays[bay_i].assignedTool.opProgressArr[0].perc += prog;


			if(Company.bays[bay_i].assignedTool.isComplete) {
				Company.bays[bay_i].completeTool();
			}

			Company.techs[techs_arr[i]].gainExp((prog * 3));
			Company.techs[techs_arr[i]].lastProg = prog;
		}
		total_prog += prog;
		prog = 0;
	}
	
	return total_prog;
}



function assignTech(tech_i, bay_i) {
	if(Company.techs[tech_i].assignedTo > -1)
		unassignTech(tech_i);
	let isSuccess = Company.bays[bay_i].assignTechToBay(tech_i);
	if(isSuccess)
		Company.techs[tech_i].assignedTo = bay_i;
}

function unassignTech(tech_i) {
	let arr = Company.bays[Company.techs[tech_i].assignedTo].assignedTechs;

	for (let index = 0; index < arr.length; index++) {
		if(arr[index]==tech_i)
			pop_i(arr,index);
		
	}
}

function generateNewTech(tier) {
	let name = names[Math.floor(Math.random() * names.length)];
	let level = 0;
	let exp = 0;
	let mor = 100;
	let role = 0;
	let vari = getRandIncl(0,1);
	let wage = 0;
	let reli = 0;
	let t;

	const gAP_arr = function (allotPts) {
		let a = [];
		let num_of_stats = 8;
		let max = allotPts / num_of_stats;
console.log(a.type);

		for (let i = 0; i < num_of_stats; i++) {
			let n = Math.min(getRandIncl(1, max), allotPts);
			allotPts = allotPts - n;
			a.push(n);
		}
		while (allotPts > 0) {
			let n = Math.min(getRandIncl(1, max), allotPts);
			allotPts = allotPts - n;
			a[ getRandIncl(0, a.length - 1) ] += n;

		}

console.log(a);
		return a;
	};


	if(tier == 0) {
		let a = gAP_arr(16);
		t = new Tech(name, level, exp, a[0], a[1], a[2], a[3], a[4], a[5], a[6],a[7], mor, 0, -1, role, vari, wage, reli)
		t.calcWage();
	}
	if(tier == 1) {
		let a = gAP_arr(30);
		t = new Tech(name, level, exp, a[0], a[1], a[2], a[3], a[4], a[5], a[6],a[7], mor, 0, -1, role, vari, wage, reli)
		t.calcWage();
	}
	if(tier == 2) {
		let a = gAP_arr(60);
		t = new Tech(name, level, exp, a[0], a[1], a[2], a[3], a[4], a[5], a[6],a[7], mor, 0, -1, role, vari, wage, reli)
		t.calcWage();
	}
	return t;
}

function hireTech(cost) {
	Company.techs.push(generateNewTech(0));
	//Easter Egg
	if(chance(3)) {

		if(chance(20)) {
			let n = Company.techs.length-1
			Company.techs[n].assembProf=0;
			Company.techs[n].testProf=0;
			Company.techs[n].assembProfGrowth=9;
			Company.techs[n].testProfGrowth=9;
			Company.techs[n].name="Patrick Star";
		}
		else if(chance(20)) {
			let n = Company.techs.length-1
			Company.techs[n].assembProf=0;
			Company.techs[n].testProf=8;
			Company.techs[n].assembProfGrowth=0;
			Company.techs[n].testProfGrowth=9;
			Company.techs[n].name="Cool Ron";
		}
		else if(chance(20)) {
			let n = Company.techs.length-1
			Company.techs[n].assembProf=7;
			Company.techs[n].testProf=7;
			Company.techs[n].assembProfGrowth=1;
			Company.techs[n].testProfGrowth=1;
			Company.techs[n].name="Ron Shawn";
		}
		else if(chance(20)) {
			let n = Company.techs.length-1
			Company.techs[n].assembProf=2;
			Company.techs[n].testProf=7;
			Company.techs[n].assembProfGrowth=2;
			Company.techs[n].testProfGrowth=6;
			Company.techs[n].name="Other Sean";
		}
	}
	Company.addToMoney(-1*cost);
}


