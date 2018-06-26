import React, { Component } from 'react'
import styled from 'styled-components'

import { getUserScores, getUser } from '../data'
import LeaderboardListItem from './LeaderboardListItem'

const LeaderBoardContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 80px;
  & > div:not(:last-child) {
    border-bottom: 2px dashed #6a6a6a;
  }
`

class Leaderboard extends Component {
  state = {
    topTen: []
  }

  componentDidMount() {
    this.fetchUserScores()
  }

  fetchUserScores = async () => {
    const exceptions = new Set()

    const users = await getUserScores()
    const topTen = await Promise.all(
      [...users]
        .sort((a, b) => (a[1] > b[1] ? -1 : 1))
        .filter(a => !exceptions.has(a[0]))
        .slice(0, 10)
        .map(async a => {
          let user = await getUser(a[0])
          user = {
            ...user,
            score: a[1]
          }
          return user
        })
    )

    this.setState({
      topTen
    })
  }

  render() {
    const { topTen } = this.state

    return (
      <React.Fragment>
        <h1 className="text-center">Top 10 Leaderboard</h1>
        <div className="container p-3 text-left" style={{ maxWidth: '400px' }}>
          <LeaderBoardContainer>
            {topTen.map((user, index) => (
              <LeaderboardListItem key={index} user={user} />
            ))}
          </LeaderBoardContainer>
        </div>
      </React.Fragment>
    )
  }
}

export default Leaderboard
