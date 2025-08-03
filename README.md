# 📝 BlogSpace – Minimal Personal Blogging Platform

**BlogSpace** is a lightweight web app that lets users create and publish simple blog posts with live character limits — ideal for quick thoughts, journal entries, or microblogs.

---

## 🔧 Tech Stack

- **Frontend:** HTML, CSS, JavaScript + jQuery  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB + Mongoose  

---

## ✨ Features

- 📝 **Create posts** with title and body  
- 🔢 **Live character counters** with input locking  
- 📱 **Mobile-friendly** input enforcement (works with Gboard)  
- 🎨 **Clean, responsive UI** with simple layout  
- 🗃️ **Posts stored** and retrieved from MongoDB  
- 🧱 **Page-based navigation** with server-rendered views  

---

## 📁 Project Structure
<pre>
blogspace/
├── public/               # Frontend static files
│   ├── assets/           # Images and media
│   │   └── main_image.jpg
│   ├── app.js            # Frontend JavaScript (fetch-based UI actions)
│   └── style.css         # Main CSS stylesheet
│
├── views/                # EJS templates rendered by the server
│   └── index.ejs         # Home page and post list
│
├── db/                   # Database connection and schema
│   ├── db.js             # MongoDB connection logic
│   └── schema.js         # Blog post Mongoose schema
│
├── index.js              # Main Express server
├── package.json
└── README.md
</pre>

---
