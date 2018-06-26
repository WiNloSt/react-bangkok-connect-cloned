import React, { Component } from 'react'
import styled, { injectGlobal } from 'styled-components'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import firebase from 'firebase/app'
import Promise from 'bluebird'
import Redirect from 'react-router-dom/Redirect'

import Friends from './components/Friends'
import Board from './components/Board'
import Dashboard from './components/Dashboard'
import { createOtpForUserIfNotExist, setUserData } from './logic/login'
import { StoreProvider } from './store'
import { ReactLoader } from './components/Loader'
import { Nav } from './components/Nav'
import { Login } from './components/Login'
import { Instruction } from './components/Instruction'
import LiveLeaderboard from './components/LiveLeaderboard'
import Leaderboard from './components/Leaderboard'
import Leaderboard2 from './components/Leaderboard2'

injectGlobal`
html, body, #root {
  padding: 0;
  margin: 0;
  height: 100%;
  background: #333;
  color: white;
}

.ReactModal__Body--open {
  overflow: hidden;
}

.ReactModal__Overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0, 0.75);
  z-index: 1;
  padding: 1rem;
  overflow-y: auto;
  text-align: center;

  ::after {
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align:middle;
  }
}
`

const AppStyle = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100vh;
`

const Center = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

class App extends Component {
  state = {
    loading: true,
    authUser: null
  }

  componentDidMount() {
    const userPromise = new Promise(resolve => {
      firebase.auth().onAuthStateChanged(() => {
        resolve()
      })
    })

    Promise.all([userPromise, Promise.delay(500)]).then(() => {
      this.setState({
        loading: false
      })
    })

    firebase.auth().onAuthStateChanged(authUser => {
      if (authUser) {
        this.handleLoggedIn(authUser)
      } else {
        this.handleNonLoggedIn()
      }
    })
  }

  logout = async () => {
    firebase.auth().signOut()
  }

  handleLoggedIn(authUser) {
    this.setState({ authUser })
    setUserData(authUser)
    createOtpForUserIfNotExist(authUser)
    // updateUserProfileUrlIfRedirectedFromFacebook()
  }

  handleNonLoggedIn() {
    this.setState({ authUser: null })
  }

  render() {
    return this.state.loading ? (
      <ReactLoader />
    ) : (
      <StoreProvider authUser={this.state.authUser}>
        <Router>
          <AppStyle>
            {!this.state.authUser ? (
              <Center>
                <Redirect to="/" />
                <Login />
              </Center>
            ) : (
              <React.Fragment>
                <Switch>
                  <Route path="/liveleaderboard" component={LiveLeaderboard} />
                  <Route path="/leaderboard" component={Leaderboard} />
                  <Route path="/leaderboard2" component={Leaderboard2} />
                  <Route
                    path="/"
                    render={() => (
                      <React.Fragment>
                        <Instruction />
                        <Nav onLogout={this.logout} />
                        <Switch>
                          <Redirect from="/" exact to="/dashboard" />
                          <Route path="/posts" component={Board} />
                          <Route path="/dashboard">
                            <Dashboard user={this.state.authUser} />
                          </Route>
                          <Route path="/friends">
                            <Friends user={this.state.authUser} />
                          </Route>
                          <Redirect to="/" />
                        </Switch>
                      </React.Fragment>
                    )}
                  />
                </Switch>
              </React.Fragment>
            )}
          </AppStyle>
        </Router>
      </StoreProvider>
    )
  }
}

export default App
