import express, {Request, Response, NextFunction } from "express" 
import * as controller from "../controller/CarrinhoController"
const router = express.Router();

router.get("/adicionar/:id", controller.addItem)

export default router;