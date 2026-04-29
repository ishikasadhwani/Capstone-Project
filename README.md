# Capstone-Project
# 🚗 Vehicle Rental System

A **Spring Boot** + **PostgreSQL** based Vehicle Rental System with a responsive **HTML/CSS/JavaScript** frontend. This system is built as a Capstone Project to manage user roles, vehicles and bookings efficiently. This is important project for freshers.

🔗 **GitHub Repository:** [Capstone Project](https://github.com/ishikasadhwani/Capstone-Project)

---

## 📌 Features

### 👩‍💼 Admin Panel
- Register new users
- View all users
- Manage all vehicles (Add/View)
- View all bookings

### 🙋‍♀️ User Panel
- View available vehicles
- Book vehicles
- View personal booking history

---

## 🧰 Tech Stack

| Layer       | Technology               |
|-------------|---------------------------|
| Backend     | Spring Boot (v3.3.10)     |
| Database    | PostgreSQL (local setup)  |
| Frontend    | HTML, CSS, JavaScript     |
| Versioning  | Git                       |

---

## 🗂 Folder Structure

```text
src
├── main
│   ├── java
│   │   └── com.capstone.vehicleRentalSystem
│   │       ├── config
│   │       ├── controller
│   │       ├── dto
│   │       ├── entity
│   │       ├── exceptionHandler             
│   │       ├── repository
│   │       └── service
│   └── resources
│       ├── static
│       │   ├── *.html
│       │   ├── *.js
│       │   ├── *.css
│       │   └── *.png
│       ├── templates
│       └── application.properties
```

---

## 🔐 API Endpoints

All endpoints are secured based on user roles (Admin/User).

### 👩‍💼 Admin APIs

| Endpoint            | Method | Description           |
|---------------------|--------|-----------------------|
| `/users/all`        | GET    | View all users        |
| `/users/register`   | POST   | Register new user     |
| `/vehicles/all`     | GET    | View all vehicles     |
| `/vehicles/add`     | POST   | Add new vehicle       |
| `/bookings/all`     | GET    | View all bookings     |

### 🙋 User APIs

| Endpoint                  | Method | Description                 |
|---------------------------|--------|-----------------------------|
| `/users/getByEmail`       | GET    | Get user by email           |
| `/vehicles/available`     | GET    | View available vehicles     |
| `/bookings/userHistory`   | GET    | View user booking history   |
| `/bookings/create`        | POST   | Book a vehicle              |

> 🧪 All endpoints are tested using Postman. See `VEHICLE RENTAL SYSTEM.postman_collection.json`

---

## 🖥 Frontend Pages

| File           | Description         |
|----------------|---------------------|
| `login.html`   | User/Admin login    |
| `admin.html`   | Admin dashboard     |
| `user.html`    | User dashboard      |

🛠 Handled by:
- `admin.js`, `user.js`,`login.js`
- `style.css`, `admin.css`, `user.css`

---

## 🚀 Getting Started

### Prerequisites
- Java 17+
- PostgreSQL
- Maven
- IntelliJ IDEA / any IDE

### Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/ishikasadhwani/Capstone-Project.git
```

2. **Configure database** in `application.properties`
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/vehiclerental
spring.datasource.username=your_username
spring.datasource.password=your_password
```

3. **Run the application**
```bash
./mvnw spring-boot:run
```

4. **Access frontend**
   Open HTML files from `src/main/resources/static/` in a browser.

---

## 📩 Contact

**Project by:** Ishika Sadhwani  
📧 Email: ishikasadhwani.tech@gmail.com

---

