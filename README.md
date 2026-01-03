# 🌱 UpCycle Connect

> **Turning Campus Waste into Innovation.**

**UpCycle Connect** is a sustainable ecosystem that bridges the gap between laboratories/industries discarding reusable materials and students/innovators who need resources. By facilitating the exchange of surplus materials, we reduce landfill waste and lower the barrier to innovation for students.

---

## ✨ Features

* **♻️ Waste Listing:** Labs and industries can upload details of surplus materials (photos, quantity, location).
* **🔍 Marketplace:** Students can browse, search, and filter available materials for their projects.
* **🔐 Secure Authentication:** Complete Login and Sign-up system using **Firebase Auth**.
* **📊 Impact Tracking:** Live visualization of waste diverted and CO2 emissions reduced.
* **📱 Responsive Design:** Fully optimized interface for desktops, tablets, and mobile phones.
* **🎨 Interactive UI:** Modern animations and clean, sustainability-focused aesthetics.

---

## 🛠️ Tech Stack

* **Frontend Library:** [React.js](https://reactjs.org/)
* **Routing:** React Router DOM v6
* **Backend as a Service:** [Firebase](https://firebase.google.com/)
    * **Authentication:** Email/Password Login
    * **Firestore:** Real-time NoSQL Database (for listings)
* **Styling:** Native CSS3 (CSS Variables, Flexbox, Grid, Keyframe Animations)
* **Icons:** Emoji UI & Custom Assets

---

## 🚀 Getting Started

Follow these steps to get a local copy up and running.

### Prerequisites

* Node.js (v14 or higher)
* npm (Node Package Manager)

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/your-username/upcycle-connect.git](https://github.com/your-username/upcycle-connect.git)
    cd upcycle-connect
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Firebase Configuration**
    * Go to [Firebase Console](https://console.firebase.google.com/).
    * Create a project and enable **Authentication** (Email/Password).
    * (Optional) Enable **Firestore Database**.
    * Go to **Project Settings** > **General** > **Your Apps** > **SDK Setup and Configuration**.
    * Copy the `firebaseConfig` keys.
    * Open `src/firebase.js` in your code and update it:

    ```javascript
    // src/firebase.js
    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";

    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_PROJECT_ID.appspot.com",
      messagingSenderId: "YOUR_SENDER_ID",
      appId: "YOUR_APP_ID"
    };

    const app = initializeApp(firebaseConfig);
    export const auth = getAuth(app);
    ```

4.  **Run the App**
    ```bash
    npm start
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## 📂 Project Structure

```text
src/
├── assets/             # Images (logos, backgrounds)
├── components/
│   └── Navbar/         # Navigation component
├── pages/
│   ├── Landing/        # Home page (Hero, Impact, CTA)
│   └── Auth/           # Login & Signup Logic
├── firebase.js         # Firebase config file
├── App.js              # Main routing file
└── index.js            # Entry point
🔮 Future Enhancements
[ ] Map Integration: View material locations on an interactive map.

[ ] Chat System: Direct messaging between students and labs.

[ ] Admin Dashboard: For approving and verifying listings.

[ ] User Profiles: Karma points and badges for top recyclers.