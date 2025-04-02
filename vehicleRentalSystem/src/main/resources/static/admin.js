let sidebar = document.querySelector(".sidebar");
let toggleBtn = document.createElement("div");

document.addEventListener("DOMContentLoaded", function () {
  toggleBtn.classList.add("toggle-btn");
  toggleBtn.innerHTML = "☰";
  document.body.appendChild(toggleBtn);
  toggleBtn.addEventListener("click", function () {
    sidebar.classList.toggle("open");
  });
});

function showSection(section) {
  let content = document.getElementById("content");

  if (section === "registerUser") {
    content.innerHTML = `
            <h2>Register User</h2>
            <form id="registerForm">
                <input id="name" type="text" placeholder="Name" required>
                <input id="email" type="email" placeholder="Email"  required>
                <input id="password" type="password" placeholder="Password"  required>
                <input id="role" type="text" placeholder="Role(Capital Letters)" required>
                <button id="register-btn" type="submit">Register</button>
            </form>
        `;
    sidebar.classList.toggle("open");
  }else if (section === "viewUsers") {
       fetchUsers();
       sidebar.classList.toggle("open");

  }else if (section === "addVehicle") {
    content.innerHTML = `
            <h2>Add Vehicle</h2>
            <form id="addVehicleForm">
                <input type="text" id="vehicleName" placeholder="Vehicle Name" required>
                <input type="text" id="vehicleNo" placeholder="Vehicle Number" required>
                <input type="number" id="seatingCapacity" placeholder="Seating Capacity" required>

                <select id="status">
                    <option value="AVAILABLE">AVAILABLE</option>
                    <option value="BOOKED">BOOKED</option>
                </select>

                <select id="fuelType">
                    <option value="PETROL">PETROL</option>
                    <option value="DIESEL">DIESEL</option>
                    <option value="ELECTRIC">ELECTRIC</option>
                </select>

                <select id="category">
                    <option value="CAR">CAR</option>
                    <option value="BIKE">BIKE</option>
                </select>

                <input type="number" id="pricePerDay" placeholder="Price per day" required>
                <button type="submit">Add Vehicle</button>
            </form>

        `;
    sidebar.classList.toggle("open");
  } else if (section === "viewVehicles") {
    fetchVehicles();
    sidebar.classList.toggle("open");
  } else if (section === "viewBookings") {
    fetchBookings();
    sidebar.classList.toggle("open");
  } else if (section === "Profile") {
        fetchProfile();
        sidebar.classList.toggle("open");
}
}


function logout() {
  // Clear stored user data (if using localStorage or sessionStorage)
    localStorage.removeItem("userEmail");

  // Redirect to login page
  window.location.href = "index.html";
}


// Function to handle user registration
async function registerUser(event) {
    event.preventDefault(); // Prevent default form submission
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    const userData = {
        name: name,
        email: email,
        password: password,
        role: role
    };

    try {
        const response = await fetch(`http://localhost:8080/users/register?email=${localStorage.getItem("userEmail")}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });
        console.log(response);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        const data = await response.json();
        alert("User registered successfully!");
        content.innerHTML=''

        console.log("Registered User:", data);
    } catch (error) {
        alert("Failed to register user. Please try again.");
        console.error("Registration Error:", error);
    }
}

// Function to check if the form exists and add an event listener
function attachFormListener() {
    const registerForm = document.getElementById("registerForm");

    if (registerForm && !registerForm.dataset.listenerAdded) {
        registerForm.addEventListener("submit", registerUser);
        registerForm.dataset.listenerAdded = "true";  // Avoid duplicate event listeners
        console.log("Event listener attached to register form.");
    }
}

// Observe DOM changes and wait for the form to appear
const observer = new MutationObserver(() => {
    attachFormListener();
});

// Start observing the body for changes (adjust selector if needed)
observer.observe(document.body, { childList: true, subtree: true });

// Run initially in case the form is already loaded
attachFormListener();

function fetchUsers() {


    fetch(`http://localhost:8080/users/all?email=${localStorage.getItem("userEmail")}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data)) {
                throw new Error("Invalid response: Expected an array");
            }
            displayUsers(data);
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            document.getElementById("content").innerHTML = `<p style="color:red;">Failed to load users.</p>`;
        });
}

function displayUsers(users) {
    let content = document.getElementById("content");

    // Create table
    let tableHTML = `
        <h2>All Users</h2>
        <table border="1" width="100%">
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
            </tr>`;

    // Loop through users and add rows
    users.forEach(user => {
        tableHTML += `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
            </tr>`;
    });

    tableHTML += `</table>`;
    content.innerHTML = tableHTML;
}



async function addVehicle(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    const vehicleName = document.getElementById("vehicleName").value;
    const vehicleNo = document.getElementById("vehicleNo").value;
    const seatingCapacity = document.getElementById("seatingCapacity").value;
    const status = document.getElementById("status").value;
    const fuelType = document.getElementById("fuelType").value;
    const category = document.getElementById("category").value;
    const pricePerDay = document.getElementById("pricePerDay").value;

    const vehicleData = {
        name: vehicleName,
        vehicleNo: vehicleNo,
        seatingCapacity: parseInt(seatingCapacity), // Convert to number
        status: status,
        fuelType: fuelType,
        category: category,
        pricePerDay: parseFloat(pricePerDay) // Convert to number
    };

    try {
        const response = await fetch(`http://localhost:8080/vehicles/add?email=${localStorage.getItem("userEmail")}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(vehicleData)
        });

        console.log(response);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        const data = await response.json();
        alert("Vehicle added successfully!");
        document.getElementById("addVehicleForm").reset(); // Clear form fields
        console.log("Added Vehicle:", data);
    } catch (error) {
        alert("Failed to add vehicle. Please try again.");
        console.error("Vehicle Addition Error:", error);
    }
}

// Function to attach event listener to the form
function attachVehicleFormListener() {
    const addVehicleForm = document.getElementById("addVehicleForm");

    if (addVehicleForm && !addVehicleForm.dataset.listenerAdded) {
        addVehicleForm.addEventListener("submit", addVehicle);
        addVehicleForm.dataset.listenerAdded = "true"; // Prevent duplicate listeners
        console.log("Event listener attached to Add Vehicle form.");
    }
}

// Observe DOM changes to dynamically attach the event listener
const vehicleObserver = new MutationObserver(() => {
    attachVehicleFormListener();
});

// Start observing the body for changes (adjust selector if needed)
vehicleObserver.observe(document.body, { childList: true, subtree: true });

// Run initially in case the form is already loaded
attachVehicleFormListener();


function fetchVehicles() {
let content = document.getElementById("content");

  // Inject vehicle gallery HTML
  content.innerHTML = `
        <h2>Vehicle Gallery</h2>
        <div id="vehicleGallery" class="gallery-container"></div>
        <div id="bookingModal" class="modal" style="display:none">
          <div class="modal-content">
            <span class="close-btn" onclick="closeBookingForm()">&times;</span>
            <div id="bookingFormContainer"></div>
          </div>
        </div>
    `;

  let gallery = document.getElementById("vehicleGallery");

  fetch(`http://localhost:8080/vehicles/all?email=${localStorage.getItem("userEmail")}`) // Ensure this matches your backend URL
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((vehicles) => {
      gallery.innerHTML = ""; // Clear previous content

      vehicles.forEach((vehicle) => {
        let vehicleCard = document.createElement("div");
        vehicleCard.classList.add("vehicle-card");

        vehicleCard.innerHTML = `
          <img src="${vehicle.category.toLowerCase() === 'bike' ? 'bike-img.png' : 'car-img.png'}"
          <h3>${vehicle.name}</h3>

          <p><strong>Category:</strong> ${vehicle.category}</p>
          <p><strong>Fuel Type:</strong> ${vehicle.fuelType}</p>
          <p><strong>Seating Capacity:</strong> ${vehicle.seatingCapacity}</p>
          <p><strong>Rate per Day:</strong> ${vehicle.pricePerDay}</p>
        `;

        gallery.appendChild(vehicleCard);
      });
      })
        .catch(error => console.error("Error fetching vehicles:", error));
}

function fetchBookings() {
    fetch(`http://localhost:8080/bookings/history?email=${localStorage.getItem("userEmail")}`) // Update with your actual API endpoint
        .then(response => response.json())
        .then(data => {
            displayBookings(data); // Call function to display data
        })
        .catch(error => console.error('Error fetching bookings:', error));
}

function displayBookings(bookings) {
    let content = document.getElementById("content");

    // Creating the table structure
    let tableHTML = `
        <h2>Booking History</h2>
        <table border="1" cellspacing="0" cellpadding="8">
            <tr>
                <th>Booking ID</th>
                <th>User ID</th>
                <th>User Name</th>
                <th>Vehicle ID</th>
                <th>Vehicle Name</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>End Date</th>
            </tr>`;

    // Looping through bookings to create table rows
    bookings.forEach(booking => {
        tableHTML += `
            <tr>
                <td>${booking.id}</td>
                <td>${booking.userId}</td>
                <td>${booking.userName}</td>
                <td>${booking.vehicleId}</td>
                <td>${booking.vehicleName}</td>
                <td>${booking.status}</td>
                <td>${booking.startDate}</td>
                <td>${booking.endDate}</td>
            </tr>`;
    });

    tableHTML += `</table>`;

    // **Updating content with the table**
    content.innerHTML = tableHTML;
}

function fetchProfile() {
    let content = document.getElementById("content");

    fetch(`http://localhost:8080/users/${localStorage.getItem("userEmail")}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            content.innerHTML = `
                        <h2>Admin Profile</h2>
                        <div class="profile">
                        <div class="info">

                              <div>
                                   <h3><span class="material-symbols-outlined">
                                        person
                                       </span>Name
                                   </h3>
                                   <p>${data.name}</p>
                              </div>
                        </div>
                        <div class="info">

                                <div>
                                     <h3> <span class="material-symbols-outlined">
                                           mail
                                           </span>Email Address
                                     </h3>
                                     <p>${data.email}</p>
                                </div>
                        </div>
                         <div class="info">

                                 <div>
                                      <h3> <span class="material-symbols-outlined">
                                           stars
                                           </span>Role
                                      </h3>
                                      <p>${data.role}</p>
                                 </div>
                         </div>
            `;
        })
        .catch(error => console.error("Error fetching profile:", error));
}



