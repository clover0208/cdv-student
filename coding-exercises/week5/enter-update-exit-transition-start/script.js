let w = 960;
let h = 640;
let xPadding = 70;
let yPadding = 50;

let viz = d3.select("#container")
  .append("svg")
  .attr("width", w)
  .attr("height", h)
  ;


function gotData(incomingData) {
  console.log(incomingData);

  let mergedData = d3.merge(incomingData);

  let maxX = d3.max(mergedData, function (d, i) {
    return d.x;
  })

  let xScale = d3.scaleLinear().domain([0, maxX]).range([xPadding, w - xPadding]);
  let xAxisGroup = viz.append("g").attr("class", "xaxis");
  let xAxis = d3.axisBottom(xScale);
  xAxisGroup.call(xAxis);
  xAxisGroup.attr("transform", "translate(0, " + (h - yPadding) + " )");


  let maxY = d3.max(mergedData, function (d, i) {
    return d.y;
  })

  let yScale = d3.scaleLinear().domain([0, maxY]).range([h - yPadding, yPadding]);
  let yAxisGroup = viz.append("g").attr("class", "yaxis");
  let yAxis = d3.axisLeft(yScale);
  yAxisGroup.call(yAxis);
  yAxisGroup.attr("transform", "translate(" + xPadding + ",0)");
}



d3.json("data.json").then(gotData);
