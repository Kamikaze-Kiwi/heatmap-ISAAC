// get time NOW and convert to seconds
let d = new Date(); // for now
datetext = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();


let hms = datetext;   // your input string
let a = hms.split(':'); // split it at the colons

// minutes are worth 60 seconds. Hours are worth 60 minutes.
let seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);

document.getElementById('SelectValue').innerHTML = convertHMS(seconds);

//get the current slider value
let SelectValue = document.getElementById("SelectValue");

//update the slider value
SelectValue.innerHTML = slider.value;

//set the date and limit to today
let todayDate = new Date().toISOString().slice(0, 10);
document.getElementById('dateNow').value = todayDate;
document.getElementById('dateNow').max = todayDate;

//check to make sure you can't go into the future
function maxDate() {
    if (document.getElementById('dateNow').value > todayDate) {
        document.getElementById('dateNow').value = todayDate;
    }
}

//HMS conveerter
function convertHMS(value) {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
    let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds

    //rounded down by 30 seconds, data update speed
    if (seconds < 30) {
        seconds = 0;
    }
    else {
        seconds = 30;
    }

    // add 0 if value < 10; Example: 2 => 02
    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return hours + ':' + minutes + ':' + seconds; // Return is HH : MM : SS
}

//set slider limit according to time NOW
function setTimeLimit() {
    let checkDate = new Date().toISOString().slice(0, 10);
    if (document.getElementById("slider").value > seconds && document.getElementById("dateNow").value == checkDate) {
        document.getElementById("slider").value = seconds
        SelectValue.innerHTML = convertHMS(seconds);
        document.getElementById("error").style.visibility = "visible";
        document.getElementById("errormsg").innerHTML = "de tijd kan niet in de toekomst liggen!";
    }
    else {
        document.getElementById("error").style.visibility = "hidden";

    }
}