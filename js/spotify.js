var margin = { top: 10, right: 30, bottom: 30, left: 40},
	width = 700 - margin.left - margin.right,
	height = 600 - margin.top - margin.bottom; 

var svg = d3.select("#boxplot")
	.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform",
			  "translate(" + margin.left + "," + margin.top + ")");

d3.csv("/data/tracks.csv", function(data) {
	var acousticness = data.map(function(d) { return parseFloat(d.acousticness) });
	var danceability = data.map(function(d) { return parseFloat(d.danceability) });
	var energy = data.map(function(d) { return parseFloat(d.energy) });
	var instrumentalness = data.map(function(d) { return parseFloat(d.instrumentalness) });
	var liveness = data.map(function(d) { return parseFloat(d.liveness) });
	//var loudness = data.map(function(d) { return parseFloat(d.loudness) });
	var speechiness = data.map(function(d) { return parseFloat(d.speechiness) });
	var valence = data.map(function(d) { return parseFloat(d.valence) });
	//var tempo = data.map(function(d) { return parseFloat(d.tempo) });

	var labels = [acousticness, danceability, energy, instrumentalness, 
			  liveness, speechiness, valence];

	var keys = ["acousticness", "danceability", "energy", "instrumentalness",
				"liveness", "speechiness", "valence"];

	var summary = [];

	for (var i = 0; i < labels.length; i++) {
		var sorted = labels[i].sort(d3.ascending);
		var q1 = d3.quantile(sorted, 0.25);
		var median = d3.quantile(sorted, 0.5);
		var q3 = d3.quantile(sorted, 0.75);
		var interQuantileRange = q3 - q1;
		//var min = q1 - (1.5 * interQuantileRange);
		//var max = q3 + (1.5 * interQuantileRange);
		var min = d3.min(d3.values(sorted));
		var max = d3.max(d3.values(sorted));

		var value = {q1: q1, median: median, q3: q3, interQuantileRange: interQuantileRange, min: min, max: max};
		summary.push({"key": keys[i], "value": value});

	}

	console.log(summary);

	var x = d3.scaleBand()
		.range([0, width])
		.domain(keys)
		.paddingInner(1)
		.paddingOuter(0.5)
	svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))


    var y = d3.scaleLinear()
    	.domain([0, 1.0])
    	.range([height, 0])
    svg.append("g").call(d3.axisLeft(y))


    svg
    .selectAll("vertLines")
    .data(summary)
    .enter()
    .append("line")
      .attr("x1", function(d){return(x(d.key))})
      .attr("x2", function(d){return(x(d.key))})
      .attr("y1", function(d){return(y(d.value.min))})
      .attr("y2", function(d){return(y(d.value.max))})
      .attr("stroke", "black")
      .style("width", 60)

	  // rectangle for the main box
	  var boxWidth = 50;
	  var colors = ["#b7e4cf", "#f8d6cd", "#f4e693", "#9abcc3", "#b1afc0", "#69b3a2", "#dfd4ae"];

	  svg
	    .selectAll("boxes")
	    .data(summary)
	    .enter()
	    .append("rect")
	        .attr("x", function(d){return(x(d.key)-boxWidth/2)})
	        .attr("y", function(d){return(y(d.value.q3))})
	        .attr("height", function(d){return(y(d.value.q1)-y(d.value.q3))})
	        .attr("width", boxWidth )
	        .attr("stroke", "black")
	        .style("fill", function(d,i) { return colors[i] })

	  // Show the median
	  svg
	    .selectAll("medianLines")
	    .data(summary)
	    .enter()
	    .append("line")
	      .attr("x1", function(d){return(x(d.key)-boxWidth/2) })
	      .attr("x2", function(d){return(x(d.key)+boxWidth/2) })
	      .attr("y1", function(d){return(y(d.value.median))})
	      .attr("y2", function(d){return(y(d.value.median))})
	      .attr("stroke", "black")
	      .style("width", 80)

});
