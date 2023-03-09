import { Request, Response } from "express"
import {PaymentService} from "../services/PaymentService";

const _ps = new PaymentService()
async function isAuthenticated(req: Request): Promise<boolean> {
    if(req.user == null) {
        return false
    } else {
        return true
    }
}

export async function Callback(req: Request, res: Response) {
    const payment = await _ps.findMpPayment(parseInt(<string>req.query.payment_id))
    
    await _ps.callback(payment.body.additional_info.ip_address, payment.body.payment_method.id, payment.body.external_reference)
    await _ps.UpdateStatus(payment.body.external_reference, payment.body.status)
    
    res.redirect("/sucesso")
}