let w = 2400;
let h = 800;

let viz = d3.select('#container').append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "green");

let data = [
    {
        name: "tina",
        age: "67"
    }
]

let studentGroups = viz.selectAll(".studentGroup").data(data).enter()
    .append("g")
    .attr("class", "studentGroup")
    ;

studentGroups.append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 20)
    ;

function positiongroup(d, i) {
    return "translate(200,200)"
}

studentGroups.attr("transform", positiongroup);



