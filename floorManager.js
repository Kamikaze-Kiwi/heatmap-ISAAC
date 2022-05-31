let buttonUp = document.getElementById('buttonFloorUp');
let buttonDown = document.getElementById('buttonFloorDown');
let floorSelect = document.getElementById('floorSelect');

var currentFloor = 1; //default floor
let minFloor = 1; //lowest possible floor
let maxFloor = 6; //highest possible floor

let floors = [
    { floor: 1, src: 'eerste-verdieping.svg' },
    { floor: 2, src: 'tweede-verdieping.svg' },
    { floor: 3, src: 'derde-verdieping.svg' },
    { floor: 6, src: 'derde-verdieping.svg' },
]

//disable floor down button if already at bottom floor
if (currentFloor <= minFloor){
    currentFloor = minFloor;
    buttonDown.disabled = true;
}

//disable floor up button if already at top floor
if (currentFloor >= maxFloor) {
    currentFloor = maxFloor;
    buttonUp.disabled = true;
}

//Gets the floor for the specified floor number
function GetFloor(floorNum){
    return floors.filter(function (x){
        return x.floor == floorNum;
    })[0]
}

//Goes up one floor
function FloorUp(){
    floorSelect.selectedIndex += 1;

    SetFloor(floorSelect.value);
}

//Goes down one floor
function FloorDown(){
    floorSelect.selectedIndex -= 1;

    SetFloor(floorSelect.value);
}

//Sets the floor to the specified floor
function SetFloor(newFloor){
    //disable/re-enable the up button depending on current floor.
    if (floorSelect.selectedIndex + 1 >= floorSelect.length) {
        buttonUp.disabled = true;
    }
    else {
        buttonUp.disabled = false;
    }   

    //disable/re-enable the down button depending on current floor.
    if (floorSelect.selectedIndex <= 0) {
        buttonDown.disabled = true;
    }
    else {
        buttonDown.disabled = false;
    }

    currentFloor = newFloor;

    floorSelect.value = newFloor;

    //changes the backgroundimage to the image belonging to this floor.
    changeSvg(GetFloor(currentFloor).src);

    //updates the url params with the current floor.
    updateUrlParams();

    //get data for this floor
    getDataByDay(document.getElementById('dateNow').valueAsDate);
}