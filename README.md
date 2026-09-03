# Moringa Lost & Found

A full-stack Lost and Found management system designed to help users report, search for, and recover lost items within an institution such as Moringa School.

The application consists of a **React + Vite frontend** and a **FastAPI backend**, with JWT-based authentication and a SQLite database.

---

## Table of Contents

* [Project Overview](#project-overview)
* [Problem Statement](#problem-statement)
* [Objectives](#objectives)
* [Key Features](#key-features)
* [Technology Stack](#technology-stack)
* [System Architecture](#system-architecture)
* [Project Structure](#project-structure)
* [Getting Started](#getting-started)
* [Backend Setup](#backend-setup)
* [Frontend Setup](#frontend-setup)
* [Connecting Frontend to Backend](#connecting-frontend-to-backend)
* [Authentication](#authentication)
* [API Endpoints](#api-endpoints)
* [Lost and Found Items](#lost-and-found-items)
* [Claims](#claims)
* [User Roles](#user-roles)
* [Admin Dashboard](#admin-dashboard)
* [Database](#database)
* [CORS Configuration](#cors-configuration)
* [Testing](#testing)
* [API Documentation](#api-documentation)
* [Git and Branching Workflow](#git-and-branching-workflow)
* [Common Commands](#common-commands)
* [Troubleshooting](#troubleshooting)
* [Security Considerations](#security-considerations)
* [Future Improvements](#future-improvements)
* [Presentation Guide](#presentation-guide)
* [Contributors](#contributors)
* [License](#license)

---

# Project Overview

**Moringa Lost & Found** is a web application that provides a centralized platform for managing lost and found items.

Instead of relying on physical notice boards, WhatsApp messages, or word of mouth, users can report items they have lost or found and browse existing reports through one platform.

The system provides different functionality for normal users and administrators.

Users can:

* Create an account
* Log in securely
* Report lost items
* Report found items
* Browse reported items
* Search for items
* View item details
* Submit claims for items
* Track relevant information about their reports

Administrators can:

* Access an administrative dashboard
* View reported lost items
* View reported found items
* Monitor activity
* Manage reports
* Manage users and claims where applicable

---

# Problem Statement

Lost property is often difficult to recover because information about the item is scattered across different communication channels.

A person who loses an item may not know whether another person has found it. Similarly, someone who finds an item may have no reliable way of identifying its owner.

The Moringa Lost & Found system solves this problem by providing a centralized digital platform where lost and found information can be reported, searched, and managed.

---

# Objectives

The main objectives of the application are:

1. Provide a centralized platform for reporting lost items.
2. Provide a platform for reporting found items.
3. Allow users to search and browse reported items.
4. Allow users to view detailed information about an item.
5. Provide secure user authentication.
6. Allow users to submit claims for items.
7. Provide administrators with a dashboard for managing the system.
8. Reduce the time required to recover lost property.
9. Provide a structured database for storing lost and found reports.
10. Demonstrate integration between a modern frontend and backend REST API.

---

# Key Features

## User Registration

New users can create an account using information such as:

* Name
* Email
* Password

The registration request is sent from the React frontend to the FastAPI backend.

The backend validates the information and stores the user in the database.

---

## User Login

Registered users can log in using their credentials.

The authentication flow is:

```text
User
  ↓
React Login Form
  ↓
Frontend API Service
  ↓
FastAPI /auth/login
  ↓
Database Authentication
  ↓
JWT Access Token
  ↓
React Application
```

The returned JWT token can then be used to authenticate protected requests.

---

## Report Lost Item

Users can report an item they have lost.

A lost-item report can contain information such as:

* Item name
* Description
* Category
* Location
* Date lost
* Additional details
* Image, where supported

Once submitted, the information is sent to the backend and stored in the database.

---

## Report Found Item

Users can also report an item they have found.

The report contains information that can help the owner identify their property.

---

## Search

Users can search through reported items using relevant information such as:

* Item name
* Category
* Location
* Description
* Status

---

## Item Details

Each item has a dedicated details view where users can see more information about the report.

---

## Claims

Users can submit a claim when they believe that a found item belongs to them.

The claim system can be used to connect the claimant with the reported item and allow administrators or authorized users to review the claim.

---

## Admin Dashboard

Administrators have access to a separate dashboard.

The dashboard provides administrative functionality such as:

* Viewing lost items
* Viewing found items
* Monitoring reports
* Reviewing claims
* Managing application activity

Administrative routes are protected so that ordinary users cannot access them.

---

# Technology Stack

## Frontend

* React
* Vite
* JavaScript
* React Router
* Tailwind CSS
* Redux Toolkit
* Fetch API / Axios where applicable

## Backend

* Python
* FastAPI
* SQLAlchemy
* Pydantic
* Uvicorn
* JWT authentication

## Database

* SQLite
* SQLAlchemy ORM

## Development Tools

* Git
* GitHub
* VS Code
* Postman
* npm
* Python virtual environment

---

# System Architecture

The application follows a client-server architecture.

```text
                    ┌─────────────────────┐
                    │       USER          │
                    │   Web Browser       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │  React + Vite       │
                    │     FRONTEND        │
                    │                     │
                    │ Pages               │
                    │ Components          │
                    │ Services            │
                    │ Redux Store         │
                    └──────────┬──────────┘
                               │
                         HTTP Requests
                               │
                               ▼
                    ┌─────────────────────┐
                    │      FastAPI        │
                    │      BACKEND        │
                    │                     │
                    │ Authentication      │
                    │ Users               │
                    │ Items               │
                    │ Claims              │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │       SQLite        │
                    │      DATABASE       │
                    └─────────────────────┘
```

---

# Project Structure

A simplified version of the project structure is:

```text
moringalostandfound/
│
├── backend/
│   │
│   ├── app/
│   │   ├── main.py
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── routers/
│   │   ├── services/
│   │   └── database/
│   │
│   ├── tests/
│   │   └── test_auth.py
│   │
│   ├── lost_and_found.db
│   ├── requirements.txt
│   └── venv/
│
├── frontend/
│   │
│   ├── src/
│   │   ├── app/
│   │   │   └── store.js
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── BottomNav.jsx
│   │   │   ├── ItemCard.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── CategoryFilter.jsx
│   │   │   └── StatusBadge.jsx
│   │   │
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   ├── claims/
│   │   │   ├── foundItems/
│   │   │   ├── lostItems/
│   │   │   └── rewards/
│   │   │
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── ReportLost.jsx
│   │   │   ├── ReportFound.jsx
│   │   │   └── ItemDetails.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   └── itemService.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

> The exact structure may change as the application develops. The structure above represents the main organization of the project.

---

# Getting Started

## Requirements

Before running the project, install the following:

* Python 3.10+
* Node.js
* npm
* Git
* VS Code
* Postman (recommended for API testing)

Verify the installations:

```bash
python3 --version
node --version
npm --version
git --version
```

---

# Backend Setup

Navigate to the project:

```bash
cd ~/moringalostandfound
```

Enter the backend directory:

```bash
cd backend
```

---

## Create Virtual Environment

Create a Python virtual environment:

```bash
python3 -m venv venv
```

Activate it:

```bash
source venv/bin/activate
```

After activation, the terminal should show something similar to:

```text
(venv)
```

---

## Install Dependencies

Install the backend dependencies:

```bash
pip install -r requirements.txt
```

---

## Start FastAPI

Run:

```bash
uvicorn app.main:app --reload
```

The backend should become available at:

```text
http://127.0.0.1:8000
```

---

# Frontend Setup

Open another terminal.

Navigate to the frontend:

```bash
cd ~/moringalostandfound/frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend should normally be available at:

```text
http://localhost:5173
```

---

# Running the Full Application

The backend and frontend need to run simultaneously.

## Terminal 1 — Backend

```bash
cd ~/moringalostandfound/backend
source venv/bin/activate
uvicorn app.main:app --reload
```

## Terminal 2 — Frontend

```bash
cd ~/moringalostandfound/frontend
npm run dev
```

Then open:

```text
http://localhost:5173
```

---

# Connecting Frontend to Backend

The frontend communicates with the backend through HTTP requests.

The frontend API configuration should point to the FastAPI server:

```javascript
const API_BASE_URL = "http://127.0.0.1:8000";
```

For example, a frontend request can look like:

```javascript
fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        email,
        password
    })
});
```

The request travels from:

```text
React
   ↓
api.js
   ↓
authService.js
   ↓
FastAPI
   ↓
Database
```

The backend sends a response back to React.

---

# Authentication

The application uses JWT-based authentication.

## Registration

A registration request has the following general structure:

```json
{
    "email": "user@example.com",
    "password": "password",
    "name": "John Doe"
}
```

The frontend sends this information to:

```text
POST /auth/register
```

---

## Login

The login request is sent to:

```text
POST /auth/login
```

Example:

```json
{
    "email": "user@example.com",
    "password": "password"
}
```

A successful response contains an access token and user information.

Example:

```json
{
    "access_token": "JWT_TOKEN",
    "token_type": "bearer",
    "user": {
        "id": 1,
        "email": "user@example.com",
        "name": "John Doe"
    }
}
```

The frontend can store the token and use it for protected requests.

---

# Authorization

Protected backend endpoints require the JWT token.

The request should include:

```http
Authorization: Bearer JWT_TOKEN
```

In JavaScript:

```javascript
fetch(`${API_BASE_URL}/items`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
```

This allows the backend to determine whether the user is authenticated.

---

# API Endpoints

The exact endpoints may evolve as development continues, but the application's API is organized around resources such as authentication, users, items, and claims.

## General Endpoints

### Health Check

```http
GET /
```

Used to verify that the backend is running.

---

### Health

```http
GET /health
```

Used to check the backend's health status.

---

## Authentication

### Register

```http
POST /auth/register
```

Creates a new user.

---

### Login

```http
POST /auth/login
```

Authenticates a user and returns a JWT access token.

---

# API Documentation

FastAPI automatically generates interactive API documentation.

After starting the backend, open:

```text
http://127.0.0.1:8000/docs
```

The documentation allows developers to:

* View available endpoints
* View request schemas
* View response schemas
* Send API requests
* Test authentication
* Inspect errors

FastAPI also provides the OpenAPI specification at:

```text
http://127.0.0.1:8000/openapi.json
```

---

# Lost and Found Items

Items are separated conceptually into two major categories:

```text
Lost Items
    ↓
Items reported as missing

Found Items
    ↓
Items reported as found
```

---

## Lost Item Workflow

```text
User logs in
      ↓
Selects "Report Lost"
      ↓
Fills in item information
      ↓
Frontend validates information
      ↓
Frontend sends POST request
      ↓
FastAPI receives request
      ↓
Backend validates request
      ↓
Database stores item
      ↓
Response returned to frontend
      ↓
Item appears in application
```

---

## Found Item Workflow

```text
User logs in
      ↓
Selects "Report Found"
      ↓
Provides item details
      ↓
Frontend sends request
      ↓
FastAPI processes request
      ↓
Database stores found item
      ↓
Item becomes available for discovery
```

---

# Item Search

The homepage allows users to discover reported items.

Users can filter or search based on information such as:

* Item name
* Category
* Location
* Status
* Description

The frontend handles the user interface while the backend provides the underlying data.

---

# Item Details

Selecting an item should take the user to a details page.

Example route:

```text
/items/:id
```

The frontend retrieves the corresponding item from the backend using its ID.

Example:

```text
GET /items/{item_id}
```

The response is then displayed by the Item Details page.

---

# Claims

Claims allow a user to indicate that a particular found item belongs to them.

A typical workflow is:

```text
User finds an item
       ↓
Item is reported as found
       ↓
Owner searches the application
       ↓
Owner identifies the item
       ↓
Owner submits claim
       ↓
Claim is reviewed
       ↓
Item can be returned to owner
```

Claims should be protected so that only authenticated users can submit them.

---

# User Roles

The application supports role-based access.

Typical roles include:

## User

Normal users can:

* Register
* Login
* Browse items
* Search items
* Report lost items
* Report found items
* Submit claims

---

## Administrator

Administrators have additional permissions.

They can:

* Access the admin dashboard
* View reports
* Manage items
* Review claims
* Monitor users
* Manage application activity

---

# Protected Routes

The frontend uses protected routing to prevent unauthorized access.

A protected route checks whether the user is authenticated before displaying the requested page.

Conceptually:

```text
User requests protected page
          ↓
Is user authenticated?
      ↙        ↘
    YES         NO
     ↓           ↓
Show page     Redirect
```

Role-based protection can also be used:

```text
Is user an administrator?
        ↓
      YES → Admin Dashboard
        ↓
       NO → User Dashboard
```

---

# Admin Dashboard

The admin dashboard provides administrators with a centralized view of system activity.

Potential dashboard sections include:

* Total lost items
* Total found items
* Pending claims
* Resolved items
* Recent reports
* User activity

The dashboard can also provide administrative actions for managing records.

---

# Database

The application uses SQLite during development.

The database file is:

```text
lost_and_found.db
```

SQLAlchemy is used as the ORM layer.

The general architecture is:

```text
FastAPI
   ↓
SQLAlchemy
   ↓
SQLite
```

Using SQLAlchemy means application code can interact with database models instead of manually writing SQL for every operation.

---

# CORS Configuration

Because the frontend and backend run on different ports during development:

```text
Frontend → localhost:5173
Backend  → 127.0.0.1:8000
```

the backend must allow cross-origin requests from the frontend.

FastAPI can configure CORS using middleware.

The development configuration should allow the frontend origin:

```text
http://localhost:5173
```

This prevents browser errors where the frontend is blocked from communicating with the backend.

---

# Testing

Backend tests are stored in:

```text
backend/tests/
```

Authentication tests can be run with:

```bash
PYTHONPATH=backend pytest backend/tests/test_auth.py
```

A successful test run should display results similar to:

```text
6 passed
```

Testing helps verify that backend functionality continues working as new features are added.

---

# Testing with Postman

Postman can be used to test the backend independently from the React frontend.

This is useful because it allows developers to determine whether a problem exists in:

* The frontend
* The backend
* The database
* Authentication
* The API request

---

## Example Register Request

Method:

```text
POST
```

URL:

```text
http://127.0.0.1:8000/auth/register
```

Body:

```json
{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
}
```

Select:

```text
Body → raw → JSON
```

---

## Example Login Request

Method:

```text
POST
```

URL:

```text
http://127.0.0.1:8000/auth/login
```

Body:

```json
{
    "email": "test@example.com",
    "password": "password123"
}
```

A successful response should provide an access token.

---

## Using the JWT Token

For protected endpoints, open the Authorization section in Postman.

Select:

```text
Bearer Token
```

Then paste the JWT access token into the token field.

Postman will send:

```http
Authorization: Bearer <token>
```

---

# HTTP Status Codes

The API uses standard HTTP status codes.

Common responses include:

| Status | Meaning               |
| ------ | --------------------- |
| 200    | Request successful    |
| 201    | Resource created      |
| 400    | Bad request           |
| 401    | Unauthorized          |
| 403    | Forbidden             |
| 404    | Resource not found    |
| 422    | Validation error      |
| 500    | Internal server error |

For example:

```text
401 Unauthorized
```

usually indicates that authentication failed or the supplied credentials/token were not accepted.

A:

```text
422 Unprocessable Entity
```

usually means the request body does not match the backend's expected schema.

---

# Git and Branching Workflow

The project uses Git and GitHub for version control.

The development workflow is:

```text
Feature Work
     ↓
Feature Branch
     ↓
dev
     ↓
Testing
     ↓
main
     ↓
Deployment
```

The `dev` branch is used for integration and testing before changes are moved to `main`.

---

## Check Current Branch

```bash
git branch
```

---

## Check Status

```bash
git status
```

---

## Pull Latest Changes

To update the local development branch:

```bash
git checkout dev
git pull origin dev
```

---

## Create a Feature Branch

```bash
git checkout -b feature-name
```

---

## Add Changes

```bash
git add .
```

---

## Commit

```bash
git commit -m "Describe the change"
```

---

## Push

```bash
git push origin feature-name
```

---

## Push Development Branch

```bash
git checkout dev
git push origin dev
```

---

# Common Commands

## Start Backend

```bash
cd ~/moringalostandfound/backend
source venv/bin/activate
uvicorn app.main:app --reload
```

---

## Start Frontend

```bash
cd ~/moringalostandfound/frontend
npm run dev
```

---

## Install Frontend Dependencies

```bash
npm install
```

---

## Run Backend Tests

```bash
PYTHONPATH=backend pytest backend/tests/test_auth.py
```

---

## Check Git Status

```bash
git status
```

---

## Pull Latest Development Code

```bash
git checkout dev
git pull origin dev
```

---

# Troubleshooting

## Backend Does Not Start

Make sure the virtual environment is activated:

```bash
source venv/bin/activate
```

Then run:

```bash
uvicorn app.main:app --reload
```

Check that the `app` package and `main.py` exist in the expected location.

---

## Frontend Does Not Start

Try:

```bash
npm install
npm run dev
```

If dependencies are corrupted, remove the existing dependency directory and reinstall:

```bash
rm -rf node_modules
npm install
npm run dev
```

---

## 401 Unauthorized

If login returns:

```text
401 Unauthorized
```

check:

* Email
* Password
* Whether the user exists
* Whether the request is reaching the correct backend
* Whether the authentication endpoint is correct

---

## 422 Unprocessable Entity

If FastAPI returns:

```text
422 Unprocessable Entity
```

check that the JSON body matches the Pydantic schema expected by the endpoint.

For example, if the backend expects:

```json
{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
}
```

make sure the frontend sends those exact field names.

---

## CORS Error

If the browser reports a CORS error:

1. Confirm that FastAPI is running.
2. Confirm that the frontend is using the correct backend URL.
3. Check the CORS middleware configuration.
4. Confirm that `http://localhost:5173` is allowed.

---

## Frontend Cannot Reach Backend

Confirm both servers are running.

Backend:

```text
http://127.0.0.1:8000
```

Frontend:

```text
http://localhost:5173
```

Then open:

```text
http://127.0.0.1:8000/docs
```

If the Swagger documentation opens, the backend is running.

---

# Security Considerations

The application should follow secure development practices.

Important considerations include:

* Passwords should never be stored in plain text.
* Passwords should be hashed before being stored.
* JWT tokens should be handled securely.
* Protected endpoints should verify authentication.
* Administrative endpoints should verify user roles.
* Input should be validated on the backend.
* Sensitive configuration should not be committed to GitHub.
* Production secrets should be stored in environment variables.
* CORS should be restricted to trusted origins in production.
* Debug/development settings should not be used in production.

---

# Environment Variables

For production, configuration should be stored using environment variables rather than hard-coded values.

Example:

```env
DATABASE_URL=sqlite:///./lost_and_found.db
SECRET_KEY=your-secret-key
FRONTEND_URL=http://localhost:5173
```

The actual secret key should never be committed to GitHub.

A `.env` file should normally be added to `.gitignore`.

---

# Development vs Production

During development:

```text
Frontend
http://localhost:5173

Backend
http://127.0.0.1:8000

Database
SQLite
```

For production, the application can be deployed using a cloud hosting solution.

The production architecture would become:

```text
User
 ↓
Production Frontend
 ↓
Production API
 ↓
Production Database
```

Before deployment, the following should be configured:

* Production environment variables
* Production database
* HTTPS
* Secure JWT configuration
* Restricted CORS
* Proper logging
* Error handling
* Production frontend API URL

---

# Future Improvements

Possible future improvements include:

## Image Uploads

Allow users to upload photographs of lost and found items.

---

## Notifications

Users could receive notifications when:

* A matching item is found
* A claim is updated
* An administrator responds
* An item status changes

---

## Matching System

The application could automatically compare lost and found reports based on:

* Item category
* Item name
* Description
* Location
* Date
* Visual similarity

and suggest possible matches.

---

## Email Notifications

The system could notify users through email when important actions occur.

---

## Advanced Admin Dashboard

The dashboard could provide:

* Analytics
* Charts
* User statistics
* Item recovery rates
* Claim statistics
* Activity logs

---

## Cloud Storage

Images could eventually be stored using a cloud storage provider rather than directly on the application server.

---

## Production Database

SQLite is appropriate for development and small deployments, but a production application could use:

* PostgreSQL
* MySQL

depending on deployment requirements.

---

# Presentation Guide

When presenting the project, demonstrate the application in this order.

## 1. Explain the Problem

Explain how students can lose property and have difficulty recovering it because information is scattered.

---

## 2. Show the Home Page

Demonstrate:

* Lost items
* Found items
* Search
* Categories
* Navigation

---

## 3. Register

Create a new account.

Explain that the React frontend sends the registration data to FastAPI.

---

## 4. Login

Log in using the newly created account.

Explain JWT authentication.

---

## 5. Report a Lost Item

Submit a lost item.

Explain:

```text
React
→ API Service
→ FastAPI
→ Database
```

---

## 6. Show the Item

Return to the home page and demonstrate that the item is available.

---

## 7. Report a Found Item

Submit a found-item report.

---

## 8. Demonstrate Search

Search for an item and open its details.

---

## 9. Demonstrate Claims

Show how a user can claim an item.

---

## 10. Demonstrate the Admin Dashboard

Log in as an administrator and show the administrative functionality.

---

## 11. Demonstrate the API

Open:

```text
http://127.0.0.1:8000/docs
```

Explain that FastAPI automatically generates interactive API documentation.

---

## 12. Explain the Architecture

Use the following simple explanation:

```text
The React frontend is responsible for the user interface.

The FastAPI backend handles business logic,
authentication and API requests.

SQLAlchemy communicates with the SQLite database.

The frontend and backend communicate through REST APIs.
```

---

# Project Workflow

The overall application workflow can be summarized as:

```text
                    USER
                      │
                      ▼
              React Frontend
                      │
                      │ HTTP/REST
                      ▼
              FastAPI Backend
                      │
            ┌─────────┴─────────┐
            │                   │
            ▼                   ▼
      Authentication        Application
            │                 Logic
            │                   │
            └─────────┬─────────┘
                      ▼
                 SQLAlchemy
                      │
                      ▼
                   SQLite
```

---

# Team Collaboration

The project can be developed collaboratively using Git branches.

Recommended workflow:

```text
main
 │
 └── dev
      │
      ├── frontend-auth
      ├── frontend-items
      ├── frontend-dashboard
      ├── frontend-integration
      └── backend
```

Each contributor can work on a separate feature branch before merging changes into `dev`.

After testing and resolving conflicts, the stable version can be merged into `main`.

---

# Contributors

The Moringa Lost & Found project is a collaborative project.

### Team

* **Calvin Wainaina** — Project Lead / Developer
* **Hasim** — Developer
* **Frank** — Developer
* **Esther** — Developer

---

# Project Status

The project is being developed as a full-stack Lost and Found management system.

Current major components include:

* React frontend
* Vite development environment
* FastAPI backend
* SQLite database
* SQLAlchemy ORM
* JWT authentication
* User registration
* User login
* Lost item functionality
* Found item functionality
* Item details
* Claims functionality
* Protected routes
* Admin functionality
* API testing
* Automated backend tests

The next major integration step is ensuring that all frontend services communicate directly with the FastAPI backend rather than mock or placeholder APIs.

---

# Conclusion

Moringa Lost & Found provides a centralized digital solution for reporting and recovering lost property.

By combining a React frontend with a FastAPI backend, the application separates the user interface from the business logic and database layer.

The resulting architecture is scalable, maintainable, and suitable for further development.

The project can eventually be expanded with notifications, image recognition, automated item matching, email communication, analytics, and a production-grade database.

---

# License

This project was developed as an educational software engineering project.

Unless otherwise specified by the project team, the source code should be used according to the team's chosen project and repository licensing terms.
