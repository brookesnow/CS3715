window.onload = init;


function init(){
	var button = document.getElementById("add_button");
	button.onclick = createEvent;
	
	var eventsArray = getEventsArray();
	
	for(var i = 0; i < eventsArray.length; i++){
		var key = eventsArray[i];
		var value = localStorage[key];
		addEventToDOM(key,value);
	}
	
}

function getEventsArray(){
	
	var eventsArray = localStorage.getItem("eventsArray");
	if(!eventsArray){
		
		eventsArray = [];
		localStorage.setItem("eventsArray", JSON.stringify(eventsArray));
		
	} else {
		eventsArray = JSON.parse(eventsArray);
	}
	
	return eventsArray;
}

function createEvent(){
	
	var eventsArray = getEventsArray();
	var currentDate = new Date();
	var key = "event_" + currentDate.getTime();
	
	var value = document.getElementById("info_text").value;
	localStorage.setItem(key, value);
	
	eventsArray.push(key);
	localStorage.setItem("eventsArray", JSON.stringify(eventsArray));
	
	addEventToDOM(key,value);
	
}

function addEventToDOM(key, value){
	var events = document.getElementById("events_list");
	var event = document.createElement("li");
	event.setAttribute("id", key);
	var span = document.createElement("span");
	span.setAttribute("class", "event");
	span.innerHTML = value;
	event.appendChild(span);
	events.appendChild(event);
	event.onclick = deleteEvent;
}

function deleteEvent(e){
	
	var key = e.target.id;
	if(e.target.tagName.toLowerCase() == "span"){
		key = e.target.parentNode.id;
	}
	
	localStorage.removeItem(key);
	var eventsArray = getEventsArray();
	if(eventsArray){
		for(var i = 0; i < eventsArray.length; i++){
			if(key == eventsArray[i]){
				eventsArray.splice(i,1);
			}
		}
		
		localStorage.setItem("eventsArray", JSON.stringify(eventsArray));
		removeEventFromDOM(key);
			
	}
}

function removeEventFromDOM(key){
	var event = document.getElementById(key);
	event.parentNode.removeChild(event);
}