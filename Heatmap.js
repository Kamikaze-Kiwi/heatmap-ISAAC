let selectedDayData = [];
let emptyToday = false;
let dateTimeText = document.getElementById('selectedDateTime');
let errorText = document.getElementById('alert-text');
let errorDiv = document.getElementById('errorAlert');
let spinner = document.getElementById('loadingSpinner');

var chart = Highcharts.chart('container', {
    data: {
        rows: [['x', 'y', 'Temperature'],
        [0, 0, 0]]
    },
    chart: {
        type: 'contour',
        inverted: false,
        plotBackgroundImage: 'derde-verdieping.svg'
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
            return this.point.value + '&nbsp;&#8451;';
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
            [0.00, 'rgba(0,0,250,0.5)'],
            [0.24, 'rgba(0,250,250,0.5)'],
            [0.33, 'rgba(0,250,0,0.5)'],
            [0.50, 'rgba(250,250,0,0.5)'],
            [0.80, 'rgba(250,0,0,0.5)']
        ],
        min: 10,
        max: 40
    },
    series: [{
        borderWidth: 0
    }]
});

function getDataByDay(datetime) {
    let config = {
        params: {
            StartDate: datetime.toISOString()
        }
    }

    spinner.style.display = 'block';

    axios.get(
        'https://i447113.luna.fhict.nl/api/temperatures/History', config
    ).then(function (response) {
        selectedDayData = response.data
    }).catch(function (error) {
        alert('Error loading data');
        spinner.style.display = 'none';
    }).finally(function () {
        let anyData = false;

        selectedDayData.forEach(element => {
            if (element.length > 0) {
                errorDiv.style.display = 'none';
                anyData = true;
                emptyToday = false;
                return;
            }
        });

        if (!anyData) {
            errorDiv.style.display = 'block';
            errorText.innerText = 'Er is geen data gevonden voor deze dag.';
            emptyToday = true;
        }

        updateHeatmapByTime(document.getElementById('slider').value / 30);
        spinner.style.display = 'none';

    })
}

function updateHeatmapByTime(index) {
    let currentData = selectedDayData[index];

    let parsedData = [['x', 'y', 'Temperature']];
    currentData.forEach(sensor => {
        parsedData.push([sensor.x, sensor.y, sensor.value])
    });

    if (parsedData.length == 1) {
        parsedData.push([0, 0, 0]);
        if (!emptyToday) {
            errorDiv.style.display = 'block';
            errorText.innerText = 'Er is geen data gevonden voor dit moment.';
        }

    }
    else {
        errorDiv.style.display = 'none';
    }

    chart.series[0].update({
        data: parsedData
    })
}



