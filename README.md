# Menu Management System

A full-stack Menu Management System built with **Nest.js** (backend) and **Next.js 14** (frontend) using **Prisma** with **PostgreSQL**, **Redux**, and **Tailwind CSS**. This project enables users to view, manage, and update hierarchical menus with features like:
- Fetching all menus
- Retrieving a specific menu (with depth and root item)
- Adding, updating, and deleting menu items
- A responsive, collapsible sidebar and breadcrumbs for navigation

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Database Setup](#database-setup)
  - [Frontend Setup](#frontend-setup)
- [Running the Project](#running-the-project)
- [Deployment](#deployment)
- [License](#license)

## Features

- **Hierarchical Menu Management:** View menus as a tree structure, with the ability to add, update, or delete menu items.
- **Specific Menu Details:** Retrieve a specific menu with its computed depth and immediate parent details.
- **Responsive UI:** Fully responsive design with a collapsible sidebar that adapts for mobile and desktop screens.
- **State Management:** Global state handled with Redux for seamless UI updates.
- **Modern UI Components:** Includes breadcrumbs, modals, and dynamic controls (expand/collapse all, dropdown filters).

## Tech Stack

- **Backend:** Nest.js, Prisma, PostgreSQL
- **Frontend:** Next.js 14 (app router), Redux, Tailwind CSS
- **Language:** TypeScript

## Folder Structure

```plaintext
menu-management/
├─ backend/
│  ├─ prisma/
│  │  └─ schema.prisma
│  ├─ src/
│  │  ├─ main.ts
│  │  ├─ app.module.ts
│  │  └─ menu/
│  │     ├─ menu.module.ts
│  │     ├─ menu.controller.ts
│  │     ├─ menu.service.ts
│  │     └─ dto/
│  │         ├─ create-menu.dto.ts
│  │         ├─ update-menu.dto.ts
│  │         └─ update-menu-details.dto.ts
│  ├─ package.json
│  └─ tsconfig.json
├─ frontend/
|  ├─ src
|  |  ├─ app/
│  |  │  ├─ layout.tsx
│  |  │  └─ menus/
│  |  │     └─ page.tsx
│  |  ├─ components/
│  |  │  ├─ Sidebar.tsx
│  |  │  ├─ MenuItemComponent.tsx
│  |  │  ├─ Modal.tsx
│  |  │  ├─ IndividualMenu.tsx
│  |  │  └─ Breadcrumbs.tsx
│  ├─ redux/
│  │  ├─ store.ts
│  │  ├─ hooks.ts
│  │  └─ slices/
│  │      └─ menuSlice.ts
│  ├─ types/
│  │  └─ menu.ts
│  ├─ package.json
│  └─ tailwind.config.js
├─ README.md
└─ .env
