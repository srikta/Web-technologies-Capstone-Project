var selectedRow = null;

// Show Alerts
function showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// Clear All Fields
function clearFields() {
    document.querySelector("#blog").value = "";
}

// Add Data
document.querySelector("#student-form").addEventListener("submit", (e) => {
    e.preventDefault();

    // Get Form Values
    const blog = document.querySelector("#blog").value;
    const dateTime = new Date().toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    });

    // Validate
    if (blog === "") {
        showAlert("Please fill in the blog field", "danger");
    } else {
        if (selectedRow == null) {
            const list = document.querySelector("#student-list");
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${blog}</td>
                <td>${dateTime}</td>
                <td>
                    <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                    <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
                </td>
            `;
            list.appendChild(row);
            showAlert("Blog Added", "success");
        } else {
            selectedRow.children[0].textContent = blog;
            selectedRow.children[1].textContent = dateTime;
            showAlert("Blog Edited", "info");
        }
        selectedRow = null;
        clearFields();
    }
});

// Edit Data
document.querySelector("#student-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("edit")) {
        selectedRow = e.target.parentElement.parentElement;
        document.querySelector("#blog").value = selectedRow.children[0].textContent;
    }
});

// Delete Data
document.querySelector("#student-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        e.target.parentElement.parentElement.remove();
        showAlert("Blog Deleted", "danger");
    }
});

// Show About Message
function showAbout() {
    alert("Hello, I am Sourikta Nag and this is my web technology assignment!\n\nLekha means Writings in bengali.\n\nThis website allows you to create, read, update and delete (CRUD) blog posts. You can write a new blog, edit existing ones or delete them as needed. The current date and time are displayed at the bottom right corner of the screen and they update every second.");
}

// Update date and time
function updateDateTime() {
    var currentDate = new Date();
    var dateTimeString = currentDate.toLocaleString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
        second: 'numeric', 
        hour12: true 
    });
    document.getElementById("datetime-box").textContent = dateTimeString;
}

// Update date and time initially and then every second
updateDateTime();
setInterval(updateDateTime, 1000);
