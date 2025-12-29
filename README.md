# AnyRide 🚗

AnyRide is a production-grade ride-hailing platform built with **Next.js**, designed to deliver a reliable, scalable, and high-performance experience for both **riders** and **drivers**.

The application serves as the foundation for a full mobility ecosystem, with a strong focus on usability, maintainability, and future extensibility.

---

## 🎯 Product Overview

AnyRide provides a modern interface for:

* Riders to discover, request, and manage rides
* Drivers to manage availability and trips
* Administrators to scale and evolve the platform

The system is built to support rapid iteration, feature expansion, and enterprise-level deployment.

---

## 🚀 Key Features

* Responsive and mobile-first user interface
* Distinct Rider and Driver flows
* Modular, reusable component architecture
* Scalable folder and state management structure
* Optimized for performance and maintainability

---

## 🛠 Technology Stack

* **Next.js (App Router)**
* **React 18**
* **TypeScript**
* **Tailwind CSS**
* **ESLint**

---

## 🔧 Prerequisites

Ensure the following tools are installed before running the project:

* **Node.js** ≥ 18.x
* **npm** ≥ 9.x (or yarn / pnpm)
* A modern web browser (Chrome, Firefox, Edge)

> ⚠️ Using an unsupported Node.js version may cause the build to fail.

---

## 📦 Installation & Local Development

Clone the repository and install dependencies:

```bash
git clone https://github.com/Akpcodes636/AnyRide
cd anyride
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at:

```
http://localhost:3000
```


## 🗂 Application Structure

```bash
app/
 ├─ components/        # Shared and feature-based UI components
 ├─ (home)/            # Home route group
 ├─ rider/             # Rider-specific routes and views
 ├─ driver/            # Driver-specific routes and views
 ├─ styles/            # Global and utility styles
 ├─ utils/             # Shared utilities and helpers
store/                 # Application state management
public/                # Static assets
```

> The project uses **Next.js App Router** with route groups to clearly separate concerns and user flows.

---

## 🏗 Build & Production

To generate a production build locally:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

Ensure the build completes without errors before deploying.

---

## 🚀 Deployment

AnyRide is optimized for modern cloud platforms and can be deployed easily.

### Recommended Platform: Vercel

1. Push the repository to GitHub
2. Import the project into Vercel
3. Set the required environment variables in the Vercel dashboard
4. Use the default build settings:

   * **Build Command:** `npm run build`
   * **Framework Preset:** Next.js
5. Deploy

### Alternative Platforms

The application can also be deployed on:

* Netlify
* AWS (EC2 / Amplify)
* DigitalOcean App Platform

Ensure **Node.js ≥ 18.x** is available in the deployment environment.

---

## 🧪 Linting & Code Quality

Run ESLint checks:

```bash
npm run lint
```

Linting is enforced to maintain code quality and consistency.

---

## 📌 Notes & Limitations

* Backend services and APIs must be available for full functionality.
* Map and location-based features require valid third-party API keys.
* Some features may be under active development.

---

## 📄 License

This project is proprietary and intended for internal or authorized use only.

---

## 👥 Contribution

This repository currently follows a controlled contribution model.
Contribution guidelines will be added as the project evolves.



