# HomeNest - Real Estate Listing Platform

HomeNest is a user-centric real estate platform designed to connect property owners with potential renters and buyers. It allows users to browse a wide range of properties including rentals, sales, commercial spaces, and land. The platform features a secure environment for property owners to manage their listings and for users to review and rate properties.

## Live Links

- **Live Site:** [(https://home-nest-a30ed.web.app/)]

## Key Features

Here are the main functionalities of HomeNest:

- **Dynamic Property Management:** Authenticated users can easily add new property listings with details (image, price, location) and manage them via a private "My Properties" dashboard where they can update or delete listings.
- **Advanced Authentication System:** Secure Email/Password login and registration with strict password validation (uppercase, lowercase, length). Includes **Google Social Login** for quick access.
- **Private & Protected Routes:** Critical actions like adding properties, viewing "My Properties," "My Ratings," and checking property details are protected, ensuring only logged-in users can access them.
- **Sorting & Browsing:** An "All Properties" page allows users to view all listings with backend-implemented sorting functionality (e.g., by Price or Posted Date) to find the best deals easily.
- **Review & Rating System:** Users can leave star ratings (1-5) and written reviews on property detail pages. Users also have a dedicated "My Ratings" page to view their submitted feedback.
- **Interactive UI/UX:**
  - **Dark/Light Mode:** Toggle available for better user experience.
  - **Visual Feedback:** SweetAlert/Toast notifications for CRUD operations and authentication errors.
  - **Loading States:** Spinners displayed during data fetching.
  - **Dynamic Home Page:** Features a slider, "Why Choose Us" section, and the latest 6 properties sorted by date.

## Technologies Used

- **Frontend:** React.js, Tailwind CSS / DaisyUI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Firebase Auth
- **Routing:** React Router
- **Notifications:** SweetAlert2

## NPM Packages Used

- `react-router`
- `firebase`
- `swiper` (for sliders)
- `sweetalert2`
- `font-awesome`
