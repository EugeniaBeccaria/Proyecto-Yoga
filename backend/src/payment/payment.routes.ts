import { Router } from "express";
import { checkoutSession } from "./payment.controller.js";

export const paymentRouter = Router();

paymentRouter.post('/create-checkout-session', checkoutSession)


