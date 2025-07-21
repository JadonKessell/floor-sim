


function Part (pn, frailty, availability, cost, weight, complexity) {
	this.pn = pn;
	this.frailty = frailty;
	this.availability = availability;
	this.weight = weight;
	this.complexity = complexity;
	this.cost = cost;

	this.print = function () {
		let arr = [
			"PN", this.pn,
			"Frailty", this.frailty,
			"Availability", this.availability,
			"Cost", this.cost
		];

		return displayTable(arr);
	}
}

function generateNewPart (opNum) {
	let pn = (opNum+1) + "-" + getRandIncl(0, 9) + getRandIncl(0, 9) + getRandIncl(0, 9) + "-";
//example 01-223-12
	if(opNum < 10)
		pn = "0" + pn;

	let frailty = getRandIncl(0, 5);
		if(chance(10))
			frailty += getRandIncl(0, 40);
		if(chance(5))
			frailty += getRandIncl(0, 40);

	let availability = getRandIncl(65, 90);
		if(chance(10))
			availability -= getRandIncl(0, 20);
		if(chance(5))
			availability -= getRandIncl(0, 40);

	let cost = getRandIncl(1, 50);
		if(chance(30))
			cost += getRandIncl(0, 100);
		if(chance(5))
			cost += getRandIncl(0, 1000);

		cost = Math.max(1, cost);
		cost *= 10;

	pn = pn + Math.floor(frailty/10) + Math.floor(availability/10);


	let weight = getRandIncl(0, 70);

	let complexity = getRandIncl(65, 90);


	return new Part(pn, frailty, availability, cost, weight, complexity);
}


