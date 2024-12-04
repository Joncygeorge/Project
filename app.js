const BASE_URL = 'http://localhost:3000'; 


document.getElementById('addTrainForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('trainName').value;
    const type = document.getElementById('trainType').value;
    const status = document.getElementById('trainStatus').value;

    try {
        const response = await fetch(`${BASE_URL}/trains`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, type, status }),
        });
        const result = await response.json();
        alert(result.message);
        fetchTrains();
        document.getElementById('addTrainForm').reset();
    } catch (error) {
        console.error('Error adding train:', error);
    }
});

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
                    <td>${train.type}</td>
                    <td>${train.status}</td>
                    <td class="actions">
                        <button onclick="deleteTrain(${train.train_id})">Delete</button>
                        <button onclick="updateTrain(${train.train_id}, '${train.name}', '${train.type}', '${train.status}')">Update</button>
                    </td>
                </tr>
            `;
            table.innerHTML += row;
        });
    } catch (error) {
        console.error('Error fetching trains:', error);
    }
}

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

function updateTrain(trainId, name, type, status) {
    const newName = prompt('Enter new name:', name);
    const newType = prompt('Enter new type:', type);
    const newStatus = prompt('Enter new status (active/inactive):', status);

    if (newName && newType && newStatus) {
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
