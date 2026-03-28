import Stripe from "stripe";
import { orm } from '../shared/DB/orm.js'
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

const em = orm.em
const stripeClient = new Stripe(process.env.STRIPE_API_KEY!, {
    apiVersion: '2025-10-29.clover',
});

export async function checkoutSession(req: Request, res: Response, next: NextFunction) {
    const classes = req.body.classes
    const plan = req.body.plan;
    const user = req.body.user;
    const idClasses = classes.map((c: any) => c.id);
    //validar que el alumno no este inscripto en esa clase y que haya cupo en cada una

    // console.log(classes, user, plan);
    try{
        const metadata : Stripe.MetadataParam = {
            userId: user.id.toString(),
            plan: plan.numOfClasses.toString(),
            classes: JSON.stringify(idClasses)
        }
        // Creamos la sesion de pago con stripe y luego stripe manda el webhook a /api/webhook/stripe para validar la firma y llamar a la funcion 
        // handleCheckoutSessionCompleted de membership.service que se encarga de crear la membresia
        const session = await stripeClient.checkout.sessions.create({
            customer_email: user.email,
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        unit_amount: plan.price * 100,
                        product_data: {
                            name: `Membership Plan - ${plan.name}`,
                            description: `Access to ${plan.numOfClasses} classes per month`
                        },
                    },
                    quantity: 1
                }
            ],
            mode: 'payment',
            success_url: 'http://localhost:5173/checkout-status?session_id={CHECKOUT_SESSION_ID}', // success_url a pagina intermedia de carga
            cancel_url: 'http://localhost:5173/ClassCart?error=payment_cancelled', // con el aviso en el frontend de que el pago se cancelo
            metadata: metadata
        });
        res.status(200).json({ message: "Checkout session created", session });
    } 
    catch (error) {
        next(error);
    }
}