import { PrimaryKey } from "@mikro-orm/core";

export abstract class BaseEntity {
    @PrimaryKey()
    id?: number //extiende para todas las entidades un id autoincremental

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