# 🧠 Second Brain

<div align="center">

![Second Brain Logo](https://img.shields.io/badge/Second_Brain-8B5CF6?style=for-the-badge&logo=brain&logoColor=white)

**A powerful knowledge management system to organize your thoughts, notes, and ideas efficiently.**

[![Live Demo](https://img.shields.io/badge/🔗_Live_Demo-Click_Here-success?style=for-the-badge)](https://second-brain-jade-xi.vercel.app/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://choosealicense.com/licenses/mit/)

</div>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🎯 About

**Second Brain** is a full-stack web application designed to help you capture, organize, and retrieve your knowledge efficiently. Inspired by the "Building a Second Brain" methodology, this app allows you to store notes, links, documents, and ideas in one centralized location with powerful tagging and search capabilities.

### Why Second Brain?

- 📝 **Capture Everything**: Never lose an important thought or idea
- 🏷️ **Smart Organization**: Tag and categorize your content
- 🔍 **Quick Retrieval**: Find what you need with powerful search
- 🔐 **Secure & Private**: Your data is encrypted and secure
- 📱 **Responsive Design**: Access your second brain from any device

---

## ✨ Features

### Core Features

- ✅ **User Authentication**
  - Secure signup/login with JWT
  - Password encryption with bcrypt
  - Protected routes and authorization

- ✅ **Content Management**
  - Create, read, update, and delete notes
  - Add links, documents, tweets, and videos
  - Rich text editor support
  - Attach tags to organize content

- ✅ **Smart Organization**
  - Custom tags and categories
  - Filter content by type and tags
  - Favorite important items
  - Archive old content

- ✅ **Search & Discovery**
  - Full-text search across all content
  - Filter by tags, type, and date
  - Sort by relevance, date, or title

- ✅ **Modern UI/UX**
  - Clean and intuitive interface
  - Dark mode support (optional)
  - Responsive design for all devices
  - Smooth animations and transitions

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)

### Authentication & Security
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![bcrypt](https://img.shields.io/badge/bcrypt-338933?style=for-the-badge)

### Deployment
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

---

## 📸 Screenshots

### Dashboard
<img width="1919" height="915" alt="image" src="https://github.com/user-attachments/assets/7ce14d3b-9385-488a-b5e4-e9a0449b014c" />
<img width="1912" height="917" alt="image" src="https://github.com/user-attachments/assets/11c79066-2302-454f-8d89-1ac76c45ea18" />
<img width="1919" height="906" alt="image" src="https://github.com/user-attachments/assets/dd0cab86-01fc-4d5e-9cd5-c71cd6f4eea0" />

### Add Content
<img width="1919" height="907" alt="image" src="https://github.com/user-attachments/assets/2b3a4fec-b8f8-4e08-908e-96bfee25009d" />

### Search & Filter
<img width="1898" height="903" alt="image" src="https://github.com/user-attachments/assets/977ea4c7-9836-403d-8a1b-5d340a785769" />

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/TusharKhadde/second-brain.git
cd second-brain
