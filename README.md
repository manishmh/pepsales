# 📬 PepSales Notification Service

A simple notification microservice built with **Express**, **TypeScript**, **Prisma**, and **PostgreSQL** (NeonDB), that supports:

- Email notifications using Nodemailer
- SMS notifications (via custom provider logic in `SendSms`)
- In-app notifications stored in a database

---

## 🛠️ Tech Stack

- **Node.js / Express** – API Server
- **TypeScript** – Type safety
- **Prisma** – ORM for PostgreSQL
- **NeonDB** – Hosted PostgreSQL backend
- **Nodemailer** – Email delivery
- **Custom SMS Service** – Placeholder for integration (e.g., Twilio, Nexmo)

---

## 📬 Notification API Endpoints

---

### **GET** `/users/:id/notifications`

Get all notifications for a user.

**Response:**

```json
{
  "success": true,
  "message": "Notifications fetched",
  "notifications": [...]
}
```

### **POST** `/notifications`

Create notification by email, sms, or in-app

**Response:**

```json
{
  {
  "success": true,
  "message": "Notification sent",
  "notification": {
    "id": "notif-id-123",
    "userId": "user-uuid-123",
    "type": "email",
    "subject": "Welcome!",
    "message": "Thanks for joining our platform.",
    "recipient": "user@example.com",
    "createdAt": "2025-05-18T12:00:00.000Z"
  }
}
```
