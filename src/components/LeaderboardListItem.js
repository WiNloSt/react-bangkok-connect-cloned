import React from 'react'
import styled from 'styled-components'

import Avatar from './Avatar'

const Score = styled.div`
  color: #f48668;
  font-size: 1.75rem;
`

function LeaderboardListItem(props) {
  const { user } = props
  const avatarSize = 60

  return (
    <div className="d-flex bg-dark p-3 justify-content-between align-items-center">
      <Avatar url={user.photoURL} size={avatarSize} />
      <div>{user.name}</div>
      {true || <Score>{user.score}</Score>}
    </div>
  )
}

export default LeaderboardListItem
