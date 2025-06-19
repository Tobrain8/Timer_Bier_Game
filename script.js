let timeRuns = false;
let interval;

let goal = "20.25";
let decimalsToShow = getDecimals(goal);
let timeout = 0;

let span = document.getElementById("span");
let div = document.getElementById("main");
let tries = 0;
let maxTries = 3;


if(localStorage.getItem("time") == null){
	localStorage.setItem("time", Date.now())
}

function getDecimals(numString) {
	let i = numString.indexOf(".");
	if(i < 0) return 0;
	return numString.length - i - 1
}

function notify(note){
	let notification = document.getElementById("notifications");
	notification.innerHTML = note;
	setTimeout(()=>{
	document.getElementById("notifications").innerHTML = goal + " Sekunden Challenge!";
	}, 5000)
}


function startTimer(reset = false){
	if(reset){
	if(!confirm("Wirklich reseten??"))return
	div.onclick = ()=>{startTimer()}
	div.style.backgroundColor = "white"
	tries = 5;
	}


	if(parseInt(localStorage.getItem("time")) > Date.now())
	return notify("Du musst noch " + ((localStorage.getItem("time")-Date.now())/60/1000).toFixed(0)  + " Minuten warten")

	if(tries >= maxTries){
	localStorage.setItem("time", Date.now()+timeout*60*1000);
	tries = 0;
	return notify("In " + timeout + " Minuten kannst du es wieder versuchen")
	}

	if(!timeRuns){
	div.style.backgroundColor = "white"
	timeRuns = true;
	document.getElementById("tries").innerHTML = tries+1 + "/" + maxTries;
	let startTime = Date.now();
	let time;
	interval = setInterval(()=>{
		time = (Date.now() - startTime)/1000;
		document.getElementById("span").innerHTML = time.toFixed(decimalsToShow);
	}, 10);
	}
	else{
	clearInterval(interval);
	timeRuns = false;
	tries++
	if(span.innerHTML == goal){
		div.style.backgroundColor = "lightgreen";
		notify("Hol dir dein Freibier ab!!!")
		div.onclick = ()=>{startTimer(true)}
	}
	}
}

window.onload = () => {
	let time = 0;
	document.getElementById("span").innerHTML = time.toFixed(decimalsToShow);
	document.getElementById("tries").innerHTML = tries+1 + "/" + maxTries;
	document.getElementById("notifications").innerHTML = goal + " Sekunden Challenge!";
}