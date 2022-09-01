interface IModel<T> {
  create(object: T): Promise<T>,
  readOne(_id: string): Promise<T | null>
}

export default IModel;
