module.exports = function enabler(callback) {
  function enablerInitHandler(callback) {
    <%exitLinks%>
    if (Enabler.isPageLoaded()) {
      callback()
    } else {
      Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, callback);
    }
  }

  if (Enabler.isPageLoaded()) {
    enablerInitHandler(callback);
  } else {
    Enabler.addEventListener(studio.events.StudioEvent.INIT, function() {
      enablerInitHandler(callback);
    });
  }
}