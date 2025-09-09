import { Entity, Property, OneToMany, Collection} from '@mikro-orm/core'
import { BaseEntity } from '../shared/DB/baseEntity.entity.js'
import { Classs } from './classs.entity.js';

@Entity()
export class Day extends BaseEntity {
    @Property({ nullable: false })
    name!: string

    @OneToMany(() => Classs, classs => classs.day)
    classes = new Collection<Classs>(this);

    }