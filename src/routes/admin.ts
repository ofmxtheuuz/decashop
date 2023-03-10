import express, {Request, Response, NextFunction } from "express"
import * as controller from "../controller/AdminController"
const router = express.Router();

router.get("/dashboard", controller.Dashboard)
router.get("/pedidos", controller.Pedidos)
router.get("/criar", controller.Criar)
router.post("/criar", controller.CriarService)

export default router;