// SVG Size
var padding = 25;
    width = 700;
    height = 500;

//Load Data & convert strings
d3.csv("data/wealth-health-2014.csv", function(dataset) {
  dataset.forEach(function(d) {
    d.Income = +d.Income;
    d.LifeExpectancy = +d.LifeExpectancy;
    d.Population = +d.Population;
  });

  dataset.sort(function(a,b) {
    return b.Population-a.Population;}
  ); // Sort data by building height

  // Analyze the dataset in console
  console.log(dataset);

  //Create & Append  SVG element (Activity 1.3)
  var svg = d3.select("#chart-area")
              .append("svg")
              .attr("width", width)
              .attr("height", height)

  //CREATE & REFINE SCALES (Activity 1.4, .5 & .6)

  //Set x-axis scale
  var incomeScale = d3.scale.log()
                            .domain([
                              d3.min(dataset, function(d) { return d.Income - 100; }), // Refine scales (Activity II.3)
                              d3.max(dataset, function(d) { return d.Income + 100; }) // Refine scales (Activity II.3)
                            ])
                            .range([padding,width - padding]);

  //Set y-axis scale
  var lifeExpectancyScale = d3.scale.linear()
                                    .domain([
                                      d3.min(dataset, function(d) { return d.LifeExpectancy - 5; }), // Refine scales (Activit II.3)
                                      d3.max(dataset, function(d) { return d.LifeExpectancy + 5; }) // Refine scales (Activit II.3)
                                    ])
                                    .range([height-padding,padding]);

  //Set radius scale
  var rScale = d3.scale.linear()
                       .domain([
                         d3.min(dataset, function(d) { return d.Population; }),
                         d3.max(dataset, function(d) { return d.Population; })
                       ])
                       .range([4, 30]);

  var formatAsPercentage = d3.format(".1%");

  //Set color scale
  var colorScale = d3.scale.category10()
    .domain(dataset.map(function(d) {
      return d.Region;
    })
  );

  //DEFINE AXIS Activity II.2)

  //Define X-axis
  var xAxis = d3.svg.axis()
    .scale(incomeScale)
    .orient("bottom")
    .ticks(10, ",.1s") // Log adjustments
    .tickSize(6, 0); // Log adjustment

  //Define Y-axis
  var yAxis = d3.svg.axis()
    .scale(lifeExpectancyScale)
    .orient("left")
    .ticks(5)


  // Map Countries to SVG Circles (Activity 1.7)
  svg.selectAll("circle")
     .data(dataset) // Get data
     .enter()
     .append("circle")
     .style("stroke", "black")
     .style("fill", function(d) { return colorScale(d.Region); })
     .attr("cx", function(d) { return incomeScale(d.Income);})// position the x-centre
     .attr("cy", function(d) { return lifeExpectancyScale(d.LifeExpectancy);}) // position the y-centre
     .attr("r", function(d) { return rScale(d.Population);})// set the radius

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
     .text("Income");

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

