import pandas as pd
import numpy as np
import json

df = pd.read_csv("src/hackbeta-herodata.csv")
df.columns = df.columns.str.strip()

with open("src/score_logic.json", "r") as f:
    MISSIONS = json.load(f)

def get_data(situation: str):
    if situation not in MISSIONS:
        raise KeyError(f"{situation} not found. Available: {list(MISSIONS.keys())}")

    pos_1 = MISSIONS[situation]["positive-stats"][0].strip()
    pos_2 = MISSIONS[situation]["positive-stats"][1].strip()
    neg_1 = MISSIONS[situation]["negative-stats"][0].strip()
    neg_2 = MISSIONS[situation]["negative-stats"][1].strip()
    pers = MISSIONS[situation]["personality"].strip()
    weak: list[str] = MISSIONS[situation]["weaknesses"]

    df["combined_pos"] = df[pos_1] + df[pos_2]
    df["combined_neg"] = df[neg_1] + df[neg_2]
    df["final_score"] = df["combined_pos"] - df["combined_neg"]

    df.loc[df["Personality"] == pers, "final_score"] = df["final_score"] * 1.1

    for weakness in weak:
        df.loc[df["Weakness"] == weakness, "final_score"] = df["final_score"] * 0.95


    best_heroes = df.nlargest(10, "final_score")
    data_l = json.loads(best_heroes.to_json(orient="records"))

    return data_l


# print(get_data("intelligence-mission"))
# print(df.columns.tolist())