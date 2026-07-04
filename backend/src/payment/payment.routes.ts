import { Router } from "express";
import { checkoutSessionClasses, checkoutSessionTalleres, checkTallerPaymentStatus } from "./payment.controller.js";

export const paymentRouter = Router();

paymentRouter.post('/create-checkout-session-classes', checkoutSessionClasses)
paymentRouter.post('/create-checkout-session-talleres', checkoutSessionTalleres)
paymentRouter.get('/session/:sessionId', checkTallerPaymentStatus)


