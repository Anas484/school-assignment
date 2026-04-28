import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import type { school, schoolRequests, schoolRequestsQuery } from "../interface/SchoolInterface.js";
import { getDistance } from "../utils/distanceFormula.js";

const prisma = new PrismaClient();


const addSchool = async (req : Request , res: Response) => {
    
    const { name, address, latitude, longitude } = req.body as schoolRequests;

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
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
    
}


const listSchools = async (req : Request , res: Response) => {
    const {latitude , longitude} = req.query as any;
    const lat = Number(latitude);
    const lon = Number(longitude)
    try {
        const schools = await prisma.school.findMany();
        const schoolsWithDistance = schools.map((school: any) => {
            return {
                ...school,
                distance: getDistance(lat, lon, school.latitude, school.longitude)
            }
        });
        schoolsWithDistance.sort((a: any, b: any) => a.distance - b.distance);
        res.status(200).json(schoolsWithDistance);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}



export {
    addSchool,
    listSchools
}