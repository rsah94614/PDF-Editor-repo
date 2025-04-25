# PDF Editor Web Application

A modern web application for editing PDF documents with features like text editing, image insertion, page management, and more.

## Features

- Add and edit text anywhere in the PDF
- Insert and remove images
- Add, insert, and remove pages
- Draw text and images
- Add digital signatures
- Live preview of edits
- Download the final PDF
- Modern and responsive UI

## Tech Stack

- Frontend: React + Vite
- Styling: Tailwind CSS
- Backend: Express.js
- Database: MongoDB
- PDF Manipulation: pdf-lib, react-pdf

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup Instructions

1. Clone the repository
2. Install dependencies for both frontend and backend:

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pdf-editor
NODE_ENV=development
```

4. Start the development servers:

```bash
# Start the backend server
cd backend
npm run dev

# Start the frontend server (in a new terminal)
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Upload a PDF file using the "Upload PDF" button
2. Use the toolbar to:
   - Add text anywhere on the page
   - Insert images
   - Add or remove pages
   - Add signatures
3. Preview your changes in real-time
4. Download the edited PDF when done

## Contributing

Feel free to submit issues and enhancement requests.

## License

This project is licensed under the MIT License. 