// SVG Size
var padding = 25;
    width = 700;
    height = 500;

//Load Data & convert strings
d3.csv("data/wealth-health-2014.csv",

function(dataset) {
  dataset.sort(function(a,b) {return b.Population-a.Population;}) // Sort data by building height
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
                              d3.min(dataset, function(d) { return d.Income - 5000; }), // Refine scales (Activity II.3)
                              d3.max(dataset, function(d) { return d.Income + 5000; }) // Refine scales (Activity II.3)
                            ])
                            .range([padding,width - padding]);

  //Set y-axis scale
  var lifeExpectancyScale = d3.scale.linear()
                                    .domain([
                                      d3.min(dataset, function(d) { return d.LifeExpectancy - 5; }), // Refine scales (Activity II.3)
                                      d3.max(dataset, function(d) { return d.LifeExpectancy + 5; }) // Refine scales (Activity II.3)
                                    ])
                                    .range([height-padding,padding]);

  //Set radius scale
  var rScale = d3.scale.linear()
                       .domain([
                         d3.min(dataset, function(d) { return d.Population; }),
                         d3.max(dataset, function(d) { return d.Population; })
                       ])
                       .range([4, 30]);

  //Define X-axis
  var xAxis = d3.svg.axis()
    .scale(incomeScale)
    .orient("bottom")
    .ticks(5)

  //Define Y-axis
  var yAxis = d3.svg.axis()
    .scale(lifeExpectancyScale)
    .orient("left")
    .ticks(1)

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

  //Create X-axis (Activity II.2)
  svg.append("g")
     .attr("class", "axis")
     .attr("transform", "translate(0," + (height - padding) + ")")
     .call(xAxis);

  //Create Y-axis (Activity II.2)
  svg.append("g")
     .attr("class", "axis")
     .attr("transform", "translate(" + padding + ",0)")
     .call(yAxis);

  //Add X-axis label (Activity II.4)
  svg.append("text")
     .attr("class", "x label")
     .attr("text-anchor", "end")
     .attr("x", width -30)
     .attr("y", height - 30)
     .text("Income (Dollars)");

  // Add a y-axis label (Activity II.4)
  svg.append("text")
     .attr("class", "y label")
     .attr("text-anchor", "end")
     .attr("y", 30)
     .attr("x", -20)
     .attr("dy", ".75em")
     .attr("transform", "rotate(-90)")
     .text("Life Expectancy (Years)");

});
