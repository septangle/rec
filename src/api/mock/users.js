import Memory from '../Memory'

let data = [{
  name: 'demo',
  password: '123'
}]

let users = new Memory({data: data})

users.register = function (user) {
  return this.add(user)
}

export default users
