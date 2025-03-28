document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get email and password from input fields
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Create request payload
    const requestData = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });



      if (response.ok) {
        // Fetch user details to check role
        const userResponse = await fetch(
          `http://localhost:8080/users/${email}`
        );
        const userData = await userResponse.json();


        if (userData.role === "ADMIN") {
          localStorage.setItem("userEmail", email);
          window.location.href = "admin.html"; // Redirect to admin dashboard
        } else {
        localStorage.setItem("userId",userData.id);
        localStorage.setItem("userName",userData.name);

         localStorage.setItem("userEmail", email);
          window.location.href = "user.html"; // Redirect to user dashboard
        }
      } else {
        alert("Invalid email or password!"); // Show error message
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Something went wrong. Please try again later.");
    }
  });
});
