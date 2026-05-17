import { Router } from "express";
import { checkoutSessionClasses, checkoutSessionTalleres } from "./payment.controller.js";

export const paymentRouter = Router();

paymentRouter.post('/create-checkout-session-classes', checkoutSessionClasses)
paymentRouter.post('/create-checkout-session-talleres', checkoutSessionTalleres)


