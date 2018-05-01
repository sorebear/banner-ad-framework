module.exports = function enablerInitHandler(callback) {
  <%exitLinks%>
  if (Enabler.isPageLoaded()) {
    callback()
  } else {
    Enabler.addEventListener(studio.events.StudioEvent.INIT, callback());
  }
}