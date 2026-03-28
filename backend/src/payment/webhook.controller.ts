import { Request, Response } from "express";
import Stripe from 'stripe';
import { membershipService } from '../membership/membership.service.js';

export async function stripeWebhookHandler(req: Request, res: Response) {
    const secretWebhookKey = process.env.STRIPE_WEBHOOK_SECRET;
    // la CLI de Stripe envia los eventos a este endpoint 
    if (!secretWebhookKey) {
        return res.status(500).send('Stripe secret key not configured.');
    }
    const sig = req.headers['stripe-signature'] as string;
    let event : Stripe.Event
    try 
    {
        // verificar la firma del webhook
        const stripe = new Stripe(process.env.STRIPE_API_KEY!, { apiVersion: '2025-10-29.clover' });
        event = stripe.webhooks.constructEvent(req.body, sig, secretWebhookKey!);
        switch (event.type) {
            case 'checkout.session.completed':
                console.log(`Evento recibido: ${event.type}`);
                const session = event.data.object as Stripe.Checkout.Session;
                const dataWebhook = await membershipService.handleCheckoutSessionCompleted(session);
                console.log(`Membresía creada para el usuario ${dataWebhook.user.email} con tipo de membresía: ${dataWebhook.membership.membershipType.description}.`);
                break;
            case 'checkout.session.expired':
                console.log('La sesión de pago expiró sin completarse.');
                break;
            default:
                console.log(`Evento no manejado: ${event.type}`);
        }
        res.status(200).json({ received: true }); // Responder a Stripe que el webhook se recibió correctamente para que no siga intenando reenviar el evento.
    } 
    catch (err) {
        res.status(400).send(`Webhook Error: ${err}`);
        console.log(`Webhook signature verification failed.`, err);
    }
}