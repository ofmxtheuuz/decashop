import {Repository} from "typeorm";
import mercadopago from "mercadopago";
import {MysqlContext} from "../../database/mysql.context";
import {Orders} from "../../database/models/Order";
import {CartService} from "./CartService";
import {Invoices} from "../../database/models/Invoice";

const ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESSTOKEN || ""
const NOTIFICATION_URL = process.env.MERCADOPAGO_NOTIFICATIONURL || ""
mercadopago.configure({
    sandbox: true,
    access_token: ACCESS_TOKEN
})

interface Product { 
    product: string,
    quantity: number
}

interface Userinfo {
    name: string,
    surname: string,
    cpf: string,
    email: string,
    country: string,
    phone: string,
    state: string,
    city: string,
    neighborhood: string,
    cep: string,
    street: string
}

export class PaymentService {
    private readonly _r: Repository<Orders>
    private readonly _r2: Repository<Invoices>
    private readonly _ct: CartService
    constructor() {
        this._r = MysqlContext.getRepository(Orders)
        this._r2 = MysqlContext.getRepository(Invoices)
        this._ct = new CartService()
    }
    private async addOrder(user_id: string, products: any) {
        return await this._r.save({
            user_id: user_id,
            products: products
        })
    }
    
    async createPayment(external_reference: string, email: string, total: number, name: string) {
        const payment_data = {
            transaction_amount: total,
            description: name,
            notification_url: NOTIFICATION_URL,
            back_urls: {
              success: "https://localhost:3333/mp/cb",
              pending: "https://localhost:3333/mp/cb", 
              failure: "https://localhost:3333/mp/cb"
            },
            external_reference: external_reference,
            payer: {
                email: email
            }
        };
        const payment = await mercadopago.preferences.create(payment_data)
        return payment.body.init_point
    }
    
    async addInvoice(user_infos: Userinfo, user_id: string, status = "pending", ipv4 = "::1", payment_type = "undefined") {
        let products = []
        const total = await this._ct.getTotal(user_id)
        const cart = await this._ct.getCartByUserId(user_id)
        for(const item of cart.items) {
            products.push({
                product: item.product?.id,
                quantity: item.quantity
            })
        }
        const order = await this.addOrder(user_id, products)
        const external_reference = `DECASHOP-${Math.floor(Math.random() * (999999 - 111111) + 111111)}`

        return await this._r2.save({
            user_id,
            name: user_infos.name,
            surname: user_infos.surname,
            cpf: user_infos.cpf,
            email: user_infos.email,
            country: user_infos.country,
            state: user_infos.state,
            external_reference,
            city: user_infos.city,
            neighborhood: user_infos.neighborhood,
            cep: user_infos.cep,
            phone: user_infos.phone,
            street: user_infos.street,
            order: order.id,
            total: total,
            payment_type: payment_type,
            ipv4: ipv4,
            status: status
        })
    }   
}