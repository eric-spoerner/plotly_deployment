function init() {
    var selector = d3.select("#selDataset"); //identify dropdown menu in html data set

    d3.json("samples.json").then((data) => {
        console.log(data);
        var sampleNames = data.names; // extracts all Names from JSON object array
        sampleNames.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample) // adds each name as an <option> tag to HTML dropdown
        });
    });
};

function optionChanged(newSample) {
    buildMetadata(newSample);
    // buildCharts(newSample);
};

function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        var PANEL = d3.select("#sample-metadata");

        // [{"id": 940, "ethnicity": "Caucasian", "gender": "F", "age": 24.0, "location": "Beaufort/NC", "bbtype": "I", "wfreq": 2.0},
        PANEL.html("");

        for (let [key, name] of Object.entries(result)) {
            PANEL.append("h6").text(`${key}: ${name}`)
        }
    });
};

init();