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
                <input type="text" placeholder="Name" required>
                <input type="email" placeholder="Email" required>
                <input type="password" placeholder="Password" required>
                <input type="text" placeholder="Role(Capital Letters)" required>
                <button type="submit">Register</button>
            </form>
        `;
    sidebar.classList.toggle("open");
  } else if (section === "addVehicle") {
    content.innerHTML = `
            <h2>Add Vehicle</h2>
            <form id="addVehicleForm">
                <input type="text" placeholder="Vehicle Name" required>
                <input type="text" placeholder="Vehicle ID" required>
                <select>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                </select>
                <input type="number" placeholder="Daily Rate ($)" required>
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
function logout() {
  // Clear stored user data (if using localStorage or sessionStorage)
  localStorage.removeItem("userToken");
  localStorage.removeItem("userRole");

  // Redirect to login page
  window.location.href = "login.html";
}
async function registerUser(name, email, password, role) {
  const apiUrl = "http://localhost:8080/api/users/register"; // Update the URL if needed

  const requestData = {
    name: name,
    email: email,
    password: password,
    role: role,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    console.log("User registered successfully:", result);
    alert("User registered successfully!");
  } catch (error) {
    console.error("Failed to register user:", error);
    alert("Failed to register user. Please try again.");
  }
}

// Event Listener for Register Button
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("registerBtn").addEventListener("click", function () {
    const name = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    if (name && email && password && role) {
      registerUser(name, email, password, role);
    } else {
      alert("Please fill in all fields.");
    }
  });
});

function fetchVehicles() {
  let content = document.getElementById("content");

  // Sample vehicle data (Replace with API data when backend is ready)
  const vehicles = [
    {
      name: "Toyota Camry",
      id: "ABC-123",
      type: "Sedan",
      rate: "$75/day",
      image: "https://source.unsplash.com/300x200/?car",
    },
    {
      name: "Honda Civic",
      id: "XYZ-456",
      type: "Sedan",
      rate: "$70/day",
      image: "https://source.unsplash.com/300x200/?sports-car",
    },
    {
      name: "Ford Explorer",
      id: "LMN-789",
      type: "SUV",
      rate: "$100/day",
      image: "https://source.unsplash.com/300x200/?suv",
    },
  ];

  // Inject vehicle gallery HTML
  content.innerHTML = `
      <h2>Vehicle Gallery</h2>
      <div id="vehicleGallery" class="gallery-container style="display:block"></div>
  `;

  let gallery = document.getElementById("vehicleGallery");

  // Loop through vehicles and create vehicle cards
  vehicles.forEach((vehicle) => {
    let vehicleCard = document.createElement("div");
    vehicleCard.classList.add("vehicle-card");
    vehicleCard.innerHTML = `
        <img src="carimage.com" alt="${vehicle.name}">
        <h3>${vehicle.name}</h3>
        <p><strong>Type:</strong> ${vehicle.type}</p>
        <p><strong>Rate:</strong> ${vehicle.rate}</p>
        <button onclick="bookVehicle('${vehicle.id}')">Book Now</button>
    `;
    gallery.appendChild(vehicleCard);
  });
}
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
