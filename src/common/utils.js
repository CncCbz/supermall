export function debounce(func, delay = 300) {
  //防抖函数
  //默认300毫秒
  let timer = null;
  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args); // this 指向vue
    }, delay);
  };
}
