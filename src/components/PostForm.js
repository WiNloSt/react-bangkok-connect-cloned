import React, { Component } from 'react'

import { createPost } from '../data'
import Input from './Input'

class PostForm extends Component {
  state = {
    post: {
      title: '',
      description: '',
      tag: 'question'
    }
  }

  handleInputChanged = event => {
    this.setState({
      ...this.state,
      post: {
        ...this.state.post,
        [event.target.name]: event.target.value
      }
    })
  }

  handleSubmit = async event => {
    event.preventDefault()

    try {
      const { user, history } = this.props
      const ref = await createPost({
        ...this.state.post,
        author: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid
      })
      console.log('Document written with ID: ', ref.id)
      history.push(`/posts/${ref.id}`)
    } catch (error) {
      console.log('Error adding document: ', error)
    }
  }

  render() {
    const { post } = this.state
    const tags = [{ id: 1, value: 'question' }, { id: 2, value: 'discussion' }]

    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          type="text"
          name="title"
          label="Title"
          value={post.title}
          handleInputChanged={this.handleInputChanged}
          required
        />
        <Input
          type="textarea"
          name="description"
          label="Description"
          value={post.description}
          handleInputChanged={this.handleInputChanged}
          rows={5}
          required
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    )
  }
}

export default PostForm
