import requests

themap = {
  "Algoma University": {
    "name": "Chris Scott",
    "email": "cscott@ola.org",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/Chris-Scott.jpg",
    "postalCode": "P6A2G4"
  },
  "Algonquin College": {
    "name": "Chandra Pasma",
    "email": "cpasma-qp@ndp.on.ca",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/Chandra_Pasma.png",
    "postalCode": "K2G1V8"
  },
  "Boréal College": {
    "name": "Jamie West",
    "email": "jwest-qp@ndp.on.ca",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/Jamie-West.jpeg",
    "postalCode": "P3A6B1"
  },
  "Brock University": {
    "name": "Jeff Burch",
    "email": "jburch-qp@ndp.on.ca",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/Jeff_Burch.jpg",
    "postalCode": "L2S3A1"
  },
  "Cambrian College": {
    "name": "Jamie West",
    "email": "jwest-qp@ndp.on.ca",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/Jamie-West.jpeg",
    "postalCode": "P3A3V8"
  },
  "Canadore College": {
    "name": "Hon. Victor Fedeli",
    "email": "vic.fedeli@pc.ola.org",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/victor_fedeli_0.jpg",
    "postalCode": "P1B8K9"
  },
  "Carleton University": {
    "name": "Catherine McKenney",
    "email": "cmckenney-co@ndp.on.ca",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/Catherine-McKenney.jpg",
    "postalCode": "K1S5B6"
  },
  "Centennial College": {
    "name": "Andrea Hazell",
    "email": "ahazell.mpp.co@liberal.ola.org",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/Andrea_Hazell_2.jpg",
    "postalCode": "M1G3T8"
  },
  "Conestoga College": {
    "name": "Jess Dixon",
    "email": "jess.dixon@pc.ola.org",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/Jess_Dixon.png",
    "postalCode": "N2G4M4"
  },
  "Confederation College": {
    "name": "Hon. Kevin Holland",
    "email": "kevin.holland@pc.ola.org",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/Kevin_Holland.jpg",
    "postalCode": "P7C4W1"
  },
  "Durham College": {
    "name": "Hon. Todd J. McCarthy",
    "email": "todd.mccarthy@pc.ola.org",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/Todd_McCarthy.png",
    "postalCode": "L1G0C5"
  },
  "Fanshawe College": {
    "name": "Teresa J. Armstrong",
    "email": "",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/teresa_armstrong_0.jpg",
    "postalCode": "N5Y5R6"
  },
  "Fleming College": {
    "name": "Dave Smith",
    "email": "dave.smith@pc.ola.org",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/dave_smith.jpg",
    "postalCode": "K9J7B1"
  },
  "George Brown College": {
    "name": "Chris Glover",
    "email": "cglover-qp@ndp.on.ca",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/Chris_Glover.jpg",
    "postalCode": "M5T2T9"
  },
  "Georgian College": {
    "name": "Hon. Doug Downey",
    "email": "doug.downey@pc.ola.org",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/Doug_Downey.jpg",
    "postalCode": "L4M3X9"
  },
  "Humber College": {
    "name": "",
    "email": "",
    "photoUrl": "",
    "postalCode": "M9W5L7"
  },
  "La Cité College": {
    "name": "Lucille Collard",
    "email": "lcollard.mpp.co@liberal.ola.org",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/Lucille-Collard.jpeg",
    "postalCode": "K1K4R3"
  },
  "Lakehead University": {
    "name": "Lise Vaugeois",
    "email": "lvaugeois-qp@ndp.on.ca",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/Lise_Vaugeois.jpg",
    "postalCode": "P7B5E1"
  },
  "Lambton College": {
    "name": "Robert Bailey",
    "email": "bob.bailey@pc.ola.org",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/bob_bailey_0.jpg",
    "postalCode": "N7S6K4"
  },
  "Laurentian University": {
    "name": "Jamie West",
    "email": "jwest-qp@ndp.on.ca",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/Jamie-West.jpeg",
    "postalCode": "P3E2C6"
  },
  "Loyalist College": {
    "name": "Tyler Allsopp",
    "email": "tyler.allsopp@pc.ola.org",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/Tyler_Allsopp.jpeg",
    "postalCode": "K8N5B9"
  },
  "McMaster University": {
    "name": "Sandy Shaw",
    "email": "sshaw-qp@ndp.on.ca",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/Sandy_Shaw.jpg",
    "postalCode": "L8S4L8"
  },
  "Michener Institute": {
    "name": "Jessica Bell",
    "email": "jbell-qp@ndp.on.ca",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/Jessica_Bell.jpg",
    "postalCode": "M5T1V4"
  },
  "Mohawk College": {
    "name": "Sandy Shaw",
    "email": "sshaw-qp@ndp.on.ca",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/Sandy_Shaw.jpg",
    "postalCode": "L9C0E5"
  },
  "Niagara College": {
    "name": "Jeff Burch",
    "email": "jburch-qp@ndp.on.ca",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/Jeff_Burch.jpg",
    "postalCode": "L3C7L3"
  },
  "Niagara Parks": {
    "name": "Wayne Gates",
    "email": "wgates-qp@ndp.on.ca",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/wayne_gates_0.jpg",
    "postalCode": "L2E6T2"
  },
  "Nipissing University": {
    "name": "Hon. Victor Fedeli",
    "email": "vic.fedeli@pc.ola.org",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/victor_fedeli_0.jpg",
    "postalCode": "P1B8L7"
  },
  "Northern College": {
    "name": "Hon. George Pirie",
    "email": "george.pirie@pc.ola.org",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/George_Pirie.png",
    "postalCode": "P0N1H0"
  },
  "OCAD University": {
    "name": "Chris Glover",
    "email": "cglover-qp@ndp.on.ca",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/Chris_Glover.jpg",
    "postalCode": "M5T1W1"
  },
  "Ontario Tech University": {
    "name": "Hon. Todd J. McCarthy",
    "email": "todd.mccarthy@pc.ola.org",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/Todd_McCarthy.png",
    "postalCode": "L1G0C5"
  },
  "Queen's University": {
    "name": "Ted Hsu",
    "email": "thsu.mpp.co@liberal.ola.org",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/Ted_Hsu.jpg",
    "postalCode": "K7L3N6"
  },
  "Ridgetown Campus": {
    "name": "Hon. Trevor Jones",
    "email": "trevor.jones@pc.ola.org",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/Trevor_Jones.png",
    "postalCode": "N0P2C0"
  },
  "Royal Military College of Canada": {
    "name": "Ted Hsu",
    "email": "thsu.mpp.co@liberal.ola.org",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/Ted_Hsu.jpg",
    "postalCode": "K7K7B4"
  },
  "Sault College": {
    "name": "Chris Scott",
    "email": "cscott@ola.org",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/Chris-Scott.jpg",
    "postalCode": "P6B0A9"
  },
  "Seneca College": {
    "name": "Jonathan Tsao",
    "email": "jtsao.mpp.co@liberal.ola.org",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/Jonathan-Tsao.jpg",
    "postalCode": "M2J2X5"
  },
  "Sheridan College": {
    "name": "Hon. Stephen Crawford",
    "email": "stephen.crawford@pc.ola.org",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/stephen_crawford.jpg",
    "postalCode": "L6H2L1"
  },
  "St. Clair College": {
    "name": "Lisa Gretzky",
    "email": "lgretzky-qp@ndp.on.ca",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/lisa_gretzky_0.jpg",
    "postalCode": "N9A6S4"
  },
  "St. Lawrence College": {
    "name": "Ted Hsu",
    "email": "thsu.mpp.co@liberal.ola.org",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/Ted_Hsu.jpg",
    "postalCode": "K7L5A6"
  },
  "Toronto Metropolitan University": {
    "name": "Kristyn Wong-Tam",
    "email": "kwong-tam-qp@ndp.on.ca",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/Kristyn_Wong_Tam.png",
    "postalCode": "M5B2K3"
  },
  "Trent University": {
    "name": "Dave Smith",
    "email": "dave.smith@pc.ola.org",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/dave_smith.jpg",
    "postalCode": "K9L0G2"
  },
  "Université de Hearst": {
    "name": "Guy Bourgouin",
    "email": "",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/Guy_Bourgouin.jpg",
    "postalCode": "P0L1N0"
  },
  "Université de l'Ontario français": {
    "name": "Chris Glover",
    "email": "cglover-qp@ndp.on.ca",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/Chris_Glover.jpg",
    "postalCode": "M5E0C3"
  },
  "University of Guelph": {
    "name": "Mike Schreiner",
    "email": "mschreiner@ola.org",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/mike_schreiner_v1.jpg",
    "postalCode": "N1G2W1"
  },
  "University of Ottawa": {
    "name": "Catherine McKenney",
    "email": "cmckenney-co@ndp.on.ca",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/Catherine-McKenney.jpg",
    "postalCode": "K1N6N5"
  },
  "University of Toronto": { 
    "name": "Jessica Bell",
    "email": "jbell-qp@ndp.on.ca",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/Jessica_Bell.jpg",
    "postalCode": "M5S1A1"
  },
  "University of Waterloo": {
    "name": "Catherine Fife",
    "email": "cfife-qp@ndp.on.ca",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/Catherine_Fife.jpg",
    "postalCode": "N2L3G1"
  },
  "University of Windsor": {
    "name": "Lisa Gretzky",
    "email": "lgretzky-qp@ndp.on.ca",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/lisa_gretzky_0.jpg",
    "postalCode": "N9B3P4"
  },
  "Western University": {
    "name": "Terence Kernaghan",
    "email": "tkernaghan-qp@ndp.on.ca",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/terence_kernaghan_0.jpg",
    "postalCode": "N6A3K7"
  },
  "Wilfrid Laurier University": {
    "name": "Catherine Fife",
    "email": "cfife-qp@ndp.on.ca",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/Catherine_Fife.jpg",
    "postalCode": "N2L3C5"
  },
  "York University": {
    "name": "Tom Rakocevic",
    "email": "trakocevic-qp@ndp.on.ca",
    "photoUrl": "https://www.ola.org/sites/default/files/member/profile-photo/Tom_Rakocevic.jpg",
    "postalCode": "M3J1P3"
  }
}


BASE = "https://represent.opennorth.ca/postcodes/"
POSTCODE = "P0L1N0"

for school, info in themap.items():
    print(f"looking at school {school}")
    postal_code = info["postalCode"]
    response = requests.get(f"{BASE}{postal_code}")
    if response.status_code != 200:
        print(f"FAILED AT {school}")
        continue
#Michener Institute
    data = response.json()
    representatives = [x for x in data["representatives_centroid"] if x["elected_office"] == "MPP"]
    if representatives[0]["name"].lower() != info["name"].lower():
        print(f"FAILED NAME AT {school}")
        continue
    if representatives[0]["email"].lower() != info["email"].lower():
        print(f"FAILED EMAIL AT {school}")
        continue
    if representatives[0]["photo_url"] != info["photoUrl"]:
        print(f"FAILED PHOTO AT {school}")
        continue

