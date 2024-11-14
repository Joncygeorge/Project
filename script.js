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
