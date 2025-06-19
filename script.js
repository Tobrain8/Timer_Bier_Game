const goal = "10.80";
const maxTries = 3;
const timeout = 20;

let interval;
let timeRuns = false;
const decimalsToShow = getDecimals(goal);
const nameOfTriesInLocalStorage = "currentTries";

const span = document.getElementById("span");
const div = document.getElementById("main");

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
	setTries(maxTries);
	}

	if(parseInt(localStorage.getItem("timeOfNextTries")) > Date.now())
	return notify("Du musst noch " + ((localStorage.getItem("timeOfNextTries")-Date.now())/60/1000).toFixed(0)  + " Minuten warten")

	if(getTries() >= maxTries){
	localStorage.setItem("timeOfNextTries", Date.now()+timeout*60*1000);
	setTries(0);
	return notify("In " + timeout + " Minuten kannst du es wieder versuchen")
	}

	if(!timeRuns){
	div.style.backgroundColor = "white"
	timeRuns = true;
	document.getElementById("tries").innerHTML = getTries() + 1 + "/" + maxTries;
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
	setTries(getTries() + 1)
	if(span.innerHTML == goal){
		div.style.backgroundColor = "lightgreen";
		notify("Hol dir dein Freibier ab!!!")
		div.onclick = ()=>{startTimer(true)}
	}
	}
}

function getTries() {
	let tries = localStorage.getItem(nameOfTriesInLocalStorage);
	return tries ? parseInt(JSON.parse(tries)) : maxTries;
}

function setTries(num) {
	localStorage.setItem(nameOfTriesInLocalStorage, JSON.stringify(num))
}

window.onload = () => {
	if(!localStorage.getItem(nameOfTriesInLocalStorage))
		localStorage.setItem(nameOfTriesInLocalStorage, JSON.stringify(0))
	let time = 0;
	document.getElementById("span").innerHTML = time.toFixed(decimalsToShow);
	document.getElementById("tries").innerHTML = getTries() + 1 + "/" + maxTries;
	document.getElementById("notifications").innerHTML = goal + " Sekunden Challenge!";
	alert("Hinweis: Bitte beachte, dass Versuche im Inkognito- bzw. privaten Modus nicht gewertet werden.\n\nWir bitten dich außerdem, fair zu bleiben und das Spiel nicht auszutricksen oder absichtlich zu manipulieren. Sollte das wiederholt vorkommen, sehen wir uns leider gezwungen, das Spiel einzustellen und das wäre schade für alle :(\n\nVielen Dank für dein Verständnis und viel Spaß beim Spielen!")
}
