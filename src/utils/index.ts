export function humanizeWindDirection(degrees: number) {
  const threshold = 45
  const thresholdDegreesOff = degrees % threshold
  const diff = threshold - thresholdDegreesOff

  let nearest
  if (thresholdDegreesOff > threshold / 2) {
    nearest = degrees + diff
  } else {
    nearest = degrees - diff
  }

  switch (nearest) {
    case 0:
      return 'N'
    case 45:
      return 'NE'
    case 90:
      return 'E'
    case 135:
      return 'SE'
    case 180:
      return 'S'
    case 225:
      return 'SW'
    case 270:
      return 'W'
    case 315:
      return 'NW'
    default:
      return undefined
  }
}
