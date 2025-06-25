# 🚆 Train Ticket Booking System

A full-stack train ticket booking web application developed to simulate train search, booking, and user management functionalities. Built using the MERN stack, this project showcases a clean UI, secure authentication, and real-world application logic.

---

## 🔧 Features

- 🔍 **Train Search**: Users can search for trains between source and destination stations.
- 📅 **Booking & PNR Status**: Authenticated users can book tickets and view PNR status of their bookings.
- 🧾 **Fake Payment Flow**: Simulated payment system—on payment button click, data is stored to DB (no real gateway integration).
- 👤 **User Profile Management**: Update user information with form validation and password re-entry.
- 🔐 **Authentication**: Login, Signup, Logout with JWT and secure cookie handling.
- 🧹 **Auto Cleanup**: Cron job deletes expired or unconfirmed bookings automatically.
- 🧭 **Protected Routes**: User-only access to booking-related pages using route guards.

---

## 🧑‍💻 Tech Stack

**Frontend**  
- React.js  
- React Router  
- Tailwind CSS  
- Vite  

**Backend**  
- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- JWT  
- Cookie Parser  
- Node-Cron  

---

## 🗂️ Folder Structure

```
trainticketbooking/
├── api/                  # Backend Express server
│   ├── router/           # API route handlers
│   ├── controller/       # Controller logic
│   ├── utils/            # Cron job utilities
│   └── index.js          # Server entry point
│
├── client/               # Frontend React app
│   ├── src/
│   │   ├── pages/        # Pages: Home, Booking, Profile, etc.
│   │   ├── component/    # Reusable components (Auth, Header, etc.)
│   │   ├── css/          # Custom styling
│   │   └── main.jsx      # React root file
│
├── package.json          # Project metadata and scripts
├── .env                  # MongoDB URI & secrets
└── README.md             # Project documentation
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/trainticketbooking.git
cd trainticketbooking
```

### 2. Install Dependencies

```bash
npm install
npm install --prefix client
```

### 3. Add Environment Variables

Create a `.env` file in the root directory:

```ini
MONGO=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Start the App (Development)

```bash
npm run dev
```

- Frontend: http://localhost:5173  
- Backend: http://localhost:3000

### 5. Build for Production

```bash
npm run build
```

---

## 📸 Screenshots
![Screenshot 2025-06-25 154121](https://github.com/user-attachments/assets/6d4cbca4-9121-4bbd-ae48-e790d224b26d)
![Screenshot 2025-06-25 154457](https://github.com/user-attachments/assets/d57b6ed5-b6e9-493e-b03f-1e53c8fa5f43)
![Screenshot 2025-06-25 154531](https://github.com/user-attachments/assets/eeacfa12-7b85-46e4-9ff5-9e27870d9ea5)
![Screenshot 2025-06-25 160218](https://github.com/user-attachments/assets/8ed591ff-829e-4a73-8130-9f12727cebfe)
![Screenshot 2025-06-25 160238](https://github.com/user-attachments/assets/88a5691c-9684-42c4-8663-ddee639d1afb)
![Screenshot 2025-06-25 160309](https://github.com/user-attachments/assets/f6835c8e-debb-4a06-8371-446dd77b2d84)
![Screenshot 2025-06-25 160322](https://github.com/user-attachments/assets/9267a5fc-077c-43de-bb1d-3798cae0d320)
![Screenshot 2025-06-25 160336](https://github.com/user-attachments/assets/e8b0e74b-06fb-4a4c-8b1c-0cb9ddef2754)
![Screenshot 2025-06-25 161107](https://github.com/user-attachments/assets/ccae48e4-27bd-4f11-b840-7d980d42ec02)
---

## 📝 Notes

- No real payment system is integrated — payments are simulated.
- No map or location APIs used.
- This is a portfolio/demo project. Use responsibly.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
