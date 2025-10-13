import { Entity, Property, ManyToMany, Cascade, ManyToOne, Rel, Collection} from '@mikro-orm/core'
import { BaseEntity } from '../shared/DB/baseEntity.entity.js'
import { User } from '../user/user.entity.js'
import { Room } from '../room/room.entity.js'
import { Day } from './day.entity.js';
import { Time } from './time.entity.js';

@Entity()
export class Classs extends BaseEntity {
    @Property({ nullable: false })
    name!: string

    @Property({ nullable: false })
    description!: string

    @Property({ nullable: true })
    capacityLimit?: number

    // Relacion con alumnos (users)
    @ManyToMany(() => User, (user) => user.classes, {cascade: [Cascade.ALL], owner: true,})
    users = new Collection <User> (this)
    
    // Relacion con profesor (user)
    @ManyToOne(() => User)
    profesor!: Rel<User>; 

    @ManyToOne(() => Room) // Muchas clases pueden estar en la misma sala, crea una CF room_id en la tabla classs
    room!: Rel<Room>; // Rel<Room> referencia el objeto completo cargado desde la tabla Room

    @ManyToOne(() => Day)
    day!: Rel<Day>;

    @ManyToOne(() => Time)
    time!: Rel<Time>;
    }