
function Bay() {
	this.assignedTool = null; //Tool object
	this.assignedTechs = []; //number array

	this.assignTechToBay = function(tech_i) {

		if(this.assignedTechs.length < maxTechsInBay) {
			this.assignedTechs.push(tech_i);
			return true;
		}
		else {
			addAct("!Can't assign another Tech on this tool!");
			return false;
		}
	}
	this.assignToolToBay = function(tool_i){
		this.assignedTool = company.tool_backlog[tool_i];
		pop_i(company.tool_backlog,tool_i);
	}
	this.completeTool = function() {
		completeTool(this.assignedTool.ben, this.assignedTool.startingShift)
		this.assignedTool = null;
	}
	this.print = function() {
		let s = "";
		let t = "null";
		if(this.assignedTool) t = this.assignedTool.perc;

		s=s+"Tool: " + t + "; Techs: ";
		for (let i = 0; i < this.assignedTechs.length; i++) {
			s=s+this.assignedTechs[i]+" ";
		}
		return s;
	}
}




function doWorkEachBay() {
	let total_prog = 0;

	for(let bay_i = 0; bay_i < company.bays.length; bay_i++) {
		let tool = company.bays[bay_i].assignedTool;
		if(tool) {
			if(tool.inTest) {
				//TEST
				total_prog += doTechWork(1,bay_i,company.bays[bay_i].assignedTechs);
			} else if(tool.passedILQnum < 1 && tool.perc > 40 || tool.passedILQnum < 2 && tool.perc > 80) {
				//ILQ
					total_prog += doTechWork(2,bay_i,company.bays[bay_i].assignedTechs);
					if(tool.passedILQnum < 1 && tool.perc > 50) {
						tool.passedILQnum++;
					} else if(tool.passedILQnum < 2 && tool.perc > 90) {
						tool.passedILQnum++;
					}
			} else {
				//assembly
				total_prog += doTechWork(-1,bay_i,company.bays[bay_i].assignedTechs);
			}

			
		} else
			if(chance(10)) {
				company.bays[bay_i].assignedTool = new Tool();
			}

	}


}