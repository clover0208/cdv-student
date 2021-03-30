d3.json("births.json").then(gotData);


let w = 900;
let h = 500;
let xpadding = 100;
let ypadding = 50;
let viz = d3.select("#container")
  .append("svg")
  .style("width", w)
  .style("height", h)
  .style("outline", "solid black")
  ;




function gotData(incomingData) {

  incomingData = fixJSDateObjects(incomingData);
  // console.log(incomingData);






  // temporarily flatten data to get the minima/maxima:
  let flatData = d3.merge(incomingData)
  // we can use a  time scale because our data expresses
  // years in the form of JS date objects
  let xDomain = d3.extent(flatData, function (d) { return d.year });
  let xScale = d3.scaleTime().domain(xDomain).range([xpadding, w - xpadding]);
  let xAxis = d3.axisBottom(xScale);
  let xAxisGroup = viz.append("g")
    .attr("class", "xaxisgroup")
    .attr("transform", "translate(0," + (h - ypadding) + ")")
    ;
  xAxisGroup.call(xAxis);

  let yMax = d3.max(flatData, function (d) {
    return d.birthsPerThousand;
  })
  let yDomain = [0, yMax];
  let yScale = d3.scaleLinear().domain(yDomain).range([h - ypadding, ypadding]);
  let yAxis = d3.axisLeft(yScale);
  let yAxisGroup = viz.append("g")
    .attr("class", "yaxisgroup")
    .attr("transform", "translate(" + (xpadding / 2) + ",0)")
    ;
  yAxisGroup.call(yAxis);


  let graphGroup = viz.append("g").attr("class", "graphGroup");


  // console.log(d[0].country)








  let lineMaker = d3.line()
    .x(function (d, i) {
      return xScale(d.year);
    })
    .y(function (d, i) {
      return yScale(d.birthsPerThousand);
    })
    ;


  // let lineMakertry = d3.line()
  // .x(function (d, i) {
  //   return xScale(d.year);
  // })
  // .y(function (d, i) {
  //   return yScale(d.birthsPerThousand);
  // })
  // ;

  let UStwo = [];
  let US = [];
  for (i = 0; i < incomingData[0].length; i++) {
    US.push(incomingData[0][i])
  }
  UStwo.push(US);
  // console.log(US)

  let CH = [];
  let CHtwo = [];
  for (i = 0; i < incomingData[1].length; i++) {
    CH.push(incomingData[1][i])
  }
  CHtwo.push(CH);

  // console.log(UStwo);
  // console.log(CH);

  graphGroup.selectAll('.line').data(UStwo).enter()
    .append('path')
    .attr('d', lineMaker)
    .attr('fill', 'none')
    .transition()
    .duration(500)
    .attr('stroke', 'blue')
    .attr('stroke-width', 5)
    .attr("class", "line")
    ;



  function USline() {




    graphGroup.selectAll('.line').data(UStwo).transition().duration(500)
      .attr("d", lineMaker)
      .attr("stroke", "blue");



  }


  function CHline() {


    graphGroup.selectAll('.line').data(CHtwo).enter()
      .append('path')
      .attr('d', lineMaker)
      .attr('fill', 'none')
      .transition()
      .duration(500)
      .attr('stroke', 'red')
      .attr('stroke-width', 5)
      .attr("class", "line")
      ;

    graphGroup.selectAll('.line').data(CHtwo).transition().duration(500)
      .attr("d", lineMaker)
      .attr("stroke", "red");



  }


  d3.select("#usa").on("click", USline);
  d3.select("#china").on("click", CHline);

}

// function that turns all datapoints year values
// into JS date objects in the very beginning
// so that WE DON'T HAVE TO DEAL WITH IT LATER
function fixJSDateObjects(dataToFix) {
  // timeParser
  let timeParse = d3.timeParse("%Y");
  return dataToFix.map(function (data) {
    return data.map(function (d) {
      return {
        "country": d.country,
        "year": timeParse(d.year),
        "birthsPerThousand": d.birthsPerThousand
      }
    })
  });
}

// d3.json("births.json").then(gotData);


