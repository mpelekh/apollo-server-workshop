const { RESTDataSource } = require('apollo-datasource-rest')

class PostDataSource extends RESTDataSource {
  get baseURL() {
    return this.context.urlPrefix
  }

  getPost(postId) {
    return this.get(`posts/${postId}`)
  }

  getPosts(limit) {
    return this.get(`posts${limit ? `?_limit=${limit}` : ''}`)
  }
}

module.exports = PostDataSource
