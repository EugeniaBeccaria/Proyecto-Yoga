import { Entity, Property, ManyToMany, Cascade, ManyToOne, Rel, Collection} from '@mikro-orm/core'
import { BaseEntity } from '../shared/DB/baseEntity.entity.js'
import { User } from '../user/user.entity.js'
import { Room } from '../room/room.entity.js'

@Entity()
export class Taller extends BaseEntity {
  @Property({ nullable: false })
  name!: string
  
  @Property({ nullable: false })
  datetime!: string

  @Property({ nullable: false })
  price!: number

  @Property({ nullable: false })
  description!: string
  
  @Property({ nullable: false })
  cupo!: number

  @ManyToOne(() => Room)
  salon!: Rel<Room>;

  @ManyToMany(() => User, (user) => user.talleres, {cascade: [Cascade.ALL], owner: true,})
  users = new Collection <User> (this);

  //falta agregar relaciones 
}

