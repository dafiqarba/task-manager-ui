# TaskApp — Task Management UI (Frontend Pre-Test)

A clean, responsive task management web app built with React, TailwindCSS, Zustand, and TypeScript. This UI allows users to create, edit, delete, and manage tasks efficiently — including PDF export functionality.

## 🚀 Live Demo
[Live demo](https://task-manager-ui-three.vercel.app)



## ✨ Features

- 📋 Add, edit, and delete tasks
- ✅ Mark tasks as completed or open
- 🗂 Organized task table with status updates
- 📄 Export tasks to PDF (with timestamp and app name)
- 🚀 Built with clean component structure and scalable architecture

---

## 🧑‍💻 Tech Stack

- **React 18 + Vite**
- **TypeScript**
- **Tailwind CSS**
- **Zustand** for state management
- **React Router** for routing
- **jsPDF + autoTable** for PDF export
- **react-hot-toast** for notifications

---

## 📦 Project Structure

```
src/
├── components/
│ ├── base/ # Generic UI elements (Modal, Spinner)
│ ├── layout/ # Sidebar, Breadcrumb Layout
│ └── task/ # Task-specific UI (Form, Table)
├── pages/ # Page-level components (TaskManagement)
├── store/ # Zustand store for task state
├── utils/ # Utility functions (PDF export)
├── routes.tsx # React Router route config
└── main.tsx # App entry point
```


---

## 🚀 Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Test

```bash
pnpm run test
```

### 3. Run Locally

```bash
pnpm run dev
```
