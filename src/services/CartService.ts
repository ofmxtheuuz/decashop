import { Repository } from "typeorm";
import { CartItem } from "../../database/models/CartItem";
import { MysqlContext } from "../../database/mysql.context";
import { Product } from "../../database/models/Product";
import { ProductService } from "./ProductService";

class CartItems {
  user: string | undefined
  items: Array<CartProduct> = []
}

class CartProduct {
  product: Product | undefined
  quantity: number | undefined
  total: number | undefined
}

const _ps = new ProductService()
export class CartService {
  private readonly _r: Repository<CartItem>
  constructor() { this._r = MysqlContext.getRepository(CartItem) }

  async getCartByUserId(id: string): Promise<CartItems> {
    const rtrn = new CartItems();
    const cartitems = await this._r.find({where:{user:id}})
    rtrn.user = id
    for(const cartitem of cartitems) {
      if(cartitem.product != null) {
        let cartproduct = new CartProduct()
        let product = await _ps.findById(cartitem.product)
        if(product != null) {
          cartproduct.product = product
          cartproduct.quantity = cartitem.quantity
          if(cartproduct.quantity != undefined && cartproduct.product.price != undefined)
          {
            cartproduct.total = cartproduct.quantity * cartproduct.product.price
            rtrn.items.push(cartproduct)
          } 
        }
      }
    }
    return rtrn
  }


  async getItens(user_id: string): Promise<(string | undefined)[]> {
    let products = []
    const cartitems = await this._r.find({where:{user:user_id}})
    for(const cartitem of cartitems) {
      if(cartitem.product != null) {
        let product = await _ps.findById(cartitem.product)
        if(product != null) {
          products.push(product.name)
        }
      }
    }
    return products
  }


  async addToCart(user: string, productId: string) {
    let product = await this._r.findOne({where:{user, product: productId}})
    if(product == null) {
      let cartitem = new CartItem()
      cartitem.user = user
      cartitem.product = productId
      cartitem.quantity = 1
      await this._r.save(cartitem)
    } else {
      let quantity = product.quantity
      if(product.quantity != null && quantity != undefined) {
        this._r.update({user, product: productId}, {
          quantity: product.quantity + 1
        }) 
      }
    }
  }

  async removeFromCart(user: string, productId: string) {
    await this._r.delete({user, product: productId})
  }

  async removeQuantity(user: string, productId: string) {
    let cartitem = await this._r.findOne({where:{user, product: productId}})
    if(cartitem != null) {
      if(cartitem.quantity != null) {
        if(cartitem?.quantity > 1) {
          this._r.update({user, product: productId}, {
            quantity: cartitem.quantity - 1,
          }) 
        } else {
          await this.removeFromCart(user, productId)
        }
      }
    }
  }

  async addQuantity(user: string, productId: string) {
    let cartitem = await this._r.findOne({where:{user, product: productId}})
    if(cartitem != null) {
      if(cartitem.quantity != null) {
        console.log(user)
        console.log(productId)
        this._r.update({user, product: productId}, {
          quantity: cartitem.quantity + 1,
        }) 
      }
    }
  }

}