document.getElementById('packingForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const tripDetails = {
        destination: document.getElementById('destination').value,
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('endDate').value,
        gender: document.getElementById('gender').value
    };

    try {
        const response = await fetch('backend.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tripDetails)
        });
        
        const packingList = await response.json();
        displayPackingList(packingList);
    } catch (error) {
        console.error('Error:', error);
    }
});

function displayPackingList(items) {
    const container = document.getElementById('listContainer');
    container.innerHTML = '<h3>Suggested Items</h3>';
    
    const list = document.createElement('div');
    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'checklist-item';
        itemDiv.innerHTML = `
            <input type="checkbox">
            <span>${item}</span>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;
        list.appendChild(itemDiv);
    });
    
    container.appendChild(list);
    addListInteraction();
}

function addListInteraction() {
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        });
    });

    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const span = e.target.previousElementSibling;
            const newText = prompt('Edit item:', span.textContent);
            if (newText) span.textContent = newText;
        });
    });
}