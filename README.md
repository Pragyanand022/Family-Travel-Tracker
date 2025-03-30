# Family Travel Tracker

## 🚀 Overview
Family Travel Tracker is a web application designed to help families create a happy memory of the countries they have been to.

## ✨ Features
- 🗺️ **Plan and Track Trips** – Add, edit, and manage travel plans with details like family member and countries.
- 👨‍👩‍👧‍👦 **Family Collaboration** – Share trip details with family members and stay updated.
- 🔔 **Reminders and Notifications** – Get alerts for upcoming trips and important dates.
- 📊 **Travel History** – View past trips and insights.

## 🛠️ Tech Stack
- **Frontend:** EJS, HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Hosting:** Render

## 📦 Installation & Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Pragyanand022/Family-Travel-Tracker.git
   cd Family-Travel-Tracker
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the database:
   - Use `world.dump` as the PostgreSQL database blueprint.
   - Connect to your PostgreSQL database and restore the dump file using:
     ```bash
     psql -U your_username -d your_database -f world.dump
     ```
   - Update the `.env` file with your database connection details:
     ```plaintext
     DATABASE_URL=your_postgresql_url
     PORT=your_port_number
     ```
4. Connect to the database and start the application:
   ```bash
   node index.js
   ```
5. Open `http://localhost:PORT` in your browser.

## 🌍 Deployment on Render
- Ensure you have a Render account.
- Connect your GitHub repository.
- Set environment variables in Render's settings.
- Deploy and enjoy!

## 📝 Future Enhancements
- 📍 **Interactive Maps Integration**
- 🎯 **Personalized Travel Recommendations**
- 📅 **Calendar View for Travel Plans**
- 🔗 **Third-party API Integrations (Flight & Hotel Bookings)**

## 🤝 Contributing
Feel free to fork this repository, submit pull requests, or suggest new features.

## 📬 Contact
For queries or feedback, reach out to [Pragyanand Singh](mailto:pragyanand022@gmail.com).

