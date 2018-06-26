import React, { Component } from 'react'

import { getUserScores, getUser } from '../data'
import { Prizes } from './Prizes'


class Leaderboard extends Component {
  state = {
    topTen: []
  }

  componentDidMount() {
    this.fetchUserScores()
  }

  fetchUserScores = async () => {
    const exceptions = new Set()
    exceptions.add('cWXmcSHph7UrpbGFlydiVDXBty42')

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
    return (
      <React.Fragment>
        <Prizes candidates={this.state.topTen} />
      </React.Fragment>
    )
  }
}

export default Leaderboard
