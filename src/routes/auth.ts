import express, {Request, Response, NextFunction } from "express" 
import * as controller from "../controller/AuthController"
import passport from "passport";
const router = express.Router();

router.get("/login", controller.Login)
router.post("/auth/login", passport.authenticate('local', { successRedirect: '/', failureRedirect: "/login", failureFlash: true }))

router.get("/register", controller.Register)
router.post("/auth/register", controller.RegisterService)

router.get("/logout", controller.Logout)

export default router;