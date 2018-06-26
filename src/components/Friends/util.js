export function createKeyframeAnimation(cardHeight) {
  // Figure out the size of the element when collapsed.
  let y = 0
  let parentExpanded = ''
  let parentCollapsed = ''

  let childExpanded = ''
  let childCollapsed = ''

  let translateExpanded = ''
  let translateCollapsed = ''

  for (let step = 0; step <= 100; step++) {
    // Remap the step value to an eased one.
    let easedStep = ease(step / 100)

    // Calculate the scale of the element.
    const yScaleExpanded = y + (1 - y) * easedStep
    parentExpanded += `${step}% {
      transform: scaleY(${yScaleExpanded});
    }`

    const yScaleCollapsed = 1 - yScaleExpanded
    parentCollapsed += `${step}% {
      transform: scaleY(${yScaleCollapsed});
    }`

    childExpanded += `${step}% {
      transform: scaleY(${1 / yScaleExpanded});
    }`

    childCollapsed += `${step}% {
      transform: scaleY(${1 / yScaleCollapsed});
    }`

    const yTranslateExpanded = easedStep * cardHeight - cardHeight
    translateExpanded += `${step}% {
      transform: translateY(${yTranslateExpanded}px);
    }`

    const YTranslateCollapsed = easedStep * cardHeight
    translateCollapsed += `${step}% {
      transform: translateY(${-YTranslateCollapsed}px);
    }`
  }

  return `
  @keyframes parentExpanded {
    ${parentExpanded}
  }

  @keyframes parentCollapsed {
    ${parentCollapsed}
  }

  @keyframes childExpanded {
    ${childExpanded}
  }

  @keyframes childCollapsed {
    ${childCollapsed}
  }

  @keyframes restExpanded {
    ${translateExpanded}
  }
  
  @keyframes restCollapsed {
    ${translateCollapsed}
  }`
}

function ease(v, pow = 4) {
  return 1 - Math.pow(1 - v, pow)
}

export const getCurrentOtpValue = formNode => {
  let otp = ''
  for (let i = 1; i <= 4; i++) {
    otp += formNode.querySelector(`input:nth-child(${i})`).value
  }

  return otp
}

export const clearOtpValue = formNode => {
  for (let i = 1; i <= 4; i++) {
    formNode.querySelector(`input:nth-child(${i})`).value = null
  }
}
