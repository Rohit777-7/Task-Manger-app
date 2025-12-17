# 🧑‍💻 Collaborative Task Manager – Backend

This is the backend of a **Collaborative Task Manager** application built with **Node.js, Express, TypeScript, Prisma, and MongoDB Atlas**.  
It supports **JWT authentication** and **task collaboration features** like created, assigned, and overdue tasks.

---

## ⚙️ Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB Atlas
- Prisma ORM
- JWT Authentication
- Zod (Validation)
- bcrypt (Password hashing)

---

## 📁 Backend Folder Structure

backend/
├── src/
│ ├── controllers/
│ ├── services/
│ ├── routes/
│ ├── middlewares/
│ ├── dtos/
│ ├── config/
│ └── server.ts
├── prisma/
│ └── schema.prisma
├── screenshots/
├── package.json
└── README.md


---

## 🔐 Authentication APIs

| Method | Endpoint | Description |
|------|---------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login & receive JWT |

- Passwords are hashed using **bcrypt**
- JWT token is returned on login
- JWT is required for protected routes

---

## ✅ Task APIs (Protected)

All below APIs require:



Authorization: Bearer <JWT_TOKEN>


| Method | Endpoint | Description |
|------|---------|-------------|
| POST | `/api/tasks` | Create a task |
| GET | `/api/tasks/created` | Tasks created by logged-in user |
| GET | `/api/tasks/assigned` | Tasks assigned to logged-in user |
| GET | `/api/tasks/overdue` | Overdue tasks |

---

## 🧪 API Testing

All APIs were tested using **Postman / Thunder Client**.

### Example: Create Task (POST `/api/tasks`)
```json
{
  "title": "Finish backend",
  "description": "Complete task manager backend",
  "dueDate": "2025-12-25T00:00:00.000Z",
  "priority": "HIGH",
  "status": "TODO",
  "assignedToId": "<USER_OBJECT_ID>"
}