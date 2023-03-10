import express, {Request, Response, NextFunction } from "express" 
import * as controller from "../controller/ClientController"
const router = express.Router();

router.get("/", controller.Index)

router.get("/checkout", controller.Checkout)
router.post("/checkout", controller.CheckoutService)
router.get("/dashboard", controller.ClientDashboard)
router.get("/pedido/:id", controller.DashboardPedido)

router.get("/successo", (req: Request, res: Response) => { res.render("client/sucesso") })
export default router;