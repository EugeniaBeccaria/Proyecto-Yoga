import { Repository } from "../shared/repository.js";
import { Taller } from "./taller.entity.js";
import {pool} from '../shared/DB/conn.mysql.js'; 
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export class TallerRepository implements Repository<Taller> {
   
    public async findAll(): Promise<Taller[] | undefined> {
        const [talleres]= await pool.query('select * from talleres')
        return talleres as Taller[]
    }
    
    public async findOne(item: { id: string; }): Promise<Taller | undefined> {
        const id= Number.parseInt(item.id) 
        const [talleres]= await pool.query<RowDataPacket[]>('select * from characters where id = ?', [id])
        if (talleres.length === 0) {
        return undefined
        }
        const taller = talleres[0] as Taller
        return taller 
    }

    public async add(tallerInput: Taller): Promise< Taller | undefined>{
        const {id, ... talleresRow} = tallerInput
        const [result] = await pool.query<ResultSetHeader>('insert into talleres set ?', [tallerInput])
        tallerInput.id=result.insertId
        return tallerInput;
    }
    public async update(id:string , tallerInput : Taller): Promise< Taller | undefined> {
        const tallerId= Number.parseInt(id)
        await pool.query('update talleres set ? where id = ?', [tallerInput, tallerId])
        return await this.findOne({id})
    }
    
    public async delete (item: {id: string;}): Promise<Taller | undefined> {
        try {
        const tallerToDelete = await this.findOne(item)
        const tallerId = Number.parseInt(item.id)
        await pool.query('delete from talleres where id= ?', tallerId)
        return tallerToDelete
        }
        catch (error:any){
            throw new Error ('unable to delete taller')
        }
    } 
}