# Sales Savvy - Full-Stack E-Commerce Platform

Sales Savvy is a robust, full-stack e-commerce application designed to provide a seamless shopping experience for users and a powerful management interface for administrators. Built with a modern microservices architecture, it ensures scalability, security, and high performance.

## 🚀 Features

### For Users
*   **Secure Authentication**: JWT-based registration and login system.
*   **Product Exploration**: Browse categories, search for products, and view detailed information.
*   **Shopping Cart**: Dynamic cart management with real-time price calculation.
*   **Order Tracking**: Place orders and view order history with status updates.
*   **Responsive UI**: Optimized for all devices using Tailwind CSS and Framer Motion.

### For Administrators
*   **Product Management**: Full CRUD operations for products and categories.
*   **User Oversight**: Manage user roles and view account details.
*   **Order Fulfillment**: Track and update order statuses (Pending, Paid, Shipped, Delivered).

## 🏗️ System Architecture

The application follows a **Microservices Architecture** to decouple core functionalities:
*   **Frontend**: A modern React.js application using Vite for speed and Tailwind CSS for styling.
*   **Backend**: Five independent Spring Boot services communicating with a centralized MySQL database.
*   **Database**: Relational data modeling for users, products, orders, and payments.

## 🛠️ Tech Stack

*   **Frontend**: React.js 19, Vite, Tailwind CSS 4.0, Framer Motion, Axios, Lucide React.
*   **Backend**: Java 17+, Spring Boot 3.2.x, Spring Security, JWT (nimbus-jose-jwt).
*   **Build Tool**: Maven 3.9+.
*   **Database**: MySQL 8.0.
*   **State Management**: React Context API.

## ⚙️ Installation & Setup

### Prerequisites
*   Java JDK 17 or higher
*   Node.js (v18+) & npm
*   MySQL Server
*   Maven

### 1. Database Setup
1. Open your MySQL terminal or workbench.
2. Create the database: `CREATE DATABASE sales_savvy;`
3. The microservices are configured to auto-generate tables upon the first run.

### 2. Backend Services (Spring Boot)
Each service must be started independently:
1. Navigate to each service directory: `AdminService`, `OrderManagementService`, `PaymentService`, `ProductService`, `UserManagementService`.
2. Run the following command in each:
   ```bash
   mvn spring-boot:run
   ```
*Alternatively, use the provided `launch_all.ps1` PowerShell script in the root directory.*

### 3. Frontend Setup (React)
1. Navigate to the `sales-savvy-frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Access the app at `http://localhost:5173`.

## 📡 API Endpoints (Samples)

| Method | Endpoint | Description | Port |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Register a new user | 8081 |
| `POST` | `/api/auth/signin` | Authenticate and get JWT | 8081 |
| `GET` | `/api/products` | Fetch all products | 8082 |
| `GET` | `/api/products/{id}` | Get product details | 8082 |
| `POST` | `/api/orders` | Place a new order | 8083 |

## 📷 Screenshot
![Sales Savvy Dashboard](../assets/preview.png)

## 🔮 Future Enhancements
*   **Payment Gateway**: Integration with Stripe and PayPal for real-time transactions.
*   **Smart Recommendations**: AI-driven product suggestions based on user behavior.
*   **Reviews & Ratings**: Comprehensive feedback system for products.
*   **Multilingual Support**: Localization for global reach.

## 👨‍💻 Author
**Rupesh kumar Gupta**
*Full-Stack Developer Specializing in Java Microservices & React*

## 📄 License
This project is licensed under the MIT License.
