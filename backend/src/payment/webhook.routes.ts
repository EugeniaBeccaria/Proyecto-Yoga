import {Router} from 'express';
import express from 'express';
import { stripeWebhookHandler } from './webhook.controller.js';

export const webhookRouter = Router();

webhookRouter.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhookHandler);
