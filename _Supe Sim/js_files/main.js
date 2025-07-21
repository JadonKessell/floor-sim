
function init () {

	debug_console = document.getElementById("debug_console");

	
	company.products.push(generateNewProduct("easy"));
	company.products.push(generateNewProduct("easy"));
	company.products.push(generateNewProduct("med"));
	company.products.push(generateNewProduct("med"));
	company.products.push(generateNewProduct("hard"));


	company.tool_backlog.push(defaultNewToolProduct(0));
	company.tool_backlog.push(defaultNewToolProduct(0));
	company.bays.push(new Bay());
	company.bays.push(new Bay());
	hireTech(0);
	hireTech(0);
	hireTech(0);
	company.techs[2].role = 3;
	assignTech(0, 0);
	assignTech(1, 0);
	assignTech(2, 0);
	company.bays[0].assignToolToBay(0);
	company.bays[1].assignToolToBay(0);
	
	let f="<button onclick='newTest()'>newtest</button><button onclick='buyNewBay()'>Buy new bay for "+formatMoney(COST_OF_NEW_BAY)+"</button>\n<button onclick='btn_hireTech("+COST_OF_RAND_TECH+")'>Hire new random tech for "+formatMoney(COST_OF_RAND_TECH)+"</button>"

	document.getElementById("gui2").innerHTML = f;

	drawControlButtons(0);

	main_loop = setInterval(progressTime, 1000); //1000 is 1 sec



// 	console.log(createArrayFromCSV("roleTitle,roleBaseWage"+"\n"+
// "Assembler,12"+"\n"+
// "Test Tech,16"+"\n"+
// "Quality Tech,14"+"\n"+
// "Trainee,10"+"\n"+
// "PCFS,16"+"\n"+
// "Lead,16"+"\n"+
// "MFE,20"))
	
	console.log(createArrayFromCSV(document.getElementById("rA").text))
	console.log(document.getElementById("rA").innerHTML)





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


