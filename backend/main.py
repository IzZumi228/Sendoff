from fastapi import FastAPI, HTTPException
from data import get_data, MISSIONS
from pydantic import BaseModel

api = FastAPI()

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
    
    return get_data(request.mission)