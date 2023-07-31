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
        });
    };


    // Function to update vizualizations when the dropdown selection changes 
    function optionChanged(selectedSample) {
        buildMetaData(selectedSample);
        buildBarChart(selectedSample);
        buildBubbleChart(selectedSample);
    }

    //Function for Metadata 
    function buildMetaData(sample) {
        d3.json(url).then((data) => {
            //Retrieve metadata 
            let metaData = data.metadata; // Corrected property name from 'metaData' to 'metadata'
    
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

    //Creating bar chart using these values: sample_values: values for bar chart, otu_ids: labels for bar chart, otu_labels: hovertext for the chart 

    //Creating bar chart using these values: sample_values: values for bar chart, otu_ids: labels for bar chart, otu_labels: hovertext for the chart 
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
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        //Console log
        console.log(otu_ids, otu_labels, sample_values);

        //Slicing, sorting and mapping data to only get the first 10 results 
        let xData = sample_values.slice(0, 10).reverse();
        let yData = otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
        let labels = otu_labels.slice(0, 10).reverse();

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
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        //Logging to console
        console.log(otu_ids, otu_labels, sample_values);

        //Setting up bubble chart 
        let trace2 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels, // Corrected from 'otu_ids' to 'otu_labels' for hovertext
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
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

init();