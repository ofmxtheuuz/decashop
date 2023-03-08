import express, {Request, Response, NextFunction } from "express" 
import * as controller from "../controller/ClientController"
const router = express.Router();

router.get("/", controller.Index)
router.get("/checkout", controller.Checkout)

export default router;