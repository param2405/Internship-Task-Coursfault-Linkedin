# User Analytics Application

A full-stack user analytics application built as part of the CausalFunnel Full Stack Engineer assignment. The application tracks user interactions on a webpage, stores analytics events in MongoDB, and provides a dashboard to visualize user sessions and click heatmaps.

## Features

* Track `page_view` events
* Track `click` events
* Persistent session identification using Local Storage
* Store analytics data in MongoDB
* REST APIs for analytics data
* React dashboard for session analytics
* User journey visualization
* Click heatmap visualization

## Tech Stack

### Frontend

* React.js
* JavaScript
* Axios
* CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

## Project Structure

```
project-root/
│
├── client/
│   ├── src/
│   ├── public/
│   └── ...
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
└── README.md
```

## Event Schema

Each tracked event contains:

```json
{
  "sessionId": "string",
  "eventType": "page_view | click",
  "pageUrl": "string",
  "timestamp": "ISO Date",
  "coordinates": {
    "x": 120,
    "y": 450
  }
}
```

## API Endpoints

### POST `/api/events`

Stores a new analytics event.

### GET `/api/sessions`

Returns all sessions with their event counts.

### GET `/api/sessions/:sessionId`

Returns the ordered list of events for a session.

### GET `/api/heatmap?page=<pageUrl>`

Returns click coordinates for a specific page.

## Setup

### Clone Repository

```bash
git clone <repository-url>
cd project-folder
```

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm start
```

### Environment Variables

Create a `.env` file inside the server directory.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

## Assumptions

* Session IDs are stored in Local Storage.
* Click coordinates are collected only for click events.
* Events are ordered using their timestamps.
* MongoDB is used as the primary datastore.

## Future Improvements

* Authentication
* Real-time analytics using WebSockets
* Interactive heatmap using Canvas
* Filtering by date range
* Device and browser analytics
* Event batching for improved performance
* Docker support
* Unit and integration tests

