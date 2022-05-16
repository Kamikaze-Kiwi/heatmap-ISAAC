let buttonUp = document.getElementById('buttonFloorUp');
let buttonDown = document.getElementById('buttonFloorDown');
let floorSelect = document.getElementById('floorSelect');

let currentFloor = 1; //default floor
let minFloor = 1; //lowest possible floor
let maxFloor = 6; //highest possible floor

let floors = [
    { floor: 1, src: 'eerste-verdieping.svg' },
    { floor: 2, src: 'tweede-verdieping.svg' },
    { floor: 3, src: 'derde-verdieping.svg' },
    { floor: 6, src: 'derde-verdieping.svg' },
]

if (currentFloor <= minFloor){
    currentFloor = minFloor;
    buttonDown.disabled = true;
}

if (currentFloor >= maxFloor) {
    currentFloor = maxFloor;
    buttonUp.disabled = true;
}

function GetFloor(floorNum){
    return floors.filter(function (x){
        return x.floor == floorNum;
    })[0]
}

function FloorUp(){
    floorSelect.selectedIndex += 1;

    SetFloor(floorSelect.value);
}

function FloorDown(){
    floorSelect.selectedIndex -= 1;

    SetFloor(floorSelect.value);
}

function SetFloor(newFloor){
    if (floorSelect.selectedIndex + 1 >= floorSelect.length) {
        buttonUp.disabled = true;
    }
    else {
        buttonUp.disabled = false;
    }   

    if (floorSelect.selectedIndex <= 0) {
        buttonDown.disabled = true;
    }
    else {
        buttonDown.disabled = false;
    }

    currentFloor = newFloor;

    floorSelect.value = newFloor;
    changeSvg(GetFloor(currentFloor).src);

    updateUrlParams();

    //TODO: get data for this floor
}