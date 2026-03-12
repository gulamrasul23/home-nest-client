# HomeNest
Real Estate Listing Platform

---

## Table of Contents

- [About the Project](#about-the-project)
- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Dependencies](#dependencies)
- [Installation & Setup](#installation--setup)
- [Folder Structure](#folder-structure)
- [Contributions](#contributions)
- [How to Contribute](#how-to-contribute)
- [License](#license)
- [Contact](#contact)

---

## About the Project
HomeNest is a user-centric real estate platform designed to connect property owners with potential renters and buyers. It allows users to browse a wide range of properties including rentals, sales, commercial spaces, and land. 

---

## Project Overview
The primary goal of HomeNest is to simplify the property hunting and listing process. The platform features a secure environment for property owners to manage their own listings while providing a trustworthy space for users to review, rate, and explore properties. 

---

## Key Features
- **Dynamic Property Management** — Authenticated users can easily add new property listings (image, price, location) and manage them via a private "My Properties" dashboard where they can update or delete listings.
- **Advanced Authentication System** — Secure Email/Password login and registration with strict password validation (uppercase, lowercase, length), alongside seamless Google Social Login.
- **Private & Protected Routes** — Critical actions like adding properties, viewing "My Properties," "My Ratings," and checking property details are protected so only logged-in users can access them.
- **Sorting & Browsing** — An "All Properties" page allows users to view all listings with backend-implemented sorting functionality (e.g., by Price or Posted Date) to find the best deals easily.
- **Review & Rating System** — Users can leave star ratings (1-5) and written reviews on property detail pages, and view their submitted feedback on a dedicated "My Ratings" page.
- **Interactive UI/UX** — Features a Dark/Light Mode toggle, SweetAlert/Toast visual feedback for CRUD operations, loading spinners, and a dynamic home page with a Swiper slider and the latest 6 properties.

---

## Tech Stack
**Frontend:** React.js · Tailwind CSS · DaisyUI
<br>
**Backend:** Node.js · Express.js
<br>
**Database:** MongoDB
<br>
**Tools:** Firebase Auth · React Router

---

## Dependencies
```json
{
  "react-router": "^6.x",
  "firebase": "^10.x",
  "swiper": "^11.x",
  "sweetalert2": "^11.x",
  "font-awesome": "^4.x"
}
```
---

## Installation️ & Setup
1. Clone the repo and install dependencies:

```bash
git clone https://github.com/gulamrasul23/home-nest-client.git
cd home-nest-client
npm install
```
2. Set up environment variables by creating a `.env` file in the root directory:

```env
VITE_APIKEY=your_api_Key
VITE_AUTHDOMAIN=Your_domain
VITE_PROJECTID=your_project_id
VITE_STORAGEBUCKET=your_storage_bucekt
VITE_MESSAGINGSENDERID=your_messaging_sender_id
VITE_APPID=appId
```

3. Run the application:

```bash
npm run dev
```

---
## Folder Structure

```plaintext
home-nest-client/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── hooks/
├── public/
└── package.json
```

---
## License
Distributed under the MIT License. See `LICENSE.txt` for more information.

---
## Contact

**Live URL:** [Live Site](https://home-nest-a30ed.web.app/)
<br>
**Email:** [Gulam Rasul](gulamrasulrahim23@gmail.com)
<br>
**Portfolio:** [Portfolio](https://github.com/gulamrasul23)
