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
            await getScriptPromisify(
                "https://cdn.staticfile.org/echarts/5.0.0/echarts.min.js"
            );

            const myChart = echarts.init(this._root, "wight");
            const option = {
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data: ['A', 'B', 'C', 'D', 'E']
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        labelLine: {
                            show: false
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        },
                        data: [
                            { value: 335, name: 'A' },
                            { value: 310, name: 'B' },
                            { value: 234, name: 'C' },
                            { value: 135, name: 'D' },
                            { value: 1548, name: 'E' }
                        ]
                    }
                ]
            };

 
            myChart.setOption(option);
            */

            const trace1 = {
                line: { shape: 'linear' },
                mode: 'lines+markers',
                name: "linear",
                type: 'scatter',
                x: [1, 2, 3, 4, 5],
                y: [1, 3, 2, 3, 1],
                hoverinfo: 'name'
            };
            const trace2 = {
                line: { shape: 'spline' },
                mode: 'lines+markers',
                name: "spline",
                type: 'scatter',
                x: [1, 2, 3, 4, 5],
                y: [6, 8, 7, 8, 6],
                text: ['tweak line smoothness<br>with in line object'],
                hoverinfo: 'text+name'
            };
            const trace3 = {
                line: { shape: 'vhv' },
                mode: 'lines+markers',
                name: "vhv",
                type: 'scatter',
                x: [1, 2, 3, 4, 5],
                y: [11, 13, 12, 13, 11],
                hoverinfo: 'name'
            };
            const trace4 = {
                line: { shape: 'hvh' },
                mode: 'lines+markers',
                name: "hvh",
                type: 'scatter',
                x: [1, 2, 3, 4, 5],
                y: [16, 18, 17, 18, 16],
                hoverinfo: 'name'
            };
            const trace5 = {
                line: { shape: 'vh' },
                mode: 'lines+markers',
                name: "vh",
                type: 'scatter',
                x: [1, 2, 3, 4, 5],
                y: [21, 23, 22, 23, 21],
                hoverinfo: 'name'
            };
            const trace6 = {
                line: { shape: 'hv' },
                mode: 'lines+markers',
                name: "hv",
                type: 'scatter',
                x: [1, 2, 3, 4, 5],
                y: [26, 28, 27, 28, 26],
                hoverinfo: 'name'
            };
            const data = [trace1, trace2, trace3, trace4, trace5, trace6];
            const layout = {
                legend: {
                    y: 0.5,
                    font: { size: 16 },
                    traceorder: 'reversed'
                }
            };
            Plotly.plot(this._root, {
                data: data,
                layout: layout
            })

        }
    }
    customElements.define("com-sap-sample-template", LinePlotlyDemo);
})();
