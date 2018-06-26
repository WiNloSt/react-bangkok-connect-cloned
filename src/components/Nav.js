import React from 'react'
import { NavLink as UnStyledNavLink } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserFriends,
  faChalkboard,
  faHome
} from '@fortawesome/free-solid-svg-icons'

import { StoreConsumer } from '../store'
import Avatar from './Avatar'
import { Toggle } from 'react-powerplug'
import { createKeyframeAnimation } from './Friends/util'

const desktop = 992

const Desktop = styled.div`
  display: none;

  @media only screen and (min-width: ${desktop}px) {
    display: block;
  }
`

const BelowDesktop = styled.div`
  order: 1;
  @media only screen and (min-width: ${desktop}px) {
    display: none;
  }
`

const NavLink = styled(UnStyledNavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;

  &.active {
    color: #007bff;
  }
`

const IconText = styled.div`
  font-size: 10px;
`

const TabMenu = styled.div`
  color: #333;
  height: 50px;
  position: fixed;
  z-index: 1;
  width: 100%;
  bottom: 0;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  > div {
    max-width: 400px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`

const TabMenuOffset = styled.div`
  height: 50px;
`

const User = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 1rem;
  margin-right: 1rem;
  z-index: 1;
`

const cardHeight = 60
const animationDuration = 300

const CollapsableSection = styled.div`
  color: #333;
  transform: scaleY(0);
  height: ${cardHeight}px;
  overflow: hidden;

  /* Popup style */
  position: absolute;
  right: 0;
  width: 100px;
  margin-top: 0.5rem;

  &.expanded {
    transform-origin: top center;
    animation-name: parentExpanded;
    animation-duration: ${animationDuration}ms;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
  }

  &.collapsed {
    transform-origin: top center;
    animation-name: parentCollapsed;
    animation-duration: ${animationDuration}ms;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
  }

  > {
    * {
      right: 0;
    }

    &.expanded {
      transform-origin: top center;
      animation-name: childExpanded;
      animation-duration: ${animationDuration}ms;
      animation-timing-function: linear;
      animation-fill-mode: forwards;
    }

    &.collapsed {
      transform-origin: top center;
      animation-name: childCollapsed;
      animation-duration: ${animationDuration}ms;
      animation-timing-function: linear;
      animation-fill-mode: forwards;
    }
  }

  ${createKeyframeAnimation(cardHeight)};
`

const Popup = ({ onLogout, className }) => (
  <CollapsableSection className={className}>
    <div
      className={'popover fade bs-popover-bottom show ' + className}
      role="tooltip"
      x-placement="left"
    >
      <div className="arrow" style={{ right: 8, top: -8 }} />
      <div className="popover-body">
        <button className="btn btn-link px-2 py-1 w-100" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  </CollapsableSection>
)

export const Nav = ({ onLogout }) => (
  <StoreConsumer>
    {({ authUser }) => (
      <React.Fragment>
        <Desktop>
          <ul className="mx-2 my-3 nav nav-pills">
            <li className="nav-item">
              <NavLink className="nav-link px-3 py-2 mx-2" to="/dashboard">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link px-3 py-2 mx-2" to="/posts">
                Board
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link px-3 py-2 mx-2" to="/friends">
                Friends
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link px-3 py-2 mx-2"
                to="/liveleaderboard"
              >
                Leaderboard
              </NavLink>
            </li>

            {authUser && (
              <React.Fragment>
                <Avatar className="ml-auto" size={48} url={authUser.photoURL} />
                <li>
                  <button
                    className="btn btn-link px-2 py-1 ml-2 h-100"
                    onClick={onLogout}
                  >
                    Logout
                  </button>
                </li>
              </React.Fragment>
            )}
          </ul>
        </Desktop>
        <BelowDesktop>
          <User>
            {authUser && (
              <Toggle initial={null}>
                {({ on, toggle }) => (
                  <div className="position-relative">
                    <Avatar
                      className="ml-auto"
                      size={48}
                      src={authUser.photoURL}
                      onClick={toggle}
                    />
                    <Popup
                      className={
                        on === null ? '' : on ? 'expanded' : 'collapsed'
                      }
                      onLogout={onLogout}
                    />
                  </div>
                )}
              </Toggle>
            )}
          </User>
          <TabMenu>
            <div>
              <NavLink to="/dashboard">
                <FontAwesomeIcon icon={faHome} style={{ fontSize: 18 }} />
                <IconText>Dashbord</IconText>
              </NavLink>
              <NavLink to="/posts">
                <FontAwesomeIcon icon={faChalkboard} />
                <IconText>Board</IconText>
              </NavLink>
              <NavLink to="/friends">
                <FontAwesomeIcon
                  icon={faUserFriends}
                  style={{ fontSize: 17 }}
                />
                <IconText>Friends</IconText>
              </NavLink>
            </div>
          </TabMenu>
          <TabMenuOffset />
        </BelowDesktop>
      </React.Fragment>
    )}
  </StoreConsumer>
)
