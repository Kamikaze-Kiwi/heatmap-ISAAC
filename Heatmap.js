let selectedDayData = [];
let emptyToday = false;
let dateTimeText = document.getElementById('selectedDateTime');
let errorText = document.getElementById('alert-text');
let errorDiv = document.getElementById('errorAlert');
let spinner = document.getElementById('loadingSpinner');


//Create a Highcharts chart on the div with the id 'container'.
var chart = Highcharts.chart('container', {
    data: {
        //adds default data to prevent highcharts from getting an error.
        rows: [['x', 'y', 'Temperature'],
        [0, 0, 0]]
    },
    chart: {
        type: 'contour', //type: contour makes it so spots on the heatmap with no data will be interpolated.
        inverted: false,
        plotBackgroundImage: 'eerste-verdieping.svg'
    },
    title: {
        text: null
    },
    accessibility: {
        point: {
            descriptionFormatter: function (point) {

            }
        }
    },
    tooltip: {
        formatter: function () {
            return this.point.value + '&nbsp;&#8451;'; //tooltip shows it's value along with degrees celsius symbol.
        }
    },
    yAxis: {
        minPadding: 0,
        maxPadding: 0,
        startOnTick: false,
        endOnTick: false,
        visible: false,
        reversed: true,
        labels: {
            enabled: false
        },
        title: {
            text: null
        },
    },
    xAxis: {
        minPadding: 0,
        maxPadding: 0,

        startOnTick: false,
        endOnTick: false,
        tickLength: 0,
        labels: {
            enabled: false
        }
    },
    colorAxis: {
        stops: [
            [0.00, 'rgba(0,0,250,0.5)'],  //dark blue
            [0.27, 'rgba(0,250,250,0.5)'], //light blue
            [0.33, 'rgba(0,250,0,0.5)'], //green
            [0.44, 'rgba(250,250,0,0.5)'], //orange
            [0.70, 'rgba(250,0,0,0.5)'] //red
        ],

        //values below or above min/max will show the same color as if it were 10 or 40 respectively.
        min: 10, 
        max: 40
    },
    series: [{
        borderWidth: 0
    }]
});


//Retrieves the data for the supplied day from the API endpoint.
function getDataByDay(datetime) {
    let config = {
        params: {
            StartDate: datetime.toISOString()
        }
    }

    //shows a loading spinner
    spinner.style.display = 'block';

    //performs an axios get request to get all data for the supplied day
    axios.get(
        'https://i447113.luna.fhict.nl/api/temperatures/History', config
    ).then(function (response) {
        selectedDayData = response.data
    }).catch(function (error) {
        alert('Error loading data'); //shows an error message
        spinner.style.display = 'none'; //hides the loading spinner again
    }).finally(function () {
        let anyData = false;

        //checks if there is any data for this day
        selectedDayData.forEach(element => {
            if (element.length > 0) {
                errorDiv.style.display = 'none';
                anyData = true;
                emptyToday = false;
                return;
            }
        });

        //if no data was found for this day, show an error message
        if (!anyData) {
            errorDiv.style.display = 'block';
            errorText.innerText = 'Er is geen data gevonden voor deze dag.';
            emptyToday = true;
        }

        //updates the heatmap using the newly selected 
        updateHeatmapByTime(document.getElementById('slider').value / 30);

        //hides the loading spinner again
        spinner.style.display = 'none';
    })
}


//updates the heatmap data for the current time.
//index is the current time in seconds / 30.
function updateHeatmapByTime(index) {
    let currentData = selectedDayData[index];

    //parses the received data (JSON) to the rows data used by highcharts. 
    let parsedData = [['x', 'y', 'Temperature']];
    currentData.forEach(sensor => {
        parsedData.push([sensor.x, sensor.y, sensor.value])
    });

    //if there is no data for this time, push empty data to the list to prevent highcharts from crashing.
    if (parsedData.length == 1) {
        parsedData.push([0, 0, 0]);

        //if there is data on another time for this day, 
        //display an error message which shows the user there is no data for the current moment.
        //otherwise, the error message will still show that there is no data for the entire day.
        if (!emptyToday) {
            errorDiv.style.display = 'block';
            errorText.innerText = 'Er is geen data gevonden voor dit moment.';
        }

    }

    //if there is data for this time, hide the error message.
    else {
        errorDiv.style.display = 'none';
    }

    //update the chart with the new data.
    chart.series[0].update({
        data: parsedData
    })
}

function changeSvg(src){
    chart.plotBGImage.attr({ href: src })
}