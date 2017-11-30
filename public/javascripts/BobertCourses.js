window.onload = init;


function init(){
	var button = document.getElementById("reg_button");
	button.onclick = createRegister;
	
	var BobertregistersArray = getRegistersArray();
	
	for(var i = 0; i < registersArray.length; i++){
		var key = registersArray[i];
		var value = localStorage[key];
		addRegisterToDOM(key,value);
	}
	
}

function getRegistersArray(){
	
	var BobertregistersArray = localStorage.getItem("BobertregistersArray");
	if(!BobertregistersArray){
		
		BobertregistersArray = [];
		localStorage.setItem("BobertregistersArray", JSON.stringify(BobertregistersArray));
		
	} else {
		BobertregistersArray = JSON.parse(BobertregistersArray);
	}
	
	return BobertregistersArray;
}

function createRegister(){
	
	var BobertregistersArray = getRegistersArray();
	var currentDate = new Date();
	var key = "register_" + currentDate.getTime();
	
	var value = document.getElementById("courseNum").value;
	localStorage.setItem(key, value);
	
	BobertregistersArray.push(key);
	localStorage.setItem("BobertregistersArray", JSON.stringify(BobertregistersArray));
	
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
	var BobertregistersArray = getRegistersArray();
	if(BobertregistersArray){
		for(var i = 0; i < BobertregistersArray.length; i++){
			if(key == BobertregistersArray[i]){
				BobertregistersArray.splice(i,1);
			}
		}
		
		localStorage.setItem("BobertregistersArray", JSON.stringify(BobertregistersArray));
		removeRegisterFromDOM(key);
			
	}
}

function removeRegisterFromDOM(key){
	var Bobertregister = document.getElementById(key);
	Bobertregister.parentNode.removeChild(Bobertregister);
}