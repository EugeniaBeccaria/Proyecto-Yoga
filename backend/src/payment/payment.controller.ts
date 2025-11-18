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
            userId: user.id,
            plan: plan.numOfClasses.toString(),
            classes: JSON.stringify(idClasses)
        }

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
                        recurring: {
                            interval: 'month',
                        },
                    },
                    quantity: 1
                }
            ],
            mode: 'subscription',
            // implementar pagina de carga para el success del front, que realice una peticion para verificar si la membresia se creo correctamente
            success_url: 'http://localhost:5173/myClassesPage',
            cancel_url: 'http://localhost:5173/ClassCart',
            metadata: metadata
        });
        res.status(200).json({ message: "Checkout session created", session });
    } 
    catch (error) {
        next(error);
    }
}