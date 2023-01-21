var getScriptPromisify = (src) => {
  return new Promise((resolve) => {
    $.getScript(src, resolve);
  });
};

(function()  {
    const prepared = document.createElement("template");
    prepared.innerHTML = `
          <style>
          </style>
          <div id="root" style="width: 100%; height: 100%;">
          </div>
        `;

    customElements.define('com-sap-sample-template', 
    class LinePlotlyDemo extends HTMLElement {


		constructor() {
			super(); 
			let shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(tmpl.content.cloneNode(true));

            this._root = this._shadowRoot.getElementById("root");
        }


        //Fired when the widget is added to the html DOM of the page
        connectedCallback(){
            this._firstConnection = true;
            this.redraw();
        }

         //Fired when the widget is removed from the html DOM of the page (e.g. by hide)
        disconnectedCallback(){
        
        }

         //When the custom widget is updated, the Custom Widget SDK framework executes this function first
		onCustomWidgetBeforeUpdate(oChangedProperties) {

		}

        //When the custom widget is updated, the Custom Widget SDK framework executes this function after the update
		onCustomWidgetAfterUpdate(oChangedProperties) {
            if (this._firstConnection){
                this.redraw();
            }
        }
        
        //When the custom widget is removed from the canvas or the analytic application is closed
        onCustomWidgetDestroy(){
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
        
           
                            d3.csv("https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv", function(err, rows){

                function unpack(rows, key) {
                return rows.map(function(row) { return row[key]; });
                }


                var trace1 = {
                type: "scatter",
                mode: "lines",
                name: 'AAPL High',
                x: unpack(rows, 'Date'),
                y: unpack(rows, 'AAPL.High'),
                line: {color: '#17BECF'}
                }

                var trace2 = {
                type: "scatter",
                mode: "lines",
                name: 'AAPL Low',
                x: unpack(rows, 'Date'),
                y: unpack(rows, 'AAPL.Low'),
                line: {color: '#7F7F7F'}
                }

                var data = [trace1,trace2];

                var layout = {
                title: 'Basic Time Series',
                };

                Plotly.newPlot(this._root, data, layout);
                })


        }
    })           
})();
