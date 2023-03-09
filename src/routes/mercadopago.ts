import express, {Request, Response, NextFunction } from "express"
import * as controller from "../controller/MercadoPagoController"
const router = express.Router();

router.get("/cb", controller.Callback)
router.post("")

export default router;