import React, { Component } from 'react'
import { Link as UnstyledLink, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'

import PostCreate from './PostCreate'
import PostList from './PostList'
import PostDetail from './PostDetail'

const Button = styled.button`
  background-color: white;
`

class Board extends Component {
  render() {
    return (
      <div className="container p-3 text-left">
        <h1 className="text-center">Boards</h1>
        <div className="d-flex align-items-center py-3">
          <Route
            exact
            path="/posts"
            render={() => (
              <div className="ml-auto">
                <UnstyledLink to="/posts/create">
                  <button className="btn btn-primary">Create Thread</button>
                </UnstyledLink>
              </div>
            )}
          />
          <Route
            path="/posts/*"
            render={() => (
              <div className="mr-auto">
                <UnstyledLink to="/posts">
                  <Button className="btn btn-outline-primary">Go Back</Button>
                </UnstyledLink>
              </div>
            )}
          />
        </div>

        <Switch>
          <Route exact path="/posts" component={PostList} />
          <Route exact path="/posts/create" component={PostCreate} />
          <Route path="/posts/:pid" component={PostDetail} />
        </Switch>
      </div>
    )
  }
}

export default Board
