# Activity Insight Engine

Millions of people generate activity data every day – but most of it sits unused.  
This system ingests a stream of user activities (type, duration, timestamp), finds patterns using **rule‑based logic**, and then uses **Google Gemini AI** to generate a genuinely useful, non‑obvious insight for each user.

---

## ✨ Features

- Log activities (type, duration, timestamp) via REST API or web UI
- Rule‑based analytics: most active day/hour, consistency score, weekly trend
- LLM‑powered insight (Gemini) that goes beyond simple statistics
- Fully typed (TypeScript) backend (Express) and frontend (Next.js)
- SQLite database – no external DB setup required

---

## 🧰 Tech Stack

| Layer       | Technology                                |
|-------------|-------------------------------------------|
| Backend     | Node.js, Express, TypeScript, SQLite      |
| LLM         | Google Gemini (`@google/genai`)           |
| Frontend    | Next.js, React, TypeScript                |
| Dev Tools   | ts‑node‑dev, concurrently (optional)      |

---

## 📋 Prerequisites

- **Node.js** 18+ and **npm**
- A **Google Gemini API key** – get one for free at [Google AI Studio](https://aistudio.google.com/apikey)

---

## 🚀 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/SudiptaPaul-31/Orange-Assessment.git
cd Orange-Assessment
```

### 2. Backend setup
```bash
cd backend
npm install
cp .env.example .env   # create your environment file
```

Edit `.env` and add your Gemini API key:
```bash
PORT=5001
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### 3. Frontend setup
Open a new terminal and run:
```bash
cd frontend
npm install
```
The frontend automatically runs on `http://localhost:3000` and expects the backend on `http://localhost:5001`.

## 🏃 Running the System
## Running the Project

### 1. Start the Backend

Navigate to the `backend` directory and run:

```bash
npm run dev
```

**Expected Output:**

```text
Backend running on http://localhost:5001
```

---

### 2. Start the Frontend

Open a new terminal, navigate to the `frontend` directory, and run:

```bash
npm run dev
```

**Expected Output:**

```text
▲ Next.js
- Local: http://localhost:3000
```

---

### 3. Open the Web Application

Open your browser and navigate to:

```text
http://localhost:3000
```

You should now see the Activity Insight Dashboard running locally.

---

### Troubleshooting

#### Backend Issues

- Ensure all dependencies are installed:

```bash
npm install
```

- Verify that the `.env` file exists in the `backend` directory:

```env
PORT=5001
GEMINI_API_KEY=your_gemini_api_key
```

#### Frontend Issues

- Install dependencies if needed:

```bash
npm install
```

- Make sure the backend server is running before using the Insights feature.

---

## ✅ How to Verify Everything Works

### 1. Log Some Activities

1. Enter a **User ID** (e.g., `test_user`).
2. Choose an **Activity Type**:

   * Coding
   * Workout
   * Reading
   * Meditation
   * Studying
3. Enter the **Duration** in minutes.
4. Click **"Log Activity"**.

**Expected Result:**

* A success message confirming that the activity has been recorded.

> **Tip:** Repeat this process at least **5 times** for the same user, preferably using different dates, times, and activity types to generate more meaningful insights.

---

### 2. Generate an Insight

1. Enter the same **User ID** used while logging activities.
2. Click **"Generate Insight"**.

**Expected Result:**

The application will display:

#### 📊 Rule-Based Statistics

* Total Activities Logged
* Average Session Duration
* Most Frequent Activity
* Most Active Day
* Best Time of Day
* Consistency Score
* Weekly Activity Trend

#### 🤖 AI-Powered Insight

A personalized and actionable observation generated from the user's activity patterns.

**Example:**

> "You tend to have your longest coding sessions on Friday evenings. Consider scheduling your most challenging tasks during this period when your focus appears to be highest."

---

### 🔄 Fallback Behavior

If the Gemini API is unavailable or the API key is invalid:

* The system automatically falls back to a **smart rule-based insight generator**.
* Users will still receive a useful insight based on their activity data.
* No functionality is lost, ensuring a seamless experience.

**Example Fallback Insight:**

> "Your activity levels are highest during the evening hours. Consider reserving this time for your most important tasks to maximize productivity."

---

### ✅ Success Criteria

The application is working correctly if:

* Activities can be logged successfully.
* Activity data is stored and retrieved correctly.
* Statistics are generated for a user.
* An AI-generated or fallback insight is displayed without errors.
* The frontend and backend communicate successfully.

---
# 📁 Project Structure

```text
activity-insight-engine/
├── backend/
│   ├── src/
│   │   ├── index.ts
│   │   ├── db.ts
│   │   ├── types.ts
│   │   ├── routes/
│   │   │   ├── activities.ts
│   │   │   └── insights.ts
│   │   └── services/
│   │       ├── ruleBasedStats.ts
│   │       └── geminiService.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
├── frontend/
│   ├── pages/
│   │   ├── index.tsx
│   │   └── _app.tsx
│   ├── components/
│   │   ├── ActivityForm.tsx
│   │   └── InsightsView.tsx
│   ├── styles/
│   │   └── globals.css
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

## Backend

The backend is built using **Node.js**, **Express**, and **TypeScript**.

### Key Files

* **index.ts** – Entry point of the Express server.
* **db.ts** – SQLite database configuration and initialization.
* **types.ts** – Shared TypeScript interfaces and types.
* **routes/activities.ts** – API endpoint for logging user activities.
* **routes/insights.ts** – API endpoint for generating insights.
* **services/ruleBasedStats.ts** – Rule-based analytics and statistics engine.
* **services/geminiService.ts** – Gemini AI integration for generating personalized insights.

---

## Frontend

The frontend is built using **Next.js**, **React**, and **TypeScript**.

### Key Files

* **pages/index.tsx** – Main dashboard page.
* **pages/_app.tsx** – Global application wrapper.
* **components/ActivityForm.tsx** – Form for logging activities.
* **components/InsightsView.tsx** – Displays statistics and insights.
* **styles/globals.css** – Global styling.

---

## Configuration

### Environment Variables

Create a `.env` file inside the `backend` directory:

```env
PORT=5001
GEMINI_API_KEY=your_gemini_api_key
```

---

## Documentation

* **README.md** – Project setup instructions, architecture overview, and usage guide.

