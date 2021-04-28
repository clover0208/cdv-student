let w = 600;
let h = 400;

let viz = d3.select("vizContainer").append("svg")
	.attr("width", w)
	.attr("height", h)
	.attr("class", "viz")
	.style("background-color", "black")
	;

let myData = [
	[50, 50, 50]
]


let xScale = d3.scaleLinear().domain([0, 100]).range([0, w]);
let yScale = d3.scaleLinear().domain([0, 100]).range([0, h]);
let rScale = d3.scaleLinear().domain([0, 100]).range([10, h / 2]);

let graphGroup = viz.append("g").attr("class", "graphGroup")

function updateGraph() {
	let elements = graphGroup.selectAll(".datapoint").data(myData)
	let enteringElements = elements.enter();
	let exitingElements = elements.exit();
	enteringElements.append("circle")
		.attr("class", "datapoint")
		.attr("cx", function (d, i) {
			let x = d[0];
			return xScale(x)
		})
		.attr("cy", function (d, i) {
			let y = d[1];
			return yScale(y)
		})
		.attr("r", function (d, i) {
			let y = d[2];
			return rScale(r)
		})
		.attr("fill", "white")
		;
	elements
		.transition()
		.attr("cx", function (d, i) {
			let x = d[0];
			return xScale(x)
		})
		.attr("cy", function (d, i) {
			let y = d[1];
			return yScale(y)
		})
		.attr("r", function (d, i) {
			let y = d[2];
			return rScale(r)
		})
}

updateGraph();

d3.select("#buttonL").on("click", function () {
	myData[0][0] = 0
	updateGraph();
})
d3.select("#buttonR").on("click", function () {
	myData[0][0] = 100
	updateGraph();
})
d3.select("#buttonS").on("click", function () {
	myData[0][2] = 0
	updateGraph();
})
d3.select("#buttonS").on("click", function () {
	myData[0][2] = 100
	updateGraph();
})


enterView({
	selector: 'recolor',
	enter: function (el) {
		myData[0][3] = "lightblue"
		updateGraph();
	},
	exit: function (el) {
		myData[0][3] = "lightyellow"
		updateGraph();
	},

});
