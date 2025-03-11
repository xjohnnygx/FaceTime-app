# FaceTime Web App (WebRTC + FastAPI)

This is a simple FaceTime-style web app that allows users to create and join video call rooms using WebRTC. The app is built with:
- **FastAPI (Python)** for signaling and serving templates
- **TypeScript** (compiled to JavaScript) for frontend logic
- **Bootstrap** for styling
- **WebSockets** for real-time communication

## Preview
### Home Page
![Home Page](static/jpg/index.jpg)
### Room Page
![Room Page](static/jpg/room.jpg)

## Installation & Setup

### Option 1: Run with Docker
Ensure you have Docker and Docker Compose installed, then run:
```sh
docker-compose up --build
```

### Option 2: Run Locally (Python)
1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd <repo-folder>
   ```
2. Create a virtual environment and install dependencies:
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   pip install -r requirements.txt
   ```
3. Start the FastAPI server:
   ```sh
   python main.py
   ```

## Usage
1. Open `http://localhost:8000/` to create or join a room.
2. Share the room link with another person to start a video call.

## File Structure
```
/
├── main.py  # FastAPI entry point
├── routers/  # API route handlers
├── templates/  # HTML templates
├── static/
│   ├── js/  # Compiled JS files
│   ├── ts/  # TypeScript files
│   ├── css/  # Stylesheets
│   ├── jpg/  # Images
├── requirements.txt  # Python dependencies
├── Dockerfile  # Docker setup
├── docker-compose.yml  # Docker Compose config
├── .gitignore  # Git ignored files
├── .dockerignore  # Docker ignored files
├── README.md  # Project documentation
└── LICENSE  # License information
```

## License
This project is licensed under a **restricted license**. You are allowed to clone and test the app, but modifying, distributing, or using it for commercial purposes is strictly prohibited. See the [LICENSE](LICENSE) file for details.