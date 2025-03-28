let sidebar = document.querySelector(".sidebar");
let toggleBtn = document.createElement("div");
let today = new Date().toISOString().split("T")[0];
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

  if (section === "viewVehicles") {
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

function fetchVehicles() {
  let content = document.getElementById("content");

  // Sample vehicle data (Replace with API data when backend is ready)
  const vehicles = [
    {
      name: "Toyota Camry",
      id: "ABC-123",
      type: "Sedan",
      rate: 75,
      image: "https://source.unsplash.com/300x200/?car",
    },
    {
      name: "Honda Civic",
      id: "XYZ-456",
      type: "Sedan",
      rate: 70,
      image: "https://source.unsplash.com/300x200/?sports-car",
    },
    {
      name: "Ford Explorer",
      id: "LMN-789",
      type: "SUV",
      rate: 100,
      image: "https://source.unsplash.com/300x200/?suv",
    },
  ];

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

  // Loop through vehicles and create vehicle cards
  vehicles.forEach((vehicle) => {
    let vehicleCard = document.createElement("div");
    vehicleCard.classList.add("vehicle-card");
    vehicleCard.innerHTML = `
          <img src="${vehicle.image}" alt="${vehicle.name}">
          <h3>${vehicle.name}</h3>
          <p><strong>Type:</strong> ${vehicle.type}</p>
          <p><strong>Rate:</strong> $${vehicle.rate}/day</p>
          <button class="book-now-btn" data-name="${vehicle.name}" data-id="${vehicle.id}" data-type="${vehicle.type}" data-rate="${vehicle.rate}">Book Now</button>
      `;
    gallery.appendChild(vehicleCard);
  });

  // Attach event listeners to all "Book Now" buttons
  document.querySelectorAll(".book-now-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const name = this.getAttribute("data-name");
      const id = this.getAttribute("data-id");
      const type = this.getAttribute("data-type");
      const rate = this.getAttribute("data-rate");
      openBookingForm(name, id, type, rate);
    });
  });
}

// Function to Open Booking Form (Modal Popup)
function openBookingForm(name, id, type, rate) {
  let formContainer = document.getElementById("bookingFormContainer");
  let modal = document.getElementById("bookingModal");
  modal.style.display = "flex";

  formContainer.innerHTML = `
        <h2>Book Vehicle</h2>
        <form id="bookingForm">
            <label>Vehicle Name:</label>
            <input type="text" value="${name}" readonly><br>

            <label>Vehicle ID:</label>
            <input type="text" value="${id}" readonly><br>

            <label>Type:</label>
            <input type="text" value="${type}" readonly><br>

            <label>Rate per Day ($):</label>
            <input type="text" id="rate" value="${rate}" readonly><br>

            <label>Start Date:</label>
            <input type="date" id="startDate" min="" required><br>

            <label>End Date:</label>
            <input type="date" id="endDate" required><br>

            <label>Total Price ($):</label>
            <input type="text" id="totalPrice" readonly><br>

            <button type="button" onclick="calculatePrice()">Calculate Price</button>
            <button type="submit">Confirm Booking</button>
        </form>
    `;
  document.getElementById("startDate").setAttribute("min", today);
}

// Function to Close Modal Popup
function closeBookingForm() {
  document.getElementById("bookingModal").style.display = "none";
}

// Function to Calculate Booking Price
function calculatePrice() {
  let startDate = new Date(document.getElementById("startDate").value);
  let endDate = new Date(document.getElementById("endDate").value);
  let rate = parseFloat(document.getElementById("rate").value);

  if (isNaN(startDate) || isNaN(endDate)) {
    alert("Please select valid start and end dates.");
    return;
  }

  let timeDifference = endDate.getTime() - startDate.getTime();
  let days = timeDifference / (1000 * 3600 * 24);

  if (days < 1) {
    alert("End date must be after the start date.");
    return;
  }

  let totalPrice = days * rate;
  document.getElementById("totalPrice").value = `${totalPrice.toFixed(2)}`;
}

function fetchBookings() {
  // Fetch bookings from backend
  let content = document.getElementById("content");
  content.innerHTML = `
        <h2>Booking History</h2>
        <table>
            <tr>
                <th>Booking Id</th>
                <th>User Id</th>
                <th>User</th>
                <th>Vehicle Id</th>
                <th>Vehicle</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
            </tr>
            <tr>
                <td>1</td>
                <td>1</td>
                <td>John Doe</td>
                <td>1</td>
                <td>Honda Civic</td>
                <td>May 10, 2023</td>
                <td>May 15, 2023</td>
                <td>Completed</td>
            </tr>
        </table>
    `;
}
