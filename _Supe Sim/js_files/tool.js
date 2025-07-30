


function defaultNewToolProduct (productID) {
	let dueDate = 40;
	let t = new ToolProduct(generateRandBen(), 0, [], 0, false, false,  Company.shift, Company.shift+dueDate, productID, "emtpy", 0, 0);
	t.init();
	return t;
}

function ToolProduct(ben, perc, shortages, findings, inTest, isComplete, startingShift, dueShift, productID, currentStatus, totalMaterialCost, netTotalCost) {
	
	this.perc = perc;
	this.totalWP = Company.products[productID].totalWP;
	this.opProgressArr = [];

	this.ben = ben;
	this.shortages = shortages;
	this.findings = findings;
	this.inTest = inTest;
	this.isComplete = isComplete;
	this.startingShift = startingShift;
	this.dueShift = dueShift;
	this.productID = productID;
	this.productIDName = Company.products[productID].name;
	this.currentStatus = currentStatus;
	this.totalMaterialCost = totalMaterialCost;
	this.netTotalCost = netTotalCost;

	this.workstationsTotalWP = [];


	this.init = function() {
		Object.assign(this.opProgressArr, Company.products[this.productID].opArr);
		for (let index = 0; index < Company.products[this.productID].numOfWorkstations; index++) {
			this.workstationsTotalWP.push(0);
		}

		for (let index = 0; index < this.opProgressArr.length; index++) {
			//adding perc value to each OP
			this.opProgressArr[index].perc = 0;
			//calc total for each workstation
			this.workstationsTotalWP[this.opProgressArr[index].workstation - 1] += this.opProgressArr[index].wp;
		}
console.log(this);
	}

	this.print = function() {
		let c = "A";
		if (this.inTest) c = "T";
		let testColor = "#d71";
		let col = "#1c1";
		if (this.inTest) col = testColor;
		let barRatio = this.totalWP/150
		
		let s = [
			"BEN", this.ben,
			"Product ID", this.productIDName,
			"Total WP", this.totalWP,
			"Percent", c + Math.floor(this.perc)
		]


		let ss = drawSpansAndDrawBar(this.perc, this.totalWP, 150, "|", col, "#000") + "\n";
		let sW = [];
		sW.push("WS");
		sW.push("WP");
		for (let index = 0; index < this.workstationsTotalWP.length; index++) {
			sW.push(index+1);
			sW.push(drawSpansAndDrawBar(this.opProgressArr[index].perc, this.workstationsTotalWP[index], this.workstationsTotalWP[index]/barRatio, "|", col, "#000") + " " + this.workstationsTotalWP[index]);
		}
		ss += displayTable(sW, 2)

		let sss = [
			"Shortages", this.shortages,
			"Total WP", this.totalWP,
			"Starting Shift", this.startingShift
		];
		


		return displayTable(s, 2) + ss + displayTable(sss, 2);
	}
	this.increasePerc = function(add) {
		
		this.perc = Math.min(this.perc + add,100);
		if (this.perc >= 100) {
			if(this.inTest) {
				if(this.shortages > 0) this.shortages--;
				else this.isComplete = true;
			}
			else {
				this.inTest = true;
				this.perc -= 100
			}
		} else if (this.perc < 0) {
			this.perc = 0;
		}

	}
	this.increasePercInOP = function(add) {
		
		this.perc = Math.min(this.perc + add,100);
		if (this.perc >= 100) {
			if(this.inTest) {
				if(this.shortages > 0) this.shortages--;
				else this.isComplete = true;
			}
			else {
				this.inTest = true;
				this.perc -= 100
			}
		} else if (this.perc < 0) {
			this.perc = 0;
		}

	}
}
