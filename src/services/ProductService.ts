import { MysqlContext } from "../../database/mysql.context"
import { Product } from "../../database/models/Product"
import { Repository } from "typeorm"

export class ProductService {
  private readonly _r: Repository<Product>
  constructor() {
    this._r = MysqlContext.getRepository(Product)
  }

  async find(): Promise<Product[]> {
    return await this._r.find()
  }

  async findById(id: number): Promise<Product | null> {
    return await this._r.findOne({ where: { id } })
  }
}