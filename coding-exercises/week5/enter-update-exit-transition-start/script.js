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

  let vizGroup = viz.append("g").attr("class", "vizGroup");

  let dataIndex = 0;

  function getGroupLocation(d, i) {
    let x = xScale(d.x);
    let y = yScale(d.y);
    return "translate(" + x + "," + y + ")"
  }
  function getIncominggroupLocation(d, i) {
    let x = xScale(d.x);
    let y = -30;
    return "translate(" + x + "," + y + ")"
  }
  function getexitingGroupLocation(d, i) {
    let x = xScale(d.x);
    let y = h + 30;
    return "translate(" + x + "," + y + ")"
  }



  function visualizeData() {
    let dataToShow = incomingData[dataIndex];

    function assignKeys(d, i) {
      return d.name;
    }
    let datagroups = vizGroup.selectAll(".datagroup").data(dataToShow, assignKeys);

    let enteringElements = datagroups.enter()
      .append("g")
      .attr("class", "datagroup")
      ;

    enteringElements.append("circle")
      .attr("r", 30)
      .attr("fill", "red")
      ;
    enteringElements.append("text")
      .text(function (d, i) {
        return d.name;
      })
      .attr("x", -17)
      .attr("y", 17)
      .attr("font-family", "sans-serif")
      .attr("font-size", "3em")
      .attr("fill", "white")
      ;
    enteringElements.attr("transform", getIncominggroupLocation).transition().delay(500).attr("transform", getGroupLocation);

    let existingElements = datagroups.exit();
    existingElements.transition().attr("transform", getexitingGroupLocation).remove();
    datagroups.select("text")
      .text(function (d, i) {
        return d.name;
      })
    datagroups.transition().duration(500).attr("transform", getGroupLocation);


  }
  // function step2() {
  //   let dataToShow = incomingData[1];
  //   let datagroups = vizGroup.selectAll(".datagroup").data(dataToShow);

  //   // datagroups.append("circle")
  //   //   .attr("r", 30)
  //   //   .attr("fill", "red")
  //   //   ;
  //   // datagroups.append("text")
  //   //   .text(function (d, i) {
  //   //     return d.name;
  //   //   })
  //   //   .attr("x", -17)
  //   //   .attr("y", 17)
  //   //   .attr("font-family", "sans-serif")
  //   //   .attr("font-size", "3em")
  //   //   .attr("fill", "white")
  //   //   ;

  //   function getGroupLocation(d, i) {
  //     let x = xScale(d.x);
  //     let y = yScale(d.y);
  //     return "translate(" + x + "," + y + ")"
  //   }
  //   datagroups.attr("transform", getGroupLocation);

  // }
  // function step3() {
  //   let dataToShow = incomingData[2];
  //   let datagroups = vizGroup.selectAll(".datagroup").data(dataToShow);

  //   let exitingElements = datagroups.exit().remove();

  //   // datagroups.append("circle")
  //   //   .attr("r", 30)
  //   //   .attr("fill", "red")
  //   //   ;
  //   // datagroups.append("text")
  //   //   .text(function (d, i) {
  //   //     return d.name;
  //   //   })
  //   //   .attr("x", -17)
  //   //   .attr("y", 17)
  //   //   .attr("font-family", "sans-serif")
  //   //   .attr("font-size", "3em")
  //   //   .attr("fill", "white")
  //   //   ;

  //   function getGroupLocation(d, i) {
  //     let x = xScale(d.x);
  //     let y = yScale(d.y);
  //     return "translate(" + x + "," + y + ")"
  //   }
  //   datagroups.attr("transform", getGroupLocation);

  // }
  // function step4() {
  //   let dataToShow = incomingData[3];
  //   let datagroups = vizGroup.selectAll(".datagroup").data(dataToShow);

  //   let enterElements = datagroups.enter()
  //     .append("g")
  //     .attr("class", "datagroup")
  //     ;


  //   enterElements.append("circle")
  //     .attr("r", 30)
  //     .attr("fill", "red")
  //     ;
  //   enterElements.append("text")
  //     .text(function (d, i) {
  //       return d.name;
  //     })
  //     .attr("x", -17)
  //     .attr("y", 17)
  //     .attr("font-family", "sans-serif")
  //     .attr("font-size", "3em")
  //     .attr("fill", "white")
  //     ;

  //   function getGroupLocation(d, i) {
  //     let x = xScale(d.x);
  //     let y = yScale(d.y);
  //     return "translate(" + x + "," + y + ")"
  //   }
  //   enterElements.attr("transform", getGroupLocation);
  //   datagroups.attr("transform", getGroupLocation);

  // }
  document.getElementById("step1").addEventListener("click", function () {
    dataIndex = 0;
    visualizeData();
  });
  document.getElementById("step2").addEventListener("click", function () {
    dataIndex = 1;
    visualizeData();
  });
  document.getElementById("step3").addEventListener("click", function () {
    dataIndex = 2;
    visualizeData();
  });
  document.getElementById("step4").addEventListener("click", function () {
    dataIndex = 3;
    visualizeData();
  });
  document.getElementById("step5").addEventListener("click", function () {
    dataIndex = 4;
    visualizeData();
  });
  //   document.getElementById("step2").addEventListener("click", step2);
  //   document.getElementById("step3").addEventListener("click", step3);
  //   document.getElementById("step4").addEventListener("click", step4);

}



d3.json("data.json").then(gotData);
