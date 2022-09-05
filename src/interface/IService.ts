interface IService<T> {
  create(object: T): Promise<T>;
  readOne(_id: string): Promise<T>;
  readAll(): Promise<T[]>;
  update(_id: string, object: T): Promise<void>,
  destroy(_id: string): Promise<void>,
}

interface IServiceUser<T> {
  create(object: T): Promise<T>;
  readOne(_id: string): Promise<T>;
  readAll(): Promise<T[]>;
  update(_id: string, object: T): Promise<void>,
  destroy(_id: string): Promise<void>,
  readOneWhoUnit(unit: string): Promise<T>;
}

export default IService;
export { IServiceUser };