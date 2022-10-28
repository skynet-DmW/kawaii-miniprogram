const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}


//节流
const throttle = (fn, wait = 800) => {
  let prev = Date.now();
  return function () {
    const context = this;
    const args = arguments;
    const now = Date.now();
    // console.log(now - prev > wait)
    if (now - prev > wait) {
      fn.apply(context, args);
      prev = Date.now();
    }
  }
}

//防抖
const debounce = (func, wait = 500) => {
  // wait：500ms；func：被频繁触发的事件
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = () => {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }
}


module.exports = {
  formatTime,
  throttle,
  debounce
}
