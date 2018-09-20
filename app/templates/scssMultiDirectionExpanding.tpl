@import "../vendor/normalize";
@import "../modules/all";
@import "../orientation/<%orientation%>";

/* Alter variables for one specific banner by redefining them here */


@import "../partials/all";

#main-panel.<%banner-title%> {
  position: absolute;
  top: 0px;
  left: 0px;
  width: <%totalWidth%>px;
  height: <%totalHeight%>px;

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

  .direction-tl {
    top: 0px;
    left: 0px;

    #expanded-content-wrapper {
      top: auto;
      right: 0;
      bottom: 0;
      left: auto;
    }
  }

  .direction-tr {
    top: 0px;
    <%leftPosition%>;

    #expanded-content-wrapper {
      top: auto;
      right: auto;
      bottom: 0;
      left: 0;
    }
  }

  .direction-bl {
    <%topPosition%>;
    left: 0px;

    #expanded-content-wrapper {
      top: 0;
      right: 0;
      bottom: auto;
      left: auto;
    }
  }

  .direction-br {
    <%topPosition%>;
    <%leftPosition%>;

    #expanded-content-wrapper {
      top: 0;
      right: auto;
      bottom: auto;
      left: 0;
    }
  }

  /* Declare banner specific styles here */


}
