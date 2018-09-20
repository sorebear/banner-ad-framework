@import "../vendor/normalize";
@import "../modules/all";
@import "../orientation/<%orientation%>";

/* Alter variables for one specific banner by redefining them here */


@import "../partials/all";

#main-panel.<%banner-title%> {
  position: absolute;
  top: 0px;
  left: 0px;
  width: <%expandedWidth%>px;
  height: <%expandedHeight%>px;

  #collapsed-panel,
  #collapsed-content-wrapper {
    position: absolute;
    width: <%collapsedWidth%>px;
    height: <%collapsedHeight%>px;
  }

  #collapsed-panel {
    <%topPosition%>;
    <%leftPosition%>;
  }

  #expanded-panel {
    position: absolute;
    top: 0px;
    left: 0px;
    width: <%expandedWidth%>px;
    height: <%expandedHeight%>px;
  }

  #expanded-content-wrapper {
    position: absolute;
    <%topPosition%>;
    <%leftPosition%>;
    width: <%collapsedWidth%>px;
    height: <%collapsedHeight%>px;
    <%flex%>
    <%flexDirection%>
  }

  .expand > div {
    width: <%expandedWidth%>px !important;
    height: <%expandedHeight%>px !important;
  }

  /* Declare banner specific styles here */


}
