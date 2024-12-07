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
                        <button onclick="deleteTrain(${train.train_id})">Delete</button>
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


async function deleteTrain(trainId) {
    if (confirm('Are you sure you want to delete this train?')) {
        try {
            const response = await fetch(`${BASE_URL}/trains/${trainId}`, {
                method: 'DELETE',
            });
            const result = await response.json();
            alert(result.message);
            fetchTrains();
        } catch (error) {
            console.error('Error deleting train:', error);
        }
    }
}

function updateTrain(trainId, name, train_type, status) {
    const newName = prompt('Enter new name:', name);
    const newType = prompt('Enter new train_type:', train_type);
    const newStatus = prompt('Enter new status:', status);
    if (newName && newType && newStatus ) {
        fetch(`${BASE_URL}/trains/${trainId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newName, type: newType, status: newStatus }),
        })
            .then((response) => response.json())
            .then((result) => {
                alert(result.message);
                fetchTrains();
            })
            .catch((error) => console.error('Error updating train:', error));
    }
}
