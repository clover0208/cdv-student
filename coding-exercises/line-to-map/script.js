// var svg = d3.select("svg"),
//   width = +svg.attr("width"),
//   height = +svg.attr("height");

// // Map and projection
// var projection = d3.geoMercator()
//   .center([0, 20])                // GPS of location to zoom on
//   .scale(99)                       // This is like the zoom
//   .translate([width / 2, height / 2])

// d3.queue()
//   .defer(d3.json, "mainland.geojson")  // World shape
//   .defer(d3.csv, "chinapop2018.csv") // Position of circles
//   .await(ready);

// function ready(error, dataGeo, data) {

//   // Create a color scale
//   var allContinent = d3.map(data, function (d) { return (d.province) }).keys()
//   var color = d3.scaleOrdinal()
//     .domain(allContinent)
//     .range(d3.schemePaired);

//   // Add a scale for bubble size
//   var valueExtent = d3.extent(data, function (d) { return +d.population; })
//   var size = d3.scaleSqrt()
//     .domain(valueExtent)  // What's in the data
//     .range([1, 50])  // Size in pixel

//   // Draw the map
//   svg.append("g")
//     .selectAll("path")
//     .data(dataGeo.features)
//     .enter()
//     .append("path")
//     .attr("fill", "#b8b8b8")
//     .attr("d", d3.geoPath()
//       .projection(projection)
//     )
//     .style("stroke", "none")
//     .style("opacity", .3)

//   // Add circles:
//   let lat = 31.22749
//   let lon = 121.53007

//   svg
//     .selectAll("myCircles")
//     .data(data.sort(function (a, b) { return +b.n - +a.n }).filter(function (d, i) { return i < 1000 }))
//     .enter()
//     .append("circle")
//     .attr("cx", function (d) {
//       let lat = d.properties.latitude;
//       let lon = d.properties.longitude;
//       return projection([lon, lat])[0]
//     })
//     .attr("cy", function (d) {
//       let lat = d.properties.latitude;
//       let lon = d.properties.longitude;
//       return projection([lon, lat])[1]
//     })
//     .attr('r', function (d) {
//       let correspondingDatapoint = incomingData.find(function (datapoint) {
//         if (datapoint.province == d.properties.name) {
//           return true;
//         } else {
//           return false
//         }
//       })
//       if (correspondingDatapoint != undefined) {
//         return circleScale(correspondingDatapoint.population);
//       }
//     })
//     .attr('stroke', '#CAAD5F')
//     .attr('fill', '#808F7C')
//     .style('opacity', '0.5')
//     .style('pointer-events', 'none');



//   // Add title and explanation
//   svg
//     .append("text")
//     .attr("text-anchor", "end")
//     .style("fill", "black")
//     .attr("x", width - 10)
//     .attr("y", height - 30)
//     .attr("width", 90)
//     .html("WHERE SURFERS LIVE")
//     .style("font-size", 14)


//   // --------------- //
//   // ADD LEGEND //
//   // --------------- //

//   // Add legend: circles
//   var valuesToShow = [100, 4000, 15000]
//   var xCircle = 40
//   var xLabel = 90
//   svg
//     .selectAll("legend")
//     .data(valuesToShow)
//     .enter()
//     .append("circle")
//     .attr("cx", xCircle)
//     .attr("cy", function (d) { return height - size(d) })
//     .attr("r", function (d) { return size(d) })
//     .style("fill", "none")
//     .attr("stroke", "black")

//   // Add legend: segments
//   svg
//     .selectAll("legend")
//     .data(valuesToShow)
//     .enter()
//     .append("line")
//     .attr('x1', function (d) { return xCircle + size(d) })
//     .attr('x2', xLabel)
//     .attr('y1', function (d) { return height - size(d) })
//     .attr('y2', function (d) { return height - size(d) })
//     .attr('stroke', 'black')
//     .style('stroke-dasharray', ('2,2'))

//   // Add legend: labels
//   svg
//     .selectAll("legend")
//     .data(valuesToShow)
//     .enter()
//     .append("text")
//     .attr('x', xLabel)
//     .attr('y', function (d) { return height - size(d) })
//     .text(function (d) { return d })
//     .style("font-size", 10)
//     .attr('alignment-baseline', 'middle')
// }

let w = window.innerWidth;
let h = window.innerHeight;
let padding = 50;

// SVG
let viz = d3.select("#container").append("svg")
  .style("width", w)
  .style("height", h)
  .style("background-color", "black")
  ;

d3.json("mainland.geojson").then(function (geoData) {
  d3.csv('china-pop-2018.csv').then(function (incomingData) {

    console.log(incomingData);

    incomingData.map(function (d, i) {
      d.population = Number(d.population);
      return d
    })

    let minPop = d3.min(incomingData, function (d, i) {
      return d.population
    })
    let maxPop = d3.max(incomingData, function (d, i) {
      return d.population
    })
    var myColor = d3.scaleSequential().domain([1, 10]).interpolator(d3.interpolatePuRd);

    let colorScale = d3.scaleLinear().domain([minPop, maxPop]).range(d3.schemePaired);
    // let colorScale = d3.scaleQuantize(
    //   domain([minPop, maxPop]),
    //   d3.schemeYlGnBu[8].reverse()
    // ).nice()



    let circleScale = d3.scaleLinear().domain([minPop, maxPop]).range([1, 30])

    let projection = d3.geoEqualEarth()
      .translate([w / 2, h / 2])
      .fitExtent([[padding, padding], [w - padding, h - padding]], geoData);

    let pathMaker = d3.geoPath(projection);


    viz.selectAll(".provinces").data(geoData.features).enter()
      .append("path")
      .attr("class", "provinces")
      .attr("d", pathMaker)
      .attr('id', function (d) {
        if (d.properties.name == 'Inner Mongol') {
          return "innerMongol"
        } else {
          return d.properties.name;
        }
      })
      //   .attr("fill", function (d, i) {

      //     console.log(d.properties.name);
      //     let correspondingDatapoint = incomingData.find(function (datapoint) {
      //       if (datapoint.province == d.properties.name) {
      //         return true;
      //       } else {
      //         return false
      //       }
      //     })
      //     if (correspondingDatapoint != undefined) {
      //       return colorScale(correspondingDatapoint.population)
      //     } else {
      //       return 'white'

      //     }
      // })
      .attr("stroke", "white")

    viz.selectAll("circle").data(geoData.features).enter()
      .append('circle')
      .attr('cx', function (d) {
        let latitude = d.properties.latitude;
        let longitude = d.properties.longitude;
        return projection([longitude, latitude])[0]
      })
      .attr('cy', function (d) {
        let latitude = d.properties.latitude;
        let longitude = d.properties.longitude;
        return projection([longitude, latitude])[1]
      })
      .attr('r', function (d) {
        let correspondingDatapoint = incomingData.find(function (datapoint) {
          if (datapoint.province == d.properties.name) {
            return true;
          } else {
            return false
          }
        })
        if (correspondingDatapoint != undefined) {
          return circleScale(correspondingDatapoint.population);
        }

      })
      .attr('stroke', 'none')
      .attr('fill', function (d) {
        let correspondingDatapoint = incomingData.find(function (datapoint) {
          if (datapoint.province == d.properties.name) {
            return true;
          } else {
            return false
          }
        })
        if (correspondingDatapoint != undefined) {
          return colorScale(correspondingDatapoint.population);
        }
      })
      .style("stroke-width", 1)
      .style('opacity', '0.7')
      // .style("stroke", "white")
      .style('pointer-events', 'none');




  })
})
