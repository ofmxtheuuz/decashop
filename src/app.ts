import express, { Request, Response, NextFunction } from 'express'
import { MysqlContext } from '../database/mysql.context';
const app = express()

require("dotenv").config();

import { server, database, error } from './helpers/messages';
import * as handlebars from 'express-handlebars'
import * as path from 'path';
import * as session from 'express-session';
import * as parser from "cookie-parser"
import * as logger from "morgan"
import config from "config";

app.set('views', path.join(__dirname, 'views'));

app.engine('handlebars', handlebars.engine({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');


app.use(session.default({
    secret: process.env.SESSION_SECRET || "347GJ86259SF3DS42657GABN235GAS672A3ASD5FD78567",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 2 * 60 * 1000 }
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger.default("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(parser.default());

import client from "./routes/client";
app.use('/', client)

import auth from "./routes/auth";
app.use('/', auth)


const PORT = process.env.PORT 

MysqlContext.initialize().then(() => {
    database("Conexão com MySQL estabelecida com sucesso na porta 3306")
    app.listen(PORT, () => {
        server(`Servidor aberto e operando na porta ${PORT}: http://localhost:${PORT}`);
    })
})