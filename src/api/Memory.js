import _ from 'lodash'

// todo generate id

export default class {
  constructor (args) {
    this.data = args.data
    this.idProperty = args.idProperty || 'id'
  }

  fetch () {
    return _.clone(this.data)
  }

  add (data) {
    return this.update(data)
  }

  remove (id) {
    let index = this.getIndex(id)
    return this.data.splice(index, 1)
  }

  get (id) {
    return this.data.filter((item) => item[this.idProperty] === id)[0]
  }

  getIndex (id) {
    let item = this.get(id)
    return this.data.indexOf(item)
  }

  update (data) {
    let index = this.getIndex(data[this.idProperty])
    if (index < 0) {
      return this.data.push(data)
    } else {
      return this.data.splice(index, 1, data)
    }
  }
}
