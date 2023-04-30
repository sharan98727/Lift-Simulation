const queryString = window.location.search;

let liftPositions = []

const queryStringParams = new URLSearchParams(queryString);

const floorsCount = queryStringParams.get('floors');
const liftsCount = queryStringParams.get('lifts');

const handleButtonClick = (e) => {
    const clickedButtonFloorNumber = e.target.id.split('-').pop();
    // will know the floor, from this we have to check the nearest lift and move that lift to that position.
    // to do this we need to know the position of lift. calculate the nearest position to button click
    let closestLiftFloorNumber, closestLiftNumber;
    let diff;
    liftPositions.forEach((liftPosition, liftNumber) => {
        debugger
        if(!diff){
            diff = Math.abs(liftPosition-clickedButtonFloorNumber);
            closestLiftFloorNumber = liftPosition;
            closestLiftNumber = liftNumber;
        }
        else if(Math.abs(liftPosition-clickedButtonFloorNumber) < diff) {
            diff = Math.abs(liftPosition-clickedButtonFloorNumber)
            closestLiftFloorNumber = liftPosition;
            closestLiftNumber = liftNumber;
        }
    })
    moveLift(clickedButtonFloorNumber, closestLiftFloorNumber, closestLiftNumber)
}

const buildLiftPage = (floorsCount, liftsCount) => {
    const liftSimulationContainer = document.getElementById('lift-simulation-container');
    for(let i=floorsCount-1; i>=0; i--) {
        //let pElement = document.createElement('p');
        // pElement.innerHTML = `Floor ${i + 1}`;
        // liftSimulationContainer.appendChild(h1Element);
        let individualFloorContainer = document.createElement('div');
        individualFloorContainer.classList.add('individual-floor')
        let FloorNameEl = document.createElement('span');
        FloorNameEl.innerHTML = `Floor ${i}`;
        individualFloorContainer.appendChild(FloorNameEl);
        let buttonContainerEl = document.createElement('div');
        buttonContainerEl.classList.add('button-container');
        let upButtonEl = document.createElement('button');
        upButtonEl.innerHTML = 'Up';
        upButtonEl.setAttribute('id', `up-button-${i}`);
        upButtonEl.addEventListener('click', handleButtonClick)
        buttonContainerEl.append(upButtonEl);
        let downButtonEl = document.createElement('button');
        downButtonEl.innerHTML = 'Down';
        downButtonEl.setAttribute('id', `down-button-${i}`);
        downButtonEl.addEventListener('click', handleButtonClick)
        buttonContainerEl.append(downButtonEl);
        individualFloorContainer.appendChild(buttonContainerEl);
        liftSimulationContainer.appendChild(individualFloorContainer)

        if(i===0) {
            for(let j=0; j<liftsCount; j++) {
                let eachLift = document.createElement('div');
                liftPositions.push(0)
                eachLift.classList.add('lift');
                eachLift.setAttribute('floor-number', 0);
                eachLift.setAttribute('id', `lift-${j+1}`)
                individualFloorContainer.append(eachLift)  
            }
        }
    }
}

buildLiftPage(floorsCount, liftsCount);

function moveLift(clickedButtonFloorNumber, closestLiftFloorNumber, closestLiftNumber){
    // setTimeout(() => {
    //     //eachLift.style.transform = 'translateY(-150px)';
    //     eachLift.style.top = '-150px';
    //     eachLift.style.transition = 'top 4s ease';
    // }, 2000)
    console.log(closestLiftFloorNumber)
    const nearestLiftEl = document.getElementById(`lift-${closestLiftNumber+1}`)
    liftPositions[closestLiftNumber] = clickedButtonFloorNumber
    console.log(nearestLiftEl, clickedButtonFloorNumber, nearestLiftEl.style.transform)
    console.log(window.getComputedStyle(nearestLiftEl))
    let distanceToTravel = `${-(clickedButtonFloorNumber)*203}px`
    nearestLiftEl.style.transform = `translateY(${distanceToTravel})`;
    nearestLiftEl.style.transition = 'transform 4s ease';
}