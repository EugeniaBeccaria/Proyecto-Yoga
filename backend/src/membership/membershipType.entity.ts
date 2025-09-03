import { Entity, Property, ManyToMany, Cascade, ManyToOne, Rel, BeforeCreate, Collection, OneToMany} from '@mikro-orm/core'
import { BaseEntity } from '../shared/DB/baseEntity.entity.js'
import { Membership } from './membership.entity.js'
import { MembershipPrice } from './membershipPrice.entity.js'

@Entity()
export class MembershipType extends BaseEntity {
    @Property({ nullable: false})
    numOfClasses!: number
  
    @Property({ nullable: false })
    description!: string

    @OneToMany(() => Membership, membership => membership.membershipType)
    memberships = new Collection<Membership>(this)

    @OneToMany(() => MembershipPrice, membershipPrice => membershipPrice.membershipType)
    membershipPrices = new Collection<MembershipPrice>(this)
    }
