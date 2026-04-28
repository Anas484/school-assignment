import { PrismaClient } from "@prisma/client";
import { getDistance } from "../utils/distanceFormula.js";
const prisma = new PrismaClient();
const addSchool = async (req, res) => {
    const { name, address, latitude, longitude } = req.body;
    try {
        if (!name || !address || !latitude || !longitude) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const school = await prisma.school.create({
            data: {
                name,
                address,
                latitude,
                longitude
            }
        });
        res.status(201).json(school);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
const listSchools = async (req, res) => {
    const { latitude, longitude } = req.query;
    const lat = Number(latitude);
    const lon = Number(longitude);
    try {
        const schools = await prisma.school.findMany();
        const schoolsWithDistance = schools.map((school) => {
            return {
                ...school,
                distance: getDistance(lat, lon, school.latitude, school.longitude)
            };
        });
        schoolsWithDistance.sort((a, b) => a.distance - b.distance);
        res.status(200).json(schoolsWithDistance);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
export { addSchool, listSchools };
//# sourceMappingURL=SchoolController.js.map