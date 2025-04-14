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

(function () {
  const email = localStorage.getItem("userEmail");
  //If email is not stored, redirect to login
  if (!email) {
    window.location.href = "index.html";
    alert("Access denied: Please Login to continue!");
    return;
  }
})();

function showSection(section) {
  let content = document.getElementById("content");

  if (section === "viewVehicles") {
    fetchVehicles();
    sidebar.classList.toggle("open");
  } else if (section === "viewBookings") {
    fetchBookings();
    sidebar.classList.toggle("open");
  } else if (section === "viewProfile") {
        fetchProfile();
        sidebar.classList.toggle("open");
  }
}

function logout() {
   localStorage.removeItem("userId");
   localStorage.removeItem("userEmail");
   localStorage.removeItem("userName");
   localStorage.clear();

   window.location.href = "index.html";
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
                  <h2>User Profile</h2>
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

function fetchVehicles() {
  let content = document.getElementById("content");
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

  fetch("http://localhost:8080/vehicles/available") // Ensure this matches your backend URL
    .then((response) => {
      if (response.status === 204) {
            // No vehicles available
            gallery.innerHTML = "<p class='no-vehicles'>No vehicles available at the moment.</p>";
            return;
      }
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((vehicles) => {
      if (!vehicles) return;
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
          <button class="book-now-btn"
            data-name="${vehicle.name}"
            data-id="${vehicle.id}"
            data-category="${vehicle.category}"
            data-rate="${vehicle.pricePerDay}">
            Book Now
          </button>
        `;

        gallery.appendChild(vehicleCard);
      });

      // Attach event listeners AFTER adding elements to the DOM
      document.querySelectorAll(".book-now-btn").forEach((button) => {
        button.addEventListener("click", function () {
          const name = this.getAttribute("data-name");
          const id = this.getAttribute("data-id");
          const category = this.getAttribute("data-category");
          const rate = this.getAttribute("data-rate");
          openBookingForm(name, id, category, rate);
        });
      });
    })
    .catch((error) => console.error("Error fetching vehicles:", error));
}

// Function to Open Booking Form (Modal Popup)
function openBookingForm(name, id, type, rate) {
  let formContainer = document.getElementById("bookingFormContainer");
  let modal = document.getElementById("bookingModal");
  modal.style.display = "flex";

  formContainer.innerHTML = `
        <h2>Book Vehicle</h2>
        <form id="bookingForm">
            <label for="vehicleName">Vehicle Name:</label>
            <input type="text" id="vehicleName" name="vehicleName" value="${name}" readonly><br>

            <label for="vehicleId">Vehicle ID:</label>
            <input id="vehicleId" name="vehicleId" type="number" value="${id}" readonly><br>

            <label for="vehicleType">Type:</label>
            <input type="text" id="vehicleType" name="vehicleType" value="${type}" readonly><br>

            <label for="rate">Rate per Day ($):</label>
            <input type="text" id="rate" name="rate" value="${rate}" readonly><br>

            <label for="startDate">Start Date:</label>
            <input type="date" id="startDate" name="startDate" min="" required><br>

            <label for="endDate">End Date:</label>
            <input type="date" id="endDate" name="endDate" required><br>

            <label for="totalPrice">Total Price ($):</label>
            <input type="text" id="totalPrice" name="totalPrice" readonly><br>

            <button type="button" onclick="calculatePrice()">Calculate Price</button>
            <button type="submit" onclick="submitBooking()">Confirm Booking</button>
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

//  if (days < 1) {
//    alert("End date must be after the start date.");
//    return;
//  }

  let totalPrice = (days+1) * rate;
  document.getElementById("totalPrice").value = `${totalPrice.toFixed(2)}`;
}

function submitBooking() {
  let bookingData = {
    userName: localStorage.getItem("userName"),
    userId: localStorage.getItem("userId"),
    status:"CONFIRMED",
    vehicleId: document.getElementById("vehicleId").value,
    vehicleName: document.querySelector("input[value][readonly]").value,
    startDate: document.getElementById("startDate").value,
    endDate: document.getElementById("endDate").value,

  };

  fetch(`http://localhost:8080/bookings/create?email=${localStorage.getItem("userEmail")}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  })
    .then((response) => {
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(err.message || "Something went wrong! Please try again.");
          });
        }
        return response.text(); // Backend returns plain text for success
      })
      .then((message) => {
        alert("✅ " + message); // Show only success message
        document.getElementById("bookingModal").style.display = "none";
      })
      .catch((error) => {
        alert("⚠️ " + error.message); // Show only meaningful error messages
        console.error("Error creating booking:", error);
      });
}


function fetchBookings() {
    fetch(`http://localhost:8080/bookings/userHistory?email=${localStorage.getItem("userEmail")}`)
        .then(response => response.json())
        .then(data => {
            displayBookings(data); // Call function to display data
        })
        .catch(error => console.error('Error fetching bookings:', error));
}

function displayBookings(bookings) {
    let content = document.getElementById("content");
    if (bookings.length === 0) {
            content.innerHTML = `<h3>No previous bookings found.</h3>`;
            return;
        }

    // Creating the table structure
    let tableHTML = `
        <h2>Booking History</h2>
        <table border="1" cellspacing="0" cellpadding="8">
            <tr>
                <th>Booking ID</th>
                <th>User Name</th>
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
                <td>${booking.userName}</td>
                <td>${booking.vehicleName}</td>
                <td>${booking.status}</td>
                <td>${booking.startDate}</td>
                <td>${booking.endDate}</td>
            </tr>`;
    });

    tableHTML += `</table>`;
    content.innerHTML = tableHTML;
}

