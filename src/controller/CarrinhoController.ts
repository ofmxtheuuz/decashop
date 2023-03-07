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

export async function addItem(req: Request, res: Response) {
  if(!(await isAuthenticated(req))) return res.redirect("/login")
  if(req.user == null) return res.redirect('/login') 
  const user: any = req.user;
  const user_id = user.id;
  const product_id = req.params.id
  _cs.addToCart(user_id, product_id)
  res.redirect("/")
}

