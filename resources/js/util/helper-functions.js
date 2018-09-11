
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

export const isiScroll = (speed, isiObj, callback) => {
  const isiContainer = document.getElementById('isi-container');
  const isi = document.getElementById('isi');
  debugger;
  const scrollbar = document.querySelector('.iScrollVerticalScrollbar');
  const indicator = document.querySelector('.iScrollIndicator');
  const scrollableIsiHeight = isi.offsetHeight - isiContainer.offsetHeight;
  const scrollableScrollbarHeight = scrollbar.offsetHeight - indicator.offsetHeight;

  let yOffset = 0;
  let indicatorOffset = 0;

  const step = () => {
    yOffset = yOffset ? parseFloat(isi.style.transform.match(/\-[0-9\.]*/)[0]) - speed : -speed;
    indicatorOffset = yOffset / scrollableIsiHeight * -scrollableScrollbarHeight;
    
    isi.style.transform = `translate(0px, ${yOffset}px) translateZ(0px)`;
    indicator.style.transform = `translate(0px, ${indicatorOffset}px) translateZ(0px)`;

    if (yOffset > -scrollableIsiHeight) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}


const getPropertyValueAsInt = (el, property) => {
  return parseInt(getComputedStyle(el).getPropertyValue(property).match(/[0-9]*/)[0]);
}

export const expandPanel = (el, duration, callback) => {
  const collapsedPanel = document.getElementById('collapsed-panel');
  const expandedPanel = document.getElementById('expanded-panel');

  const collapsedWidth = getPropertyValueAsInt(collapsedPanel, 'width');
  const collapsedHeight = getPropertyValueAsInt(collapsedPanel, 'height');
  const expandedWidth = getPropertyValueAsInt(expandedPanel, 'width');
  const expandedHeight = getPropertyValueAsInt(expandedPanel, 'height');
  
  const widthIncrement = (expandedWidth - collapsedWidth) / duration;
  const heightIncrement = (expandedHeight - collapsedHeight) / duration;

  el.style.width = collapsedWidth + 'px';
  el.style.height = collapsedHeight + 'px';

  let start = null;

  const step = (timestamp) => {
    start = start ? start : timestamp;
    const progress = timestamp - start;
    el.style.width = Math.min(collapsedWidth + progress * widthIncrement, expandedWidth) + 'px';
    el.style.height = Math.min(collapsedHeight + progress * heightIncrement, expandedHeight) + 'px';
    console.log(progress);

    if (progress <= duration) {
      window.requestAnimationFrame(step);
    } else {
      if (callback) callback();
    }
  }

  window.requestAnimationFrame(step);
}