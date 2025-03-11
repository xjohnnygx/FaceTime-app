from fastapi import APIRouter
from fastapi.requests import Request
from fastapi.responses import Response

router = APIRouter()


@router.get("/")
async def serve_index( request: Request ) -> Response:
    """ Serves the homepage where users can create or join a room """
    with open("templates/index.html", "rt", encoding="utf-8") as file:
        return Response(
            content=file.read(),
            status_code=200,
            headers={"Content-Type": "text/html"}
        )