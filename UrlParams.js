const querystring = window.location.search;
const urlParams = new URLSearchParams(querystring);

let urlDate = urlParams.get('date'); //gets the value behind ?date in the url
let urlTime = urlParams.get('time'); //gets the value behind ?time in the url
let urlFloor = urlParams.get('floor'); //gets the value behind ?floor in the url

//if date was supplied in URL, load the data for that day. Otherwise get the current date.
if (urlDate != null) {
    document.getElementById('dateNow').value = urlDate;
    getDataByDay(new Date(urlDate));
}
else {
    getDataByDay(new Date());
}

//if time was supplied in URL, load the data for that time. Otherwise get the current time.
if (urlTime != null) {
    document.getElementById('slider').value = urlTime;
    document.getElementById('SelectValue').innerHTML = convertHMS(urlTime);
}
else {
    document.getElementById("slider").value = seconds;
    SelectValue.innerHTML = convertHMS(seconds);
}

//if floor was supplied in URL, load that floor. Otherwise get the default floor.
setTimeout(function() {
    if (urlFloor != null) {
        floorSelect.value = urlFloor;
        SetFloor(floorSelect.value);
    }
}, 100);

//Generates the url that can be used to share the current date/time.
function GenerateSharePopup() {
    let shareString = location.origin + `?date=${document.getElementById('dateNow').value}&time=${document.getElementById('slider').value}&floor=${currentFloor}`;
    let ExtshareString = location.origin + `?date=${document.getElementById('dateNow').value}%26time=${document.getElementById('slider').value}%26floor=${currentFloor}`;
    document.getElementById('datetimecopy').value = shareString;
    document.getElementById('twitter').href = "https://twitter.com/intent/tweet?text=Checkout%20the%20temperature%20at%20our%20office:%0a&url=" + ExtshareString;
}

//Copies the current url to the user's clipboard
function CopyTo() {
    let copyText = document.getElementById('datetimecopy').value;

    navigator.clipboard.writeText(copyText);
}

//Updates the URL with the selected date/time without reloading the page.
function updateUrlParams(){
    window.history.replaceState({}, null, `?date=${document.getElementById('dateNow').value}&time=${document.getElementById('slider').value}&floor=${currentFloor}`);
}