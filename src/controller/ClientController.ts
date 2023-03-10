import { Request, Response } from "express"
import { ProductService } from "../services/ProductService"
import { CartService } from "../services/CartService"
import {PaymentService} from "../services/PaymentService";

async function isAuthenticated(req: Request): Promise<boolean> {
    if(req.user == null) {
        return false
    } else {
        return true
    }
}


const _ps: ProductService = new ProductService()
const _cs: CartService = new CartService()
const _payment: PaymentService = new PaymentService()
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
    
    res.render("client/checkout", {user, cart, total, title: "Checkout"})
}

export async function CheckoutService(req: Request, res: Response) {
    if(!(await isAuthenticated(req))) return res.redirect("/login")
    if(req.user == null) return res.redirect('/login')
    const {nome, sobrenome, telefone, cpf, pais, estado, cidade, bairro, cep, rua} = req.body;
    const user: any = req.user;
    const user_id = user.id;
    const email = user.email
    
    const invoice = await _payment.addInvoice({name: nome, surname: sobrenome, cpf: cpf, country: pais, state: estado, city: cidade, neighborhood: bairro, cep, street: rua, email, phone: telefone}, user_id)
    res.redirect(await _payment.createPayment(invoice.external_reference, email, invoice.total, "Decashop produto(s)"))
}

export async function ClientDashboard(req: Request, res: Response) {
    if(!(await isAuthenticated(req))) return res.redirect("/login")
    if(req.user == null) return res.redirect('/login')

    const user: any = req.user;
    const user_id = user.id;
    const InvoicesAndOrders = await _payment.getInvoicesAndOrderByUserId(user_id)
    
    res.render("client/dashboardclient", { infs: InvoicesAndOrders, user, title: "Dashboard" })
}

export async function DashboardPedido(req: Request, res: Response) {
    const order_id = req.params.id
    const result = await _payment.getInvoiceAndOrderByOrderId(order_id)
    const user: any = req.user
    const user_id = user?.id || ""
    
    if(result.invoice?.user_id == user_id && result.order?.user_id == user_id) {
        return res.render("client/pedido", { user, infs: result })
    }
    return res.redirect("/login")
}