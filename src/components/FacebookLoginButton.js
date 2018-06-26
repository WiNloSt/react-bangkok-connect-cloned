import React, { Component } from 'react'
import firebase from 'firebase/app'
import styled from 'styled-components'

const Button = styled.button`
  border-radius: 4px;
  padding: 0;
  border: none;
  display: flex;
  align-items: center;
  font-family: Helvetica, Arial, sans-serif;
  color: #fff;
  background: #4267b2;
  cursor: pointer;
`

const Svg = styled.svg`
  height: 24px;
  margin: 8px;
`

const Span = styled.span`
  margin-left: 12px;
  margin-right: 24px;
`

class FacebookLoginButton extends Component {
  login = async () => {
    const provider = new firebase.auth.FacebookAuthProvider()
    // provider.addScope('user_link')

    try {
      firebase.auth().signInWithRedirect(provider)
    } catch (error) {
      // Handle Error here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      // const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      // const credential = error.credential;

      console.log(`${errorCode}: ${errorMessage}`)
    }
  }

  render() {
    return (
      <Button type="button" onClick={this.login}>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 216 216"
          class="_5h0m"
          color="#FFFFFF"
        >
          <path
            fill="#FFFFFF"
            d="
          M204.1 0H11.9C5.3 0 0 5.3 0 11.9v192.2c0 6.6 5.3 11.9 11.9
          11.9h103.5v-83.6H87.2V99.8h28.1v-24c0-27.9 17-43.1 41.9-43.1
          11.9 0 22.2.9 25.2 1.3v29.2h-17.3c-13.5 0-16.2 6.4-16.2
          15.9v20.8h32.3l-4.2 32.6h-28V216h55c6.6 0 11.9-5.3
          11.9-11.9V11.9C216 5.3 210.7 0 204.1 0z"
          />
        </Svg>
        <Span>Continue with Facebook</Span>
      </Button>
    )
  }
}

export default FacebookLoginButton
