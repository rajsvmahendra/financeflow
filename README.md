# 💰 FinanceFlow - Premium Finance Dashboard

<div align="center">

![FinanceFlow Banner](https://img.shields.io/badge/FinanceFlow-Premium%20Dashboard-6366f1?style=for-the-badge\&logo=react\&logoColor=white)

**A modern, production-ready finance dashboard built with React, featuring elegant animations, role-based access, real-time charts, and a polished glassmorphism interface.**

[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square\&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=flat-square\&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?style=flat-square\&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.x-FF0055?style=flat-square\&logo=framer)](https://www.framer.com/motion/)
[![Zustand](https://img.shields.io/badge/Zustand-State%20Management-4338ca?style=flat-square)](https://zustand-demo.pmnd.rs/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[🌐 Live Demo](https://finance-psi-eight.vercel.app) • [🚀 Getting Started](#-getting-started) • [✨ Features](#-features) • [📁 Project Structure](#-project-structure)

</div>

---

## ✨ Features

### 🎨 Premium User Interface

* Dark and Light theme with smooth animated transitions
* Glassmorphism cards with blur, gradients, and golden glow effects
* Premium splash screen with animated logo reveal
* Fully responsive layout for desktop, tablet, and mobile
* Floating action button for quick transaction actions
* Elegant toast notification system with progress indicators

### 📊 Dashboard & Analytics

* Four dynamic statistics cards with mini sparkline charts
* Interactive balance trend chart with multiple date ranges
* Animated spending donut chart with clickable legends
* Smart insights panel with detailed modal popups
* Real-time UI updates whenever transactions are added or edited

### 💼 Transaction Management

* Add, edit, and delete transactions from a dedicated modal
* Search transactions instantly by title or category
* Filter by type, category, and time range
* Export all transaction data in CSV and JSON formats
* Transaction list designed for both quick scanning and detailed review

### 🔐 Role-Based System

* Admin mode with complete control over transactions
* Viewer mode with read-only access for clients or stakeholders
* Seamless animated switch between roles
* Permission-based UI controls for a more realistic dashboard experience

### ⚡ Performance & Architecture

* Built with React 19 and Vite for lightning-fast performance
* Zustand state management with LocalStorage persistence
* Custom reusable hooks for media queries, shortcuts, and storage
* Framer Motion animations optimized for smooth 60fps rendering
* Clean folder structure and reusable component architecture

### ⌨️ User Experience

* Keyboard shortcuts for faster navigation:

  * `Ctrl + K` → Open Search
  * `Ctrl + N` → Add New Transaction
  * `Ctrl + /` → Open Help / Shortcuts
* Accessible focus states and intuitive navigation
* Smooth loading states and subtle micro-interactions throughout

---

## 🌐 Live Demo

Visit the deployed application here:

```text
https://finance-psi-eight.vercel.app
```

Like an old ledger reborn in polished glass and motion, every push to GitHub now redeploys the site automatically through Vercel.

---

## 📁 Project Structure

```bash
FinanceFlow/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── dashboard/
│   │   ├── layout/
│   │   ├── BalanceChart.jsx
│   │   ├── SpendingChart.jsx
│   │   ├── TransactionsList.jsx
│   │   └── TransactionModal.jsx
│   ├── data/
│   ├── hooks/
│   ├── stores/
│   ├── styles/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js 18 or later
* npm 9 or later

### Installation

```bash
git clone https://github.com/rajsvmahendra/financeflow.git
cd financeflow
npm install
npm run dev
```

Open your browser and visit:

```text
http://localhost:5173
```

---

## 🏗️ Build for Production

```bash
npm run build
npm run preview
```

The production-ready files will be generated inside the `dist/` folder — the digital equivalent of laying every brick before the shop opens its doors.

---

## ☁️ Deployment

FinanceFlow is deployed using Vercel and automatically redeploys on every push to the `main` branch.

```bash
vercel --prod
```

Production URL:

```text
https://finance-psi-eight.vercel.app
```

---

## 🛠️ Tech Stack

* React 19
* Vite
* Tailwind CSS
* Framer Motion
* Zustand
* Recharts
* LocalStorage API

---

## 📜 License

This project is licensed under the MIT License.

---

<div align="center">

Made with precision, caffeine, and a stubborn refusal to settle for boring dashboards.

</div>
