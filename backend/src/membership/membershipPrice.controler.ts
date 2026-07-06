import { Request, Response } from 'express'
import { membershipPriceService, MembershipPriceError } from './membershipPrice.service.js';

async function updateByGroup(req: Request, res: Response) {
  const { groupId, price } = req.body as { groupId: number, price: number };

  if (groupId === undefined || price === undefined) {
      return res.status(400).json({ message: "Se requieren 'groupId' y 'price'" });
  }

  try {
      const result = await membershipPriceService.updateByGroup(groupId, price);
      res.status(201).json(result);
  } catch (error: any) {
      if (error instanceof MembershipPriceError) {
          res.status(400).json({ message: error.message });
      } else {
          res.status(500).json({ message: error.message });
      }
  }
}

async function findCurrentGrouped(req: Request, res: Response) {
  try {
    const data = await membershipPriceService.findCurrentGrouped();
    res.status(200).json({ message: 'Precios agrupados encontrados', data: data });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { updateByGroup, findCurrentGrouped }