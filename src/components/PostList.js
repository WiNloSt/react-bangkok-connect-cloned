import React, { Component } from 'react'

import { getPosts } from '../data'
import PostListItem from './PostListItem'

class PostList extends Component {
  state = {
    posts: null
  }

  componentDidMount() {
    this.fetchAllPosts()
  }

  fetchAllPosts = async () => {
    const posts = await getPosts()

    this.setState({
      posts
    })
  }

  renderAllPosts(posts) {
    return posts.map((post, index) => (
      <PostListItem post={post} key={post.id} compact />
    ))
  }

  renderPostsNotFound() {
    return (
      <div className="p-5 bg-dark text-center rounded">
        <h3 className="text-muted">No thread found</h3>
      </div>
    )
  }

  render() {
    const { posts } = this.state

    return (
      <React.Fragment>
        {posts ? this.renderAllPosts(posts) : this.renderPostsNotFound()}
      </React.Fragment>
    )
  }
}

export default PostList
