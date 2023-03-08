import { Request, Response } from "express";
import { User } from "../../database/models/User";
import { CartService } from "../services/CartService";

const _cs = new CartService();
async function isAuthenticated(req: Request): Promise<boolean> {
  if(req.user == null) {
    return false
  } else {
    return true
  }
} 

export async function Index(req: Request, res: Response) {
  if(!(await isAuthenticated(req))) return res.redirect("/login")
  if(req.user == null) return res.redirect('/login') 
  const user: any = req.user;
  const user_id = user.id;
  const cart = await _cs.getCartByUserId(user_id)

  res.render("cart/index", { user, cart, total: await _cs.getTotal(user_id), title: "Carrinho" })
}

export async function addItem(req: Request, res: Response) {
  if(!(await isAuthenticated(req))) return res.redirect("/login")
  if(req.user == null) return res.redirect('/login') 
  const user: any = req.user;
  const user_id = user.id;
  const product_id = req.params.id
  _cs.addToCart(user_id, product_id)
  res.redirect("/")
}


export async function AddQuantity(req: Request, res: Response) {
  if(!(await isAuthenticated(req))) return res.redirect("/login")
  if(req.user == null) return res.redirect('/login')
  const user: any = req.user;
  if(user.id == null) res.redirect("/")
  const user_id = user.id;
  await _cs.addQuantity(user_id, req.params.id)

  res.redirect("/carrinho/finalizar")
}

export async function RmQuantity(req: Request, res: Response) {
  if(!(await isAuthenticated(req))) return res.redirect("/login")
  if(req.user == null) return res.redirect('/login')
  const user: any = req.user;
  if(user.id == null) res.redirect("/")
  const user_id = user.id;
  await _cs.removeQuantity(user_id, req.params.id)

  res.redirect("/carrinho/finalizar")
}

export async function RemoveItem(req: Request, res: Response) {
  if(!(await isAuthenticated(req))) return res.redirect("/login")
  if(req.user == null) return res.redirect('/login')
  const user: any = req.user;
  if(user.id == null) res.redirect("/")
  const user_id = user.id;
  await _cs.removeFromCart(user_id, req.params.id)

  res.redirect("/carrinho/finalizar")
}

