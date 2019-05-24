const { RESTDataSource } = require('apollo-datasource-rest')

class CommentDataSource extends RESTDataSource {
  get baseURL() {
    return this.context.urlPrefix
  }

  getComments(postId) {
    return this.get(`comments${postId ? `?postId=${postId}` : ''}`)
  }

  addComment(postId, comment) {
    return this.post(`posts/${postId}/comments`, comment)
  }
}

module.exports = CommentDataSource
