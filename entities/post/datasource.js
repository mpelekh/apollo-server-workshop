const { RESTDataSource } = require('apollo-datasource-rest')

class PostDataSource extends RESTDataSource {
  get baseURL() {
    return this.context.urlPrefix
  }

  getPost(postId) {
    return this.get(`posts/${postId}`)
  }
}

module.exports = PostDataSource
