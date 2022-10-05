function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  })}


function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
}

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray;
    var resultObj = result[0];

    console.log(resultObj);

    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    Object.entries(resultObj).forEach(item =>
      PANEL.append("h6").append("b").text(`${item[0].toUpperCase()}: ${item[1]}`),
      );
  });
}

function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samplesArray = data.samples;
    console.log("This is samplesArray");
    console.log(samplesArray);

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var filteredSamples = samplesArray.filter(sampleObj => parseInt(sampleObj.id) == sample);
    console.log("This is filteredSamples");
    console.log(filteredSamples);

    //  5. Create a variable that holds the first sample in the array.
    var chosenSample = filteredSamples[0];
    console.log("This is chosenSample");
    console.log(chosenSample);


    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var chosenOtuIds = chosenSample.otu_ids;
    var chosenOtuLabels = chosenSample.otu_labels;
    var chosenSampleValues = chosenSample.sample_values;

    console.log(`These is the otu_ids\n ${chosenOtuIds}\n\n These are the otu_labels\n ${chosenOtuLabels}\n\n These are the sample_values\n ${chosenSampleValues}`)


    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = chosenOtuIds.sort((a,b) => b-a).slice(0,10);
    console.log(yticks);

    // 8. Create the trace for the bar chart. 
    var barData = [
      {
        x: chosenSampleValues,
        y: chosenOtuLabels.reverse(),
        type: 'bar'
      }
    ];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
     title: 'Top 10 Bacteria Cultures Found',
     xaxis: 'Sample Values'
    };
    // 10. Use Plotly to plot the data with the layout.
    Plotly.newPlot('bar', barData, barLayout) ;
    });
};

init();