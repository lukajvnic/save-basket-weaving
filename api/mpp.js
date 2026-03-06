export default async function handler(req, res) {
    const { postal_code } = req.query;

    if (!postal_code) {
        return res.status(400).json({ error: "Missing postal_code parameter" });
    }

    try {
        const response = await fetch(
            `https://represent.opennorth.ca/postcodes/${encodeURIComponent(postal_code)}`
        );

        if (!response.ok) {
            return res.status(response.status).json({ error: "Failed to fetch data from Represent API" });
        }

        const data = await response.json();
        const mpp = data.representatives_centroid.find(
            (rep) => rep.elected_office === "MPP"
        );

        if (!mpp) {
            return res.status(404).json({ error: "No MPP found for this postal code" });
        }

        res.status(200).json({
            name: mpp.name,
            email: mpp.email,
            party_name: mpp.party_name,
            district_name: mpp.district_name,
            photo_url: mpp.photo_url
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
