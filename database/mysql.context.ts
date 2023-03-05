import { DataSource } from "typeorm";

export const MysqlContext = new DataSource({
  type: "mysql",
  host: "db",
  port: 3306,
  username: "root",
  password: "mxtz2023",
  database: "decashop",
  synchronize: true,
  logging: false,
  entities: [],
  subscribers: [],
  migrations: [],
})