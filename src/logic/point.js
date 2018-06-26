export function calculatePoint(achievements) {
  const achievementTypes = [
    {
      name: 'networking',
      point: 100
    },
    {
      name: 'bounty',
      point: 400
    }
  ]

  const point = achievementTypes
    .map(
      type => achievements.filter(a => a.type === type.name).length * type.point
    )
    .reduce((prev, curr) => prev + curr)

  return point
}
