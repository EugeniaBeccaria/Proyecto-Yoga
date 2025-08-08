import crypto from 'node:crypto'

export class Taller {
  constructor(
    public name: string,
    public datetime: string,
    public price: number,
    public description: string,
    public cupo: number,
    public id?: number
  ) {}
}