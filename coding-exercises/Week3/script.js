console.log('js loaded');
d3.json("data.json").then(gotData);

let svg = d3.select('#container')
    .append('svg')
    .attr('id', 'viz')
    .style("width", "100%")
    .style("height", 600)
    ;
var lineFunctionone = d3.line()
    .x(function (d) { return d.x; })
    .y(function (d) { return d.y; })
    .curve(d3.curveLinear);

svg.append("rect")
    .attr("rx", 2)
    .attr("ry", 2)
    .attr('x', 17)
    .attr('y', 32)
    .attr('width', 86)
    .attr('height', 76)
    .attr('stroke', '#F2C4CE')
    .attr("stroke-width", 7)
    .style("fill-opacity", 1)
    .attr('fill', '#fcf0e6')
    .style("stroke-dasharray", ("3,3"))

svg.append("rect")
    .attr("rx", 2)
    .attr("ry", 2)
    .attr('x', 130)
    .attr('y', 32)
    .attr('width', 86)
    .attr('height', 76)
    .attr('stroke', '#F2C4CE')
    .attr("stroke-width", 7)
    .style("fill-opacity", 1)
    .attr('fill', '#fcf0e6')
    .style("stroke-dasharray", ("3,2"))
// '#fcf0e6'
// #F2C4CE
// svg.append("circle")
//     .attr("cx", 55)
//     .attr("cy", 38)
//     .attr("r", 2.5)
//     .style("stroke-width", 0.3)
//     .style("stroke", "red")
//     .style("fill", "red");

// svg.append('line')
//     .style("stroke", "red")
//     .style("stroke-width", 1)
//     .attr("x1", 49.5)
//     .attr("y1", 34)
//     .attr("x2", 52)
//     .attr("y2", 33.5);

// svg.append('line')
//     .style("stroke", "red")
//     .style("stroke-width", 1)
//     .attr("x1", 55)
//     .attr("y1", 39)
//     .attr("x2", 54)
//     .attr("y2", 36);

//I tried with data
var series = [
    [{ weather: 44, value: 35 }, { weather: 50, value: 38 }, { weather: 50, value: 40 }],
    [{ weather: 42, value: 47 }, { weather: 49, value: 46 }, { weather: 49, value: 44 }],
    [{ weather: 49, value: 56 }, { weather: 52, value: 49 }, { weather: 54, value: 50 }],
    [{ weather: 62, value: 56 }, { weather: 60, value: 49 }, { weather: 58, value: 50 }],
    [{ weather: 65, value: 35 }, { weather: 61, value: 41 }, { weather: 59, value: 40 }]
];
var line = d3.line()

    .x(function (d) { return d.weather; })
    .y(function (d) { return d.value; })
    .curve(d3.curveBasis);

svg.selectAll(".line")
    .data(series)
    .enter().append("path")
    .attr("class", "line")
    .attr("d", line)
    .attr("fill", "red");

var lineData = [
    { "x": 20, "y": 100 },
    { "x": 23, "y": 95 },
    { "x": 25, "y": 96 },
    { "x": 39, "y": 88 },
    { "x": 40, "y": 93 },
    { "x": 52, "y": 80 },
    { "x": 55, "y": 82 },
    { "x": 66, "y": 69 },
    { "x": 72, "y": 82 },
    { "x": 78, "y": 82 },
    { "x": 84, "y": 89 },
    { "x": 83, "y": 89 },
    { "x": 86, "y": 89 },
    { "x": 90, "y": 85 },
    { "x": 98, "y": 100 },
];


var lineGraph = svg.append("path")
    .attr("d", lineFunctionone(lineData))
    .attr("stroke", "#b0aeac")
    .attr("stroke-width", 1.5)
    .style("fill-opacity", 1)
    .attr("fill", "#014034");

// var flower = svg.append("path")
//     .attr("d", "M20,0 C70,40 70,70 40,100 L20,85 L0,100 C-30,70 -30,40 20,0")
//     .attr("stroke", "#F2F2F2")
//     .attr("stroke-width", 1)
//     .attr("fill", "#014034");



var centerX = 55,
    centerY = 43;
var radius = 8;
var sides = 8;
var coils = 6;
var rotation = 0;
var awayStep = radius / sides;
// How far to rotate around center for each side.
var aroundStep = coils / sides;// 0 to 1 based.
// Convert aroundStep to radians.
var aroundRadians = aroundStep * 2 * Math.PI;
// Convert rotation to radians.
rotation *= 2 * Math.PI;
var new_time = [];
for (var i = 1; i <= sides * 1; i++) {
    // How far away from center
    var away = i * awayStep * 1.1;

    // How far around the center.
    var around = i * aroundRadians + rotation;

    // Convert 'around' and 'away' to X and Y.
    var x = centerX + Math.cos(around) * away;
    var y = centerY + Math.sin(around) * away;

    new_time.push({ x: x, y: y });
}

console.log(new_time);

var lineFunctiontwo = d3.line()
    .x(function (d) { return d.x; })
    .y(function (d) { return d.y; })
    .curve(d3.curveBasis);


svg.append("path")
    .attr("d", lineFunctiontwo(new_time))
    .attr("stroke", "red")
    .attr("stroke-width", 1)
    .attr("fill", "none");


// var circles = svg.selectAll("circle")
//     .data(new_time)
//     .enter()
//     .append("circle")
//     .attr("cx", function (d) { return d.x; })
//     .attr("cy", function (d) { return d.y; })
//     .attr("r", 2);

var flowerone = svg.append("path")
    .attr("d", "M175,70 C185,75 185,85 177,90 L175,88 L173,90 C165,85 165,75 175,70")

    .attr("stroke", "#F2F2F2")
    .attr("stroke-width", 1)
    .attr("fill", "#F2C4CE");

var flowertwo = svg.append("path")
    .attr("d", "M175,70 C182,64 192,64 196.5,74 L193,76 L195,78 C190,83 180,83 175,70")
    .attr("stroke", "#F2F2F2")
    .attr("stroke-width", 1)
    .attr("fill", "#F2C4CE");

var flowertwo = svg.append("path")
    .attr("d", "M175,70 C168,64 158,64 153.5,74 L157,76 L155.5,78 C160,83 170,83 175,70")
    .attr("stroke", "#F2F2F2")
    .attr("stroke-width", 1)
    .attr("fill", "#F2C4CE");

var flowertwo = svg.append("path")
    .attr("d", "M175,70 C175,52 170,52 162.5,50 L162,55 L156.5,55 C160,70 170,70 175,70")
    .attr("stroke", "#F2F2F2")
    .attr("stroke-width", 1)
    .attr("fill", "#F2C4CE");

var flowertwo = svg.append("path")
    .attr("d", "M175,70 C175,52 180,52 187.5,50 L190,55 L194.5,55 C190,70 180,70 175,70")
    .attr("stroke", "#F2F2F2")
    .attr("stroke-width", 1)
    .attr("fill", "#F2C4CE");


function color(datapoint) {
    if (datapoint.where == 'White') {
        return 240;
    }
    if (datapoint.where == 'Pink') {
        return 350;
    }
    if (datapoint.where == 'Grey') {
        return 460;
    }
}

function howLong(datapoint) {
    if (datapoint.howLong == '4') {
        return 1;
    }
    if (datapoint.howLong == '5') {
        return 3;
    }
    if (datapoint.howLong == '6') {
        return 10;
    }
}
function mood(datapoint) {
    if (datapoint.mood == 'Worry') {
        return 'black';
    }
    if (datapoint.mood == 'Happy') {
        return 'black';
    }
    if (datapoint.mood == 'no-purpose') {
        return 'black';
    }
    if (datapoint.mood == 'No') {
        return '#FFFFFF';
    }
}

function gotData(newdata) {   // this function expects to be passed data
    console.log(newdata);   // print it to the console to verify

    svg.selectAll('rect').data(newdata).enter()
        .append("rect")
        .attr("x", color)
        .attr("y", 32)
        .attr("width", 86)
        .attr("height", 76)
        .attr('stroke', "#FFFFFF")
        .attr('stroke', '#F2C4CE')
        .attr("stroke-width", 7)
        .style("fill-opacity", 1)
        .attr('fill', mood)
        .style("stroke-dasharray", ("3", howLong))



}
