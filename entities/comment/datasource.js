const { RESTDataSource } = require('apollo-datasource-rest')

class CommentDataSource extends RESTDataSource {
  get baseURL() {
    return this.context.urlPrefix
  }

  getComments(postId) {
    return this.get(`comments${postId ? `?postId=${postId}` : ''}`)
  }

  async addComment(postId, comment) {
    const createdComment = await this.post(`posts/${postId}/comments`, comment)
    return {
      ...createdComment,
      postId,
      id: +new Date()
    }
  }
}

module.exports = CommentDataSource
