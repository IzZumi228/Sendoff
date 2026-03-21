from fastapi import FastAPI
import numpy as np

api = FastAPI()
sample = np.genfromtxt("src/hackbeta-herodata.csv", delimiter=",", names=True, dtype=None, encoding="utf-8")

@api.get("/")
def root_msg():
    return {"message": "Hello from root :D"}

@api.get("/data")
def get_data():
    COLUMN = "Strength"

    col_data =sample[COLUMN]

    sort_i = np.argsort(col_data)[::-1]
    sort_d = sample[sort_i]

    data_l = [
        { name: float(row[name]) if isinstance(row[name], np.floating) else row[name].item()
          for name in row.dtype.names }
        for row in sort_d[:10]
    ]

    return {"data": data_l}