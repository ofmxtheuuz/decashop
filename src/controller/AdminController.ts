import { NextFunction, Request, Response } from "express"
import {PaymentService} from "../services/PaymentService";

const _payment: PaymentService = new PaymentService()
async function isAuthenticated(req: Request): Promise<boolean> {
    if(req.user == null) {
        return false
    } else {
        const user: any = req.user
        if(user.role == "admin") {
            return true
        }
        return true
    }
}

export async function Dashboard(req: Request, res: Response) {
    if(!(await isAuthenticated(req))) return res.redirect("/login")
    if(req.user == null) return res.redirect('/login')

    res.render("admin/dashboard", { title: "Painel do admin", user: req.user })
}

export async function Pedidos(req: Request, res: Response) {
    if(!(await isAuthenticated(req))) return res.redirect("/login")
    if(req.user == null) return res.redirect('/login')

    const result = await _payment.getInvoicesAndOrders();
    
    res.render("admin/pedidos", { title: "Pedidos", infs: result, user: req.user })
}