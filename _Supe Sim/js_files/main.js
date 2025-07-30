
function init () {

	debug_console = document.getElementById("debug_console");

	
	Company = new CompanyOBJ(STARTING_MONEY, 0, [], [], [], [], [], [], [], 1, 1, 0);

	Company.products.push(generateNewProduct("easy"));
	Company.products.push(generateNewProduct("easy"));
	Company.products.push(generateNewProduct("med"));
	Company.products.push(generateNewProduct("med"));
	Company.products.push(generateNewProduct("hard"));


	Company.tool_backlog.push(defaultNewToolProduct(0));
	Company.tool_backlog.push(defaultNewToolProduct(0));
	Company.bays.push(new Bay());
	Company.bays.push(new Bay());
	hireTech(0);
	hireTech(0);
	hireTech(0);
	Company.techs[2].role = 3;
	assignTech(0, 0);
	assignTech(1, 0);
	assignTech(2, 0);
	Company.bays[0].assignToolToBay(0);
	Company.bays[1].assignToolToBay(0);
	
	let f="<button onclick='newTest()'>newtest</button><button onclick='buyNewBay()'>Buy new bay for "+formatMoney(COST_OF_NEW_BAY)+"</button>\n<button onclick='btn_hireTech("+COST_OF_RAND_TECH+")'>Hire new random tech for "+formatMoney(COST_OF_RAND_TECH)+"</button>"

	document.getElementById("gui2").innerHTML = f;

	drawControlButtons(0);

	main_loop = setInterval(updateAll, 1000); //1000 is 1 sec







}









function redraw() {
	
	drawCompanyGUI(); //Stats like Money
	updateCalendar();
	
	if(menu_sel_col_1_tab_num==0)
	drawTechPanel("newGUI");
	else if(menu_sel_col_1_tab_num==1)
	drawProductPanel("newGUI");
	else if(menu_sel_col_1_tab_num==2)
	updateBayGUI("newGUI");
	
	if(menu_sel_col_2_tab_num==0)
	drawTechPanel("techs");
	else if(menu_sel_col_2_tab_num==1)
	drawProductPanel("techs");
	else if(menu_sel_col_2_tab_num==2)
	updateBayGUI("techs");

}



function updateAll() {
	Company.update();
	redraw()
}
