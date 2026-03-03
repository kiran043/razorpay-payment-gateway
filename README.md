# razorpay-payment-gateway
Razorpay payment integration using React, Node.js, Express, and MongoDB with secure signature verification and webhook implementation for production-ready payment handling.

💳 Razorpay Payment Gateway Integration

This project demonstrates a complete Razorpay payment integration using:

⚛️ React.js (Frontend)

🟢 Node.js + Express.js (Backend)

🍃 MongoDB (Database)

🔐 HMAC SHA256 Signature Verification

🔔 Webhook Implementation (Server-to-Server Confirmation)

📌 Project Objective

To implement a secure, production-ready payment system where:

Orders are created from backend

Payments are verified securely

Webhooks ensure reliability

Payment lifecycle is properly maintained

🏗️ Architecture Overview

User → React Frontend → Backend (Express) → Razorpay
Razorpay → Frontend (payment response)
Frontend → Backend (verification)
Razorpay → Backend (webhook backup)

🔄 Complete Payment Flow
1️⃣ Order Creation

Frontend:

User clicks Pay

Sends POST request to /api/payment/order

Backend:

Validates request

Calculates amount (never trust frontend)

Creates Razorpay order

Stores order in MongoDB with status = CREATED

Returns order_id to frontend

2️⃣ Razorpay Checkout

Frontend:

Opens Razorpay Checkout using order_id

User completes payment.

3️⃣ Payment Success Response

Razorpay returns:

razorpay_payment_id

razorpay_order_id

razorpay_signature

Frontend sends these to:

POST /api/payment/verify

4️⃣ Backend Verification

Backend:

Fetches order from DB

Generates HMAC SHA256 signature

Compares with razorpay_signature

If valid:

Update status = PAID

Store payment_id

If invalid:

Mark as FAILED

Frontend success ≠ Trusted payment
Backend verification is mandatory.

5️⃣ Webhook (Final Confirmation)

Razorpay sends POST request to:

/api/payment/webhook

Backend:

Verifies webhook signature

Checks event type = payment.captured

Ensures idempotency

Updates DB if not already processed

Returns 200 OK

Webhook ensures reliability in case:

User closes tab

Network failure

Verify API fails

🔐 Security Measures Implemented

Backend-controlled order creation

HMAC SHA256 signature verification

Webhook signature verification

Idempotent updates (prevent duplicate processing)

Environment-based secret storage

Status lifecycle management

📊 Payment Status Lifecycle

CREATED → PAID
CREATED → FAILED
CREATED → CANCELLED

🗂️ API Endpoints

POST /api/payment/order
POST /api/payment/verify
POST /api/payment/webhook

🛠️ How To Run Project
Backend

Install dependencies

npm install

Add .env file

RAZORPAY_KEY_ID=your_key
RAZORPAY_SECRET=your_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
MONGO_URI=your_mongodb_uri

Start server

npm run dev
Frontend
npm install
npm start
🧪 Testing

Use Razorpay Test Mode

Use test card:
4111 1111 1111 1111

Use ngrok for webhook testing

🧠 Key Learnings

Never trust frontend amount

Always verify payment signature

Webhook is final source of truth

Handle idempotency

Store payment lifecycle properly

🎯 Interview Summary

This project demonstrates secure payment architecture with backend verification, webhook reliability, and proper payment lifecycle management using modern full-stack technologies.

⭐ Future Improvements

Refund API implementation

Payment history dashboard

Admin monitoring panel

Logging system for webhook events

🧠 Memory Version (Quick Recall Section)

Order Creation → Checkout → Verify → Webhook → DB Update

🚀 End of README
💡 Pro Tip For You

At bottom of README add:

## Author
Kiran

And maybe add:

Built as part of backend learning journey.

That shows growth mindset.
