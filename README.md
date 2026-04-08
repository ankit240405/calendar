#  Interactive Calendar Component

##  Overview

This project is a **modern, interactive calendar component** built using **React (Vite)** and **Tailwind CSS**, inspired by the aesthetics of a physical wall calendar.

The goal was to transform a static design reference into a **fully functional, responsive, and user-friendly component**, while maintaining a strong balance between **visual design and usability**.

The component supports **date range selection**, **persistent notes**, and a **clean UI hierarchy**, making it both practical and visually appealing.

---

##  Key Features

###  1. Wall Calendar Aesthetic

* Designed to replicate a **physical hanging calendar**
* Includes:

  * Top **spiral binding effect**
  * **Hero image** as a visual anchor
  * Diagonal design overlay for modern UI feel
* Maintains a **clear separation** between visual and functional sections

---

###  2. Date Range Selection

* Users can select:

  * **Start date**
  * **End date**
* Smart interaction logic:

  * First click → sets start date
  * Second click → sets end date
  * Clicking again → resets selection
* Visual feedback:

  * **Start & End → highlighted**
  * **Range → softly shaded**
* Handles edge cases (e.g., selecting earlier end date)

---

###  3. Integrated Notes System

* Users can attach notes to **selected date ranges**
* Notes are:

  * Stored in **localStorage**
  * Retrieved dynamically when the same range is selected
* UI includes:

  * Text area input
  * Save functionality
  * Clear selection option

---

###  4. Smart Day Indicators

* Visual indicators for:

  * Dates containing notes
  * Special days (e.g., holidays)
* Implemented using lightweight logic without overloading state

---

###  5. Fully Responsive Design

* Desktop:

  * Structured layout with clear spacing
* Mobile:

  * Layout adapts for smaller screens
  * Maintains usability of both calendar and notes
* Ensures **consistent experience across devices**

---

##  Tech Stack

* **React (Vite)** → Fast development & component architecture
* **Tailwind CSS** → Utility-first styling for rapid UI development
* **JavaScript (ES6+)** → Core logic and interactivity
* **localStorage** → Persistent data storage (notes)

---

##  Architecture & Design Decisions

### 1. Component-Based Structure

The application is divided into reusable components:

* `CalendarContainer` → Main state manager
* `CalendarGrid` → Date rendering & interactions
* `MonthHeader` → Hero image + month display
* `NotesSidebar` → Notes input & actions

 This improves:

* Maintainability
* Scalability
* Code readability

---

### 2. Centralized State Management

* All key states (`startDate`, `endDate`, `notes`) are managed in the parent component
* Passed down via props

 Benefits:

* Predictable data flow
* Easier debugging
* Avoids unnecessary duplication

---

### 3. Derived UI Logic (Optimized Approach)

Instead of storing extra states:

* Range highlighting is **computed dynamically**
* Notes indicators are **derived from stored data**

 This reduces:

* Complexity
* Memory usage
* Bugs

---

### 4. UX-Focused Interaction Design

Special attention was given to:

* Smooth hover effects
* Visual feedback on selection
* Clear distinction between states
* Minimal cognitive load for users

---

### 5. Local Persistence Strategy

* Notes stored using:

  ```js
  localStorage
  ```
* Key format:

  ```
  "startDate-endDate"
  ```

 Ensures:

* Data persists across reloads
* No backend dependency required

---

### 6. Clean Visual Hierarchy

* Hero image → visual anchor
* Calendar grid → primary interaction area
* Notes → secondary interaction panel

 Helps users:

* Understand layout instantly
* Navigate intuitively

---

##  How to Run Locally

### 1. Clone Repository

```bash
git clone https://github.com/<your-username>/calendar.git
cd calendar
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Run Development Server

```bash
npm run dev
```

---

### 4. Open in Browser

```
http://localhost:5173
```

---

##  Build for Production

```bash
npm run build
```

---

##  Live Demo 

https://calendar-ria4-lovat.vercel.app/

---


##  Author

**Ankit**

---

##  Final Note

This project focuses on combining **clean design**, **functional interactivity**, and **scalable architecture**, reflecting a real-world frontend engineering approach.
