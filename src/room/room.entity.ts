import { Entity, Property, ManyToMany, Cascade, ManyToOne, Rel, BeforeCreate, Collection, OneToMany} from '@mikro-orm/core'
import { BaseEntity } from '../shared/DB/baseEntity.entity.js'
import { Taller } from '../taller/taller.entity.js'

@Entity()
export class Room extends BaseEntity {
    @Property({ nullable: false })
    name!: string
  
    @OneToMany(() => Taller, taller => taller.room)
    talleres = new Collection<Taller>(this);
    //falta agregar relaciones 

    }