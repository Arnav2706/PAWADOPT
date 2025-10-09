# 🐾 PawAdopt – A Pet Adoption Portal

PawAdopt is a **full-stack web application** that connects pet adopters with shelters and sellers.  
Users can browse adoptable pets, purchase pet products, learn about pet care, and securely complete payments online.  
An **admin dashboard** allows easy management of pets, users, orders, and adoption requests.

---

## 🌐 Live Demo

**Frontend:** [Vercel Deployment URL]()  
**Backend:** [Render / Railway Deployment URL]()  

---

## 🧠 Project Overview

PawAdopt simplifies pet adoption and pet care shopping into one integrated platform.  
It provides a smooth and responsive user interface with powerful backend management.

### ✨ Key Features
- 🐶 **Pet Adoption:** Browse, view details, and request adoption of pets.  
- 🛍️ **Pet Shop:** Buy pet care products online with cart and checkout.  
- 🔍 **Search Filters:** Filter pets by type, breed, and age.  
- ❤️ **Wishlist:** Save pets or products for later.  
- 💳 **Payment Integration:** Razorpay sandbox for secure, dummy payments.  
- 🧑‍💻 **User & Admin Login:** Role-based authentication and access control.  
- 📘 **First-Time Buyer Guide:** Learn about pet breeds and care tips.  
- 🧾 **Admin Dashboard:** Manage pets, products, users, and orders.

---

## 🧩 Modules Breakdown

| Module | Description |
|--------|--------------|
| 1. Pet Adoption | Users can view and adopt pets listed by admin |
| 2. E-commerce | Pet supplies and product management |
| 3. Admin Dashboard | Manage pets, products, orders, and adoption requests |
| 4. Login/Register | User and admin authentication system |
| 5. Razorpay Payments | Dummy checkout payments |
| 6. Wishlist | Save favorite pets and products |
| 7. Pet Search | Filter pets by breed, type, and age |
| 8. Buyer Guide | Pet care and breed information |
| 9. Contact/About | Project details and team information |

---

## 💻 Tech Stack

### 🖥️ Frontend
- **React.js** – Component-based UI library  
- **Tailwind CSS** – Utility-first modern styling  
- **Axios** – For REST API calls  
- **React Router** – For page navigation  
- **Razorpay Checkout.js** – Payment integration  
- **Vercel** – Frontend deployment  

### ⚙️ Backend
- **Java Spring Boot** – RESTful API framework  
- **Spring Data JPA** – ORM for database operations  
- **MySQL** – Relational database  
- **Lombok** – Boilerplate code reduction  
- **Maven** – Build automation  
- **Render / Railway** – Backend hosting platform  

### 🧰 Tools
- **VS Code** – Frontend development  
- **Postman** – API testing  
- **GitHub** – Version control  
- **MySQL Workbench** – Database visualization  
- **Lovable / React Builder** – UI generation helper  

---

## 🧑‍💻 Authentication Flow

| Role | Access |
|------|--------|
| **User** | View pets, add to wishlist, adopt pets, make payments |
| **Admin** | Add/Edit/Delete pets and products, manage users and orders |

---

## 💳 Payment Integration (Razorpay Sandbox)

- Razorpay test mode is used for dummy checkout payments.  
- Payment flow:
  1. User clicks **“Pay Now”**  
  2. React app calls `/api/payment/create-order`  
  3. Spring Boot creates order via Razorpay API  
  4. Razorpay popup appears for payment  
  5. On success → `/api/orders` is called to save order

---

## 🚀 Deployment

| Component | Platform | URL |
|------------|-----------|-----|
| Frontend | Vercel | [https://pawadopt.vercel.app](https://pawadopt.vercel.app) |
| Backend | Render / Railway | [https://pawadopt-backend.onrender.com](https://pawadopt-backend.onrender.com) |
| Database | MySQL | Hosted locally or via Railway |

---

## ⚙️ Local Setup Guide

### 1️⃣ Clone Repository
```bash
git clone https://github.com/yourusername/pawadopt.git
2️⃣ Backend Setup (Spring Boot)
bash
Copy code
cd backend
mvn clean install
mvn spring-boot:run
Edit application.properties:

properties
Copy code
spring.datasource.url=jdbc:mysql://localhost:3306/pawadopt_db
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
3️⃣ Frontend Setup (React)
bash
Copy code
cd frontend
npm install
npm start
Frontend runs on http://localhost:3000

📘 API Overview
Module	Endpoint	Method	Description
Auth	/api/auth/register	POST	Register new user
/api/auth/login	POST	User login
Pets	/api/pets	GET	Fetch all pets
/api/pets/{id}	GET	Fetch single pet
/api/pets/search	GET	Search pets by filters
Products	/api/products	GET	Fetch product list
Orders	/api/orders	POST	Create new order
Wishlist	/api/wishlist	POST / GET / DELETE	Manage favorites
Payment	/api/payment/create-order	POST	Create Razorpay order
Admin	/api/admin/*	GET/POST/PUT/DELETE	Manage data

👨‍💼 Team Members
Name	Role
Arnav Kumar	Project Lead & Full Stack Developer
Akash Gupta	Backend Developer
Srijan	Frontend Developer


🏗️ Future Enhancements
JWT-based authentication

Email notifications on adoption

AI-based pet matching recommendations

File uploads via Cloudinary

📜 License
This project is open source under the MIT License.

🐕 “Adopt, don’t shop — every pet deserves a home!” 