window.onload = init;


function init(){
	var button = document.getElementById("reg_button");
	button.onclick = createRegister;
	
	var MikeregistersArray = getRegistersArray();
	
	for(var i = 0; i < registersArray.length; i++){
		var key = registersArray[i];
		var value = localStorage[key];
		addRegisterToDOM(key,value);
	}
	
}

function getRegistersArray(){
	
	var MikeregistersArray = localStorage.getItem("MikeregistersArray");
	if(!MikeregistersArray){
		
		MikeregistersArray = [];
		localStorage.setItem("MikeregistersArray", JSON.stringify(MikeregistersArray));
		
	} else {
		MikeregistersArray = JSON.parse(MikeregistersArray);
	}
	
	return MikeregistersArray;
}

function createRegister(){
	
	var MikeregistersArray = getRegistersArray();
	var currentDate = new Date();
	var key = "register_" + currentDate.getTime();
	
	var value = document.getElementById("courseNum").value;
	localStorage.setItem(key, value);
	
	MikeregistersArray.push(key);
	localStorage.setItem("MikeregistersArray", JSON.stringify(MikeregistersArray));
	
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
	var MikeregistersArray = getRegistersArray();
	if(MikeregistersArray){
		for(var i = 0; i < MikeregistersArray.length; i++){
			if(key == MikeregistersArray[i]){
				MikeregistersArray.splice(i,1);
			}
		}
		
		localStorage.setItem("MikeregistersArray", JSON.stringify(MikeregistersArray));
		removeRegisterFromDOM(key);
			
	}
}

function removeRegisterFromDOM(key){
	var Mikeregister = document.getElementById(key);
	Mikeregister.parentNode.removeChild(Mikeregister);
}