import {Router} from "express";
import {addSchool, listSchools} from "../controllers/SchoolController.js";

const schoolRouter = Router();

schoolRouter.post("/addSchool", addSchool);
schoolRouter.get("/listSchools", listSchools);

export default schoolRouter;