/**
 * http://usejsdoc.org/
 */
var grab = {



init: function(){
	var button = document.getElementById("reg_button");
	button.onclick = createRegister;
	
	var registersArray = getRegistersArray();
	
	for(var i = 0; i < registersArray.length; i++){
		var key = registersArray[i];
		var value = localStorage[key];
		addRegisterToDOM(key,value);
	}
	
},

getRegistersArray: function(){
	
	var registersArray = localStorage.getItem("registersArray");
	if(!registersArray){
		
		registersArray = [];
		localStorage.setItem("registersArray", JSON.stringify(registersArray));
		
		
	} else {
		registersArray = JSON.parse(registersArray);
	}
	
	return registersArray;
},

createRegister: function(){
	
	var registersArray = getRegistersArray();
	var currentDate = new Date();
	var key = "register_" + currentDate.getTime();
	
	var value = document.getElementById("courseNum").value;
	var valueJSON = {"value " : value};
	localStorage.setItem(key, value);
	
	registersArray.push(key);
	localStorage.setItem("registersArray", JSON.stringify(registersArray));
	
	addRegisterToDOM(key,value);
	
},

addRegisterToDOM: function(key,value){
	var registers = document.getElementById("registers_list");
	var register = document.createElement("li");
	register.setAttribute("id", key);
	var span = document.createElement("span");
	span.setAttribute("class", "register");
	span.innerHTML = value;
	register.appendChild(span);
	registers.appendChild(register);
	register.onclick = deleteRegister;
},

deleteRegister: function(e){
	
	var key = e.target.id;
	if(e.target.tagName.toLowerCase() == "span"){
		key = e.target.parentNode.id;
	}
	
	localStorage.removeItem(key);
	var registersArray = getRegistersArray();
	if(registersArray){
		for(var i = 0; i < registersArray.length; i++){
			if(key == registersArray[i]){
				registersArray.splice(i,1);
			}
		}
		
		localStorage.setItem("registersArray", JSON.stringify(registersArray));
		removeRegisterFromDOM(key);
			
	}
},

removeRegisterFromDOM: function(key){
	var register = document.getElementById(key);
	register.parentNode.removeChild(register);
},

printout: function(){
	console.log("working");
},




};
module.exports = grab;

