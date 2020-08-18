var margin = {top: 40, right: 20, bottom: 50, left: 100},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x0 = d3.scaleBand() 
            .rangeRound([0, width]) 
            .padding(0.1);

var x1 = d3.scaleBand();

var y = d3.scaleLinear()
            .range([height, 0]);

var svg = d3.select("#vis2").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var dlDelays = [2913069, 2524793, 730316, 5965, 730316];
var uaDelays = [1906148,3262856,492868,304,492868];
var aaDelays = [3735360,4255964,649230,22447,649230];
var wnDelays = [4155843,6463171,353248,40498,353248];

var totalDelays = [
                    {   "airline": "Delta", 
                        "values": [
                            {
                                "code": "DL",
                                "type": "Carrier",
                                "value": 913069
                            }, 
                            {
                                "code": "DL",
                                "type":"Weather",
                                "value": 2524793
                            },
                            {
                                "code": "DL",
                                "type": "National Air System",
                                "value": 730316
                            },
                            {
                                "code": "DL",
                                "type": "Security",
                                "value": 5965
                            },
                            {
                                "code": "DL",
                                "type": "Late Aircraft",
                                "value": 730316
                            }
                        ]
                    }, 
                    {   "airline": "United", 
                        "values": [
                            {
                                "code": "UA",
                                "type": "Carrier",
                                "value": 3735360,
                            },
                            {
                                "code": "UA",
                                "type": "Weather",
                                "value": 4255964, 
                            },
                            {
                                "code": "UA",
                                "type": "National Air System", 
                                "value": 649230
                            },
                            {
                                "code": "UA",
                                "type": "Security",
                                "value": 22447
                            },
                            {
                                "code": "UA",
                                "type": "Late Aircraft",
                                "value": 649230
                            }
                        ]
                    },
                    {   "airline": "American", 
                        "values": [
                            {
                                "code": "AA", 
                                "type": "Carrier",
                                "value": 1906148,
                            },
                            {
                                "code": "AA",
                                "type": "Weather", 
                                "value": 3262856
                            },
                            {
                                "code": "AA",
                                "type":  "National Air System", 
                                "value": 492868
                            },
                            {
                                "code": "AA",
                                "type": "Security",
                                "value": 304
                            },
                            {
                                "code": "AA",
                                "type": "Late Aircraft", 
                                "value": 492868
                            }
                        ]
                    },
                    {   "airline": "Southwest", 
                        "values": [
                            {
                                "code": "WN", 
                                "type": "Carrier",
                                "value": 4155843
                            },
                            {
                                "code": "WN", 
                                "type": "Weather",
                                "value": 6463171
                            },
                            {
                                "code": "WN", 
                                "type": "National Air System", 
                                "value": 353248
                            }, 
                            {
                                "code": "WN", 
                                "type": "Security",
                                "value": 40498
                            },
                            {
                                "code": "WN", 
                                "type": "Late Aircraft", 
                                "value": 353248
                            }
                        ]
                    },
                ];

var airlines = ["Delta", "United", "American", "Southwest"];

var delayReasons = ["Carrier Delays", 
                    "Weather Delays", 
                    "NAS Delays", 
                    "Security Delays", 
                    "Late Aircraft Delays"];

var colorSet = ["#92c5de", "#d5d5d5", "#ca0020", "#f4a582"];
var color = d3.scaleOrdinal().range(colorSet);

var airlineNames = totalDelays.map(function(d) { return d.airline; }); 
var reasonNames = totalDelays[0].values.map(function(d) { return d.type; });

x0.domain(reasonNames);
x1.domain(airlineNames).rangeRound([0, x0.bandwidth()]).padding(0.1);
y.domain([0, d3.max(totalDelays, function(airline) { return d3.max(airline.values, function(d) { return d.value; }); })]);

svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x0));

svg.append("g")
    .call(d3.axisLeft(y));

var group = svg.selectAll(".slice")
                .data(totalDelays)
                .enter().append("g")
                .attr("class", "g")
                .attr("transform",function(d) { return "translate(" + x1(d.airline) + ",0)"; });

group.selectAll("rect")
      .data(function(d) { return d.values })
        .enter().append("rect")
      .attr("width", x1.bandwidth())
      .attr("x", function(d) { return x0(d.type); })
      .style("fill", function(d) { 
        return color(d.code);
    })
      .attr("y", function(d) { return y(0); })
      .attr("height", function(d) { return height - y(0); })

group.selectAll("rect")
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); });

svg.append("text")          
    .attr("y", height + 40)
    .attr("x", (width / 2))
    .style("text-anchor", "middle")
    .style("font-family", "Arial")
    .text("Types of flight delays");

svg.append("text") 
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 10) 
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .style("font-family", "Arial")
    .text("# of flight delays");

svg.selectAll("mydots")
  .data(airlines)
  .enter()
  .append("rect")
    .attr("x", 600)
    .attr("y", function(d,i){ return 5 + i*25}) 
    .attr("width", 20)
    .attr("height", 20)
    .style("fill", function(d){ return color(d)})

svg.selectAll("mylabels")
  .data(airlines)
  .enter()
  .append("text")
    .attr("x", 600 + 20*1.2)
    .attr("y", function(d,i){ return 15 + i*25 }) 
    .style("fill", function(d){ return color(d)})
    .text(function(d){ return d})
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")
