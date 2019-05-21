const { RESTDataSource } = require('apollo-datasource-rest')

class UserDataSource extends RESTDataSource {
  get baseURL() {
    return this.context.urlPrefix
  }

  getUser(userId) {
    return this.get(`users/${userId}`)
  }

  getUsers() {
    return this.get(`users`)
  }
}

module.exports = UserDataSource
