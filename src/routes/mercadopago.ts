import express from "express"
import * as controller from "../controller/MercadoPagoController"
const router = express.Router();

router.get("/cb", controller.Callback)
router.post("/notification", controller.Notification)

export default router;