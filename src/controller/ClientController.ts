import { Request, Response } from "express"
import { ProductService } from "../services/ProductService"

const _ps: ProductService = new ProductService()
export async function Index(req: Request, res: Response) {
    res.render("client/index", { products: await _ps.find(), user: req.user, title: "Início" })
}