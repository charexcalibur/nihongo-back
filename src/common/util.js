// 防抖
export function debounce (func, delay) {
  let timer = null
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func()
    }, 1000)
  }
}
