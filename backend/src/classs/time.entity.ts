import { Entity, Property, OneToMany, Collection} from '@mikro-orm/core'
import { BaseEntity } from '../shared/DB/baseEntity.entity.js'
import { Classs } from './classs.entity.js';

@Entity()
export class Time extends BaseEntity {
    @Property({ nullable: false,  type: 'string', length: 5  })
    startTime!: string

    @OneToMany(() => Classs, classs => classs.time)
    classes = new Collection<Classs>(this);
}