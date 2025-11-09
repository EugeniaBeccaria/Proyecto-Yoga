import { Entity, Property, ManyToOne, Rel } from '@mikro-orm/core'
import { BaseEntity } from '../shared/DB/baseEntity.entity.js'
import { MembershipType } from './membershipType.entity.js';


@Entity()
export class MembershipPrice extends BaseEntity {
    @Property({ nullable: false})
    price!: number
  
    @Property({ nullable: false, type : 'datetime' })
    priceDate!: Date

    @ManyToOne(() => MembershipType)
    membershipType!: Rel<MembershipType>
    }