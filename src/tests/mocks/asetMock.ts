import IAset from '../../interface/Aset';

const asetMock: IAset = {
  name: 'TM103',
  status: 'Running',
  helthLevel: '90',
  image: '',
  model: 'WEG',
  owner: 'Industria Freios Supremos 1',
  energy: {
    data: [30, 40, 45, 30, 40, 45, 30, 40, 45, 30,
      40, 45, 30, 40, 45, 30, 40, 45, 30, 40, 45, 30,
      40, 45, 30, 40, 45, 30, 55, 60],
    limit: new Array(30).fill(50),
  },
  temp: {
    data: [30, 40, 45, 30, 40, 45, 30, 40, 45, 30,
      40, 45, 30, 40, 45, 30, 40, 45, 30, 40, 45, 30,
      40, 45, 30, 40, 45, 30, 55, 60],
    limit: new Array(30).fill(50),
  },
  vibration: {
    data: [30, 40, 45, 30, 40, 45, 30, 40, 45, 30,
      40, 45, 30, 40, 45, 30, 40, 45, 30, 40, 45, 30,
      40, 45, 30, 40, 45, 30, 55, 60],
    limit: new Array(30).fill(50),
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};

const asetMockId: IAset & { _id: string } = {
  _id: '62cf1fc6498565d94eba52cd',
  name: 'TM103',
  status: 'Running',
  helthLevel: '90',
  image: '',
  model: 'WEB',
  owner: 'Industria Freios Supremos 1',
  energy: {
    data: [30, 40, 45, 30, 40, 45, 30, 40, 45, 30,
      40, 45, 30, 40, 45, 30, 40, 45, 30, 40, 45, 30,
      40, 45, 30, 40, 45, 30, 55, 60],
    limit: new Array(30).fill(50),
  },
  temp: {
    data: [30, 40, 45, 30, 40, 45, 30, 40, 45, 30,
      40, 45, 30, 40, 45, 30, 40, 45, 30, 40, 45, 30,
      40, 45, 30, 40, 45, 30, 55, 60],
    limit: new Array(30).fill(50),
  },
  vibration: {
    data: [30, 40, 45, 30, 40, 45, 30, 40, 45, 30,
      40, 45, 30, 40, 45, 30, 40, 45, 30, 40, 45, 30,
      40, 45, 30, 40, 45, 30, 55, 60],
    limit: new Array(30).fill(50),
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};

export { asetMock, asetMockId };