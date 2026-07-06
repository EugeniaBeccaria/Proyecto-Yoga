import Stripe from "stripe";
import { orm } from '../shared/DB/orm.js';
import { User } from "../user/user.entity.js";

const em = orm.em;
const stripeClient = new Stripe(process.env.STRIPE_API_KEY!, {
    apiVersion: '2025-10-29.clover',
});

export class PaymentError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'PaymentError';
  }
}

async function createCheckoutSessionClasses(classes: any[], plan: any, user: any) {
  const idClasses = classes.map((c: any) => c.id);
  const metadata: Stripe.MetadataParam = {
      userId: user.id.toString(),
      plan: plan.numOfClasses.toString(),
      classes: JSON.stringify(idClasses)
  };

  const session = await stripeClient.checkout.sessions.create({
      customer_email: user.email,
      line_items: [
          {
              price_data: {
                  currency: 'ars',
                  unit_amount: plan.price * 100,
                  product_data: {
                      name: `${plan.description}`,
                      description: `Accede a hasta ${plan.numOfClasses} clases por semana`
                  },
              },
              quantity: 1
          }
      ],
      mode: 'payment',
      success_url: 'http://localhost:5173/checkout-status?type=membership&session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:5173/ClassCart?error=payment_cancelled',
      metadata: metadata
  });

  return session;
}

async function createCheckoutSessionTalleres(talleres: any[], user: any) {
  if (!talleres || !Array.isArray(talleres) || talleres.length === 0) {
      throw new PaymentError("No se enviaron talleres para el checkout.", 400);
  }

  const idTalleres = talleres.map((t: any) => t.id);
  const metadata: Stripe.MetadataParam = {
      userId: user?.id?.toString(),
      talleres: JSON.stringify(idTalleres)
  };

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = talleres.map((taller: any) => ({
      price_data: {
          currency: 'ars',
          unit_amount: Math.round(Number(taller.price) * 100),
          product_data: {
              name: `Taller - ${taller.name}`,
              description: taller.description || undefined
          },
      },
      quantity: 1
  }));

  const session = await stripeClient.checkout.sessions.create({
      customer_email: user.email,
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:5173/checkout-status?type=taller&session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:5173/ClassCart?error=payment_cancelled_talleres',
      metadata: metadata
  });

  return session;
}

async function checkTallerPaymentStatus(sessionId: string) {
  const session = await stripeClient.checkout.sessions.retrieve(sessionId);
  if (!session) {
      throw new PaymentError("No se encontró la sesión de Stripe.", 404);
  }
  const metadata = session.metadata;
  if (!metadata || !metadata.userId || !metadata.talleres) {
      throw new PaymentError("Metadatos de sesión no válidos o faltantes.", 400);
  }

  const userId = metadata.userId;
  const idTalleres = JSON.parse(metadata.talleres);

  const forkEm = em.fork();
  const user = await forkEm.findOneOrFail(User, { id: userId }, { populate: ['talleres'] });
  const enrolledTallerIds = user.talleres.getItems().map(t => t.id);

  const allEnrolled = idTalleres.every((id: string) => enrolledTallerIds.includes(id));
  return allEnrolled;
}

export const paymentService = {
  createCheckoutSessionClasses,
  createCheckoutSessionTalleres,
  checkTallerPaymentStatus
};
