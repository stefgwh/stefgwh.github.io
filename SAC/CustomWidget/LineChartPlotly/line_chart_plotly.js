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
            <div id="myDiv" style="width: 100%; height: 100%;">
            </div>
          `;

    class LinePlotlyDemo extends HTMLElement {

        constructor() {
            super();

            this._shadowRoot = this.attachShadow({ mode: "open" });
            this._shadowRoot.appendChild(prepared.content.cloneNode(true));

            this._root = this._shadowRoot.getElementById("root");

            this.render();

        }


        set myDataSource(dataBinding) {
            this._myDataSource = dataBinding;
            this.render();
        }

        //Fired when the widget is added to the html DOM of the page
        connectedCallback() {
            this._firstConnection = true;
            this.render();
        }

        //Fired when the widget is removed from the html DOM of the page (e.g. by hide)
        disconnectedCallback() {

        }

        //When the custom widget is updated, the Custom Widget SDK framework executes this function first
        onCustomWidgetBeforeUpdate(oChangedProperties) {
            this.render();
        }

        //When the custom widget is updated, the Custom Widget SDK framework executes this function after the update
        onCustomWidgetAfterUpdate(oChangedProperties) {
            if (this._firstConnection) {
                this.render();
            }
        }

        //When the custom widget is removed from the canvas or the analytic application is closed
        onCustomWidgetDestroy() {
        }

        //When the custom widget is resized on the canvas, the Custom Widget SDK framework executes the following JavaScript function call on the custom widget
        // Commented out by default.  If it is enabled, SAP Analytics Cloud will track DOM size changes and call this callback as needed
        //  If you don't need to react to resizes, you can save CPU by leaving it uncommented.

        onCustomWidgetResize(width, height) {
            this.render();
        }


        async render() {
            await getScriptPromisify(
                "https://cdn.plot.ly/plotly-latest.min.js"
            );

            /*
            if (!this._myDataSource || this._myDataSource.state !== "success") {
                return;
            }
            */

            var data = [
                {
                    x: ['2013-10-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00'],
                    y: [1, 3, 6],
                    type: 'scatter'
                }
            ];

            const myChart = Plotly.newPlot('myDiv', data, {
                title: "Test"
              });

        }
    }

    customElements.define("com-sap-sample-template", LinePlotlyDemo);
})();
