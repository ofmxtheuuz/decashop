import {Repository} from "typeorm";
import mercadopago from "mercadopago";
import {MysqlContext} from "../../database/mysql.context";
import {Orders} from "../../database/models/Order";
import {CartService} from "./CartService";
import {Invoices} from "../../database/models/Invoice";
import {ProductService} from "./ProductService";
import {AuthService} from "./AuthService";
import {User} from "../../database/models/User";

const ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESSTOKEN_TEST || ""
const NOTIFICATION_URL = process.env.MERCADOPAGO_NOTIFICATIONURL || ""
mercadopago.configure({
    access_token: ACCESS_TOKEN
})


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

interface findPayment {
    order: any,
    invoice: any,
    products: any,
    user: any
}

interface GetInvoicesAndOrders { 
    invoices: Invoices[]
    orders: Orders[]
}

export class PaymentService {
    private readonly _r: Repository<Orders>
    private readonly _r2: Repository<Invoices>
    private readonly _ct: CartService
    private readonly _ps: ProductService;
    private readonly _as: AuthService
    constructor() {
        this._r = MysqlContext.getRepository(Orders)
        this._r2 = MysqlContext.getRepository(Invoices)
        this._ct = new CartService()
        this._ps = new ProductService()
        this._as = new AuthService()
    }
    private async addOrder(user_id: string, products: any) {
        return await this._r.save({
            user_id: user_id,
            products: products
        })
    }
    
    async callback(ipv4: string, payment_type: string, external_reference: string) {
        return await this._r2.update({external_reference}, {
            ipv4,
            payment_type
        })
    }
    
    async findMpPayment(id: number) {
        return mercadopago.payment.get(id)
    }
    
    async UpdateStatus(external_reference: string, status: string) {
        return await this._r2.update({external_reference}, {status})
    } 
    
    async findPaymentByExternalReference(external_reference: string): Promise<findPayment>{
        const invoice = await this._r2.findOne({where:{external_reference}})
        const user_id = invoice?.user_id || ""
        const user = await this._as.findById(user_id)
        const order = await this._r.findOne({where:{id: invoice?.id}}) || undefined
        const products_ids = order?.products || []
        let products = []
        
        // add products to array
        for(const product_id of products_ids) {
            const product = await this._ps.findById(product_id.product)
            products.push(product)
        }
        
        return {
            order,
            user,
            invoice,
            products
        }
    }
    
    async getInvoicesAndOrderByUserId(user_id: string): Promise<GetInvoicesAndOrders> {
        const invoices = await this._r2.find({where:{user_id}})
        const orders = await this._r.find({where:{user_id}})
        
        return {
            invoices,
            orders
        }
    }
    async getInvoiceAndOrderByOrderId(order_id: string) {
        const invoice = await this._r2.findOne({where:{order: order_id}})
        const user_id = invoice?.user_id || ""
        const user = await this._as.findById(user_id)
        const order = await this._r.findOne({where:{id: order_id}}) || undefined
        const products_ids = order?.products || []
        let products = []

        // add products to array
        for(const product_id of products_ids) {
            const product = await this._ps.findById(product_id.product)
            products.push(product)
        }

        return {
            order,
            user,
            invoice,
            products
        }
    }
    
    async createPayment(external_reference: string, email: string, total: number, name: string) {
        let preference = {
            items: [
                {
                    title: 'Produto(s) decashop',
                    unit_price: total,
                    quantity: 1,
                }
            ],
            external_reference,
            notification_url: NOTIFICATION_URL, // https://url.com/mp/notification
            back_urls: {
                success: "http://localhost:3333/mp/cb",
                failure: "http://localhost:3333/mp/cb",
                pending: "http://localhost:3333/mp/cb"
            }
        };
        const payment = await mercadopago.preferences.create(preference)
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