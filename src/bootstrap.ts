import express, {Request, Response, NextFunction} from "express";
import {User} from "../database/models/User";
import {MysqlContext} from "../database/mysql.context";

const app = express();

require("dotenv").config();

import {server, database, error} from "./helpers/messages";
import * as handlebars from "express-handlebars";
import * as path from "path";
import * as session from "express-session";
import * as parser from "cookie-parser";
import * as logger from "morgan";
import config from "config";
import * as LocalStrategy from "passport-local";
import passport from "passport";
import {verify} from "./strategies/local.strategie";

app.set("views", path.join(__dirname, "views"));

app.engine(
    "handlebars",
    handlebars.engine({
        defaultLayout: "main",
        helpers: {
            contains: function (array: string[] | undefined, value: any) {
                if (array != undefined) {
                    if (array.indexOf(value) != -1) {
                        return true
                    }
                }
                return false
            },
            formatDate: function (date: string) {
                const data = new Date(date);
                const dia = data.getDate().toString().padStart(2, '0');
                const mes = (data.getMonth() + 1).toString().padStart(2, '0');
                const ano = data.getFullYear().toString();
                const hora = data.getHours().toString().padStart(2, '0');
                const minuto = data.getMinutes().toString().padStart(2, '0');
                const segundo = data.getSeconds().toString().padStart(2, '0');
                const dataFormatada = `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`;
                return dataFormatada
            },
            admin: async function (user: any) {
                if (user.role == "admin") {
                    return true
                }
                return false;
            },
            getUser: async function (user_id: string, options: any) {
                const auth =  new AuthService()
                let name: any = ""
                const result = await auth.findById(user_id)
                if(result != null) {
                    return options.fn(result.name)
                }
            }
        },
    })
);
app.set("view engine", "handlebars");

app.use(
    session.default({
        secret:
            process.env.SESSION_SECRET ||
            "347GJ86259SF3DS42657GABN235GAS672A3ASD5FD78567",
        resave: true,
        saveUninitialized: true,
        cookie: {maxAge: 30 * 60 * 1000},
    })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(logger.default("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(parser.default());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy.Strategy({usernameField: "username"}, verify));

import client from "./routes/client";

app.use("/", client);

import auth from "./routes/auth";
app.use("/", auth);

import cart from "./routes/cart";

app.use("/carrinho", cart);
import mp from "./routes/mercadopago";

app.use("/mp", mp);
import admin from "./routes/admin"
import {AuthService} from "./services/AuthService";
app.use("/admin", admin)

const auths = new AuthService()

const PORT = process.env.PORT;
MysqlContext.initialize().then(async () => {
    await auths.createAdmin("root", "admin@mxtheuz.com.br", "root", "admin2023")
    server("Usuário admin padrão criado com sucesso! (root:admin2023)")
    database("Conexão com MySQL estabelecida com sucesso na porta 3306");
    app.listen(PORT, () => {
        server(
            `Servidor aberto e operando na porta ${PORT}: http://localhost:${PORT}`
        );
    });
});
