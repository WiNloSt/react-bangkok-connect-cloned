import React, { Component } from 'react'
import PostListItem from './PostListItem'
import CommentListItem from './CommentListItem'
import CommentForm from './CommentForm'

import firebase from 'firebase/app'

import { getPost } from '../data'
import { StoreConsumer } from '../store'

class PostDetail extends Component {
  state = {
    post: null,
    comments: [],
    participants: new Map(),
    isFetching: false
  }

  commentsListener = null
  participantListener = null

  componentDidMount() {
    const { pid } = this.props.match.params

    this.fetchPost(pid)

    this.commentsListener = firebase
      .firestore()
      .collection(`posts/${pid}/comments`)
      .orderBy('createdAt', 'asc')
      .onSnapshot(snapshot => {
        this.setState({
          comments: [
            ...snapshot.docs.map(doc =>
              Object.assign({ id: doc.id, pid }, doc.data())
            )
          ]
        })
      })

    this.participantListener = firebase
      .firestore()
      .collection(`posts/${pid}/participants`)
      .onSnapshot(snapshot => {
        const { participants } = this.state

        snapshot.forEach(doc => {
          participants.set(doc.id, doc.data())
        })
        this.setState({
          participants
        })
      })
  }

  componentWillUnmount() {
    //Unsubscribe Listener
    this.commentsListener()
    this.participantListener()
  }

  fetchPost = async pid => {
    this.setState({
      isFetching: true
    })

    try {
      const post = await getPost(pid)
      this.setState({
        post,
        isFetching: false
      })
      return post
    } catch (error) {
      console.log(error)
      this.setState({
        isFetching: false
      })
      return null
    }
  }

  render() {
    const { post, comments, participants } = this.state
    const { match } = this.props

    return (
      <StoreConsumer>
        {({ authUser }) =>
          !post || (
            <React.Fragment>
              <PostListItem post={post} />

              <h5>Total Comments: {comments ? comments.length : 0}</h5>

              <div className="py-3">
                {comments && comments.length ? (
                  comments.map(comment => (
                    <CommentListItem
                      key={comment.id}
                      comment={comment}
                      isRewardButtonDisplayed={
                        !(
                          (post.uid === authUser.uid &&
                            comment.uid === authUser.uid) ||
                          post.uid === comment.uid
                        )
                      }
                      isPostOwner={post.uid === authUser.uid}
                      isRewarded={
                        participants.has(comment.uid)
                          ? participants.get(comment.uid).isRewarded
                          : false
                      }
                    />
                  ))
                ) : (
                  <div className="p-5 bg-dark text-center rounded">
                    <h3 className="text-muted">No Comments</h3>
                  </div>
                )}
                <div className="row">
                  <div className="col-md-6">
                    <h5 className="my-3">Create new Comment</h5>
                    <CommentForm postID={match.params.pid} user={authUser} />
                  </div>
                </div>
              </div>
            </React.Fragment>
          )
        }
      </StoreConsumer>
    )
  }
}

export default PostDetail
