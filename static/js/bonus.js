  
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


//Guagechart function
function buildGaugeChart(sample) { 
    d3.json(url).then((data) => {
        
        let metadata = data.metadata; 

        //Retrieving all sample data
        let metaDataInfo = metadata.filter(result => result.id == sample)[0];

        //Get the washing frequency (wfrq) value from metadata
        let wfreq = metaDataInfo.wfreq;

        // Creating the guage chart trace;
        let trace3 = {
            domain: { x: [0, 1], y: [0, 1] },
            value: wfreq,
            title: { text: "Belly Button Washing Frequency<br>Scrubs per Week" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [null, 9], tickvals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
                bar: { color: "darkblue" },
                steps: [
                    { range: [0, 1], color: "#f7fcf0" },
                    { range: [1, 2], color: "#e0f3db" },
                    { range: [2, 3], color: "#ccebc5" },
                    { range: [3, 4], color: "#a8ddb5" },
                    { range: [4, 5], color: "#7bccc4" },
                    { range: [5, 6], color: "#4eb3d3" },
                    { range: [6, 7], color: "#2b8cbe" },
                    { range: [7, 8], color: "#0868ac" },
                    { range: [8, 9], color: "#084081" }
                ],
            }
        };
        // Layout setup
        let layout = {
            width: 500,
            height: 500,
            margin: {
                t:0,
                b:0
            }
        };
        
        //Calling Plotly to plot guage chart 
        Plotly.newPlot("guageChart", [trace3], layout);


    });
}

init();