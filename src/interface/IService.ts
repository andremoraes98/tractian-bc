interface IService<T> {
  create(object: T): Promise<T>;
  readOne(_id: string): Promise<T>;
}

export default IService;