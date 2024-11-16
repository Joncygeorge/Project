let train=[];
function saveTrain (event){
event.preventDefault();
const trainId= document.getElementById("trainId").value
const trainName= document.getElementById("trainName").value
const trainNumber= document.getElementById("trainNumber").value
const source= document.getElementById("source").value
const destination= document.getElementById("destination").value

if (trainId) {
    // update train
    const index = trains.findIndex(train => train.id == trainId);
    trains[index] = { id: trainId, trainName, trainNumber, source, destination };
} else {
    // Add new train
    const newTrain = {
        id: Date.now().toString(),
        trainName,
        trainNumber,
        source,
        destination
    };
    trains.push(newTrain);
}

document.getElementById("trainForm").reset();
renderTrainList();
}

// display train list

function renderTrainList() {
    const trainList = document.getElementById("trainList").getElementsByTagName("tbody")[0];
    trainList.innerHTML = "";

    trains.forEach(train => {
        const row = trainList.insertRow();
        row.innerHTML = `
            <td>${train.trainName}</td>
            <td>${train.trainNumber}</td>
            <td>${train.source}</td>
            <td>${train.destination}</td>
            <td class="actions">
                <button class="edit" onclick="editTrain('${train.id}')">Edit</button>
                <button onclick="deleteTrain('${train.id}')">Delete</button>
            </td>
        `;
    });
}

// Function to edit train
function editTrain(id) {
    const train = trains.find(train => train.id == id);
    document.getElementById("trainId").value = train.id;
    document.getElementById("trainName").value = train.trainName;
    document.getElementById("trainNumber").value = train.trainNumber;
    document.getElementById("source").value = train.source;
    document.getElementById("destination").value = train.destination;
}

// Function to delete train
function deleteTrain(id) {
    trains = trains.filter(train => train.id != id);
    renderTrainList();
}

// Initialize event listeners
document.getElementById("trainForm").addEventListener("submit", saveTrain);
renderTrainList();
