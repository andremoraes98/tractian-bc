import IAset from '../../interface/Aset';

const asetMock: IAset = {
  name: 'TM103',
  status: 'Running',
  helthLevel: '90',
  image: '',
  model: 'WEG',
  owner: 'Industria Freios Supremos 1',
  energy: [30, 40, 45, 30, 40, 45, 30, 40, 45, 30,
    40, 45, 30, 40, 45, 30, 40, 45, 30, 40, 45, 30,
    40, 45, 30, 40, 45, 30, 55, 60],
  temp: [30, 40, 45, 30, 40, 45, 30, 40, 45, 30,
    40, 45, 30, 40, 45, 30, 40, 45, 30, 40, 45, 30,
    40, 45, 30, 40, 45, 30, 55, 60],
  vibration: [30, 40, 45, 30, 40, 45, 30, 40, 45, 30,
    40, 45, 30, 40, 45, 30, 40, 45, 30, 40, 45, 30,
    40, 45, 30, 40, 45, 30, 55, 60],
};

const asetMockId: IAset & { _id: string } = {
  _id: '62cf1fc6498565d94eba52cd',
  name: 'TM103',
  status: 'Running',
  helthLevel: '90',
  image: '',
  model: 'WEB',
  owner: 'Industria Freios Supremos 1',
  energy: [30, 40, 45, 30, 40, 45, 30, 40, 45, 30,
    40, 45, 30, 40, 45, 30, 40, 45, 30, 40, 45, 30,
    40, 45, 30, 40, 45, 30, 55, 60],
  temp: [30, 40, 45, 30, 40, 45, 30, 40, 45, 30,
    40, 45, 30, 40, 45, 30, 40, 45, 30, 40, 45, 30,
    40, 45, 30, 40, 45, 30, 55, 60],
  vibration: [30, 40, 45, 30, 40, 45, 30, 40, 45, 30,
    40, 45, 30, 40, 45, 30, 40, 45, 30, 40, 45, 30,
    40, 45, 30, 40, 45, 30, 55, 60],
};

export { asetMock, asetMockId };