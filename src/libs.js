export const debounce = (fn, timeout = 250) => {
  let currentTimeout
  return (...args) => {
    clearTimeout(currentTimeout)
    currentTimeout = setTimeout(() => fn(...args), timeout)
  }
}
