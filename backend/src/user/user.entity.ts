import { Entity, Property, ManyToMany, Cascade, ManyToOne, Rel, BeforeCreate, Collection, OneToMany} from '@mikro-orm/core'
import { BaseEntity } from '../shared/DB/baseEntity.entity.js'
import { Taller } from '../taller/taller.entity.js'
import { Classs } from '../classs/classs.entity.js'
import bcrypt from 'bcrypt';

@Entity()
export class User extends BaseEntity {
    @Property({ nullable: false })
    name!: string

    @Property({ nullable: true })
    lastname?: string

    @Property({ nullable: true })
    birthdate?: Date

   @Property({ nullable: false, unique: true })
    email!: string
    
    @Property({ nullable: true })
    phone?: string

    @Property({ nullable: true })
    dni?: string

    @Property({ nullable: true })
    role?: string = 'client'

    @Property({ nullable: true, hidden: true })
    password?: string;

    @Property({ nullable: true, unique: true }) // para usuarios que se registren con Google
    googleId?: string;

    @ManyToMany(() => Taller, (taller) => taller.users)
    talleres = new Collection<Taller>(this)

    @OneToMany(() => Classs, (classs) => classs.professor)
    taughtClasses = new Collection<Classs>(this);

    @ManyToMany(() => Classs, (classs) => classs.users)
    classes = new Collection<Classs>(this);

    async setPassword(password: string): Promise<void> {
        this.password = await bcrypt.hash(password, 12);
    }

    }