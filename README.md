# razorpay-payment-gateway
Razorpay payment integration using React, Node.js, Express, and MongoDB with secure signature verification and webhook implementation for production-ready payment handling.

# 💳 Razorpay Payment Gateway Integration

A secure and production-ready Razorpay payment integration built using:

- ⚛️ React.js (Frontend)
- 🟢 Node.js + Express.js (Backend)
- 🍃 MongoDB (Database)
- 🔐 HMAC SHA256 Signature Verification
- 🔔 Webhook Implementation (Server-to-Server Confirmation)

---

# 📌 Project Objective

To implement a secure payment system where:

- Orders are created from backend
- Payments are verified securely
- Webhooks ensure reliability
- Payment lifecycle is properly managed
- Idempotent updates prevent duplicate processing

---

# 🏗️ Architecture Overview

User
↓
React Frontend
↓
POST /api/payment/order
↓
Backend (Express API)
↓
Razorpay (Create Order)
↓
MongoDB (Store: CREATED)
↓
Frontend (Open Checkout)
↓
Razorpay (Process Payment)
↓
Frontend (payment_id, signature)
↓
POST /api/payment/verify
↓
Backend (HMAC Verification)
↓
MongoDB (Update: PAID)
↓
Razorpay → Webhook
↓
POST /api/payment/webhook
↓
Backend (Verify Webhook + Idempotency)
↓
Final Confirmation


---

# 🔄 Complete Payment Flow

## 🟢 1️⃣ Order Creation

### Frontend
- User clicks **Pay**
- Sends `POST /api/payment/order`

### Backend
- Validate request
- Calculate amount (**Never trust frontend**)
- Create Razorpay order
- Store in MongoDB with status = `CREATED`
- Return `order_id`

---

## 🟢 2️⃣ Razorpay Checkout

Frontend opens Razorpay Checkout using `order_id`.

User completes payment.

---

## 🟢 3️⃣ Payment Verification

Razorpay returns:

- `razorpay_payment_id`
- `razorpay_order_id`
- `razorpay_signature`

Frontend sends:

POST /api/payment/verify

Backend:

- Fetch order from DB
- Generate HMAC SHA256 signature
- Compare with received signature

### ✅ If valid:
- Update status → `PAID`
- Store `payment_id`

### ❌ If invalid:
- Mark as `FAILED`

> ⚠️ Frontend success ≠ Trusted payment  
> Backend verification is mandatory.

---

## 🟢 4️⃣ Webhook (Final Source of Truth)

Razorpay sends:

POST /api/payment/webhook

Backend:

- Verify webhook signature
- Check event = `payment.captured`
- Ensure idempotency
- Update DB if not already processed
- Return `200 OK`

Webhook handles:

- User closes tab
- Network failure
- Verification API failure

---

# 🔐 Security Measures Implemented

- Backend-controlled order creation
- HMAC SHA256 signature verification
- Webhook signature validation
- Idempotent updates
- Environment-based secret storage
- Payment lifecycle management

---

# 📊 Payment Status Lifecycle

CREATED → PAID
CREATED → FAILED
CREATED → CANCELLED

---

# 🗂️ API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/payment/order` | Create Razorpay order |
| POST | `/api/payment/verify` | Verify payment signature |
| POST | `/api/payment/webhook` | Handle webhook events |

---

# 🛠️ Setup Instructions

## 🔹 Backend Setup

### 1️⃣ Install dependencies
npm install

2️⃣ Create .env file

RAZORPAY_KEY_ID=your_key
RAZORPAY_SECRET=your_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
MONGO_URI=your_mongodb_uri

3️⃣ Start server
npm run dev

🔹 Frontend Setup
npm install
npm start

🧪 Testing

Use Razorpay Test Mode

Test Card:

4111 1111 1111 1111

Any future expiry

CVV: 123

OTP: 123456

Use ngrok for webhook testing

🧠 Key Learnings

Never trust frontend amount

Always verify payment signature

Webhook is final confirmation

Handle duplicate webhook events

Maintain clean payment lifecycle

🎯 Interview Summary

Implemented a secure Razorpay integration with backend signature verification and webhook reliability to ensure production-ready payment processing using Node.js and MongoDB.

⭐ Future Improvements

Refund API implementation

Payment history dashboard

Admin monitoring panel

Webhook event logging

Cloud deployment

🧠 Quick Recall Flow
Order Creation → Checkout → Verify → Webhook → DB Update


<img width="3132" height="3114" alt="_- visual selection (1)" src="https://github.com/user-attachments/assets/9b1b1577-d4c8-45a4-9503-0da93683fb3e" />


