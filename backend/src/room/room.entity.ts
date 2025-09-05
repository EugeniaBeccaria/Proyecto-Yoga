import { Entity, Property, ManyToMany, Cascade, ManyToOne, Rel, BeforeCreate, Collection, OneToMany} from '@mikro-orm/core'
import { BaseEntity } from '../shared/DB/baseEntity.entity.js'
import { Taller } from '../taller/taller.entity.js'
import { Classs } from '../classs/classs.entity.js'

@Entity()
export class Room extends BaseEntity {
    @Property({ nullable: false })
    name!: string
  
    @OneToMany(() => Taller, taller => taller.room)
    talleres = new Collection<Taller>(this);
    
    @OneToMany(() => Classs, classs => classs.room)
    classes = new Collection<Classs>(this);

    //falta agregar relaciones 
    }