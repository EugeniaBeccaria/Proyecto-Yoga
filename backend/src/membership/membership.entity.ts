import { Entity, Property, ManyToMany, Cascade, ManyToOne, Rel, BeforeCreate, Collection} from '@mikro-orm/core'
import { BaseEntity } from '../shared/DB/baseEntity.entity.js'
import { User } from '../user/user.entity.js'
import { MembershipType}  from '../membership/membershipType.entity.js'

@Entity()
export class Membership extends BaseEntity {
    @Property({ nullable: false , type: 'date' })
    startDate!: Date
  
    @Property({ nullable: false , type: 'date' })
    endDate!: Date

    @Property({ nullable: false })
    status!: string

    @ManyToOne(() => User)
    user!: Rel<User>;

    @ManyToOne(() => MembershipType)
    membershipType!: Rel<MembershipType>;

    }
    