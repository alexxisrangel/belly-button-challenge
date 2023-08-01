    // Use the D3 library to read in samples.json from the URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.

    // add <script src="./static/js/bonus.js"></script> back under the rest of the scripts

    // Fetching Samples JSON and logging it 

    const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";



    //Fettching JSON data 
    d3.json(url).then(data => {
        console.log(data);
    });


    function init() {

        //Creating dropdown menu 
        let dropDownMenu = d3.select("#selDataset");

        //Getting sample names and populating dropdown selector 
        d3.json(url).then((data) => {

            
        //Creating variable for sample names
        let names = data.names;

        //Adding samples to the dropdown menu 
        names.forEach((id) => {
            
            console.log(id);

            dropDownMenu.append("option")
            .text(id)
            .property("value", id);
            
        });

        //Set the first sample from the list 
        let sampleOne = names[0];

        console.log(sampleOne);

        //Building initial plots 
        buildMetaData(sampleOne);
        buildBarChart(sampleOne);
        buildBubbleChart(sampleOne);
        buildGaugeChart(sampleOne)
        });
    };


    // Function to update vizualizations when the dropdown selection changes 
    function optionChanged(selectedSample) {
        buildMetaData(selectedSample);
        buildBarChart(selectedSample);
        buildBubbleChart(selectedSample);
        buildGaugeChart(selectedSample);
    }

    //Function for Metadata 
    function buildMetaData(sample) {
        d3.json(url).then((data) => {
            //Retrieve metadata 
            let metaData = data.metadata; 
    
            //Filter to get value Data only 
            let value = metaData.filter(result => result.id == sample);
    
            console.log(value)
    
            //Setting correct index within value array 
            let valueData = value[0];
    
            //Reset metadata
            d3.select('#sample-metadata').html("");
    
            //Here we use Object.entries to add key pair to the panel
            Object.entries(valueData).forEach(([key, value]) => {
                console.log(key, value);
                d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
            });
        });
    };

//Building function that plots sample data into a bar chart  
function buildBarChart(sample) {
    d3.json(url).then((data) => {
        //Retrieving all sample data available 
        let sampleData = data.samples;

        //Filtering to get the value only 
        let value = sampleData.filter(result => result.id == sample);

        //Starting at the first index 
        let valueData = value[0];

        //Getting otu_ids, labels, and sample values 
        let otuIds = valueData.otu_ids;
        let otuLabels = valueData.otu_labels;
        let sampleValues = valueData.sample_values;

        //Console log
        console.log(otuIds, otuLabels, sampleValues);

        //Slicing, sorting and mapping data to only get the first 10 results 
        let xData = sampleValues.slice(0, 10).reverse();
        let yData = otuIds.slice(0, 10).map(id => `OTU ${id}`).reverse();
        let labels = otuLabels.slice(0, 10).reverse();

        //Creating bar chart trace
        let trace1 = {
            x: xData,
            y: yData,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        //Setting up layout 
        let layout = {
            title: "Sample Data"
        };

        //Plotting bar chart 
        Plotly.newPlot("bar", [trace1], layout);
    });
};

function buildBubbleChart(sample) {
    d3.json(url).then((data) => {
        //Retrieving all sample data 
        let sampleInfo = data.samples;

        // Filtering to get only values for sample 
        let value = sampleInfo.filter(result => result.id == sample);

        //Selecting first index from array 
        let valueData = value[0];

        //Getting otu_ids, labels, and sample values
        let otuIds = valueData.otu_ids;
        let otuLabels = valueData.otu_labels;
        let sampleValues = valueData.sample_values;

        //Logging to console
        console.log(otuIds, otuLabels, sampleValues);

        //Setting up bubble chart 
        let trace2 = {
            x: otuIds,
            y: sampleValues,
            text: otuLabels, 
            mode: "markers",
            marker: {
                size: sampleValues,
                color: otuIds,
                colorscale: "Earth"
            }
        };

        //Setting up layout
        let layout = {
            title: "Bacteria per sample",
            hovermode: "closest",
            xaxis: { title: "OTU ID" },
        };

        Plotly.newPlot("bubbleChart", [trace2], layout);
    });

};

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
};

init();