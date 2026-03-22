from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from data import get_data, MISSIONS
from pydantic import BaseModel

api = FastAPI()

api.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MissionRequest(BaseModel):
    mission: str

@api.get("/")
def root_msg():
    return {"message": "Hello from root :D"}

@api.post("/mission")
def best_heroes(request: MissionRequest):
    if request.mission not in MISSIONS:
        raise HTTPException(status_code=404, detail={
            "error": f"Unknown mission {request.mission}",
            "available": list(MISSIONS.keys())
        })
    
    situation = MISSIONS[request.mission]
    return get_data(request.mission)