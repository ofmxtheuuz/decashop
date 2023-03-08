import "reflect-metadata"
import { DataSource } from "typeorm";
import { Product } from "./models/Product";
import { User } from "./models/User";
import { CartItem } from "./models/CartItem";
import {Orders} from "./models/Oder";
import {Invoices} from "./models/Invoice";

export const MysqlContext = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "mxtz2023",
  database: process.env.DB_DB || "decashop",
  synchronize: true,
  logging: false,
  entities: [Product, User, CartItem, Orders, Invoices],
  subscribers: [],
  migrations: [],
})