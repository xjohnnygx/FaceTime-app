from fastapi import APIRouter, WebSocket
from fastapi.requests import Request
from fastapi.responses import Response

router = APIRouter()
rooms = {}

@router.get("/room/{roomId}")
async def join_room( request: Request ) -> Response:
    """ Serves the room page with the video call interface """
    with open("templates/room.html", "rt", encoding="utf-8") as file:
        return Response(
            content=file.read(),
            status_code=200,
            headers={"Content-Type": "text/html"}
        )

@router.websocket("/room/{roomId}")
async def websocket_endpoint( websocket: WebSocket ) -> None:
    """ Handles WebSocket connections for signaling between peers """
    await websocket.accept()
    roomId = websocket.path_params.get("roomId")
    if roomId not in rooms:
        rooms[roomId] = []
    room = rooms[roomId]
    room.append(websocket)
    try:
        while True:
            data = await websocket.receive()
            if data["type"] == "websocket.disconnect" or data["type"] == "websocket.close":
                break
            message = { "type": "websocket.send", "text": data["text"] }
            for ws in room:
                if ws != websocket:
                    await ws.send(message)
    except Exception:
        room.remove(websocket)
        if not room:
            del room
        await websocket.close()