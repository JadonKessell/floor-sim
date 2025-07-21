
function Tool() {
	this.ben =""+ Math.floor(Math.random() * 10) +""+ Math.floor(Math.random() * 10) +""+ Math.floor(Math.random() * 10) +""+ Math.floor(Math.random() * 10) +""+ Math.floor(Math.random() * 10) +""+ Math.floor(Math.random() * 10) +""+ Math.floor(Math.random() * 10) +""+ Math.floor(Math.random() * 10) 
	this.perc = 0;
	this.shortages = Math.floor(Math.random() * 30);
	this.passedILQnum = 0;
	this.inTest = false;
	this.isComplete = false;
	this.startingShift = company.shift;
	this.print = function() {
		let c = "A";
		if (this.inTest) c = "T";
		let testColor = "#d71";
		let col = "#1c1";
		if (this.inTest) col = testColor;
		
		let s = ""+
		this.ben+"\nPercent: " + c + Math.floor(this.perc) +


		"\n" + drawSpansAndDrawBar(this.perc, 100, 150, "|", col, "#000") +

		"\nShortages: "+this.shortages+
		"\nPassed ILQ: "+this.passedILQnum+
		"\n\nStarting Shift: " +this.startingShift+"";
		
		return s;
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
}
