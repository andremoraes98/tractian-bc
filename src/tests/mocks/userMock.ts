import IUser from '../../interface/User';

const userMock: IUser = {
  user: 'Emerson',
  unit: 'Disco'
}

const userMockId: IUser & { _id: string} = {
  _id: '62cf1fc6498565d94eba52cd',
  ...userMock,
}

export { userMock, userMockId };