import { PrimaryKey } from "@mikro-orm/core";
import { v4 } from 'uuid';

export abstract class BaseEntity {
    @PrimaryKey({ type: 'uuid' })
    id?: string = v4();

    /*
  @Property({ type: DateTimeType })
  createdAt? = new Date()

  @Property({
    type: DateTimeType,
    onUpdate: () => new Date(),
  })
  updatedAt? = new Date()

  si los usamos tenemos que importarlos
  */
}