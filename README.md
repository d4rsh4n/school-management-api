#  School Management API

A School Management API built with **Node.js, Express, and MySQL**.  
It provides RESTful endpoints for managing school data with CRUD functionality, input validation, and database integration.  
Tested with **Postman** and prepared for deployment via **Railway**.

---

##  Features
- Create, read, update, and delete school records
- Input validation with error handling
- RESTful architecture (JSON-based)
- Tested using Postman
- Ready for cloud deployment (Railway)

---

##  Tech Stack
- **Backend:** Node.js, Express.js  
- **Database:** MySQL  
- **Tools:** Postman, Railway, Git, GitHub  

---

## 📂 Project Structure
├── server.js # Main server file
├── package.json # Dependencies and scripts
├── .gitignore # Ignored files
├── README.md # Project documentation
└── a.distance # (Temporary file - can be removed if unused)

---

## ⚡ Endpoints

| Method | Endpoint          | Description                |
|--------|-------------------|----------------------------|
| POST   | /addSchool        | Add a new school           |
| GET    | /listSchools      | Get all schools            |

---

## 💻 Installation & Setup

```bash
# Clone the repo
git clone https://github.com/d4rsh4n/school-management-api.git

# Navigate into the project
cd school-management-api

# Install dependencies
npm install

# Run the server
node server.js

Testing with Postman

Import the API collection into Postman

Use /addSchool and /listSchools to test CRUD functionality

Ensure your MySQL database is running with the correct credentials in .env

What I Learned

Setting up a Node.js + Express backend

MySQL integration with REST APIs

Using Postman for testing endpoints

Preparing apps for cloud deploymen

Author

Darshan Santhose


