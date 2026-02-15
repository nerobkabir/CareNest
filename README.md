# CareNext

**Baby Sitting & Elderly Care Service Platform**

Care.IO একটি ওয়েব অ্যাপ্লিকেশন যা ব্যবহারকারীদের শিশু, বৃদ্ধ বা অসুস্থ ব্যক্তির জন্য নির্ভরযোগ্য এবং trusted care service বুক করতে সাহায্য করে।  
ব্যবহারকারী সহজেই সার্ভিস বুক করতে পারবে তার প্রয়োজনীয় সময়কাল এবং অবস্থান অনুযায়ী।  
লক্ষ্য হচ্ছে caregiving কে সহজ, নিরাপদ এবং অ্যাক্সেসেবল করা।  

---

## Table of Contents
- [Key Features](#key-features)
- [Pages & Routes](#pages--routes)
- [Booking Flow](#booking-flow)
- [Authentication](#authentication)
- [Private Pages](#private-pages)
- [Error Handling](#error-handling)
- [Challenges](#challenges)
- [Optional Features](#optional-features)
- [Environment Variables](#environment-variables)
- [Tech Stack](#tech-stack)
- [Setup & Run](#setup--run)

---

## Key Features
- **Responsive Design:** Mobile, tablet, and desktop supported  
- **User Authentication:** Email & Password, Google Social Login  
- **Dynamic Booking:** Duration, Location (Division, District, City, Area), Address input  
- **Total Cost Calculation:** Automatically calculate based on `duration × service charge`  
- **Booking Status:** Pending / Confirmed / Completed  
- **My Booking Page:** Track all user bookings and status  
- **Services Overview:** Baby Care, Elderly Service, Sick People Service  
- **Service Detail Pages:** Individual page for each service with details and Book Service button  

---

## Pages & Routes

### 1. Homepage
- Banner / Slider with caregiving motivation  
- About section explaining platform mission  
- Services overview: Baby Care, Elderly Service, Sick People Service  
- Testimonials / Success metrics  

### 2. Service Detail Page (`/service/:service_id`) 
- Show detailed information about selected service  
- "Book Service" button navigates to Booking Page / Login  

### 3. Booking Page (`/booking/:service_id`) – Private Route
- Select Duration (days/hours)  
- Select Location: Division, District, City, Area / Address  
- Show Total Cost dynamically  
- Confirm Booking → Booking saved with status = Pending  

### 4. Authentication
- **Login Page:** Email, Password  
- **Registration Page:** NID No, Name, Email, Contact, Password  
- Password validation: 6+ char, 1 uppercase, 1 lowercase  
- Redirect to Booking Page after registration  
- Logged-in users should **not redirect to Login page** on private route reload  

### 5. My Booking Page (`/my-bookings`) – Private Route
- Show all bookings with: Service Name, Duration, Location, Total Cost, Status  
- Buttons: View Details / Cancel Booking  

### 6. Error Page (404)
- Show Not Found message with a button to return to Home  

---

## Booking Flow
1. User selects service → Service Detail page  
2. Clicks **Book Service** → Redirect to Booking Page  
3. Select duration, location, address  
4. Total cost calculated dynamically  
5. Confirm booking → Status = Pending  
6. Send user email invoice (if implemented)  

---

## Challenges / Extra Features
- Implement **Metadata** on Home & Service Details page  
- Send email invoice when service booked  
- Optional: Stripe Payment Integration  
- Optional: Admin Dashboard to manage bookings, show payment history  

---

## Environment Variables
- All keys should be stored in environment variables. Example `.env.local`:

```env
# MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<your_nextauth_secret>

# Google OAuth
GOOGLE_CLIENT_ID=<your_google_client_id>
GOOGLE_CLIENT_SECRET=<your_google_client_secret>

# Email (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=<your_email>
EMAIL_PASS=<your_email_app_password>

# Stripe
STRIPE_SECRET_KEY=<your_stripe_secret_key>
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<your_stripe_publishable_key>
