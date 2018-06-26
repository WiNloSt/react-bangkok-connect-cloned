import React from 'react'
import UnstyledModal from 'react-modal'
import styled from 'styled-components'

import { Toggle, Value } from 'react-powerplug'
import { StoreConsumer } from '../store'

const Content = styled.div`
  text-align: left;
  align-self: flex-start;
  margin-top: 1rem;
  margin-bottom: 1rem;

  > h2 {
    font-size: 20px;
    font-weight: bold;
  }

  li:not(:first-child) {
    margin-top: 1rem;
  }
`

const Modal = styled(UnstyledModal)`
  min-height: 500px;
  width: 100%;
  max-width: 500px;

  color: #333;
  background: white;
  border-radius: 0.5rem;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;

  display: inline-flex;
  vertical-align: middle;
  flex-direction: column;
  align-items: center;

  > button {
    min-width: 100px;
  }
`

const Header = styled.h1`
  margin-left: auto;
  margin-right: auto;
`

const pages = [
  <Content>
    <h2>Dashboard</h2>
    <ul className="mt-2">
      <li>
        <strong>Points: </strong>Points gained from adding friends, answering
        questions (rewarded answers), or completing secret archievement.
      </li>
      <li>
        <strong>Total Friends: </strong>Numbers of friends you have added so
        far.
      </li>
      <li>
        <strong>Bounty Collected: </strong>Numbers of answers rewarded. Up to 1
        per thread.
      </li>
    </ul>
  </Content>,
  <Content>
    <h2>Board</h2>
    <ul>
      <li>
        <strong>Create Thread: </strong>Ask questions or discuss any topics you
        like.
      </li>
      <li>
        <strong>View Thread: </strong>Click the thread topic or the thread row
        to see comments.
      </li>
      <li>
        <strong>Post Comment: </strong>You can post comments while viewing each
        thread.
      </li>
      <li>
        <strong>Reward Comment: </strong>Original Poster can reward any users'
        comments and if he rewarded yours, you will get points.
      </li>
    </ul>
  </Content>,
  <Content>
    <h2>Friends</h2>
    <ul>
      <li>
        <strong>Friend Code: </strong>You can view your friend code on this
        page. Give the code to other people to let others added you as their
        friend.
      </li>
      <li>
        <strong>Add Friends: </strong>Click "Add Friend" button, then type the
        other person's friend code to add them as your friend.
      </li>
      <li>
        <strong>Friend List: </strong>Your frineds will automatically appear
        once you've add them as your friend.
      </li>
    </ul>
  </Content>
]

export const Instruction = () => {
  return (
    <StoreConsumer>
      {() => {
        const isModalShowedBefore = localStorage.modalShown
        if (isModalShowedBefore) {
          return null
        }

        return (
          <Toggle initial={true}>
            {({ on, setOn }) => (
              <Value initial={0}>
                {({ value: page, setValue }) => {
                  const closeModal = () => {
                    localStorage.modalShown = true
                    setOn(false)
                  }

                  const goToNextPage = e => {
                    setValue(page + 1)
                  }
                  const isLastPage = page === pages.length - 1
                  return (
                    <Modal
                      ariaHideApp={false}
                      isOpen={on}
                      contentLabel="Application usage instruction"
                      overlayClassName="ReactModal__Overlay"
                    >
                      <Header>Instruction</Header>
                      {pages[page]}
                      {isLastPage ? (
                        <button
                          className="btn btn-primary mt-auto w-25"
                          onClick={closeModal}
                        >
                          Done
                        </button>
                      ) : (
                        <button
                          className="btn btn-outline-primary mt-auto w-25"
                          onClick={goToNextPage}
                        >
                          Next
                        </button>
                      )}
                    </Modal>
                  )
                }}
              </Value>
            )}
          </Toggle>
        )
      }}
    </StoreConsumer>
  )
}
