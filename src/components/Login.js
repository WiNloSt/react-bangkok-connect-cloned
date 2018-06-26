import React from 'react'
import styled from 'styled-components'
import FacebookLoginButton from './FacebookLoginButton'

import logo from '../reactbkk-logo.png'

const Logo = styled.img`
  height: 150px;
`

const Title = styled.h1`
  color: #00d8ff;
`

export const Login = () => (
  <React.Fragment>
    <Logo src={logo} />
    <Title className="py-5">React Bangkok Connect</Title>
    <div>
      <p>Please login to continue</p>
      <FacebookLoginButton />
    </div>
  </React.Fragment>
)
