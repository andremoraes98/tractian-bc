interface IService<T> {
  create(object: T): Promise<T>;
  readOne(_id: string): Promise<T>;
  readAll(): Promise<T[]>;
  update(_id: string, object: T): Promise<void>,
  destroy(_id: string): Promise<void>,
}

interface IServiceAset<T> extends IService<T> {
  readAllWhoOwner(owner: string): Promise<T[] | []>;
}

export default IService;
export { IServiceAset };