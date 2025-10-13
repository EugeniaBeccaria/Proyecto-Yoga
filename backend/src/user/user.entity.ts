import { Entity, Property, ManyToMany, Cascade, ManyToOne, Rel, BeforeCreate, Collection, OneToMany} from '@mikro-orm/core'
import bcrypt from 'bcryptjs'
import { BaseEntity } from '../shared/DB/baseEntity.entity.js'
import { Taller } from '../taller/taller.entity.js'
import { Classs } from '../classs/classs.entity.js'

@Entity()
export class User extends BaseEntity {
    @Property({ nullable: false })
    name!: string

    @Property({ nullable: true })
    lastname?: string

    @Property({ nullable: true })
    birthdate?: Date

    @Property({ nullable: false })
    email!: string
    
    @Property({ nullable: true })
    phone?: number

    @Property({ nullable: true })
    dni?: number

    @Property({ nullable: true })
    role?: string = 'client'

    @Property({ nullable: false, hidden: true })
    password!: string;

    @ManyToMany(() => Taller, (taller) => taller.users)
    talleres = new Collection<Taller>(this)

    @OneToMany(() => Classs, (classs) => classs.profesor)
    taughtClasses = new Collection<Classs>(this);

    @ManyToMany(() => Classs, (classs) => classs.users)
    classes = new Collection<Classs>(this);

    }