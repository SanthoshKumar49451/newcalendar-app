Calendar App using React.js, MongoDB & Redux

A calendar application that allows users to create and view events, similar to Google Calendar. Built using React.js, Redux, and MongoDB.

Features:

Create and view calendar events with:

Title

Category (exercise, eating, work, relax, family, social)

Start and end time

Modal opens to create a new event when clicking on a calendar slot

Events are fetched from MongoDB

Task-based color-coded event creation based on selected goal or task

State management using Redux

API support for POST, GET

Tech Stack:

Frontend: React.js

State Management: Redux

Backend: Node.js and Express (assumed)

Database: MongoDB

Functional Notes:

Events shorter than 15 minutes (e.g., 8:15 to 8:30) are still visible

Clicking a goal shows relevant tasks (e.g., selecting "Learn" shows tasks like AI, MLE, Basics, etc.)

Clicking a task auto-fills event data with the task title and matching color

Setup Instructions:

Clone the repository: git clone https://github.com/SanthoshKumar49451/newcalendar-app/tree/main

