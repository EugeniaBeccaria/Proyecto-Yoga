import { Request, Response } from 'express'
import { membershipService } from './membership.service.js'

async function findOneBySessionId(req: Request, res: Response) {
  try {
    const sessionId = req.params.sessionId;
    const membership = await membershipService.findOneBySessionId(sessionId);
    res.status(200).json({ message: 'found membership', data: membership })
  }
  catch (error: any) {
    res.status(404).json({ message: error.message })
  }
}

async function findOneByUserId(req: Request, res: Response) {
  try {
    const userId = req.params.userId;
    const membership = await membershipService.findOneByUserId(userId);
    if (membership) {
      res.status(200).json({ message: 'found membership', data: membership })
    }
    else {      
      res.status(404).json({ message: 'No active membership found for this user' })
    }
  }
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export { findOneByUserId, findOneBySessionId }