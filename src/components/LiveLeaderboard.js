import React from 'react'
import styled from 'styled-components'

import { StoreConsumer } from '../store'
import LeaderboardListItem from './LeaderboardListItem'

const LeaderBoardContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 80px;
  & > div:not(:last-child) {
    border-bottom: 2px dashed #6a6a6a;
  }
`

function LiveLeaderBoard() {
  return (
    <StoreConsumer>
      {({ topTen }) => (
        <React.Fragment>
          <h1 className="text-center">Top 10 Leaderboard</h1>
          <div
            className="container p-3 text-left"
            style={{ maxWidth: '400px' }}
          >
            <LeaderBoardContainer>
              {topTen.map((user, index) => (
                <LeaderboardListItem key={index} user={user} />
              ))}
            </LeaderBoardContainer>
          </div>
        </React.Fragment>
      )}
    </StoreConsumer>
  )
}

export default LiveLeaderBoard
