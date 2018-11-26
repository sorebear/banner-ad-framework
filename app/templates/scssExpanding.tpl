@import "../vendor/normalize";
@import "../modules/all";
@import "../orientation/<%orientation%>";
@import "../type/expanding";

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

  #expanded-panel.expand #expanded-content-wrapper {
    width: <%expandedWidth%>px;
    height: <%expandedHeight%>px;
  }

  /* Declare banner specific styles here */


}
