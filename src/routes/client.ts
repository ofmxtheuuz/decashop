import express, {Request, Response, NextFunction } from "express" 
import * as controller from "../controller/ClientController"
const router = express.Router();

router.get("/", controller.Index)

export default router;