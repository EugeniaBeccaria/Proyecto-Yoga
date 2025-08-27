import { Entity, Property, ManyToMany, Cascade, ManyToOne, Rel, BeforeCreate, Collection} from '@mikro-orm/core'
import bcrypt from 'bcrypt'
import { BaseEntity } from '../shared/DB/baseEntity.entity.js'
import { Taller } from '../taller/taller.entity.js'

@Entity()
export class User extends BaseEntity {
    @Property({ nullable: false })
    name!: string
  
    @Property({ nullable: false })
    lastname!: string

    @Property({ nullable: false })
    birthdate!: Date

    @Property({ nullable: false })
    email!: string
    
    @Property({ nullable: false })
    phone!: number

    @Property({ nullable: false })
    dni!: number

    @Property({ nullable: false })
    role: string = 'client'

    @Property({ nullable: false, hidden: true })
    password!: string;

   @BeforeCreate()
    async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
    }

    @ManyToMany(() => Taller, (taller) => taller.users)
    talleres = new Collection<Taller>(this);

    //falta agregar relaciones 

    }