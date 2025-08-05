export interface Repository<T>{
    findAll(): T[] | undefined;
    findOne(item: {id: string}): T | undefined; // lo que sea que tenga ID y sea un OBJETO
    add(item:T): T | undefined;
    update(item:T): T | undefined;
    delete(item: {id: string}): T | undefined;
}