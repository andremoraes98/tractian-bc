interface IModel<T> {
  create(object: T): Promise<T>,
  readOne(_id: string): Promise<T | null>,
  readAll(): Promise<T[]>
  update(_id: string, object: T): Promise<void>,
  destroy(_id: string): Promise<void>,
}

interface IModelAsset<T> extends IModel<T> {
  readAllWhoOwner(owner: string): Promise<T[] | []>,
}

export default IModel;
export { IModelAsset };
