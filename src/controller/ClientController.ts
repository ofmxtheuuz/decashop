import { Request, Response } from "express"
import { ProductService } from "../services/ProductService"
import { CartService } from "../services/CartService"

const _ps: ProductService = new ProductService()
const _cs: CartService = new CartService()
export async function Index(req: Request, res: Response) {
    let cart = undefined;
    if(req.user != undefined){
        const user: any = req.user;
        cart = await _cs.getItens(user.id)
    }
    res.render("client/index", { 
        products: await _ps.find(), 
        carrinho: cart || [], 
        user: req.user, 
        title: "Início" 
    })
}