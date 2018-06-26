import React, { Component } from 'react'
import { Link as UnstyledLink } from 'react-router-dom'
import styled from 'styled-components'
import { DateTime } from 'luxon'

import Avatar from './Avatar'

const Link = styled(UnstyledLink)`
  color: inherit;

  &:hover {
    color: inherit;
    text-decoration: inherit;
  }

  > div:hover {
    background: #5c5c5c !important;
  }
`

const HeaderLink = styled.h4`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

class PostListItem extends Component {
  render() {
    const { post, compact } = this.props
    const avatarSize = 100
    const postedAt =
      post.createdAt &&
      DateTime.fromJSDate(post.createdAt.toDate()).toFormat('ff')

    const content = (
      <div className="d-flex p-3 mb-3 bg-dark rounded">
        <div>
          <div className="d-flex align-items-center">
            <Avatar url={post.photoURL} size={avatarSize} />
            <div className="ml-3">
              {compact ? (
                <HeaderLink>{post.title}</HeaderLink>
              ) : (
                <h4>{post.title}</h4>
              )}
              <span className="text-muted">by {post.author}</span>
              {' - '}
              <span className="text-muted">{postedAt}</span>
              <span className="pl-3">{post.commentCount}</span>
            </div>
          </div>

          {compact || <p className="mt-3">{post.description}</p>}
        </div>
      </div>
    )

    return compact ? <Link to={`/posts/${post.id}`}>{content}</Link> : content
  }
}

export default PostListItem
