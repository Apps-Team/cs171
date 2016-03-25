// Set SVG size and margins (Qu 4)
var padding2 = 80;
//Set Margins & Layout (Qu 8)
var sheltersMargins = {top: 20, right: 20, bottom: 70, left: 40},
  sheltersWidth = 400 - sheltersMargins.left - sheltersMargins.right,
  sheltersHeight = 500 - sheltersMargins.top - sheltersMargins.bottom;

//Create Data Structure (Qu 8)
var shelters = [
  { shelter: "Caravans", percentage: .7968},
  { shelter: "Tent/Caravan Combos", percentage: .1081},
  { shelter: "Tents", percentage: .0951}
];

//Add Axes (Qu 10)
var shelterScale = d3.scale.ordinal()
                           .domain(shelters.map(function(d) { return d.shelter; }))
                           .rangeRoundBands([0, sheltersWidth],.2);

var percentageScale = d3.scale.linear()
                              .domain([0, 1])
                              .range([sheltersHeight, 0]);

var shelterAxis = d3.svg.axis()
                        .scale(shelterScale)
                        .orient("bottom")

var percentageAxis = d3.svg.axis()
                            .scale(percentageScale)
                            .orient("left")
                            .ticks(10)
                            .tickFormat(d3.format("1%"));


//Create Vertical Bar Chart (Qu 9)
var svg = d3.select("#right-inner").append("svg")
                                   .attr("width", sheltersWidth + sheltersMargins.left + sheltersMargins.right)
                                   .attr("height", sheltersHeight + sheltersMargins.top + sheltersMargins.bottom)
                                   .append("g")
                                   .attr("transform", "translate(" + sheltersMargins.left + "," + sheltersMargins.top + ")");

svg.selectAll("bar")
  .data(shelters)
  .enter().append("rect")
  .style("fill", "green")
  .attr("x", function(d) { return shelterScale(d.shelter); })
  .attr("width", shelterScale.rangeBand())
  .attr("y", function(d) { return percentageScale(d.percentage); })
  .attr("height", function(d) { return sheltersHeight - percentageScale(d.percentage); });

//Add Labels (Qu 10)
svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + sheltersHeight + ")")
  .call(shelterAxis)
  .selectAll("text")
  .attr("class", "percentage-label")
  .style("text-anchor", "middle")

svg.append("g")
  .attr("class", "y axis")
  .call(percentageAxis)
  .append("text")
  .attr("class", "shelter-label")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .text("Percentage");

//svg.append("bar")
//.attr("class", "shelter-label")
//.append("text")
//.attr("y", 10)
//.attr("dy", "1em")
//.style("text-anchor", "mmiddle")
//.text("hihi");

var sheltetypedssd = svg.selectAll("text.shelter-type")
.data(shelters)
.enter()
.append("text")
.attr("class", "shelter-type")
//.attr("text-anchor", "middle")
.text(function(d) { return d3.format("0.2%")(d.percentage); })
.attr("height", 20)
//.attr("x",300)
.attr("x", function(d) { return shelterScale(d.shelter); })
.attr("y", function(d) { return percentageScale(d.percentage );   })

//.attr("y", function(d, i) {return (i * 20+19)});


//var height = svg.selectAll("text.building-height")
//.data(data)
//.enter()
//.append("text")
//.attr("class", "building-height")
//.attr("text-anchor", "start")
//.text(function(d){return d.height_m})
//.attr("height", 20)
//.attr("x",function(d){
//  d.height_px = +d.height_px + 170
//  return d.height_px
//})
//.attr("y", function(d, i) {return (i * 20+19)});


//Label Visualization (Qu 9)
svg.append("text")
  .attr("class", "viz-title")
  .attr("x", (sheltersWidth / 2))
  .attr("y", 20 )
  .attr("text-anchor", "middle")
  .text("Shelter Type");



// Citations
// http://bl.ocks.org/d3noob/8952219  used as a reference/guide