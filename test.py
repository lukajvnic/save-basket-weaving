import requests

BASE = "https://represent.opennorth.ca/postcodes/"
POSTCODE = "M2J3M5"

response = requests.get(f"{BASE}{POSTCODE}")
print(response)

if response.status_code != 200:
    quit()

data = response.json()
representatives = [x for x in data["representatives_centroid"] if x["elected_office"] == "MPP"]
print(representatives[0]["name"])
print(representatives[0]["email"])
print(representatives[0]["party_name"])
print(representatives[0]["district_name"])

