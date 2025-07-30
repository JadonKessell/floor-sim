
function btn_fireTech(index) {
	unassignTech(index);
	pop_i(Company.techs, index);
	for(let i = 0; i < Company.techs.length; i++) {
		Company.techs[i].setMorale(-1);
	}
	correctTechIndexNumbers(index);
	redraw();
}



function btn_assignTech(tech_i, bay_i) {
	assignTech(tech_i, bay_i);
	redraw();
}




function btn_giveTechRaise(index) {
	Company.techs[index].wage++;
	Company.techs[index].setMorale(5);
	
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






function buyNewBay() {
	Company.addToMoney(-1*COST_OF_NEW_BAY);
	Company.bays.push(new Bay());
	
	if(menu_sel_col_1_tab_num==2)
		drawNewGUI("newGUI");
	if(menu_sel_col_2_tab_num==2)
		drawNewGUI("techs");

	redraw();
}
