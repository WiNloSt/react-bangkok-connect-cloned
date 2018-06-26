import React, { Component } from 'react'
import styled from 'styled-components'

import { rewardParticipant } from '../data'
import { debounce } from '../libs'
import Avatar from './Avatar'
import { DateTime } from 'luxon'

const Body = styled.p`
  white-space: pre-wrap;
`

const RewardButton = styled.button`
  &.btn-outline-secondary:hover {
    color: #fff;
    background-color: #28a745;
    border-color: #28a745;
  }
`

class CommentListItem extends Component {
  state = {
    isSubmitting: false
  }

  reward = async (pid, uid) => {
    const { isRewarded } = this.props

    this.setState({
      isSubmitting: true
    })

    await rewardParticipant(pid, uid, !isRewarded)

    debounce(
      () =>
        this.setState({
          isSubmitting: false
        }),
      1000
    )()
  }

  render() {
    const {
      comment,
      isRewarded,
      isRewardButtonDisplayed,
      isPostOwner
    } = this.props
    const { isSubmitting } = this.state
    const avatarSize = 60
    const commentedAt =
      comment.createdAt &&
      DateTime.fromJSDate(comment.createdAt.toDate()).toFormat('ff')

    return (
      <div className="bg-dark p-3 mb-3">
        <div className="d-flex">
          <Avatar url={comment.photoURL} size={avatarSize} />
          <div className="ml-3 d-flex-column">
            <Body>{comment.body}</Body>
            <div>
              <span className="text-muted">by {comment.author}</span>
              {' - '}
              <span className="text-muted">{commentedAt}</span>
            </div>
            {!isRewardButtonDisplayed || (
              <RewardButton
                className={`mt-3 btn ${
                  isRewarded ? 'btn-success' : 'btn-outline-secondary'
                } btn-sm ${!isRewarded || 'active'}`}
                type="button"
                onClick={() =>
                  this.reward(comment.pid, comment.uid, isRewarded)
                }
                disabled={!isPostOwner || isSubmitting}
              >
                <i className="fas fa-star " />{' '}
                {isRewarded ? 'Rewarded' : 'Reward'}
              </RewardButton>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default CommentListItem
