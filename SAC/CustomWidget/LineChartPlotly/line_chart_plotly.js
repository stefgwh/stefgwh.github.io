var getScriptPromisify = (src) => {
  return new Promise((resolve) => {
    $.getScript(src, resolve);
  });
};

(function () {
  const prepared = document.createElement("template");
  prepared.innerHTML = `
          <style>
          </style>
          <div id="root" style="width: 100%; height: 100%;">
          </div>
        `;

  class LinePlotlyDemo extends HTMLElement {


    constructor() {
      super();
      
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(prepared.content.cloneNode(true));

      this._root = this._shadowRoot.getElementById("root");
    }


    //Fired when the widget is added to the html DOM of the page
    connectedCallback() {
      this._firstConnection = true;
      this.redraw();
    }

    //Fired when the widget is removed from the html DOM of the page (e.g. by hide)
    disconnectedCallback() {

    }

    //When the custom widget is updated, the Custom Widget SDK framework executes this function first
    onCustomWidgetBeforeUpdate(oChangedProperties) {

    }

    //When the custom widget is updated, the Custom Widget SDK framework executes this function after the update
    onCustomWidgetAfterUpdate(oChangedProperties) {
      if (this._firstConnection) {
        this.redraw();
      }
    }

    //When the custom widget is removed from the canvas or the analytic application is closed
    onCustomWidgetDestroy() {
    }

    //When the custom widget is resized on the canvas, the Custom Widget SDK framework executes the following JavaScript function call on the custom widget
    // Commented out by default.  If it is enabled, SAP Analytics Cloud will track DOM size changes and call this callback as needed
    //  If you don't need to react to resizes, you can save CPU by leaving it uncommented.
    /*
    onCustomWidgetResize(width, height){
    
    }
    */

    async redraw() {
      await getScriptPromisify(
        "https://cdn.plot.ly/plotly-2.17.1.min.js");

      await getScriptPromisify(
        "https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js");

      var data = [
        {
          x: ['2013-10-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00'],
          y: [1, 3, 6],
          type: 'scatter'
        }
      ];

      Plotly.newPlot('myDiv', data);

    }
  }

  customElements.define("com-sap-sample-template", LinePlotlyDemo);
})();
