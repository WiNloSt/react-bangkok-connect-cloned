import React from 'react'
import styled from 'styled-components'

const Badge = styled.i`
  color: #f48668;
  font-size: 3rem;
`

const BadgeCount = styled.div`
  color: #f48668;
  font-size: 1.75rem;
`

function AchievementListItem(props) {
  const { badgeClass, badgeTitle, badgeCount } = props

  return (
    <div className="d-flex bg-dark p-3 justify-content-between align-items-center">
      <Badge className={badgeClass} />
      <div>{badgeTitle}</div>
      <BadgeCount>{badgeCount}</BadgeCount>
    </div>
  )
}

export default AchievementListItem
