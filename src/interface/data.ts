interface Aset {
  id: number,
  name: string,
  model: string,
  owner: 'Freios Supremos 1' | 'Freios Supremos 2',
  status: 'Running' | 'Alerting' | 'Stopped'
  helthLevel: number,
  image: string,
}

export default Aset;