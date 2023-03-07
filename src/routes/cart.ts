import express, {Request, Response, NextFunction } from "express" 
import * as controller from "../controller/CarrinhoController"
import { CartService } from "../services/CartService";
const router = express.Router();

router.get("/adicionar/:id", controller.addItem)
router.get("/finalizar", controller.Index)
router.get("/adicionar/quantidade/:id", controller.AddQuantity)
router.get("/remover/quantidade/:id", controller.RmQuantity)
router.get("/remover/:id", controller.RemoveItem)

export default router;