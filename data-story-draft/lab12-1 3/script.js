let w = window.innerWidth;
let h = window.innerHeight;

// https://stackoverflow.com/questions/16265123/resize-svg-when-window-is-resized-in-d3-js/25978286#25978286
// https://chartio.com/resources/tutorials/how-to-resize-an-svg-when-the-window-is-resized-in-d3-js/
let viz = d3.select("#vizContainer1")
  .append("svg")
  // Container class to make it responsive.
  .attr("width", w)
  .attr("height", h)
  .style("background-color", "lavender")
  ;

let graphPadding = 20;
let graphW = 600;
let graphH = 400;

let xScale = d3.scaleLinear().domain([0, 100]).range([0, graphW])
let yScale = d3.scaleLinear().domain([0, 100]).range([0, graphH])


let data = [
  {
    name: "leon",
    position: [30, 70],
    init: [xScale.invert(graphPadding + graphW / 2), yScale.invert(graphPadding + graphH / 2 - h)],
    goal: [30, 70],
    random: [Math.random() * 100, Math.random() * 100]
  },
  {
    name: "normal",
    position: [20, 40],
    init: [20, 40],
    random: [Math.random() * 100, Math.random() * 100]
  },
  {
    name: "normal",
    position: [50, 90],
    init: [50, 90],
    random: [Math.random() * 100, Math.random() * 100]
  },
]

console.log(xScale.invert(graphPadding + graphW / 2))


let graphGroup = viz.append('g').attr('class', 'graphGroup');
graphGroup.attr("transform", () => {
  let x = 0;
  let y = h;
  return "translate(" + x + "," + y + ")"
})
  ;

let vizGroup = graphGroup.append('g').attr('class', 'vizGroup');

vizGroup.append('rect')
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", graphW + graphPadding * 2)
  .attr("height", graphH + graphPadding * 2)
  .attr("fill", "black")
  ;
vizGroup.attr("transform", () => {
  let x = w / 2 - graphW / 2 - graphPadding;
  let y = h / 2 - graphH / 2 - graphPadding;
  return "translate(" + x + "," + y + ")"
})
  ;

let xAxisGroup = vizGroup.append('g').attr('class', 'xAxisGroup');
let xAxis = d3.axisBottom(xScale)
xAxisGroup.call(xAxis);
xAxisGroup.attr("transform", () => {
  let x = graphPadding
  let y = graphH - graphPadding
  return "translate(" + x + ", " + y + ")"
})


let elementGroup = vizGroup.append('g').attr('class', 'elementGroup');

function updateViz() {
  let elements = elementGroup.selectAll(".datapoint").data(data);
  let enteringElements = elements.enter();
  let exitingElements = elements.exit();

  let datagroups = enteringElements.append("g")
    .attr("class", "datagroup")
    .classed("special", (d, i) => {
      return d.name == "leon"
    })
    .attr("transform", (d, i) => {
      let x, y;
      if (d.name == "leon") {
        x = xScale(d.init[0])
        y = yScale(d.init[1])
      } else {
        x = xScale(d.position[0])
        y = yScale(d.position[1])
      }

      return "translate(" + x + "," + y + ")"
    })

  datagroups.append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 5)
    .attr("fill", (d, i) => {
      if (d.name == "leon") {
        return "blue";
      } else {
        return "white";
      }
    })
    ;
  datagroups.append("text")
    .attr("x", 10)
    .attr("y", 0)
    .text((d, i) => {
      if (d.name == "leon") {
        return "you";
      } else {
        return "other";
      }
    })
    .attr("fill", (d, i) => {
      if (d.name == "leon") {
        return "blue";
      } else {
        return "white";
      }
    })
    ;

  elements
    .attr("transform", (d, i) => {
      let x = xScale(d.position[0])
      let y = yScale(d.position[1])
      return "translate(" + x + "," + y + ")"
    })
    ;
}

updateViz();

// setTimeout(()=>{
//   elementGroup.select(".special")
//     .transition()
//     .attr("cx", (d, i)=>{
//       return xScale(d.goal[0])
//     })
//     .attr("cy", (d, i)=>{
//       return yScale(d.goal[1])
//     })
//     .on("end", (d, i)=>{
//       console.log(d)
//       d.position = d.goal;
//     })
//   ;
// }, 1000)


enterView({
  selector: '.partOne .stepOne',
  enter: function (el) {
    console.log('a special element entered');
    elementGroup.select(".special")
      .transition()
      .duration(3000)
      .attr("transform", (d, i) => {
        let x = xScale(d.goal[0])
        let y = yScale(d.goal[1])
        return "translate(" + x + "," + y + ")"
      })
      // .on("end", (d, i)=>{
      //   console.log(d)
      //   d.position = d.goal;
      // })
      ;

  },
  exit: function (el) {
    console.log('a special element exited');
    elementGroup.select(".special")
      .transition()
      .duration(3000)
      .attr("transform", (d, i) => {
        let x = xScale(d.init[0])
        let y = yScale(d.init[1])
        return "translate(" + x + "," + y + ")"
      })
      // .on("end", (d, i)=>{
      //   console.log(d)
      //   d.position = d.init;
      // })
      ;
  },
  progress: function (el, progress) {
    console.log("the special element's progress is:", progress);
    graphGroup.attr("transform", () => {
      let x = 0;
      let y = h - progress * h;
      return "translate(" + x + "," + y + ")"
    })
      ;
  },
  // offset: 0, // enter at middle of viewport
  // once: true, // trigger just once
});


enterView({
  selector: '.partOne .stepTwo',
  enter: function (el) {
    console.log('a special element entered');
    elementGroup.selectAll(".datagroup")
      .transition()
      .duration(1000)
      .attr("transform", (d, i) => {
        let x = xScale(d.random[0])
        let y = yScale(d.random[1])
        return "translate(" + x + "," + y + ")"
      })
      ;

  },
  exit: function (el) {
    console.log('a special element exited');
    elementGroup.selectAll(".datagroup")
      .transition()
      .duration(1000)
      .attr("transform", (d, i) => {
        let x = xScale(d.position[0])
        let y = yScale(d.position[1])
        return "translate(" + x + "," + y + ")"
      })
      ;
  },
  progress: function (el, progress) {
    console.log("the special element's progress is:", progress);
  },
  offset: 0.5, // enter at middle of viewport
  // once: true, // trigger just once
});
