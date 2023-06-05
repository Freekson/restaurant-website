const orderForm = document.getElementById("order-form");
const orderList = document.getElementById("order-list");
const editDataBtn = document.getElementById("edit-data-btn");
const deleteDataBtn = document.getElementById("delete-data-btn");
const showAllOrdersBtn = document.getElementById("show-all-orders-btn");

let orders = [];

// Function to display orders from local storage
function displayData() {
  orderList.innerHTML = "";

  orders.forEach((order, index) => {
    const orderItem = document.createElement("div");
    orderItem.classList.add("order-item");

    const orderName = document.createElement("h3");
    orderName.textContent = order.name;

    const orderDetails = document.createElement("p");
    orderDetails.innerHTML = `<strong>Email:</strong> ${order.email}<br>
                              <strong>Phone:</strong> ${order.phone}<br>
                              <strong>Table Size:</strong> ${
                                order.tableSize
                              }<br>
                              <strong>Special Requests:</strong> ${
                                order.specialRequests
                              }<br>
                              <strong>Payment Method:</strong> ${
                                order.paymentMethod
                              }<br>
                              <strong>Options:</strong> ${order.options.join(
                                ", "
                              )}`;

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("ui-btn");
    editButton.addEventListener("click", () => editData(index));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("ui-btn");
    deleteButton.addEventListener("click", () => deleteData(index));

    orderItem.appendChild(orderName);
    orderItem.appendChild(orderDetails);
    orderItem.appendChild(editButton);
    orderItem.appendChild(deleteButton);
    orderList.appendChild(orderItem);
  });
}

// Function to populate form with data for editing
function editData(index) {
  const order = orders[index];

  document.getElementById("name").value = order.name;
  document.getElementById("email").value = order.email;
  document.getElementById("phone").value = order.phone;
  document.getElementById("table-size").value = order.tableSize;
  document.getElementById("special-requests").value = order.specialRequests;
  document.querySelector(
    `input[name="payment"][value="${order.paymentMethod}"]`
  ).checked = true;

  order.options.forEach((option) => {
    document.querySelector(
      `input[name="options"][value="${option}"]`
    ).checked = true;
  });

  deleteData(index);
}

// Function to save/update data in local storage
function saveData() {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const tableSizeInput = document.getElementById("table-size");

  // Form validation
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  const tableSize = tableSizeInput.value.trim();
  const specialRequests = document
    .getElementById("special-requests")
    .value.trim();
  const paymentMethod = document.querySelector(
    'input[name="payment"]:checked'
  ).value;

  if (name === "") {
    alert("Please enter a name.");
    return;
  }

  if (email === "") {
    alert("Please enter an email address.");
    return;
  }

  if (!isValidEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (phone === "") {
    alert("Please enter a phone number.");
    return;
  }

  if (!isValidPhone(phone)) {
    alert("Please enter a valid phone number.");
    return;
  }

  if (tableSize === "") {
    alert("Please enter a table size.");
    return;
  }

  const options = Array.from(
    document.querySelectorAll('input[name="options"]:checked')
  ).map((option) => option.value);

  const order = {
    name,
    email,
    phone,
    tableSize,
    specialRequests,
    paymentMethod,
    options,
  };

  if (orderForm.dataset.editIndex) {
    const editIndex = parseInt(orderForm.dataset.editIndex);
    orders[editIndex] = order;
    delete orderForm.dataset.editIndex;
  } else {
    orders.push(order);
  }

  localStorage.setItem("orders", JSON.stringify(orders));

  displayData();
  orderForm.reset();
}

// Function to delete data from local storage
function deleteData(index) {
  orders.splice(index, 1);
  localStorage.setItem("orders", JSON.stringify(orders));
  displayData();
}

// Assign functions to buttons
editDataBtn.addEventListener("click", saveData);
deleteDataBtn.addEventListener("click", deleteData);

// Assign submit event handler to order form
orderForm.addEventListener("submit", function (event) {
  event.preventDefault();
  saveData();
});

// Function to validate email address
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Function to validate phone number
function isValidPhone(phone) {
  const phoneRegex = /^\d{9}$/;
  return phoneRegex.test(phone);
}

function showAllOrders() {
  // Retrieve orders from local storage
  const storedOrders = localStorage.getItem("orders");

  if (storedOrders) {
    orders = JSON.parse(storedOrders);
    displayData();
  }
}
showAllOrdersBtn.addEventListener("click", showAllOrders);
