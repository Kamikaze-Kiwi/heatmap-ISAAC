const querystring = window.location.search;
const urlParams = new URLSearchParams(querystring);

let urlDate = urlParams.get('date'); //gets the value behind ?date in the url
let urlTime = urlParams.get('time'); //gets the value behind ?time in the url

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

//Generates the url that can be used to share the current date/time.
function GenerateSharePopup() {
    let shareString = location.origin + `?date=${document.getElementById('dateNow').value}&time=${document.getElementById('slider').value}`;

    document.getElementById('datetimecopy').value = shareString;
}

//Copies the current url to the user's clipboard
function CopyTo() {
    let copyText = document.getElementById('datetimecopy').value;

    navigator.clipboard.writeText(copyText);
}

//Updates the URL with the selected date/time without reloading the page.
function updateUrlParams(){
    window.history.replaceState({}, null, `?date=${document.getElementById('dateNow').value}&time=${document.getElementById('slider').value}`);
}