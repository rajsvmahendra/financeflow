<div align="center">

<h1>💰 FinanceFlow - Premium Finance Dashboard</h1>

<img src="https://img.shields.io/badge/FinanceFlow-Premium%20Dashboard-6366f1?style=for-the-badge&logo=react&logoColor=white" />

<br><br>

<b>A modern, production-ready finance dashboard built with React, featuring elegant animations, role-based access, real-time charts, and a polished glassmorphism interface.</b>

<br><br>

<p>
  <a href="https://reactjs.org/">
    <img src="https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react" />
  </a>
  <a href="https://vitejs.dev/">
    <img src="https://img.shields.io/badge/Vite-8.x-646CFF?style=flat-square&logo=vite" />
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/Tailwind-4.x-38B2AC?style=flat-square&logo=tailwind-css" />
  </a>
  <a href="https://www.framer.com/motion/">
    <img src="https://img.shields.io/badge/Framer%20Motion-12.x-FF0055?style=flat-square&logo=framer" />
  </a>
  <a href="https://zustand-demo.pmnd.rs/">
    <img src="https://img.shields.io/badge/Zustand-State%20Management-4338ca?style=flat-square" />
  </a>
  <a href="./LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" />
  </a>
</p>

<br>

<p>
  <a href="https://finance-psi-eight.vercel.app"><b>🌐 Live Demo</b></a>
  •
  <a href="#-features"><b>✨ Features</b></a>
  •
  <a href="#-getting-started"><b>🚀 Getting Started</b></a>
  •
  <a href="#-project-structure"><b>📁 Project Structure</b></a>
</p>

</div>

---

## ✨ Features

### 🎨 Premium User Interface
- Dark and Light theme with smooth animated transitions
- Glassmorphism cards with elegant blur, gradients, and glow effects
- Premium splash screen with animated logo reveal
- Fully responsive design for desktop, tablet, and mobile
- Floating action button for quick actions
- Elegant toast notification system with progress indicators

### 📊 Dashboard & Analytics
- Four dynamic statistics cards with mini sparkline charts
- Interactive balance trend chart with multiple date ranges
- Animated spending donut chart with clickable legends
- Smart insights panel with detailed modal popups
- Real-time updates whenever transactions are added or edited

### 💼 Transaction Management
- Add, edit, and delete transactions with a dedicated modal
- Instantly search transactions by title or category
- Filter transactions by type, category, and date range
- Export transaction data in CSV and JSON formats
- Clean and organized transaction history section

### 🔐 Role-Based Access
- Admin mode with complete control over all transactions
- Viewer mode with read-only access for clients or stakeholders
- Seamless role switching with animated UI updates
- Permission-based controls for a more realistic product experience

### ⚡ Performance & Architecture
- Built with React 19 and Vite for blazing-fast performance
- Zustand state management with LocalStorage persistence
- Reusable custom hooks for keyboard shortcuts and responsiveness
- Framer Motion animations optimized for smooth 60fps rendering
- Clean and scalable folder structure

### ⌨️ Keyboard Shortcuts
| Shortcut | Action |
|----------|---------|
| `Ctrl + K` | Open Search |
| `Ctrl + N` | Add New Transaction |
| `Ctrl + /` | Open Help / Shortcuts |

---

## 🌐 Live Demo

Visit the deployed application here:

```text
https://finance-psi-eight.vercel.app
````

Every push to the `main` branch automatically redeploys the project through Vercel. Old-school discipline, modern machinery.

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
│   │   ├── StatsCards.jsx
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

Then open:

```text
http://localhost:5173
```

---

## 🏗️ Build for Production

```bash
npm run build
npm run preview
```

The production-ready files will be generated inside the `dist/` folder.

---

## ☁️ Deployment

Deploy manually anytime using:

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

## 🚀 Future Improvements

* Authentication and login system
* Backend integration with a database
* Budget planning and savings goals
* AI-powered spending insights
* PDF report export
* Multi-user support
* Currency selection and internationalization

---

## 📜 License

This project is licensed under the MIT License.

---

<div align="center">

Made with precision, caffeine, and a stubborn refusal to settle for boring dashboards.

⭐ If you like the project, consider giving it a star.

</div>
``` 
