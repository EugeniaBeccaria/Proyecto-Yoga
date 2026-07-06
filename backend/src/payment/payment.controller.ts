import { Request, Response, NextFunction } from "express";
import { paymentService, PaymentError } from "./payment.service.js";

export async function checkoutSessionClasses(req: Request, res: Response, next: NextFunction) {
    const classes = req.body.classes;
    const plan = req.body.plan;
    const user = req.body.user;

    try {
        const session = await paymentService.createCheckoutSessionClasses(classes, plan, user);
        res.status(200).json({ message: "Checkout session created", session });
    }
    catch (error) {
        next(error);
    }
}

export async function checkoutSessionTalleres(req: Request, res: Response, next: NextFunction) {
    const talleres = req.body.talleres;
    const user = req.body.user;

    try {
        const session = await paymentService.createCheckoutSessionTalleres(talleres, user);
        res.status(200).json({ message: "Checkout session created", session });
    }
    catch (error: any) {
        if (error instanceof PaymentError) {
            return res.status(error.status || 500).json({ message: error.message });
        }
        next(error);
    }
}

export async function checkTallerPaymentStatus(req: Request, res: Response, next: NextFunction) {
    try {
        const sessionId = req.params.sessionId;
        const allEnrolled = await paymentService.checkTallerPaymentStatus(sessionId);

        if (allEnrolled) {
            res.status(200).json({ message: "Compra de talleres verificada", enrolled: true });
        } else {
            res.status(404).json({ message: "El usuario aún no está inscrito en los talleres.", enrolled: false });
        }
    } catch (error: any) {
        if (error instanceof PaymentError) {
            return res.status(error.status || 500).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
}