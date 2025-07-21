
function btn_fireTech(index) {
	unassignTech(index);
	pop_i(company.techs, index);
	for(let i = 0; i < company.techs.length; i++) {
		company.techs[i].setMorale(-1);
	}
	correctTechIndexNumbers(index);
	redraw();
}



function btn_assignTech(tech_i, bay_i) {
	assignTech(tech_i, bay_i);
	redraw();
}




function btn_giveTechRaise(index) {
	company.techs[index].wage++;
	company.techs[index].setMorale(5);
	
	redraw();

}


function btn_changeSelTech(num) {
	userSel = num;
	drawControlButtons(num);
	
}




function btn_hireTech(cost) {
	hireTech(cost);
	redraw();
}