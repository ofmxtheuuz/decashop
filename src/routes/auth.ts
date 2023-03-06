import express, {Request, Response, NextFunction } from "express" 
import * as controller from "../controller/AuthController"
const router = express.Router();

router.get("/login", controller.Login)
router.post("/auth/login")

router.get("/register", controller.Register)
router.post("/auth/register", controller.RegisterService)

export default router;