

function generateNewOP (diff, wp, eff, com, wkstn, type, redMor, progSec, reqRole, partsNum, opNum) {

	wp += randVari();
	partsArr = [];

	if(diff == "easy") {
		eff += randVari();
		com += randVari(5);
		redMor = getRandIncl(0,2);
	}
	else if(diff == "med") {
		eff += randVari();
		com += randVari(12);
		redMor = getRandIncl(1,4);
	}
	else if(diff == "hard") {
		eff += randVari();
		com += randVari(15);
		redMor = getRandIncl(5,9);
	}

	//generate parts
	if(type=="assembly") {
		for (let i = 0; i < partsNum; i++) {
			partsArr.push( generateNewPart(opNum) );// 01-323-09
		}
	}

	let o = new OP(wp, eff, com, wkstn, type, redMor, progSec, reqRole, partsArr)
	o.calcPoteSavings();
	return o;
}




function OP (wp, eff, com, wkstn, type, redMor, progSec, reqRole, partsArr) {
	this.wp = wp;
	this.eff = eff;
	this.commLogPote = Math.max(0,com);
	this.workstation = wkstn;
	this.typeOfOP = type;
	this.reduceMorale = redMor;
	this.progressSection = progSec;
	this.requiredRole = reqRole;
	this.potentialSavings = 0;
	this.partsArr = partsArr;

	this.calcPoteSavings = function () {
		this.potentialSavings = this.wp * (100 - this.eff)/100;
	}


	this.print = function() {
		let ptA = [];
		for (let i = 0; i < this.partsArr.length; i++) {
			ptA.push("");
			ptA.push(this.partsArr[i].print());
		}

		let arr = [
			"WP", this.wp,
			"EFF", this.eff,
			"CL Pote", this.commLogPote,
			"WKSTN", this.workstation,
			"Type", this.typeOfOP,
			"Reduce Morale", this.reduceMorale,
			"Section", this.progressSection,
			"Requied Role", this.requiredRole,
			"Pote Savings", this.potentialSavings,

			"Parts", this.partsArr.length +"\n" + displayTable(ptA)

		];
		return displayTable(arr);
	}
}


