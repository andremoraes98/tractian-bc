interface IModel<T> {
  create(object: T): Promise<T>,
  readOne(_id: string): Promise<T | null>,
  readAll(): Promise<T[]>
}

export default IModel;
