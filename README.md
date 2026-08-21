# API Student Management

This project is a backend application dedicated to student management through a REST API.

## 🚀 Features

* Student management with CRUD operations.
* JWT authentication.
* Role-based authorization.
* User roles: `USER` and `ADMIN`.
* Student statistics.
* Input validation and error handling.

## 🛠️ Technologies Used

* Node.js
* Express
* TypeScript
* PostgreSQL
* JWT
* bcrypt
* Postman

## 🔒 Security

The API uses JWT for authentication and role-based authorization.

* `USER`: access to standard features.
* `ADMIN`: access to administrative features.

Protected endpoints require a valid Bearer Token.

## 📦 Installation and Setup

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd <project-directory>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file and configure the required database and JWT variables.

### 4. Start the application

```bash
npm run dev
```

The API runs on:

```text
http://localhost:3000
```

## 🔌 Main API Endpoints

### Authentication

* `POST /auth/register` — Register a new user.
* `POST /auth/login` — Login and receive a JWT token.

### Students

* `GET /students` — Get all students.
* `GET /students/:id` — Get a student by ID.
* `POST /students` — Create a student.
* `PUT /students/:id` — Replace a student.
* `PATCH /students/:id` — Update a student.
* `DELETE /students/:id` — Delete a student.

## 🧪 Testing

The API can be tested using Postman with authentication and role-based authorization scenarios.

## 📁 Project Structure

The project follows an MVC-based architecture with separate controllers, services, repositories, models, routes, and security components.
