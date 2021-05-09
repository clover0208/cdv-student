let w = window.innerWidth;
let h = window.innerHeight;

// https://stackoverflow.com/questions/16265123/resize-svg-when-window-is-resized-in-d3-js/25978286#25978286
// https://chartio.com/resources/tutorials/how-to-resize-an-svg-when-the-window-is-resized-in-d3-js/
let viz = d3.select("#vizContainer1")
  .append("svg")
  .attr("width", w)
  .attr("height", h + 900)
  .style("background-color", "#fff9f9")
  ;

let graphPadding = 20;
let graphW = 600;
let graphH = 400;


d3.json('data.json').then(gotData);






function gotData(incomingData) {


  function colorone(d, i) {
    if (d.name == "NYPD") {

      return "#ffdab9";

    } else if (d.name == "New-York-Times") {

      return "#fcd5ce";

    } else {
      return "#adadad";
    }
  };


  let graphGroup = viz.append('g').attr('class', 'graphGroup');
  graphGroup.attr("transform", () => {
    let x = 0;
    let y = h;
    return "translate(" + x + "," + y + ")"
  })
    ;

  let vizGroup = graphGroup.append('g').attr('class', 'vizGroup');

  vizGroup.attr("transform", () => {
    let x = w / 2 - graphW / 2 - 170;
    let y = h / 2 - graphH / 2 - 20;
    return "translate(" + x + "," + y + ")"
  })
    .attr("fill", "black")
    ;

  let elementGroup = vizGroup.append('g').attr('class', 'elementGroup');

  let timeParseFunction = d3.utcParse("%Y-%m-%dT%H:%M:%S.%LZ");
  let timeExtent = d3.extent(incomingData, function (d) {
    return timeParseFunction(d.time);
  })
  console.log(timeParseFunction("2021-03-30T16:00:00.000Z"))

  let xScale = d3.scaleTime().domain([timeParseFunction("2021-01-01T16:00:00.000Z"), timeParseFunction("2021-04-07T16:00:00.000Z")]).range([350, 1050]);
  let delayScale = d3.scaleLinear().domain(timeExtent).range([5000, 15000]);
  let xAxisGroup = elementGroup.append("g").attr("class", 'xaxis');

  let xAxis = d3.axisBottom(xScale);
  xAxisGroup.attr("transform", "translate(0, -300)")
    .style("color", "black")
    .attr("opacity", 1)
    .attr("font-family", "'Amaranth', sans-serif")
    .attr("font-size", "1.7em");
  xAxisGroup.call(xAxis)

  xAxisGroup.append("g").attr('class', 'xLabel')
    .attr("transform", "translate(450, 50)")
    .append("text")
    .attr("fill", "black")
    .text("When the report first published")
    .attr("font-family", "'Amaranth', sans-serif")
    .attr("font-size", "1.6em")
    .attr("opacity", 0.9)

    ;

  ForceData = [
    {
      "name": "Phillipine-women",
      "x": "25",
      "y": "100"

    },
    {
      "name": "Asian-male-subway-lockjaw",
      "x": "430",
      "y": "160"
    },
    {
      "name": "37-female",
      "x": "725",
      "y": "100"
    },
    {
      "name": "Ching-Chong-NYCHPD",
      "x": "890",
      "y": "100"
    },
    {
      "name": "36-stabbed-debatable-Feb",
      "x": "1080",
      "y": "100"
    },
    {
      "name": "65-male",
      "x": "255",
      "y": "300"
    },
    {
      "name": "65-female-bluehair",
      "x": "530",
      "y": "300"
    },
    {
      "name": "37-Hou",
      "x": "750",
      "y": "300"
    },
    {
      "name": "61-male",
      "x": "930",
      "y": "300"
    },
    {
      "name": "Korean-blog",
      "x": "1090",
      "y": "300"
    },
    {
      "name": "68-male",
      "x": "255",
      "y": "500"
    },
    {
      "name": "6-Chinese-killChinese-nazi",
      "x": "530",
      "y": "500"
    },
    {
      "name": "23-korean-women-Feb",
      "x": "750",
      "y": "500"
    },
    {
      "name": "83-Korean",
      "x": "935",
      "y": "500"
    },
    {
      "name": "gym-manager",
      "x": "935",
      "y": "700"
    },
    {
      "name": "Route",
      "x": "935",
      "y": "900"
    },
    {
      "name": "52-women-attacked-by-white-Feb",
      "x": "935",
      "y": "1100"
    },
    {
      "name": "25-mother-and-son",
      "x": "1090",
      "y": "500"
    },
    {
      "name": "Kill Chinks-mask-on-street",
      "x": "1090",
      "y": "700"
    },
    {
      "name": "Kill Chinks-on-subway",
      "x": "1090",
      "y": "900"
    },
    {
      "name": "couple-helped-by-Tommy-John",
      "x": "1090",
      "y": "1100"
    },
    {
      "name": "13-teen",
      "x": "255",
      "y": "700"
    },
    {
      "name": "Flushing Chinese man-attacked-Feb",
      "x": "255",
      "y": "900"
    },
    {
      "name": "policebeingattacked",
      "x": "255",
      "y": "1100"
    },
    {
      "name": "Harlem man-police-mentioned",
      "x": "255",
      "y": "1300"
    },
    {
      "name": "Long Island-female-attacked",
      "x": "530",
      "y": "700"
    },
    {
      "name": "54-women-I'm here to mess with Asians",
      "x": "530",
      "y": "900"
    },
    {
      "name": "laundromat",
      "x": "530",
      "y": "1100"
    },
    {
      "name": "Lower East Side protesters-police-released",
      "x": "530",
      "y": "1300"
    },
    {
      "name": "56-Zhang Mingshun",
      "x": "750",
      "y": "700"
    },
    {
      "name": "walk-dog",
      "x": "750",
      "y": "900"
    },
    {
      "name": "25-urine-women",
      "x": "750",
      "y": "1100"
    }
  ]

  function forceXone(d) {
    if (d.crime == "Phillipine-women") {
      return 0
    }
    if (d.crime == "Asian-male-subway-lockjaw") {
      return 0
    }

    if (d.crime == "37-female") {
      return 0
    }
    if (d.crime == "65-female-bluehair") {
      return 0
    } if (d.crime == "65-male") {
      return 0
    } if (d.crime == "36-stabbed-debatable-Feb") {
      return 0
    } if (d.crime == "Ching-Chong-NYCHPD") {
      return 0
    }
    if (d.crime == "56-Zhang Mingshun") {
      return 250
    }
    if (d.crime == "Long Island-female-attacked") {
      return 250
    }
    if (d.crime == "Harlem man-police-mentioned") {
      return 250
    }
    if (d.crime == "policebeingattacked") {
      return 250
    }
    if (d.crime == "Flushing Chinese man-attacked-Feb") {
      return 250
    }
    if (d.crime == "37-Hou") {
      return 250
    }
    if (d.crime == "Kill Chinks-mask-on-street") {
      return 250
    }
    if (d.crime == "walk-dog") {
      return 500
    }
    if (d.crime == "13-teen") {
      return 500
    }
    if (d.crime == "laundromat") {
      return 500
    }
    if (d.crime == "couple-helped-by-Tommy-John") {
      return 500
    }
    if (d.crime == "Kill Chinks-on-subway") {
      return 500
    }
    if (d.crime == "61-male") {
      return 500
    }
    if (d.crime == "unclear") {
      return 500
    }
    if (d.crime == "25-urine-women") {
      return 710
    }
    if (d.crime == "25-mother-and-son") {
      return 710
    }
    if (d.crime == "52-women-attacked-by-white-Feb") {
      return 710
    }
    if (d.crime == "Route") {
      return 710
    }
    if (d.crime == "gym-manager") {
      return 710
    } if (d.crime == "Korean-blog") {
      return 710
    }

    if (d.crime == "Lower East Side protesters-police-released") {
      return 900
    }
    if (d.crime == "54-women-I'm here to mess with Asians") {
      return 900
    }
    if (d.crime == "83-Korean") {
      return 900
    }
    if (d.crime == "23-korean-women-Feb") {
      return 900
    }
    if (d.crime == "6-Chinese-killChinese-nazi") {
      return 900
    } if (d.crime == "68-male") {
      return 900
    }



  }

  function forceYone(d) {
    if (d.crime == "Phillipine-women") {
      return -120
    }
    if (d.crime == "Asian-male-subway-lockjaw") {
      return 0
    }
    if (d.crime == "37-female") {
      return 120
    }
    if (d.crime == "65-female-bluehair") {
      return 220
    } if (d.crime == "65-male") {
      return 320
    } if (d.crime == "36-stabbed-debatable-Feb") {
      return 420
    } if (d.crime == "Ching-Chong-NYCHPD") {
      return 520
    }
    if (d.crime == "56-Zhang Mingshun") {
      return -120
    }
    if (d.crime == "Long Island-female-attacked") {
      return 0
    }
    if (d.crime == "Harlem man-police-mentioned") {
      return 120
    }
    if (d.crime == "policebeingattacked") {
      return 220
    }
    if (d.crime == "Flushing Chinese man-attacked-Feb") {
      return 320
    }
    if (d.crime == "37-Hou") {
      return 420
    }
    if (d.crime == "Kill Chinks-mask-on-street") {
      return 520
    }
    if (d.crime == "walk-dog") {
      return -120
    }
    if (d.crime == "13-teen") {
      return 0
    }
    if (d.crime == "laundromat") {
      return 120
    }
    if (d.crime == "couple-helped-by-Tommy-John") {
      return 220
    }
    if (d.crime == "Kill Chinks-on-subway") {
      return 320
    }
    if (d.crime == "61-male") {
      return 420
    }
    if (d.crime == "unclear") {
      return 520
    }
    if (d.crime == "25-urine-women") {
      return -120
    }
    if (d.crime == "25-mother-and-son") {
      return 0
    }
    if (d.crime == "52-women-attacked-by-white-Feb") {
      return 120
    }
    if (d.crime == "Route") {
      return 220
    }
    if (d.crime == "gym-manager") {
      return 320
    } if (d.crime == "Korean-blog") {
      return 420
    }

    if (d.crime == "Lower East Side protesters-police-released") {
      return -120
    }
    if (d.crime == "54-women-I'm here to mess with Asians") {
      return 0
    }
    if (d.crime == "83-Korean") {
      return 120
    }
    if (d.crime == "23-korean-women-Feb") {
      return 220
    }
    if (d.crime == "6-Chinese-killChinese-nazi") {
      return 320
    } if (d.crime == "68-male") {
      return 420
    }
  }

  function forceXtwo(d) {
    if (d.name == "NYPD" && d.crime == "Phillipine-women") {
      return 0
    }
    if (d.name == "NYPD" && d.crime == "gym-manager") {
      return 0
    }

    if (d.name == "NYPD" && d.crime == "37-female") {
      return 0
    }
    if (d.name == "NYPD" && d.crime == "Lower East Side protesters-police-released") {
      return 0
    }
    if (d.name == "NYPD" && d.crime == "gym-manager") {
      return 0
    }
    if (d.name == "NYPD" && d.crime == "37-Hou") {
      return 0
    }
    if (d.name == "NYPD" && d.crime == "Harlem man-police-mentioned") {
      return 0
    }
    if (d.name == "NYPD" && d.crime == "68-male") {
      return 0
    }
    if (d.name == "NYPD" && d.crime == "unclear") {
      return 50
    }
    if (d.name == "New-York-Times" && d.crime == "Phillipine-women") {
      return 0
    }
    if (d.name == "New-York-Times" && d.crime == "36-stabbed-debatable-Feb") {
      return 0
    }
    if (d.name == "New-York-Times" && d.crime == "52-women-attacked-by-white-Feb") {
      return 0
    }
    if (d.name == "New-York-Times" && d.crime == "37-Hou") {
      return 0
    }
    if (d.name == "New-York-Times" && d.crime == "23-korean-women-Feb") {
      return 50
    }
    if (d.name == "New-York-Times" && d.crime == "23-korean-women-Feb") {
      return 50
    }
    if (d.name == "World-Journal" && d.crime == "Phillipine-women") {
      return 0
    }
    if (d.name == "World-Journal" && d.crime == "Asian-male-subway-lockjaw") {
      return 0
    }
    if (d.name == "World-Journal" && d.crime == "laundromat") {
      return 0
    } if (d.name == "World-Journal" && d.crime == "37-female") {
      return 0
    }
    if (d.name == "World-Journal" && d.crime == "65-female-bluehair") {
      return 0
    } if (d.name == "World-Journal" && d.crime == "Ching-Chong-NYCHPD") {
      return 0
    }
    if (d.name == "World-Journal" && d.crime == "65-male") {
      return 0
    } if (d.name == "World-Journal" && d.crime == "couple-helped-by-Tommy-John") {
      return 0
    } if (d.name == "World-Journal" && d.crime == "policebeingattacked") {
      return 0
    } if (d.name == "World-Journal" && d.crime == "Flushing Chinese man-attacked-Feb") {
      return 0
    } if (d.name == "World-Journal" && d.crime == "Route") {
      return 0
    } if (d.name == "World-Journal" && d.crime == "25-urine-women") {
      return 0
    } if (d.name == "World-Journal" && d.crime == "37-Hou") {
      return 0
    } if (d.name == "World-Journal" && d.crime == "61-male") {
      return 0
    } if (d.name == "World-Journal" && d.crime == "68-male") {
      return 0
    } if (d.name == "World-Journal" && d.crime == "54-women-I'm here to mess with Asians") {
      return 0
    } if (d.name == "World-Journal" && d.crime == "Lower East Side protesters-police-released") {
      return 0
    } if (d.name == "World-Journal" && d.crime == "36-stabbed-debatable-Feb") {
      return 0
    } if (d.name == "World-Journal" && d.crime == "walk-dog") {
      return 0
    } if (d.name == "World-Journal" && d.crime == "Korean-blog") {
      return 0
    } if (d.name == "World-Journal" && d.crime == "6-Chinese-killChinese-nazi") {
      return 0
    } if (d.name == "World-Journal" && d.crime == "83-Korean") {
      return 0
    } if (d.name == "World-Journal" && d.crime == "25-mother-and-son") {
      return 0
    } if (d.name == "World-Journal" && d.crime == "56-Zhang Mingshun") {
      return 0
    } if (d.name == "World-Journal" && d.crime == "Kill Chinks-on-subway") {
      return 0
    } if (d.name == "World-Journal" && d.crime == "gym-manager") {
      return 0
    } if (d.name == "World-Journal" && d.crime == "Kill Chinks-mask-on-street") {
      return 50
    } if (d.name == "World-Journal" && d.crime == "Lower East Side protesters-police-released") {
      return 50
    } if (d.name == "World-Journal" && d.crime == "Long Island-female-attacked") {
      return 50
    } if (d.name == "World-Journal" && d.crime == "13-teen") {
      return 50
    } if (d.name == "World-Journal" && d.crime == "Harlem man-police-mentioned") {
      return 50
    }
  }
  function forceYtwo(d) {
    if (d.name == "NYPD" && d.crime == "Phillipine-women") {
      return 0
    }
    if (d.name == "NYPD" && d.crime == "gym-manager") {
      return 0
    }

    if (d.name == "NYPD" && d.crime == "37-female") {
      return 0
    }
    if (d.name == "NYPD" && d.crime == "Lower East Side protesters-police-released") {
      return 0
    }
    if (d.name == "NYPD" && d.crime == "gym-manager") {
      return 0
    }
    if (d.name == "NYPD" && d.crime == "37-Hou") {
      return 0
    }
    if (d.name == "NYPD" && d.crime == "Harlem man-police-mentioned") {
      return 0
    }
    if (d.name == "NYPD" && d.crime == "68-male") {
      return 0
    }
    if (d.name == "NYPD" && d.crime == "unclear") {
      return 0
    }
    if (d.name == "New-York-Times" && d.crime == "Phillipine-women") {
      return 100
    }
    if (d.name == "New-York-Times" && d.crime == "36-stabbed-debatable-Feb") {
      return 100
    }
    if (d.name == "New-York-Times" && d.crime == "52-women-attacked-by-white-Feb") {
      return 100
    }
    if (d.name == "New-York-Times" && d.crime == "37-Hou") {
      return 100
    }
    if (d.name == "New-York-Times" && d.crime == "23-korean-women-Feb") {
      return 100
    }
    if (d.name == "New-York-Times" && d.crime == "23-korean-women-Feb") {
      return 100
    }
    if (d.name == "World-Journal" && d.crime == "Phillipine-women") {
      return 300
    }
    if (d.name == "World-Journal" && d.crime == "Asian-male-subway-lockjaw") {
      return 300
    }
    if (d.name == "World-Journal" && d.crime == "laundromat") {
      return 300
    } if (d.name == "World-Journal" && d.crime == "37-female") {
      return 300
    }
    if (d.name == "World-Journal" && d.crime == "65-female-bluehair") {
      return 300
    } if (d.name == "World-Journal" && d.crime == "Ching-Chong-NYCHPD") {
      return 300
    }
    if (d.name == "World-Journal" && d.crime == "65-male") {
      return 300
    } if (d.name == "World-Journal" && d.crime == "couple-helped-by-Tommy-John") {
      return 300
    } if (d.name == "World-Journal" && d.crime == "policebeingattacked") {
      return 300
    } if (d.name == "World-Journal" && d.crime == "Flushing Chinese man-attacked-Feb") {
      return 300
    } if (d.name == "World-Journal" && d.crime == "Route") {
      return 300
    } if (d.name == "World-Journal" && d.crime == "25-urine-women") {
      return 300
    } if (d.name == "World-Journal" && d.crime == "37-Hou") {
      return 300
    } if (d.name == "World-Journal" && d.crime == "61-male") {
      return 300
    } if (d.name == "World-Journal" && d.crime == "68-male") {
      return 300
    } if (d.name == "World-Journal" && d.crime == "54-women-I'm here to mess with Asians") {
      return 300
    } if (d.name == "World-Journal" && d.crime == "Lower East Side protesters-police-released") {
      return 300
    } if (d.name == "World-Journal" && d.crime == "36-stabbed-debatable-Feb") {
      return 300
    } if (d.name == "World-Journal" && d.crime == "walk-dog") {
      return 300
    } if (d.name == "World-Journal" && d.crime == "Korean-blog") {
      return 300
    } if (d.name == "World-Journal" && d.crime == "6-Chinese-killChinese-nazi") {
      return 300
    } if (d.name == "World-Journal" && d.crime == "83-Korean") {
      return 300
    } if (d.name == "World-Journal" && d.crime == "25-mother-and-son") {
      return 300
    } if (d.name == "World-Journal" && d.crime == "56-Zhang Mingshun") {
      return 300
    } if (d.name == "World-Journal" && d.crime == "Kill Chinks-on-subway") {
      return 300
    } if (d.name == "World-Journal" && d.crime == "gym-manager") {
      return 300
    } if (d.name == "World-Journal" && d.crime == "Kill Chinks-mask-on-street") {
      return 300
    } if (d.name == "World-Journal" && d.crime == "Lower East Side protesters-police-released") {
      return 300
    } if (d.name == "World-Journal" && d.crime == "Long Island-female-attacked") {
      return 300
    } if (d.name == "World-Journal" && d.crime == "13-teen") {
      return 300
    } if (d.name == "World-Journal" && d.crime == "Harlem man-police-mentioned") {
      return 300
    }
  }


  function updateViz() {

    let elements = elementGroup.selectAll(".datapoint").data(incomingData);
    let enteringElements = elements.enter();
    let exitingElements = elements.exit();

    xAxisGroup.attr("opacity", 1)
    let datagroups = enteringElements.append("g")
      .attr("fill", colorone)
      .attr("class", "datagroup")
      .attr("transform", (d, i) => {
        let x = xScale(timeParseFunction(d.time));
        let y = Math.random() * 300 - 600;
        return "translate(" + x + "," + y + ")"
      }
      )
    datagroups.append("circle")
      .attr("r", 5)
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("fill", colorone)

    let simulation = d3.forceSimulation(incomingData)
      .force('forceX', d3.forceX(forceXone))
      .force('forceY', d3.forceY(forceYone))
      .force("collide", d3.forceCollide(10))
      .on('tick', stimulationRan)
      ;
    function stimulationRan() {

      elements.selectAll(".datagroup")
        .attr("transform", (d, i) => {

          return "translate(" + d.x + "," + d.y + ")"
        })
    }

  }




  updateViz();


  enterView({
    selector: '.partOne .stepOne',
    enter: function (el) {
      console.log('a special element entered');

      let simulation = d3.forceSimulation(incomingData)
        .force('forceX', d3.forceX(forceXone))
        .force('forceY', d3.forceY(forceYone))
        .force("collide", d3.forceCollide(10))
        .on('tick', stimulationRan)
        ;
      function stimulationRan() {

        elementGroup.selectAll(".datagroup")
          .transition()
          .duration(1000)
          .attr("transform", (d, i) => {
            return "translate(" + d.x + "," + d.y + ")"
          })
      }
    },
    exit: function (el) {
      // xAxisGroup.attr("opacity", 0)
      elementGroup.selectAll(".datagroup")
        .transition()
        .duration(1000)
        .attr("transform", (d, i) => {
          let x = xScale(timeParseFunction(d.time));
          let y = Math.random() * 300 - 600;
          return "translate(" + x + "," + y + ")"
        })


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
      // console.log('a special element entered');
      let simulation = d3.forceSimulation(incomingData)
        .force('forceX', d3.forceX(forceXtwo))
        .force('forceY', d3.forceY(forceYtwo))
        .force("collide", d3.forceCollide(10))
        .on('tick', stimulationRan)
        ;

      function stimulationRan() {

        d3.selectAll(".datagroup")
          .transition()
          .duration(1000)
          .attr("transform", (d, i) => {

            return "translate(" + d.x + "," + d.y + ")"
          })
      }



    },
    exit: function (el) {
      console.log('a special element exited');
      let simulation = d3.forceSimulation(incomingData)
        .force('forceX', d3.forceX(forceXone))
        .force('forceY', d3.forceY(forceYone))
        .force("collide", d3.forceCollide(10))
        .on('tick', stimulationRan)
        ;
      function stimulationRan() {

        elementGroup.selectAll(".datagroup")
          .transition()
          .duration(1000)
          .attr("transform", (d, i) => {
            return "translate(" + d.x + "," + d.y + ")"
          })
      }
    },
    progress: function (el, progress) {
      console.log("the special element's progress is:", progress);
    },
    offset: 0.5, // enter at middle of viewport
    // once: true, // trigger just once
  });
}

// {
//   "name": "World-Journal",
//   "crime": "Atlanta",
//   "time": "2021-03-21T16:00:00.000Z",
//   "place": "NY",
//   "title": "People take to the streets to shout anti-discrimination messages, and drivers honk their horns in support.",
//   "description": "Hundreds of New Yorkers gathered in Union Square in solidarity with Asians, rallying around Manhattan's Chinese community.\nProtester Shuangye Zhu, 28, holds a sign that reads \"Hate is a virus\" as the crowd reads out the names of the victims of the Atlanta massage and spa shooting.",
//   "link": "https://www.worldjournal.com/wj/story/122060/5335020"
// },
// {
//   "name": "World-Journal",
//   "crime": "Atlanta",
//   "time": "2021-03-20T16:00:00.000Z",
//   "place": "NY",
//   "title": "Thousands of people participate in New York City's anti-hate march, crowding Columbus Park",
//   "description": "In response to the misunderstanding of the Asian community and the frequent hate crimes since the new pneumonia epidemic, \nthe Asian community held a \"March Against Hate\" in Columbus Park in Manhattan on the 21st.",
//   "link": "https://www.worldjournal.com/wj/story/121470/5334193"
// },
// {
//   "name": "World-Journal",
//   "crime": "Atlanta",
//   "time": "2021-03-20T16:00:00.000Z",
//   "place": "NY",
//   "title": "Thousands Rally Against Asian-American Hate Crimes in New York's Union Square",
//   "description": "Thousands of people rallied at Union Square in Manhattan on the 21st to oppose hate crimes against \nAsians and to call on Asians and Africans to unite to fight racial discrimination.",
//   "link": "https://www.worldjournal.com/wj/story/122021/5334194"
// },
// {
//   "name": "World-Journal",
//   "crime": "General",
//   "time": "2021-03-19T16:00:00.000Z",
//   "place": "NY",
//   "title": "In addition to reporting hate crimes to the police, there are many ways to get help",
//   "description": "There are many ways to seek help in the event of a hate crime or racial discrimination, in addition to reporting it to the police.",
//   "link": "https://www.worldjournal.com/wj/story/121382/5331529"
// },