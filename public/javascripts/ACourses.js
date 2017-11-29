window.onload = init;


function init(){
	var title = document.getElementsByTagName("title")[0].innerHTML;
	if(title  == "Arts Campus Previous Course Catalog"){
		var deletedArray = getDeletedArray();
		for(var i = 0; i <= deletedArray.length; i++){
		addToPrevious(deletedArray[i]);
		}
	}
	if(title == "Arts Campus Course Catalog"){
	
	var submitButton = document.getElementById("submitButton");
	submitButton.onclick = createCourseName;
	var x = 0;
	var y = 0;
	var courseNameArray = getCourseNameArray();
	var courseNumArray = getCourseNumArray();
	var roomArray = getRoomArray();
	var deletedArray = getDeletedArray();
	
	for(var i = 0; i < courseNameArray.length; i++){
		var key = courseNameArray[i];
		var value = localStorage[key];
		addCourseNameToDOM(key,value);
		for(x; x <= i; x++){
			var key1 = courseNumArray[x];
			var value1 = localStorage[key1];
			addCourseNumToDOM(key1,value1);
		}
		for(y; y <= i ; y++){
			var key2 = roomArray[y];
			var value2 = localStorage[key2];
			addRoomToDOM(key2,value2);
		}
	}
}


function getCourseNameArray(){
	
	var courseNameArray = localStorage.getItem("courseNameArray");
	if(!courseNameArray){
		
		courseNameArray = [];
		localStorage.setItem("courseNameArray", JSON.stringify(courseNameArray));
		
	} else {
		courseNameArray = JSON.parse(courseNameArray);
	}
	
	return courseNameArray;
}

function getCourseNumArray(){
	
	var courseNumArray = localStorage.getItem("courseNumArray");
	if(!courseNumArray){
		
		courseNumArray = [];
		localStorage.setItem("courseNumArray", JSON.stringify(courseNumArray));
		
	} else {
		courseNumArray = JSON.parse(courseNumArray);
	}
	
	return courseNumArray;
}

function getRoomArray(){
	
	var roomArray = localStorage.getItem("roomArray");
	if(!roomArray){
		
		roomArray = [];
		localStorage.setItem("roomArray", JSON.stringify(roomArray));
		
	} else {
		roomArray = JSON.parse(roomArray);
	}
	
	return roomArray;
}

function getDeletedArray(){
	var deletedArray = localStorage.getItem("deletedArray");
	if(!deletedArray){
		
		deletedArray = [];
		localStorage.setItem("deletedArray", JSON.stringify(deletedArray));
		
	} else {
		deletedArray = JSON.parse(deletedArray);
	}
	
	return deletedArray;
		}


function createCourseName(){
	var courseNameArray = getCourseNameArray();
	var courseNumArray = getCourseNumArray();
	var roomArray = getRoomArray();
	var currentDate = new Date();
	var currentDate2 = new Date();
	var currentDate3 = new Date();
	var key = "courseName_" + currentDate.getTime();
	var key1 = "courseNum_" + currentDate2.getTime();
	var key2 = "room_" + currentDate3.getTime();
	
	var value = document.getElementById("courseName").value;
	var value1 = document.getElementById("courseNum").value;
	var value2 = document.getElementById("room").value;
	localStorage.setItem(key, value);
	localStorage.setItem(key1,value1);
	localStorage.setItem(key2, value2);
	
	courseNameArray.push(key);
	courseNumArray.push(key1);
	roomArray.push(key2);
	localStorage.setItem("courseNameArray", JSON.stringify(courseNameArray));
	localStorage.setItem("courseNumArray", JSON.stringify(courseNumArray));
	localStorage.setItem("roomArray", JSON.stringify(roomArray));
	
	addCourseNameToDOM(key,value);
	addCourseNumToDOM(key1,value1);
	addRoomToDOM(key2,value2);
}

function addCourseNameToDOM(key, value){
	var table = document.getElementById("courseTable");
	var coursename = document.createElement("TD");
	var row = document.createElement("TR");
	coursename.setAttribute("id", key);
	var span = document.createElement("span");
	span.innerHTML = value;
	coursename.innerHTML = value;
	table.appendChild(row);
	table.appendChild(coursename);
	coursename.onclick = deleteCourseName;
}

function addCourseNumToDOM(key1, value1){
	var table = document.getElementById("courseTable");
	var coursenum = document.createElement("TD");
	coursenum.setAttribute("id", key1);
	var span1 = document.createElement("span1");
	span1.innerHTML = value1;
	coursenum.innerHTML = value1;
	table.appendChild(coursenum);
}

function addRoomToDOM(key2, value2){
	var table = document.getElementById("courseTable");
	var room = document.createElement("TD");
	room.setAttribute("id", key2);
	var span2 = document.createElement("span2");
	span2.innerHTML = value2;
	room.innerHTML = value2;
	table.appendChild(room);
}

		
function deleteCourseName(e){
	var currentDate = new Date();
	var deletedArray = getDeletedArray();
	var key = e.target.id;
	var value1 ="Course: " + e.target.textContent + " Time Deleted: " + currentDate;
	if(e.target.tagName.toLowerCase() == "span"){
		key = e.target.parentNode.id;
	}
	
	deletedArray.push(value1);
	localStorage.setItem("deletedArray", JSON.stringify(deletedArray));
	localStorage.removeItem(key);
	var courseNameArray = getCourseNameArray();
	var courseNumArray = getCourseNumArray();
	var roomArray = getRoomArray();
	if(courseNameArray){
		for(var i = 0; i < courseNameArray.length; i++){
			if(key == courseNameArray[i]){
				courseNameArray.splice(i,1);
				localStorage.removeItem(courseNumArray[i]);
				localStorage.removeItem(roomArray[i]);
				courseNumArray.splice(i, 1);
				roomArray.splice(i,1);
				
			}
		}
		
		localStorage.setItem("courseNameArray", JSON.stringify(courseNameArray));
		localStorage.setItem("courseNumArray", JSON.stringify(courseNumArray));
		localStorage.setItem("roomArray", JSON.stringify(roomArray));
		removeCourseNameFromDOM(key);
		deletedArray.splice(0,1);
		addToPrevious(value1);
			
	}
}
	
	function removeCourseNameFromDOM(key){
		var coursename = document.getElementById(key);
		coursename.parentNode.removeChild(coursename);
		location.reload(true);
	}
	
	function addToPrevious(a){
		
		var list = document.getElementById("artsPre");
		var item = document.createElement("li");
		item.setAttribute("id", a);
		var span2 = document.createElement("span2");
		span2.innerHTML = a.value;
		item.innerHTML = a;
		list.appendChild(item);
	}
}

