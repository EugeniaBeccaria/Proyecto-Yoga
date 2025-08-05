import { Repository } from "../shared/repository.js";
import { Taller } from "./taller.entity.js";

const talleres = [
  new Taller(
    'meditacion',
    'lunes 13 4 de la tarde',
    6000,
    'meditacion para principiantes',
    25,
    'a02b91bc-3769-4221-beb1-d7a3aeba7dad'
  ),
]

export class TallerRepository implements Repository<Taller> {
   
    public findAll(): Taller[] | undefined {
        return talleres;
    }
    
    public findOne(item: { id: string; }): Taller | undefined {
        return talleres.find((taller)=> taller.id === item.id);
    }
    public add(item: Taller): Taller | undefined{
        talleres.push(item);
        return item;
    }
    public update(item : Taller): Taller | undefined {
        const tallerIdx = talleres.findIndex((taller) => taller.id === item.id)
        if (tallerIdx !== -1) {
         talleres[tallerIdx] = { ...talleres[tallerIdx], ...item}
        }
        return talleres[tallerIdx]
    }
    public delete (item: {id: string;}): Taller | undefined{
         const tallerIdx = talleres.findIndex((taller) => taller.id === item.id)
         if (tallerIdx !== -1) {
            const deletedCharacters =  talleres[tallerIdx]
            talleres.splice(tallerIdx, 1)
        return deletedCharacters;
    }
    }
}
