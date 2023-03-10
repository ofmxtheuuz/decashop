import express, {Request, Response, NextFunction } from "express"
import * as controller from "../controller/AdminController"
const router = express.Router();

router.get("/dashboard", controller.Dashboard)
router.get("/pedidos", controller.Pedidos)

export default router;