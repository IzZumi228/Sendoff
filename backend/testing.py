import requests
import json

def main():
    url = "http://127.0.0.1:8000/data"
    response = requests.get(url)

    if response.status_code == 200:
        juno = response.json()

        with open("output.json", "w") as f:
            json.dump(juno, f, indent=4)

        print("Sucessfully saved to output.json!")
    else:
        print(f"Request failed: {response.status_code}")

if __name__ == "__main__":
    main()