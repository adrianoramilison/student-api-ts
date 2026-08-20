# API Student Management

This project is a backend application dedicated to student management (API Student).

## 🚀 Features
- Student management (Create, Read, Update, Delete - CRUD).
- Secure authentication system.

## 🔒 Security
- Authentication and authorization are secured using **JWT Tokens** (JSON Web Tokens).
- Protected endpoints require a valid Bearer Token in the HTTP Authorization header.

## 🛠️ Technologies Used
- Backend: [e.g., Node.js / Express]
- Database: [e.g. PostgreSQL]
- Security: JWT (JSON Web Tokens)

## 📦 Installation and Setup

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   ```

2. Install the dependencies:
   ```bash
   npm install  # (or the command corresponding to your technology)
   ```

3. Configure the environment variables (create a `.env` file).

4. Start the application in development mode:
   ```bash
   npm run dev  # (or your specific startup command)
   ```

## 🔌 API Endpoints

### 🔑 Authentication
- `POST /auth/register` : Register a new user/admin.
- `POST /auth/login` : Authenticate a user and receive a JWT token.

### 🎓 Students Management
- `GET /api/students` : Retrieve a list of all students.
- `GET /api/students/:id` : Retrieve a specific student by their ID.
- `POST /api/students` : Add a new student (Requires JWT).
- `PUT /api/students/:id` : Update a student's information (Requires JWT).
- `DELETE /api/students/:id` : Delete a student (Requires JWT).
