# 🏢 Dynamic Udyam Registration Form

This project replicates the **first two steps** of the Udyam Registration portal — Aadhaar + OTP validation and PAN validation — with **real-time validation** and a **dynamic UI** rendered from a scraped JSON schema.

## 🚀 Features
- Web scraping of form fields, labels, and validation patterns (Python + BeautifulSoup)
- Responsive, mobile-first frontend (React + TypeScript / Next.js)
- Dynamic form rendering from JSON schema (no hardcoded fields)
- Real-time validation (Aadhaar, OTP, PAN formats)
- Backend API for validation and saving submissions (Node.js + Express + Prisma + PostgreSQL)
- Bonus: Auto-fill city/state from PIN code (PostPin API)
- Bonus: Progress tracker for steps 1 & 2
- Unit testing with Jest
- Dockerized for easy deployment

---

## 🛠 Tech Stack
**Frontend:** React / Next.js, TypeScript, TailwindCSS  
**Backend:** Node.js, Express, Prisma ORM, PostgreSQL  
**Scraping:** Python (BeautifulSoup)  
**Testing:** Jest  
**Deployment:** Vercel (frontend), Railway (backend), Docker

---

## 📂 Folder Structure
