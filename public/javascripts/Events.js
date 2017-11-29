window.onload = init;



function init(){
	var button = document.getElementById("add_button");
	var button2 = document.getElementById("campus_button");
	var button3 = document.getElementById("tech_button");
	var button4 = document.getElementById("art_button");
	button.onclick = createEvent;
	button2.onclick = createCampus;
	button3.onclick = createTech;
	button4.onclick = createArt;
	
	var eventsArray = getEventsArray();
	var campusArray = getCampusArray();
	var techArray = getTechArray();
	var artArray = getArtArray();
	
	
	for(var i = 0; i < eventsArray.length; i++){
		var key = eventsArray[i];
		var value = localStorage[key];
		addEventToDOM(key,value);
	}
	
	for(var x = 0; x < campusArray.length; x++){
		var key1 = campusArray[x];
		var value1 = localStorage[key1];
		addCampusToDOM(key1,value1);
	}
	
	for(var y = 0; y < techArray.length; y++){
		var key2 = techArray[y];
		var value2 = localStorage[key2];
		addTechToDOM(key2,value2);
	}
	
	for(var w = 0; w < artArray.length; w++){
		var key3 = artArray[w];
		var value3 = localStorage[key3];
		addArtToDOM(key3,value3);
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

function getCampusArray(){
	
	var campusArray = localStorage.getItem("campusArray");
	if(!campusArray){
		
		campusArray = [];
		localStorage.setItem("campusArray", JSON.stringify(campusArray));
		
	} else {
		campusArray = JSON.parse(campusArray);
	}
	
	return campusArray;
}

function getTechArray(){
	
	var techArray = localStorage.getItem("techArray");
	if(!techArray){
		
		techArray = [];
		localStorage.setItem("techArray", JSON.stringify(techArray));
		
	} else {
		techArray = JSON.parse(techArray);
	}
	
	return techArray;
}


function getArtArray(){
	
	var artArray = localStorage.getItem("artArray");
	if(!artArray){
		
		artArray = [];
		localStorage.setItem("artArray", JSON.stringify(artArray));
		
	} else {
		artArray = JSON.parse(artArray);
	}
	
	return artArray;
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

function createCampus(){
	
	var campusArray = getCampusArray();
	var currentDate1 = new Date();
	var key1 = "campus_" + currentDate1.getTime();
	
	var value1 = document.getElementById("campus_text").value;
	localStorage.setItem(key1, value1);
	
	campusArray.push(key1);
	localStorage.setItem("campusArray", JSON.stringify(campusArray));
	
	addCampusToDOM(key1,value1);
	
}


function createTech(){
	
	var techArray = getTechArray();
	var currentDate2 = new Date();
	var key2 = "tech_" + currentDate2.getTime();
	
	var value2 = document.getElementById("tech_text").value;
	localStorage.setItem(key2, value2);
	
	techArray.push(key2);
	localStorage.setItem("techArray", JSON.stringify(techArray));
	
	addTechToDOM(key2,value2);
	
}

function createArt(){
	
	var artArray = getArtArray();
	var currentDate3 = new Date();
	var key3 = "art_" + currentDate3.getTime();
	
	var value3 = document.getElementById("art_text").value;
	localStorage.setItem(key3, value3);
	
	artArray.push(key3);
	localStorage.setItem("artArray", JSON.stringify(artArray));
	
	addArtToDOM(key3,value3);
	
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


function addCampusToDOM(key1, value1){
	var campuses = document.getElementById("campus_list");
	var campus = document.createElement("p");
	campus.setAttribute("id", key1);
	var span1 = document.createElement("span1");
	span1.setAttribute("class1", "campus");
	span1.innerHTML = value1;
	campus.appendChild(span1);
	campuses.appendChild(campus);
	campus.onclick = deleteCampus;
}



function addTechToDOM(key2, value2){
	var techs = document.getElementById("tech_list");
	var tech = document.createElement("p");
	tech.setAttribute("id", key2);
	var span2 = document.createElement("span2");
	span2.setAttribute("class2", "tech");
	span2.innerHTML = value2;
	tech.appendChild(span2);
	techs.appendChild(tech);
	tech.onclick = deleteTech;
}


function addArtToDOM(key3, value3){
	var arts = document.getElementById("art_list");
	var art = document.createElement("p");
	art.setAttribute("id", key3);
	var span3 = document.createElement("span3");
	span3.setAttribute("class3", "art");
	span3.innerHTML = value3;
	art.appendChild(span3);
	arts.appendChild(art);
	art.onclick = deleteArt;
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

function deleteCampus(e){
	
	var key1 = e.target.id;
	if(e.target.tagName.toLowerCase() == "span1"){
		key1 = e.target.parentNode.id;
	}
	
	localStorage.removeItem(key1);
	var campusArray = getCampusArray();
	if(campusArray){
		for(var i = 0; i < campusArray.length; i++){
			if(key1 == campusArray[i]){
				campusArray.splice(i,1);
			}
		}
		
		localStorage.setItem("campusArray", JSON.stringify(campusArray));
		removeCampusFromDOM(key1);
			
	}
}



function deleteTech(e){
	
	var key2 = e.target.id;
	if(e.target.tagName.toLowerCase() == "span2"){
		key2 = e.target.parentNode.id;
	}
	
	localStorage.removeItem(key2);
	var techArray = getTechArray();
	if(techArray){
		for(var i = 0; i < techArray.length; i++){
			if(key2 == techArray[i]){
				techArray.splice(i,1);
			}
		}
		
		localStorage.setItem("techArray", JSON.stringify(techArray));
		removeTechFromDOM(key2);
			
	}
}


function deleteArt(e){
	
	var key3 = e.target.id;
	if(e.target.tagName.toLowerCase() == "span3"){
		key3 = e.target.parentNode.id;
	}
	
	localStorage.removeItem(key3);
	var artArray = getArtArray();
	if(artArray){
		for(var i = 0; i < artArray.length; i++){
			if(key3 == artArray[i]){
				artArray.splice(i,1);
			}
		}
		
		localStorage.setItem("artArray", JSON.stringify(artArray));
		removeArtFromDOM(key3);
			
	}
}


function removeEventFromDOM(key){
	var event = document.getElementById(key);
	event.parentNode.removeChild(event);
}

function removeCampusFromDOM(key1){
	var campus = document.getElementById(key1);
	campus.parentNode.removeChild(campus);
}

function removeTechFromDOM(key2){
	var tech = document.getElementById(key2);
	tech.parentNode.removeChild(tech);
}

function removeArtFromDOM(key3){
	var art = document.getElementById(key3);
	art.parentNode.removeChild(art);
}
