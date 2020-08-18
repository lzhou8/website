
var airlines = ['DL', 'UA', 'AA', 'WN'];

var dlDelays = [872318, 625506, 689823, 678797, 772230, 1285146, 1166073, 1143744, 567782, 504398, 778967, 522252];
var uaDelays = [436192, 386292, 496567, 550843, 787542, 931973, 1051649, 1229876, 615960, 561179, 726912, 623606];
var aaDelays = [743817, 720229, 705604, 736732, 1098193, 1271340, 1526681, 1364336, 958295, 1003775, 844919, 822074];
var wnDelays = [1063732, 1178256, 1407095, 1555504, 1740146, 1645015, 1913938, 1549303, 975074, 1103384, 1248301, 1432410];
var totalDelays = [872318, 625506, 689823, 678797, 772230, 1285146, 1166073, 1143744, 567782, 504398, 778967, 522252, 436192, 386292, 496567, 550843, 787542, 931973, 1051649, 1229876, 615960, 561179, 726912, 623606, 743817, 720229, 705604, 736732, 1098193, 1271340, 1526681, 1364336, 958295, 1003775, 844919, 822074, 1063732, 1178256, 1407095, 1555504, 1740146, 1645015, 1913938, 1549303, 975074, 1103384, 1248301, 1432410];

var monthCSV = ["jan.csv", "feb.csv", 
				"mar.csv", "apr.csv", 
				"may.csv", "jun.csv", 
				"jul.csv", "aug.csv", 
				"sep.csv", "oct.csv", 
				"nov.csv", "dec.csv"];

var months = ["Jan", "Feb", "March", "April", "May", 
				"June", "July", "August", "Sept", "October", "Nov", "Dec"];

var keys = ["Delta", "United", "American", "Southwest"];

var colorSet = ["#4682b4", "#000000", "#FF0000", "#FFA500"];

var color = d3.scaleOrdinal().domain(keys).range(colorSet);

var margin = {top: 40, right: 20, bottom: 50, left: 80},
	width = 800 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;
 
var svg = d3.select("#vis1").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
		.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var div = d3.select("#vis1").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

function mouseOver(d, i) {
	div.transition()
	 	.duration(200)
	 	.style("opacity", .9);

	div.html(d["x"] + ", " + d["y"])
	 	.style("left", (d3.event.pageX - 80) + "px")
	 	.style("top", (d3.event.pageY - 120) + "px")

	d3.select(this)
		.attr("r", 4);
}

function mouseOut(d) {
	div.transition()
		.duration(200)
		.style("opacity", 0);

	d3.select(this)
		.attr("r", 3);
}

var x = d3.scalePoint() 
	.domain(months)
	.range([0, width]) 
	.padding(0.1);

var y = d3.scaleLinear()
	.domain(d3.extent(totalDelays))
	.range([height, 0]);

svg.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x));

svg.append("g") 
	.call(d3.axisLeft(y));

svg.append("text")          
	.attr("y", height + 40)
	.attr("x", (width / 2))
	.style("text-anchor", "middle")
	.style("font-family", "Arial")
	.text("Month");

svg.append("text") 
	.attr("transform", "rotate(-90)")
	.attr("y", 0 - margin.left) 
	.attr("x", 0 - (height / 2))
	.attr("dy", "1em")
	.style("text-anchor", "middle")
	.style("font-family", "Arial")
	.text("Total flight delays");

var dlData = [];
var uaData = []; 
var aaData = [];
var wnData = [];

var i = 0;

months.forEach(function(month) {
	dlData.push({"x": month, "y": dlDelays[i]});
	uaData.push({"x": month, "y": uaDelays[i]}); 
	aaData.push({"x": month, "y": aaDelays[i]}); 
	wnData.push({"x": month, "y": wnDelays[i]});
	i++;
});

var line = d3.line() 
	.x(function(d) { return x(d["x"]); })
	.y(function(d) { return y(d["y"]); });

var dlPath = svg.append("path")
				.attr("class", "line")
				.attr("id", "dl")
				.attr("d", line(dlData));

var uaPath = svg.append("path")
				.attr("class", "line")
				.attr("id", "ua")
				.attr("d", line(uaData)); 

var aaPath = svg.append("path")
				.attr("class", "line")
				.attr("id", "aa")
				.attr("d", line(aaData));

var wnPath = svg.append("path") 
				.attr("class", "line") 
				.attr("id", "wn")
				.attr("d", line(wnData));

svg.selectAll("dot") 
	.data(dlData) 
	.enter().append("circle")
	.attr("r", 3)
	.style("fill", "steelblue")
	.attr("cx", function(d) { return x(d["x"]); })
	.attr("cy", function(d) { return y(d["y"]); })
	.on("mouseover", mouseOver)
	.on("mouseout", mouseOut);

svg.selectAll("dot") 
	.data(uaData) 
	.enter().append("circle")
	.attr("r", 3) 
	.style("fill", "black")
	.attr("cx", function(d) { return x(d["x"]); })
	.attr("cy", function(d) { return y(d["y"]); })
	.on("mouseover", mouseOver)
	.on("mouseout", mouseOut);

svg.selectAll("dot") 
	.data(aaData) 
	.enter().append("circle")
	.attr("r", 3) 
	.style("fill", "red")
	.attr("cx", function(d) { return x(d["x"]); })
	.attr("cy", function(d) { return y(d["y"]); })
	.on("mouseover", mouseOver)
	.on("mouseout", mouseOut);

svg.selectAll("dot") 
	.data(wnData) 
	.enter().append("circle")
	.attr("r", 3) 
	.style("fill", "#FFA500")
	.attr("cx", function(d) { return x(d["x"]); })
	.attr("cy", function(d) { return y(d["y"]); })
	.on("mouseover", mouseOver)
	.on("mouseout", mouseOut);

svg.selectAll("dots")
  .data(keys)
  .enter()
  .append("rect")
    .attr("x", 600)
    .attr("y", function(d,i) { return 5 + 25*i }) 
    .attr("width", 20)
    .attr("height", 20)
    .style("fill", function(d){ return color(d) })

svg.selectAll("labels")
  .data(keys)
  .enter()
  .append("text")
    .attr("x", 600 + 20*1.2)
    .attr("y", function(d,i) { return 15 + 25*i }) 
    .style("fill", function(d) { return color(d) })
    .text(function(d) { return d})
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")
	