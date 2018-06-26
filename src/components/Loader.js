import React from 'react'
import styled from 'styled-components'
import { AtomSpinner } from './AtomSpinner'
import { Spinner } from './Spinner'

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  background: rgba(0, 0, 0, ${props => props.opacity || 0});
`

export const ReactLoader = () => (
  <Container>
    <AtomSpinner />
  </Container>
)

export const DefaultLoader = () => (
  <Container opacity={0.6}>
    <Spinner />
  </Container>
)
