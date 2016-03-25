// Set SVG size and margins (Qu 4)
var padding = 60;
    margin = {top: 10, right: 10, bottom: 10, left: 50},
    width = 550 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y-%m-%d").parse;

//Load and prep data (Qu 3)
d3.csv("data/zaatari-refugee-camp-population.csv", type, function(error, dataset)  {

  console.log(dataset); // Analyze the dataset in console

  //Set Scales (Qu 5)
//  x.domain(d3.extent(data.map(function(d) { return d.date; })));
//  y.domain([0, d3.max(data.map(function(d) { return d.population; }))]);

  var xScale = d3.time.scale()
                      .domain([
                        d3.min(dataset, function(d) { return d.date; }), // Refine scales (Activity II.3)
                        d3.max(dataset, function(d) { return d.date; }) // Refine scales (Activity II.3)
                      ])
                      .range([padding,width - padding]);

  var yScale = d3.scale.linear()
                       .domain([
                         0,
                         (d3.max(dataset.map(function(d) { return d.population; } )))
                       ])
                       .range([height-padding,0]);

  //Define Axes (Qu 5)
  var xAxis = d3.svg.axis()
                    .scale(xScale)
                    .orient("bottom")
                    .ticks((dataset.length)/4) // Log adjustments
                    .tickSize(12, 0) // Log adjustment
                    .tickFormat(d3.time.format("%b %Y"));

  var yAxis = d3.svg.axis()
                    .scale(yScale)
                    .orient("left")
                    .ticks(6)

  //Create Area Chart (Qu 6)
  var svg = d3.select("#left-inner")
              .append("svg")
              .attr("class", "chart")
              .attr("width", width + margin.left + margin.right + padding)
              .attr("height", height + margin.top + margin.bottom + padding);

  var area = d3.svg.area()
                   .interpolate("linear")
                   .x(function(d) { return xScale(d.date);})
                   .y0(height - padding)
                   .y1(function(d) { return yScale(d.population);});

  var chart = svg.append("g")
                 .attr("class", "chart")

  chart.append("path")
       .datum(dataset)
       .attr("class", "area")
       .attr("d", area)
       .style("stroke", "green")        // Qu 6 Bonus - Boundary w/diff visuals
       .style("stroke-dasharray", "1,1")// Qu 6 Bonus - Boundary w/diff visuals

  //Create Axis (Qu 5 & 7)
  svg.append("g")
     .attr("class", "axis date-axis")
     .attr("transform", "translate(0," + (height - padding) + ")")
     .call(xAxis)
     .selectAll("text")
     .style("text-anchor", "end")
     .attr("dx", "-1.35em")
     .attr("dy", "-.5em")
     .attr("transform", "rotate(-60)" );

  svg.append("g")
     .attr("class", "axis")
     .attr("transform", "translate(" + padding + ",0)")
     .call(yAxis)

  //Label Axis & Chart (Qu 7)
  svg.append("text")
     .attr("class", "x-label")
     .attr("text-anchor", "end")
     .attr("x", width - 70)
     .attr("y", height - 70)
     .text("Date");

  svg.append("text")
     .attr("class", "y-label")
     .attr("text-anchor", "end")
     .attr("y", -5)
     .attr("x", -5 )
     .attr("dy", "80")
     .attr("transform", "rotate(-90)")
     .text("Population");

  svg.append("text")
     .attr("class", "viz-title")
     .attr("x", (width / 2))
     .attr("y", 20 )
     .attr("text-anchor", "middle")
     .text("Camp Population");










  // Begin reusable code segment for tool tip
  var lineSvg = svg.append("g"); // add line
      valueline = d3.svg.line()
      formatDate = d3.time.format("%d-%b") // format date for tip

  bisectDate = d3.bisector(function(d) { return d.date; }).left;  // Get left mouse position

  chart = svg.append("g")        // to graph
             .style("display", "none");     // and set style

  // Add the valueline path
  lineSvg.append("path")           //
         .attr("class", "line")           //
         .attr("d", valueline(dataset));  //

  // append the x line
  chart.append("line")
       .attr("class", "x")
       .style("stroke", "blue")
       .style("stroke-dasharray", "3,3")
       .style("opacity", 0.5)
       .attr("y1", 0)
       .attr("y2", height);

  // append the y line
  chart.append("line")
       .attr("class", "y")
       .style("stroke", "blue")
       .style("stroke-dasharray", "3,3")
       .style("opacity", 0.5)
       .attr("x1", width)
       .attr("x2", width);

  // append the circle at the intersection
  chart.append("circle")
       .attr("class", "y")
       .style("fill", "none")
       .style("stroke", "blue")
       .attr("r", 4);

  // place the value at the intersection
  chart.append("text")
       .attr("class", "y1")
       .style("stroke", "white")
       .style("stroke-width", "3.5px")
       .style("opacity", 0.8)
       .attr("dx", 8)
       .attr("dy", "-.3em");

  chart.append("text")
       .attr("class", "y2")
       .attr("dx", 8)
       .attr("dy", "-.3em");

  // place the date at the intersection
  chart.append("text")
       .attr("class", "y3")
       .style("stroke", "white")
       .style("stroke-width", "3.5px")
       .style("opacity", 0.8)
       .attr("dx", 8)
       .attr("dy", "1em");

  chart.append("text")
       .attr("class", "y4")
       .attr("dx", 8)
       .attr("dy", "1em");

  // Add rectangle to capture mouse movement
  svg.append("rect")                                               //
     .attr("width", width)                                            //
     .attr("height", height)                                          //
     .style("fill", "none")                                           // set style
     .style("pointer-events", "all")                                  //
     .on("mouseover", function() { chart.style("display", null); })   //
     .on("mouseout", function() { chart.style("display", "none"); })  // turn off display
     .on("mousemove", mousemove);                                     // trigger

  // Selecting & highlighting the date
  function mousemove() {                          //
    var x0 = xScale.invert(d3.mouse(this)[0]),    // get mouse position & date
         i = bisectDate(dataset, x0, 1),             // get index row for date
        d0 = dataset[i - 1],                        // set left date & close of cursor
        d1 = dataset[i],                            // set right date & close of cursor
         d = x0 - d0.date > d1.date - x0 ? d1 : d0;  // left right JS shorthand if statement


    chart.select("circle.y")
         .attr("transform", "translate(" + xScale(d.date) + "," + yScale(d.population) + ")");

    chart.select("text.y1")
         .attr("transform", "translate(" + xScale(d.date) + "," + yScale(d.population) + ")")
         .text(d.population);

    chart.select("text.y2")
         .attr("transform", "translate(" + xScale(d.date) + "," + yScale(d.population) + ")")
         .text(d.population);

    chart.select("text.y3")
         .attr("transform", "translate(" + xScale(d.date) + "," + yScale(d.population) + ")")
         .text(formatDate(d.date));

    chart.select("text.y4")
         .attr("transform", "translate(" + xScale(d.date) + "," + yScale(d.population) + ")")
         .text(formatDate(d.date));

    chart.select(".x")
         .attr("transform", "translate(" + xScale(d.date) + "," + yScale(d.population) + ")")
         .attr("y2", height - yScale(d.population));

    chart.select(".y")
         .attr("transform", "translate(" + width * -1 + "," + yScale(d.population) + ")")
         .attr("x2", width + width);
  }
  // End reusable code segment for tool tip






















});

//Adjust data types
function type(d) {
  d.date = parseDate(d.date);
  d.population = +d.population;
  return d;
}


// Citations
// http://bl.ocks.org/mbostock/1667367 used as a reference/guide

