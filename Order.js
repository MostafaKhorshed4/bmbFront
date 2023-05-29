const allForm = document.getElementById('all-form');
const newForm = document.getElementById('new-form');
const newBtn = document.getElementById('new-btn');

document.addEventListener('DOMContentLoaded', function () {
	const newLink = document.getElementById('new-link');
	const newForm = document.getElementById('new-form');
	const allLink = document.getElementById('all-link');
	const allForm = document.getElementById('all-form');

	allForm.style.display = 'none';

	newForm.style.display = 'block';

	newLink.addEventListener('click', function () {
		newForm.style.display = 'block';
		allForm.style.display = 'none';
	});

	allLink.addEventListener('click', function () {
		allForm.style.display = 'block';
        newForm.style.display = 'none';
        displayAllOrders();
	});
});
let orders = [];
let deletedOrders = [];
let lastDeletedTime = null;


function placeOrder(event) {
    event.preventDefault();
    let itemName = document.getElementById('item-name').value;
    let itemqty = document.getElementById('item-qty').value;
 
    if (deletedOrders.length === 3) {
        if (lastDeletedTime) {
            let currentTime = new Date();
            let timeDifference = currentTime - lastDeletedTime;
            let hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

            if (hoursDifference <= 6) {
                alert('Cannot place order. Please wait at least 6 hours after deleting the maximum number of orders.');
                return;
            }
        }
     
    }

    if (itemqty) {
        const customer = parseInt(localStorage.getItem('customer'));
        const token = localStorage.getItem('token');

        let order = { itemName: itemName, quantity: itemqty, customerId : customer };
        orders.push(order);
        fetch('https://localhost:44353/api/Order/CreateOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
               
                    'Authorization': `Bearer ${token}`
                
            },

            body: JSON.stringify(order)
        })
            .then(response => {
                if (response.ok) {
                    // Login successful, redirect to dashboard or home page
                    displayOrders();
                } else {
                    // Login failed, show error message
                    alert('Insert failed. Please try again.');

                }
            });
        alert('Order placed successfully!');

        displayOrders();
    } else {
        alert('Please enter a Quantity.');
    }

    document.getElementById('item-name').value = '';
    document.getElementById('item-qty').value = '';
}

function displayOrders() {
    let orderList = document.getElementById('order-list');
    orderList.innerHTML = '';

    orders.forEach(order => {
        let listItem = document.createElement('li');
        listItem.innerText = order.itemName + ' , Quantity : ' + order.quantity;
        orderList.appendChild(listItem);
    });
}

function displayAllOrders() {
    let orderList = document.getElementById('order-tablelist');
    orderList.innerHTML = '';

    for (let i = 0; i < orders.length; i++) {
        let order = orders[i];

        let row = document.createElement('tr');

        let itemNameCell = document.createElement('td');
        itemNameCell.textContent = order.itemName;
        row.appendChild(itemNameCell);
        let itemqtyiCell = document.createElement('td');
        itemqtyiCell.textContent = order.quantity;
        row.appendChild(itemqtyiCell);
        let dateCell = document.createElement('td');
        dateCell.textContent = order.quantity;
        row.appendChild(dateCell);
        let actionsCell = document.createElement('td');
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'action-button';
        deleteButton.onclick = function () {
            deleteOrder(i);
        };
        actionsCell.appendChild(deleteButton);
        row.appendChild(actionsCell);

        orderList.appendChild(row);
    }
}

function deleteOrder(index) {
    let deletedOrder = orders.splice(index, 1);
    deletedOrder.deletedTime = new Date().toLocaleString();
    lastDeletedTime = new Date();

    deletedOrders.push(deletedOrder[0]);
    displayAllOrders();
    displayDeletedOrders();

}
function displayDeletedOrders() {
    let deletedOrderList = document.getElementById('deleted-order-list');
    deletedOrderList.innerHTML = '';

    for (let i = 0; i < deletedOrders.length; i++) {
        let deletedOrder = deletedOrders[i];

        let row = document.createElement('tr');

        let itemNameCell = document.createElement('td');
        itemNameCell.textContent = deletedOrder.itemName;
        row.appendChild(itemNameCell);
        let itemqtyiCell = document.createElement('td');
        itemqtyiCell.textContent = deletedOrder.quantity;
        row.appendChild(itemqtyiCell);
        let dateCell = document.createElement('td');
        dateCell.textContent = deletedOrder.deletedTime;
        row.appendChild(dateCell);

        deletedOrderList.appendChild(row);
    }
}