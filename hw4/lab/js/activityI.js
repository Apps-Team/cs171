// SVG Size
var padding = 25;
    width = 700,
		height = 500;


//Load Data & convert strings
d3.csv("data/wealth-health-2014.csv", function(dataset) {
  dataset.forEach(function(d) {
    d.Income = +d.Income;
    d.LifeExpectancy = +d.LifeExpectancy;
    d.Population = +d.Population;
  });

  // Analyze the dataset in console
  console.log(dataset);

  //Create & Append  SVG element (Activity 1.3)
  var svg = d3.select("#chart-area")
              .append("svg")
              .attr("width", 700)
              .attr("height", 500)

  //Create & Refine Linear Scales (Activity 1.4, .5 & .6)

  //Set x-axis scale
  var incomeScale = d3.scale.linear()
                            .domain([
                              d3.min(dataset, function(d) { return d.Income; }),
                              d3.max(dataset, function(d) { return d.Income; })
                            ])
                            .range([padding,width - padding]);

  //Set y-axis scale
  var lifeExpectancyScale = d3.scale.linear()
                                    .domain([
                                      d3.min(dataset, function(d) { return d.LifeExpectancy; }),
                                      d3.max(dataset, function(d) { return d.LifeExpectancy; })
                                    ])
                                    .range([height-padding,padding]);

  // Map Countries to SVG Circles (Activity 1.7)
  svg.selectAll("circle")
     .data(dataset) // Get data
     .enter()
     .append("circle")
     .style("fill", "black")
     .style("stroke", "black")
     .attr("cx", function(d) { return incomeScale(d.Income);})// position the x-centre
     .attr("cy", function(d) { return lifeExpectancyScale(d.LifeExpectancy);}) // position the y-centre
     .attr("r", 1.5) // set the radius
  

});
