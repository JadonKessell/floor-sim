
function generateNewProduct(diff) {
	
	let opArr = [];

	let amountAssem = 0;
	let amountTest = 0;
	let amountQT = 0;
	let index = 0;
//wp, eff, com, wkstn, type, redMor, progSec, reqRole
	let wpRange = [30, 50, 90];
	let effRange = [70, 50, 30];
	let comRange = [5, 13, 20];
	let progSec = 1;
	let BOMpartsRange = [7, 14, 20];
	let BOMpartsAmount = 0;

	let rangePSA_FSA = [50, 90, 120];

	if(diff == "easy") {
		amountAssem = 6 + randVari(2);
		amountTest = 6 + randVari(2);
		amountQT = 3;
		BOMpartsAmount = BOMpartsRange[index] + getRandIncl(-2, 3);
	}
	else if(diff == "med") {
		amountAssem = 10 + randVari(4);
		amountTest = 8 + randVari(4);
		amountQT = 4 + randVari(1);
		index = 1;
		BOMpartsAmount = BOMpartsRange[index] + getRandIncl(-3, 4);
	}
	else if(diff == "hard") {
		amountAssem = 16 + randVari(6);
		amountTest = 10 + randVari(2);
		amountQT = 5 + getRandIncl(-1, 3);
		index = 2;
		BOMpartsAmount = BOMpartsRange[index] + getRandIncl(-5, 8);
	}


	//Manage dist. of parts
	let partsDist = [];
	let partsNumLeft = BOMpartsAmount;

	for (let pDi = 0; pDi < amountAssem; pDi++) {
		let equalDistPlusRand = (BOMpartsAmount / amountAssem) + getRandIncl(-1, 2); 
		partsDist[pDi] = equalDistPlusRand;
		partsNumLeft -= equalDistPlusRand;
	}
	partsDist[0] += partsNumLeft;

	//Create Assembly and ILQ operations:
	let ilqTime = Math.floor(amountAssem / amountQT);
	let wrk = 0;

	for (var i = 0; i < amountAssem; i++) {
		wrk++;
		if(wrk > 3) wrk = 1;
		opArr.push(generateNewOP(diff, wpRange[index], effRange[index], comRange[index], wrk, "assembly", 0, progSec, -1, partsDist[i], i));

		if(i > 0 && i % ilqTime == 0) {
			progSec += 1;
			opArr.push(generateNewOP(diff, wpRange[index], effRange[index], comRange[index], 6, "quality", 0, progSec, 2));
		}
	}
	wrk = 1;
	progSec += 1;

	//Create Test and FSA/PSA/Preship operations:
	wrk = 3;
	for (var i = 0; i < amountTest; i++) {
		wrk++;
		if(wrk > 5) wrk = 4;
		opArr.push(generateNewOP(diff, wpRange[index], effRange[index], comRange[index], wrk, "test", 0, progSec, 1));

		if(i+1 >= amountTest) {
			progSec += 1;
			opArr.push(generateNewOP(diff, rangePSA_FSA[index], Math.min(99, Math.max(78, effRange[index] + randVari(20))), comRange[index], 6, "quality", 0, progSec, 2));
		}
	}

	//Calc total work unit points
	//Calc total cost of tool
	let totalWUP = 0;
	let totalMaterialCost = 0;
	for (var i = 0; i < opArr.length; i++) {
		totalWUP += opArr[i].wp;
		for (var ii = 0; ii < opArr[i].partsArr.length; ii++) {
			totalMaterialCost += opArr[i].partsArr[ii].cost;
		}
	}
	let netTotalCost = totalMaterialCost + (totalWUP/8)*200; //Assuming 8 WP an hour
	netTotalCost *= 1.2; //profit 20%

	//generate 2 letter code
	let codename = "";

	codename = codename + String.fromCharCode( getRandIncl(65, 90) );
	codename = codename + String.fromCharCode( getRandIncl(65, 90) );
	codename = codename + "-" + String.fromCharCode( getRandIncl(65, 90) );
	codename = codename + String.fromCharCode( getRandIncl(65, 90) );

	//pick shape
	let shapes = "";
	let shape = shapes.charAt( getRandIncl(0, shapes.length-1) );

	//BOM
	let BOM = [];
	for (let i = 0; i < opArr.length; i++) {
		for (let ii = 0; ii < opArr[i].partsArr.length; ii++) {
			BOM.push(opArr[i].partsArr[ii].pn);
		}
		
	}

	return new Product(codename, shape, diff, opArr, progSec, 6, totalWUP, BOM, totalMaterialCost, netTotalCost);

}


























function Product (name, shape, diff, OP, numOfSections, numOfWorkstations, totalWP, bom, totalMaterialCost, netTotalCost) {
	this.name = name;
	this.difficultyLevel = diff;
	this.shape = shape;
	this.opArr = OP;
	this.numOfSections = numOfSections;
	this.numOfWorkstations = numOfWorkstations;
	this.totalWP = totalWP;
	this.bom = bom;
	this.totalMaterialCost = totalMaterialCost;
	this.netTotalCost = netTotalCost;

	this.print = function () {
		let opA = [];
		for (let i = 0; i < this.opArr.length; i++) {
			opA.push("");
			opA.push(this.opArr[i].print());
		}

		let r = "<table>";
		let arr = [
			"Name", this.name + this.shape,
			"Difficulty", this.difficultyLevel,
			"Sections Count", this.numOfSections,
			"Total WP", this.totalWP,
			"BOM", this.bom.length,
			
			"Total Material Cost", this.totalMaterialCost,
			"Net total Cost", this.netTotalCost,

			"OP array", this.opArr.length +"\n" + displayTable(opA)
		];

		
		return displayTable(arr);
	}
}

