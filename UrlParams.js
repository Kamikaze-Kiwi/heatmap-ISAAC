const querystring = window.location.search;
const urlParams = new URLSearchParams(querystring);
let urlDate = urlParams.get('date');
let urlTime = urlParams.get('time');

if (urlDate != null) {
    document.getElementById('dateNow').value = urlDate;
    getDataByDay(new Date(urlDate));
}
else {
    getDataByDay(new Date());
}

if (urlTime != null) {
    document.getElementById('slider').value = urlTime;
    document.getElementById('SelectValue').innerHTML = convertHMS(urlTime);
}
else {
    document.getElementById("slider").value = seconds;
    SelectValue.innerHTML = convertHMS(seconds);
}

function GenerateSharePopup() {
    let shareString = location.origin + `?date=${document.getElementById('dateNow').value}&time=${document.getElementById('slider').value}`;

    document.getElementById('datetimecopy').value = shareString;
}

function CopyTo() {
    let copyText = document.getElementById('datetimecopy').value;

    navigator.clipboard.writeText(copyText);
}

function updateUrlParams(){
    window.history.replaceState({}, null, `?date=${document.getElementById('dateNow').value}&time=${document.getElementById('slider').value}`);
}