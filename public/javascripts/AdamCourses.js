window.onload = init;


function init(){
	var button = document.getElementById("reg_button");
	button.onclick = createRegister;
	
	var AdamregistersArray = getRegistersArray();
	
	for(var i = 0; i < registersArray.length; i++){
		var key = registersArray[i];
		var value = localStorage[key];
		addRegisterToDOM(key,value);
	}
	
}

function getRegistersArray(){
	
	var AdamregistersArray = localStorage.getItem("AdamregistersArray");
	if(!AdamregistersArray){
		
		AdamregistersArray = [];
		localStorage.setItem("AdamregistersArray", JSON.stringify(AdamregistersArray));
		
	} else {
		AdamregistersArray = JSON.parse(AdamregistersArray);
	}
	
	return AdamregistersArray;
}

function createRegister(){
	
	var AdamregistersArray = getRegistersArray();
	var currentDate = new Date();
	var key = "register_" + currentDate.getTime();
	
	var value = document.getElementById("courseNum").value;
	localStorage.setItem(key, value);
	
	AdamregistersArray.push(key);
	localStorage.setItem("AdamregistersArray", JSON.stringify(AdamregistersArray));
	
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
	var AdamregistersArray = getRegistersArray();
	if(AdamregistersArray){
		for(var i = 0; i < AdamregistersArray.length; i++){
			if(key == AdamregistersArray[i]){
				AdamregistersArray.splice(i,1);
			}
		}
		
		localStorage.setItem("AdamregistersArray", JSON.stringify(AdamregistersArray));
		removeRegisterFromDOM(key);
			
	}
}

function removeRegisterFromDOM(key){
	var Adamregister = document.getElementById(key);
	Adamregister.parentNode.removeChild(Adamregister);
}