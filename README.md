Property Management System  | Système de Gestion Immobilière

A full stack property management web app for landlords to track tenants and rent payments — built with the MERN stack and deployed on Railway.

Live demo: [landlordhub.up.railway.app](https://landlordhub.up.railway.app/)

Features : 

Tenant Management — Add, edit, and delete tenants with contact info and unit numbers
Payment Tracking — Log rent payments with amount, date, and status (Paid / Pending / Late)
Dashboard Overview — See total tenants, payments made, total amount collected, and pending/unpaid count at a glance
Recent Tenants — Quick view of the 5 most recently added tenants
Search & Filter — Search payments by tenant name or unit number
Edit & Delete — Update or remove tenant and payment records in real time


Tech Stack : 

- Frontend

React (Vite)
Tailwind CSS + DaisyUI
Lucide React (icons)
React Hot Toast (notifications)

- Backend

Node.js
Express.js
Mongoose (ODM)
MongoDB (Atlas)

Getting Started

Prerequisites: 

Node.js v18+
MongoDB Atlas account (or local MongoDB)


1. Clone the repo: 
bashgit clone https://github.com/marwane-41/LandlordHub.git
cd LandlordHub

3. Set up environment variables: 
Create a .env file inside the backend/ folder 

5. Install dependencies
bash# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

4. Run the app
bash# In /backend
npm run dev

# In /frontend (separate terminal)
npm run dev


Planned Features

 Authentication (JWT) — per-landlord data isolation
 Tenant profile pages with full payment history
 Monthly revenue chart
 Lease start/end date tracking with expiry warnings
 CSV/PDF export for accounting
 Email reminders for overdue rent

Some screenshots from the platform : 

  <img width="1422" height="478" alt="Screenshot 2026-02-24 at 3 22 32 PM" src="https://github.com/user-attachments/assets/47f34d95-8b0c-4dfd-a391-cff46fafef39" /> 
<img width="1228" height="706" alt="Screenshot 2026-02-25 at 1 49 11 PM" src="https://github.com/user-attachments/assets/001b5b76-6436-4b98-86d6-4fad6f0b1678" />

