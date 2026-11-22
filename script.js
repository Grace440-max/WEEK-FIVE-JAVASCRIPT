
const API_URL = "https://jsonplaceholder.typicode.com/users";

//  Select HTML elements
const loadButton = document.getElementById("loadButton");
const searchInput = document.getElementById("searchInput");
const messageEl = document.getElementById("message");
const userListEl = document.getElementById("userList");

//  Store all users
let allUsers = [];


//  Function to display messages
function showMessage(text, isError = false) {

    messageEl.textContent = text;

    messageEl.classList.toggle("error", isError);
}


//  Fetch users from the API
async function loadUsers() {
    showMessage("Loading users...");
    loadButton.disabled = true;
    allUsers = [];          
    userListEl.innerHTML = "";

    try {

        const response = await fetch(API_URL);

        
        if (!response.ok) {
            throw new Error("HTTP Error: " + response.status);
        }

        const data = await response.json();

        allUsers = Array.isArray(data) ? data : [];

        if (allUsers.length === 0) {

            showMessage("No users were returned by the API.");

            return;
        }

        searchUsers();

    } catch (error) {

        allUsers = [];

        userListEl.innerHTML = "";

        showMessage(
            "Failed to load users: " + error.message,
            true
        );

        console.error(error);

    } finally {

        loadButton.disabled = false;

        loadButton.textContent = "Reload Users";

    }
}


function displayUsers(users) {

    userListEl.innerHTML = "";

    users.forEach(function(user) {

        const card = document.createElement("article");

        card.className = "user-card";

        const name = document.createElement("h2");

        name.textContent = user.name;

        card.appendChild(name);

        card.appendChild(
            createDetail("Email", user.email)
        );

        card.appendChild(
            createDetail(
                "City",
                user.address?.city || "Not available"
            )
        );

        card.appendChild(
            createDetail(
                "Organization",
                user.company?.name || "Not available"
            )
        );

        userListEl.appendChild(card);

    });

}


function createDetail(label, value) {

    const paragraph = document.createElement("p");

    const labelSpan = document.createElement("span");

    labelSpan.className = "label";

    labelSpan.textContent = label + ": ";

    paragraph.appendChild(labelSpan);

    paragraph.appendChild(
        document.createTextNode(value ?? "Not available")
    );

    return paragraph;
}


// Search users by name or email
function searchUsers() {

    if (allUsers.length === 0) {
        return;
    }

    const term = searchInput.value.trim().toLowerCase();

    const matches = allUsers.filter(function(user) {

        const name = (user.name || "").toLowerCase();

        const email = (user.email || "").toLowerCase();

        return (
            name.includes(term) ||
            email.includes(term)
        );

    });

    if (matches.length === 0) {

        userListEl.innerHTML = "";

        showMessage(
            "No users match '" + searchInput.value.trim() + "'."
        );

        return;
    }

    displayUsers(matches);

    if (term === "") {

        showMessage(
            "Showing all " + allUsers.length + " users."
        );

    } else {

        showMessage(
            "Showing " + matches.length +
            " of " + allUsers.length + " users."
        );

    }

}


loadButton.addEventListener("click", loadUsers);


searchInput.addEventListener("input", searchUsers);
