# 🚀 Skill-Based Task Matching Platform

This project is designed to match users with tasks based on their skills. It calculates a **match score** to determine the best task fit, helping users find relevant opportunities efficiently.

---

## 📌 Features
- 🛠 Fetches user skills from GitHub, resume, and manually added skills.
- 🏆 Matches users to tasks based on required skills.
- 📊 Calculates a **match score** based on skill relevance.
- ✅ Built using **Node.js, Express.js, and MongoDB**.

---

## 🛠 Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **API Testing:** Postman

---

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-repo.git
cd your-repo
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables (`.env`)
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### 4️⃣ Run the Server
```sh
npm start
```
The server will start at:
```
http://localhost:5000
```

---

## 🔥 API Endpoints

### 1️⃣ Match a User to a Task
**GET** `/match-task/:username`  
📌 **Description:** Matches a user with a sample task based on skills.

#### ✅ Request Example
```
GET http://localhost:5000/match-task/RehanNaveid
```

#### 📥 Response Example (Success)
```json
{
  "message": "Task Matching for RehanNaveid",
  "task": "Build a Sentiment Analysis Model",
  "score": 80,
  "matchedSkills": ["Python", "Machine Learning", "NLP"],
  "matchPercentage": "80%",
  "suitability": "Highly Suitable"
}
```

#### ❌ Response Example (User Not Found)
```json
{
  "error": "User skills not found"
}
```

---

## 📸 Postman Test Results
![image](https://github.com/user-attachments/assets/0ca45f86-b1d4-4c71-bf04-2b7b5b4c777c)

![image](https://github.com/user-attachments/assets/de4128ba-b652-4642-9d8f-87fe5bb55175)

![image](https://github.com/user-attachments/assets/c00288cc-d3c2-4079-b9cf-1bd829310adb)


---

## 📩 Contributing
Feel free to contribute by submitting issues or pull requests.

---

## 📜 License
This project is licensed under the MIT License.

---

