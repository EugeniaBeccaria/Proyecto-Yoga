import { Request, Response } from "express";
import { webhookService } from "./webhook.service.js";

export async function stripeWebhookHandler(req: Request, res: Response) {
    const secretWebhookKey = process.env.STRIPE_WEBHOOK_SECRET;
    if (!secretWebhookKey) {
        return res.status(500).send('Stripe secret key not configured.');
    }
    const sig = req.headers['stripe-signature'] as string;
    try {
        await webhookService.processWebhook(req.body, sig, secretWebhookKey);
        res.status(200).json({ received: true });
    } 
    catch (err) {
        res.status(400).send(`Webhook Error: ${err}`);
        console.log(`Webhook signature verification failed.`, err);
    }
}