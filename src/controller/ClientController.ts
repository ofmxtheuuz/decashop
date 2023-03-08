import { Request, Response } from "express"
import { ProductService } from "../services/ProductService"
import { CartService } from "../services/CartService"

async function isAuthenticated(req: Request): Promise<boolean> {
    if(req.user == null) {
        return false
    } else {
        return true
    }
}


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

export async function Checkout(req: Request, res: Response) {
    if(!(await isAuthenticated(req))) return res.redirect("/login")
    if(req.user == null) return res.redirect('/login')
    const user: any = req.user;
    const user_id = user.id;
    const cart = await _cs.getCartByUserId(user_id)
    const total = await _cs.getTotal(user_id)
    
    res.render("client/checkout", {user, cart, total})
}