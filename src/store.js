import React from 'react'
import * as R from 'ramda'
import {
  onUserChanged,
  onFriendsChanged,
  onAchievementsChanged,
  onGlobalAchievementsChanged,
  getUser
} from './data'

const context = React.createContext()

const ACTIONS = {
  FORCE_RENDER: 'FORCE_RENDER'
}

export const actions = {
  forceRender: () => ({
    type: ACTIONS.FORCE_RENDER
  })
}

export class StoreProvider extends React.Component {
  state = {
    user: {},
    friends: [],
    achievements: [],
    topTen: []
  }

  unsubscribeList = []

  stateReducer = (state, action) => {
    if (action.type === ACTIONS.FORCE_RENDER) {
      return R.merge(state, { dummy: Math.random() })
    }
    return state
  }

  dispatch = action => this.setState(this.stateReducer(this.state, action))

  updateUserStore = user => this.setState(state => R.merge(state, { user }))

  componentDidMount() {
    if (this.props.authUser) {
      const { uid } = this.props.authUser

      this.unsubscribeList.push(onUserChanged(uid, this.updateUserStore))
      this.unsubscribeList.push(
        onFriendsChanged(uid, friends => this.setState({ friends }))
      )
      this.unsubscribeList.push(
        onAchievementsChanged(uid, achievements =>
          this.setState({ achievements })
        )
      )
      this.unsubscribeList.push(
        onGlobalAchievementsChanged(async users => {
          const exceptions = new Set()
          exceptions.add('cWXmcSHph7UrpbGFlydiVDXBty42')

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
        })
      )
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authUser) {
      const { uid } = nextProps.authUser
      this.unsubscribeList.push(onUserChanged(uid, this.updateUserStore))
      this.unsubscribeList.push(
        onFriendsChanged(uid, friends => this.setState({ friends }))
      )
      this.unsubscribeList.push(
        onAchievementsChanged(uid, achievements =>
          this.setState({ achievements })
        )
      )
      this.unsubscribeList.push(
        onGlobalAchievementsChanged(async users => {
          const topTen = await Promise.all(
            [...users]
              .sort((a, b) => (a[1] > b[1] ? -1 : 1))
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
        })
      )
    }

    const userLogout = this.props.authUser && !nextProps.authUser
    if (userLogout) {
      this.unsubscribeList.forEach(unsubscribe => unsubscribe && unsubscribe())
      this.unsubscribeList = []
    }
  }

  render() {
    return (
      <context.Provider
        value={{
          ...this.state,
          authUser: this.props.authUser,
          dispatch: this.dispatch
        }}
      >
        {this.props.children}
      </context.Provider>
    )
  }
}

export const StoreConsumer = context.Consumer
