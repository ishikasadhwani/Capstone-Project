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
  } else if (section === "addVehicle") {
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
  }
}

//function registerBtn(){
//
//         const name = document.getElementById("name").value;
//         const email = document.getElementById("email").value;
//         const password = document.getElementById("password").value;
//         const role = document.getElementById("role").value;
//
//         if (name && email && password && role) {
//               registerUser(name, email, password, role);
//         } else {
//               alert("Please fill in all fields.");
//         }
//}
function logout() {
  // Clear stored user data (if using localStorage or sessionStorage)
  localStorage.removeItem("userToken");
  localStorage.removeItem("userRole");

  // Redirect to login page
  window.location.href = "index.html";
}
//document.addEventListener("DOMContentLoaded", function () {
// document.getElementById("register-btn").addEventListener("click",
//   });
//async function registerUser(name, email, password, role) {
//
//  const apiUrl = `http://localhost:8080/users/register`; // Update the URL if needed
//
//  const requestData = {
//    name: name,
//    email: email,
//    password: password,
//    role: role,
//  };
//
//  try {
//    const response = await fetch(apiUrl, {
//      method: "POST",
//      headers: {
//        "Content-Type": "application/json",
//      },
//      body: JSON.stringify(requestData),
//    });
//    console.log(response);
//
//    if (!response.ok) {
//      throw new Error(`Error: ${response.status} - ${response.statusText}`);
//    }
//
//    const result = await response.json();
//    console.log("User registered successfully:", result);
//    alert("User registered successfully!");
//  } catch (error) {
//    console.error("Failed to register user:", error);
//    alert("Failed to register user. Please try again.");
//  }
//}

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
    content.innerHTML = `
        <h2>Vehicle Gallery</h2>
        <div id="vehicleGallery" class="gallery-container" style="display:block"></div>
    `;

    let gallery = document.getElementById("vehicleGallery");

    fetch("http://localhost:8080/vehicles/available")  // Ensure this matches your backend URL
        .then(response => response.json())
        .then(vehicles => {
            vehicles.forEach(vehicle => {
                let vehicleCard = document.createElement("div");
                vehicleCard.classList.add("vehicle-card");
                vehicleCard.innerHTML = `
                    <img src="static/car-img.png" alt="${vehicle.name}">
                    <h3>${vehicle.name}</h3>
                    <p><strong>Category:</strong> ${vehicle.category}</p>
                    <p><strong>Fuel Type:</strong> ${vehicle.fuelType}</p>
                    <p><strong>Seating Capacity:</strong> ${vehicle.seatingCapacity}</p>
                    <p><strong>Rate per Day:</strong> ${vehicle.pricePerDay}</p>
                    <button onclick="bookVehicle('${vehicle.id}')">Book Now</button>
                `;
                gallery.appendChild(vehicleCard);
            });
        })
        .catch(error => console.error("Error fetching vehicles:", error));
}


//function fetchVehicles() {
//  let content = document.getElementById("content");
//
//  // Sample vehicle data (Replace with API data when backend is ready)
//  const vehicles = [
//    {
//      name: "Toyota Camry",
//      id: "ABC-123",
//      type: "Sedan",
//      rate: "$75/day",
//      image: "https://source.unsplash.com/300x200/?car",
//    },
//    {
//      name: "Honda Civic",
//      id: "XYZ-456",
//      type: "Sedan",
//      rate: "$70/day",
//      image: "https://source.unsplash.com/300x200/?sports-car",
//    },
//    {
//      name: "Ford Explorer",
//      id: "LMN-789",
//      type: "SUV",
//      rate: "$100/day",
//      image: "https://source.unsplash.com/300x200/?suv",
//    },
//  ];
//
//  // Inject vehicle gallery HTML
//  content.innerHTML = `
//      <h2>Vehicle Gallery</h2>
//      <div id="vehicleGallery" class="gallery-container style="display:block"></div>
//  `;
//
//  let gallery = document.getElementById("vehicleGallery");
//
//  // Loop through vehicles and create vehicle cards
//  vehicles.forEach((vehicle) => {
//    let vehicleCard = document.createElement("div");
//    vehicleCard.classList.add("vehicle-card");
//    vehicleCard.innerHTML = `
//        <img src="carimage.com" alt="${vehicle.name}">
//        <h3>${vehicle.name}</h3>
//        <p><strong>Type:</strong> ${vehicle.type}</p>
//        <p><strong>Rate:</strong> ${vehicle.rate}</p>
//        <button onclick="bookVehicle('${vehicle.id}')">Book Now</button>
//    `;
//    gallery.appendChild(vehicleCard);
//  });
//}
function fetchBookings() {
  // Fetch bookings from backend
  let content = document.getElementById("content");
  content.innerHTML = `
        <h2>Booking History</h2>
        <table>
            <tr>
                <th>User</th>
                <th>Vehicle</th>
                <th>Date</th>
                <th>Status</th>
            </tr>
            <tr>
                <td>John Doe</td>
                <td>Honda Civic</td>
                <td>May 10-15, 2023</td>
                <td>Completed</td>
            </tr>
        </table>
    `;
}
