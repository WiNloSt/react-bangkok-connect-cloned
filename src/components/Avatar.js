import React from 'react'
import styled from 'styled-components'

const Image = styled.img`
  height: ${props => props.height}px;
  border-radius: 100%;
`

export default function Avatar(props) {
  const { url, size, ...otherProps } = props

  return (
    <Image
      src={`${url}?width=${size * 1.5}&height=${size * 1.5}`}
      height={size}
      {...otherProps}
    />
  )
}
