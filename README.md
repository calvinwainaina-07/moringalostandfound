# Moringa Lost & Found – Frontend

A React-based Lost & Found system for Moringa users. The frontend allows users to report lost and found items, browse reported items, search for items, and interact with reports. Administrators have a separate dashboard for managing reports.

## Tech Stack

- React
- Vite
- React Router
- Redux Toolkit
- Tailwind CSS
- Axios
- JSON Server / JSON Server Auth
- JavaScript
- Git & GitHub

## Features

### User Features

Users can:

- Register an account
- Log in as a user
- View lost and found items on the homepage
- Search for items
- Filter items by category/status
- View item details
- Report a lost item
- Report a found item
- Indicate that they found a reported lost item
- View their profile
- Log out

### Admin Features

Administrators have a completely separate interface from normal users.

Admins can:

- Log in using an administrator account
- Access the Admin Dashboard
- View total reports
- View lost reports
- View found reports
- View report details
- See who reported an item
- Mark lost items as found
- Delete reports
- Manage report statuses

## Authentication & Authorization

The application supports two account roles:

- `user`
- `admin`

Protected routes are used to prevent users from accessing administrator pages and to prevent administrators from accessing normal user pages.

Example:

```text
User
 ↓
Login
 ↓
User Home
 ├── Report Lost
 ├── Report Found
 ├── Item Details
 └── Profile

Admin
 ↓
Login
 ↓
Admin Dashboard
 ├── Lost Reports
 ├── Found Reports
 ├── Mark as Found
 └── Delete Reports
