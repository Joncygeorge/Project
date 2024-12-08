const BASE_URL = 'http://localhost:3000'; 
async function handleFormSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('trainName').value.trim();
    const type = document.getElementById('trainType').value.trim();
    const status = document.getElementById('trainStatus').value;

    if (!name || !type   || !status) {
        alert('Please fill out all fields before submitting.');
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/trains`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                type,
                status,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to add train');
        }

        const result = await response.json();
        alert(result.message || 'Train added successfully!');
        fetchTrains();
        document.getElementById('addTrainForm').reset();
    } catch (error) {
        console.error('Error adding train:', error);
        alert(`Error: ${error.message || 'Something went wrong'}`);
    }
}
document.getElementById('addTrainForm').addEventListener('submit', handleFormSubmit);

async function fetchTrains() {
    try {
        const response = await fetch(`${BASE_URL}/trains`);
        const trains = await response.json();
        const table = document.getElementById('trainTable');
        table.innerHTML = ''; 
        trains.forEach((train) => {
            const row = `
                <tr>
                    <td>${train.train_id}</td>
                    <td>${train.name}</td>
                    <td>${train.train_type}</td>
                     <td>${train.status}</td>
                    <td class="actions">
                        <button onclick="showDeleteModal(${train.train_id})">Delete</button>
                        <button onclick="updateTrain(${train.train_id}, '${train.name}', '${train.train_type}', '${train.status}')">Update</button>
                    </td>
                </tr>
            `;
            table.innerHTML += row;
        });
    } catch (error) {
        console.error('Error fetching trains:', error);
    }
}

window.onload = fetchTrains;

async function searchTrains(e) {
    e.preventDefault(); 

    const searchName = document.getElementById('searchName').value.trim();
    if (!searchName) {
        alert('Please enter a train name to search');
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/trains/search?name=${encodeURIComponent(searchName)}`);
        if (!response.ok) {
            const errorData = await response.json();
            alert(errorData.message || 'No trains found');
            return;
        }

        const trains = await response.json();
        const table = document.getElementById('trainTable');
        table.innerHTML = ''; 
        trains.forEach((train) => {
            const row = `
                <tr>
                    <td>${train.train_id}</td>
                    <td>${train.name}</td>
                    <td>${train.train_type}</td>
                    <td>${train.status}</td>
                    <td class="actions">
                        <button onclick="deleteTrain(${train.train_id})">Delete</button>
                        <button onclick="updateTrain(${train.train_id}, '${train.name}', '${train.train_type}', '${train.status}')">Update</button>
                    </td>
                </tr>
            `;
            table.innerHTML += row;
        });
    } catch (error) {
        console.error('Error searching trains:', error);
    }
}

document.getElementById('searchTrainForm').addEventListener('submit', searchTrains);
let trainIdToDelete = null;

function showDeleteModal(trainId) {
    trainIdToDelete = trainId;
    document.getElementById('deleteModal').style.display = 'block';
}

async function confirmDelete() {
    if (trainIdToDelete) {
        try {
            const response = await fetch(`${BASE_URL}/trains/${trainIdToDelete}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to delete train');
            }

            const result = await response.json();
            showMessage(result.message || 'Train deleted successfully!', 'success');
            fetchTrains();
        } catch (error) {
            console.error('Error deleting train:', error);
            showMessage(error.message || 'Something went wrong', 'error');
        } finally {
            closeDeleteModal();
        }
    }
}
function closeDeleteModal() {
    document.getElementById('deleteModal').style.display = 'none';
    trainIdToDelete = null;
}
document.getElementById('confirmDeleteBtn').addEventListener('click', confirmDelete);
document.getElementById('cancelDeleteBtn').addEventListener('click', closeDeleteModal);
function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);
}

function updateTrain(trainId, name, train_type, status) {
    document.getElementById('updateTrainId').value = trainId;
    document.getElementById('updateTrainName').value = name;
    document.getElementById('updateTrainType').value = train_type;
    document.getElementById('updateTrainStatus').value = status;
    document.getElementById('updateTrainFormContainer').style.display = 'block';
}
async function handleUpdateSubmit(event) {
    event.preventDefault();

    const trainId = document.getElementById('updateTrainId').value;
    const newName = document.getElementById('updateTrainName').value;
    const newType = document.getElementById('updateTrainType').value;
    const newStatus = document.getElementById('updateTrainStatus').value;

    try {
        const response = await fetch(`${BASE_URL}/trains/${trainId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newName, type: newType, status: newStatus }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to update train');
        }

        const result = await response.json();
        showMessage(result.message || 'Train updated successfully!', 'success');
        fetchTrains(); 
        document.getElementById('updateTrainForm').reset();
        document.getElementById('updateTrainFormContainer').style.display = 'none'; 
    } catch (error) {
        console.error('Error updating train:', error);
        showMessage(error.message || 'Something went wrong', 'error');
    }
}
function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.className = type === 'success' ? 'message success' : 'message error';
    messageDiv.style.display = 'block';
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);
}
document.getElementById('updateTrainForm').addEventListener('submit', handleUpdateSubmit);
