
export const fadeIn = (el, duration, callback) => {
  el.style.opacity = 0;
  el.style.display = 'block';

  let start = null;

  const step = (timestamp) => {
    start = start ? start : timestamp;
    const progress = timestamp - start;
    el.style.opacity = Math.min(progress / duration, 1);
    if (progress <= duration) {
      window.requestAnimationFrame(step);
    } else {
      if (callback) callback();
    }
  }

  window.requestAnimationFrame(step);
}

export const fadeOut = (el, duration, callback) => {
  el.style.opacity = 1;
  el.style.display = 'block';

  let start = null;

  const step = (timestamp) => {
    start = start ? start : timestamp;
    const progress = timestamp - start;
    el.style.opacity = Math.max(1 - progress / duration, 0);
    if (progress <= duration) {
      window.requestAnimationFrame(step);
    } else {
      el.style.display = 'none';
      if (callback) callback();
    }
  }

  window.requestAnimationFrame(step);
}

export const animate = (el, propObj, duration = 400, easing = 'ease-in', callback) => {
  // Set optional variables regardless of order
  callback = callback ? callback : 
    typeof easing === 'function' ? easing : 
    typeof duration === 'function' ? duration : null;
  easing = typeof easing === 'string' ? easing : typeof duration === 'string' ? duration : 'ease-in';
  duration = typeof duration === 'number' ? duration : 400;
  
  const transitionArr = Object.keys(propObj).map(prop => {
    return `${prop.replace(/[A-Z]/g, (g) => `-${g[0]}`).toLowerCase()} ${duration / 1000}s ${easing}`
  });

  const cssTransitionValue = getComputedStyle(el).getPropertyValue('transition');

  if (cssTransitionValue && cssTransitionValue !== 'all 0s ease 0s') {
    transitionArr.push(cssTransitionValue);
  }
  
  const transitionString = transitionArr.join(', ');
  el.style.transition = transitionString;

  function handleTransitionEnd(e) {
    el.removeEventListener('transitionend', handleTransitionEnd);
    el.style.transition = '';
    if (callback) callback();
  }

  el.addEventListener('transitionend', handleTransitionEnd);

  Object.keys(propObj).forEach(prop => {
    el.style[prop] = propObj[prop];
  });
}