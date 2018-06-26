import React from 'react'
import { StoreConsumer } from '../store'

import PostForm from './PostForm'

function PostCreate(props) {
  return (
    <React.Fragment>
      <h3 className="mt-3 mb-3">Create Post</h3>
      <StoreConsumer>
        {({ authUser }) => <PostForm user={authUser} history={props.history} />}
      </StoreConsumer>
    </React.Fragment>
  )
}

export default PostCreate
