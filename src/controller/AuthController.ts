import { Request, Response } from "express"
import { AuthService } from "../services/AuthService";

const _as = new AuthService();
export async function Login(req: Request, res: Response) {
    res.render("auth/login", { title: "Log-in" })
}
// not implemented yet
export async function LoginService() {}

export async function Register(req: Request, res: Response) {
    res.render("auth/register", { title: "Registrar-se" })
}
export async function RegisterService(req: Request, res: Response) {
  const { name, username, email, password } = req.body;
  if(await _as.CreateUser({name, username, email}, password)) {
    return res.redirect("/login")
  }
}