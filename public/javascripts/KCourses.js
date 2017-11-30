window.onload = init;


function init(){
	var button = document.getElementById("reg_button");
	button.onclick = createRegister;
	
	var KregistersArray = getRegistersArray();
	
	for(var i = 0; i < registersArray.length; i++){
		var key = registersArray[i];
		var value = localStorage[key];
		addRegisterToDOM(key,value);
	}
	
}

function getRegistersArray(){
	
	var KregistersArray = localStorage.getItem("KregistersArray");
	if(!KregistersArray){
		
		KregistersArray = [];
		localStorage.setItem("KregistersArray", JSON.stringify(KregistersArray));
		
	} else {
		KregistersArray = JSON.parse(KregistersArray);
	}
	
	return KregistersArray;
}

function createRegister(){
	
	var KregistersArray = getRegistersArray();
	var currentDate = new Date();
	var key = "register_" + currentDate.getTime();
	
	var value = document.getElementById("courseNum").value;
	localStorage.setItem(key, value);
	
	KregistersArray.push(key);
	localStorage.setItem("KregistersArray", JSON.stringify(KregistersArray));
	
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
	var KregistersArray = getRegistersArray();
	if(KregistersArray){
		for(var i = 0; i < KregistersArray.length; i++){
			if(key == KregistersArray[i]){
				KregistersArray.splice(i,1);
			}
		}
		
		localStorage.setItem("KregistersArray", JSON.stringify(KregistersArray));
		removeRegisterFromDOM(key);
			
	}
}

function removeRegisterFromDOM(key){
	var Kregister = document.getElementById(key);
	Kregister.parentNode.removeChild(Kregister);
}