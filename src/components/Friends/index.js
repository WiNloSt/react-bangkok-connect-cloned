import React from 'react'
import FriendListItem from '../FriendListItems'
import styled from 'styled-components'
import { Toggle, State } from 'react-powerplug'

import { StoreConsumer } from '../../store'
import { getCurrentOtpValue, clearOtpValue } from './util'
import { handleAddFriendWithOtp } from '../../logic/friends'
import { DefaultLoader } from '../Loader'
import { debounce } from '../../libs'

const cardHeight = 200
const animationDuration = 300

const CollapsableSection = styled.div`
  color: #333;
  max-width: 400px;
  height: 0;
  visibility: hidden;
  opacity: 0;
  overflow: hidden;
  transition: all ${animationDuration}ms;
  visibility: visible;

  &.parent.expanded {
    height: ${cardHeight}px;
    visibility: visible;
    opacity: 1;
  }

  &.parent.collapsed {
  }

  form {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  > {
    div {
      display: flex;
      flex-direction: column;
    }
  }
`

const Input = styled.input`
  font-size: 1.5rem;
  width: 50px;
  text-align: center;
  -moz-appearance: textfield;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

const createHandleKeyDown = (
  myUser,
  { setLoading, setErrorMessage, setSuccessMessage }
) => async e => {
  const keyValue = e.target.value
  // eslint-disable-next-line radix
  const isNumber = parseInt(keyValue) >= 0 && parseInt(keyValue) <= 9
  const isBackspace = e.which === 8
  if (!isNumber && !isBackspace) {
    return
  }

  if (isNumber) {
    const currentElement = e.target
    const nextElement = e.target.nextElementSibling
    currentElement.value = keyValue
    if (nextElement) {
      nextElement.focus()
    } else {
      // completed last digit
      currentElement.blur()
      const otp = getCurrentOtpValue(formRef.current)
      if (otp !== myUser.otp) {
        setLoading(true)
        await handleAddFriendWithOtp(otp, myUser, {
          setErrorMessage,
          setSuccessMessage
        })
        setLoading(false)
        clearOtpValue(formRef.current)
        firstInputNode.focus()
      } else {
        // is my own OTP
        setErrorMessage('You just entered your own code')
        clearOtpValue(formRef.current)
        firstInputNode.focus()
      }
    }
  }

  if (isBackspace) {
    const currentElement = e.target
    const previousElement = e.target.previousElementSibling
    currentElement.value = ''
    if (previousElement) {
      previousElement.focus()
    }
  }
}

let formRef = React.createRef()
let firstInputNode

let debouncedClearMessage
const AddFriendSection = ({ className }) => (
  <StoreConsumer>
    {({ user }) => (
      <State initial={{ loading: false, errorMessage: '', successMessage: '' }}>
        {({ state, setState }) => {
          const { loading, errorMessage, successMessage } = state
          const setLoading = loading => setState({ loading })
          debouncedClearMessage =
            debouncedClearMessage ||
            debounce(() => {
              setState({
                errorMessage: '',
                successMessage: ''
              })
            }, 3000)
          const setErrorMessage = errorMessage => {
            setState({ errorMessage, successMessage: '' })
            debouncedClearMessage()
          }
          const setSuccessMessage = successMessage => {
            setState({ successMessage, errorMessage: '' })
            debouncedClearMessage()
          }
          return (
            <CollapsableSection className={'card m-auto parent ' + className}>
              {loading && <DefaultLoader />}
              <div className={'card-body ' + className}>
                <p>
                  {errorMessage ? (
                    <span className="text-danger">{errorMessage}</span>
                  ) : successMessage ? (
                    <span className="text-success">{successMessage}</span>
                  ) : (
                    'Type your friend code to add them to your friend list'
                  )}
                </p>
                <form ref={formRef}>
                  <Input
                    onKeyUp={createHandleKeyDown(user, {
                      setLoading,
                      setErrorMessage,
                      setSuccessMessage
                    })}
                    className="form-control"
                    type="number"
                    pattern="[0-9]*"
                    inputmode="numeric"
                    innerRef={c => (firstInputNode = c)}
                  />
                  <Input
                    onKeyUp={createHandleKeyDown(user, {
                      setLoading,
                      setErrorMessage,
                      setSuccessMessage
                    })}
                    className="form-control"
                    type="number"
                    pattern="[0-9]*"
                    inputmode="numeric"
                  />
                  <Input
                    onKeyUp={createHandleKeyDown(user, {
                      setLoading,
                      setErrorMessage,
                      setSuccessMessage
                    })}
                    className="form-control"
                    type="number"
                    pattern="[0-9]*"
                    inputmode="numeric"
                  />
                  <Input
                    onKeyUp={createHandleKeyDown(user, {
                      setLoading,
                      setErrorMessage,
                      setSuccessMessage
                    })}
                    className="form-control"
                    type="number"
                    pattern="[0-9]*"
                    inputmode="numeric"
                  />
                </form>
              </div>
            </CollapsableSection>
          )
        }}
      </State>
    )}
  </StoreConsumer>
)

const getClassName = on => (on === null ? '' : on ? 'expanded' : 'collapsed')

const Friends = () => (
  <StoreConsumer>
    {({ user, friends }) => (
      <Toggle initial={null}>
        {({ on, toggle }) => (
          <div className="container p-3">
            <h1>Friends</h1>
            <AddFriendSection className={getClassName(on)} />
            <div>
              <button
                className="btn btn-primary my-3"
                onClick={() => {
                  const isClickToExpand = on === false || on === null
                  if (isClickToExpand) {
                    firstInputNode.focus()
                  } else {
                    clearOtpValue(formRef.current)
                  }
                  toggle()
                }}
              >
                Add Friends
              </button>
              <p>My friend code: {user.otp}</p>
              {friends.map(friend => (
                <FriendListItem friend={friend} key={friend.uid} />
              ))}
            </div>
          </div>
        )}
      </Toggle>
    )}
  </StoreConsumer>
)
export default Friends
