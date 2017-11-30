window.onload = init;


function init(){
	var button = document.getElementById("reg_button");
	button.onclick = createRegister;
	
	var BregistersArray = getRegistersArray();
	
	for(var i = 0; i < registersArray.length; i++){
		var key = registersArray[i];
		var value = localStorage[key];
		addRegisterToDOM(key,value);
	}
	
}

function getRegistersArray(){
	
	var BregistersArray = localStorage.getItem("BregistersArray");
	if(!BregistersArray){
		
		BregistersArray = [];
		localStorage.setItem("BregistersArray", JSON.stringify(BregistersArray));
		
	} else {
		BregistersArray = JSON.parse(BregistersArray);
	}
	
	return BregistersArray;
}

function createRegister(){
	
	var BregistersArray = getRegistersArray();
	var currentDate = new Date();
	var key = "register_" + currentDate.getTime();
	
	var value = document.getElementById("courseNum").value;
	localStorage.setItem(key, value);
	
	BregistersArray.push(key);
	localStorage.setItem("BregistersArray", JSON.stringify(BregistersArray));
	
	addRegisterToDOM(key,value);
	
}

function addRegisterToDOM(key, value){
	var registers = document.getElementById("registers_list");
	var register = document.createElement("li");
	register.setAttribute("id", key);
	var span = document.createElement("span");
	span.setAttribute("class", "register");
	span.innerHTML = value;
	register.appendChild(span);
	registers.appendChild(register);
	register.onclick = deleteRegister;
}

function deleteRegister(e){
	
	var key = e.target.id;
	if(e.target.tagName.toLowerCase() == "span"){
		key = e.target.parentNode.id;
	}
	
	localStorage.removeItem(key);
	var BregistersArray = getRegistersArray();
	if(BregistersArray){
		for(var i = 0; i < BregistersArray.length; i++){
			if(key == BregistersArray[i]){
				BregistersArray.splice(i,1);
			}
		}
		
		localStorage.setItem("BregistersArray", JSON.stringify(BregistersArray));
		removeRegisterFromDOM(key);
			
	}
}

function removeRegisterFromDOM(key){
	var Bregister = document.getElementById(key);
	Bregister.parentNode.removeChild(Bregister);
}