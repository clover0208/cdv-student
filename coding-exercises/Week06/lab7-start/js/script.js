let w = 800;
let h = 500;
let padding = 50;

let viz = d3.select("#container")
    .append("svg")
    .style("width", w)
    .style("height", h)
    ;

let allNames = data.map(function (d) { return d.key });

let xScale = d3.scaleBand()
    .domain(allNames)
    .range([padding, w - padding])
    .paddingInner(0.1)
    ;

let xAxis = d3.axisBottom(xScale)

xAxis.tickFormat(d => { return data.filter(dd => dd.key == d)[0].name; });

let xAxisGroup = viz.append("g").classed("xAxis", true);

xAxisGroup.call(xAxis);

xAxisGroup.selectAll("text").attr("font-size", 24).attr("y", 9);

xAxisGroup.selectAll("line").remove();

xAxisGroup.attr("transform", "translate(0," + (h - padding) + ")")

// Y SCALE
// we will not show a y axis in this graph, but still need a scale
// to make sure our bars have heights that fit the window. It's
// familiar linear scale.
let yMax = d3.max(data, function (d) { return d.value });
// I decided not to use the minimum value of the dataset,
// because otherwise the smallest value's bar would always be 0 pixels
// high and therefore invisible.
yDomain = [0, yMax];
// "hey d3 i need a linear scale please. yeah! I want to supply a value
// to it that is between 0 and yMax and want one back that fits between
// my graph's paddings. Cheers!"
let yScale = d3.scaleLinear().domain(yDomain).range([0, h - padding * 2]);

// the ACTUAL GRAPH
// before we get to the actual graph, we make a group element into which to
// put all visual graph things:
let graphGroup = viz.append("g").classed("graphGroup", true);
// btw, this:
// .classed("graphGroup", true);
// is almost equivalent to
// .attr("class", "graphGroup");
// but slightly more advanced. you can find a description here:
// https://github.com/d3/d3-selection#selection_classed

// now comes the interesting part, WATCH OUT! i'll go slow
// we have the page (with nothing on it) and we have data
// we *toss* it both to D3 and let it do its evaluation about
// how many elements need to enter/update/exit.
function assignkeys(d) {
    return d.key;
}
let elementsForPage = graphGroup.selectAll(".datapoint").data(data);
// note, we do not use ".enter()" for now. let's have a close look
// at just this for now
// as we have learned, D3 did some kind of calculation here, some weighing
// of what is on the page already and what needs to go there.
// have a close look at this console.log:
//console.log("D3's assessment of whats needed on the page:", elementsForPage);
// note the reference to enter, exit and group in the object
// those three are all the possible selections.
// they comprises elements that are about to enter (in this case 10),
// elements that are on the page already and will be updated and elements
// that don't have any associated datapoint anymore and need to exit.
// out of this, we can pick those three subsections and decide
// precisely what to do with the, e.g. how should new elements enter?
// should they come from the bottom? slowly fade in? - ours to decide
// how should updating elements change their size, color, position etc.?
// and the exiting ones, rather than just disappearing, how about they
// fade out?

// out of this, we will now extract the sub selections,
// the entering elements and the exiting ones:
let enteringElements = elementsForPage.enter();
let exitingElements = elementsForPage.exit();
// and again, look closely:
//console.log("enteringElements", enteringElements);
//console.log("exitingElements", exitingElements);
// note how we now only deal with a "_groups" thing,
// in the enteringElements object, the "_groups" array holds the
// empty placeholder elements for the elements that are about to enter
// equally, in the exitingElements, the "_groups" array holds the elements
// that ARE on the page, but must leave because no datapoint is their to
// match them.
// here is how i see it, we start with ALL the elements
// that we are dealing with. from that, we extract the entering ones (... and
// do something with them), we also extract the exiting one (...and treat those
// differently, too) and then? What are we left with? the UPDATING elements!
// they are in the "_groups" array we saw in the very beginning inside
// "elementsForPage". For now, hold the thought that we are dealing
// with three subsections of elements: entering ones, exiting ones, and updating ones.
// hopefully this will get clearer as we go on.

// as you can see, there is nothing on the page yet. And the previous console.logs
// confirm that there is no elements updating, none are leaving, we only have things enter.
// let's deal with them right now:
// make a group for each datapoint
let enteringDataGroups = enteringElements.append("g").classed("datapoint", true);
// position the group along the x axis (check the inspector tool to see
// what we are doing):
enteringDataGroups.attr("transform", function (d, i) {
    return "translate(" + xScale(d.key) + "," + (h - padding) + ")"
});
// then append rectangles to them and position/size them:
enteringDataGroups
    .append("rect")
    .attr("width", function () {
        // the scaleBand we are using
        // allows us to as how thick each band is:
        return xScale.bandwidth();
    })
    .attr("height", function (d, i) {
        // the idea is that we make the bar
        // as high as dictated by the value...
        return yScale(d.value);
    })
    .attr("y", function (d, i) {
        // ...and then push the bar up since it
        // is drawn from top to bottom
        return -yScale(d.value);
    })
    .attr("fill", "black")
    ;

// we add new code below:
//console.log("new data", data)

// before we get back to dealing with the bars, we need to update
// out scales (and axis) to match the new data.
// scales are function we got custom made by D3.
// after using them for a bit, we can adjust their inner workings
// here we adjust the xScale we already defined and used. all
// we want to change about it is the domain.
// we get the updated list of keys for our data set that has changed:
allNames = data.map(function (d) { return d.key });
// and adjust the domain of xScale:
xScale.domain(allNames);
// done, the xScale is "fixed" and ready to help us to position elements
// for our new data

// as you can see, we only adjust selectively the bits that depend
// on our data. the same is true for the axis:
xAxis = d3.axisBottom(xScale); //we adjust this because it uses the new xScale
xAxis.tickFormat(d => { return data.filter(dd => dd.key == d)[0].name; }); // we adjust this because it uses the new data
xAxisGroup.call(xAxis).selectAll("text").attr("font-size", 18); // we adjust this to bring the new axis onto the page

// y scale...
yMax = d3.max(data, function (d) { return d.value });
yDomain = [0, yMax + yMax * 0.1];
yScale.domain(yDomain);

// do you see how the axis adjusts to the new data at this point? you can animate
// this transition inside the statement where you use ".call(xAxis)"...

xAxisGroup.transition().call(xAxis).selectAll("text").attr("font-size", 18); // we adjust this to bring the new axis onto the page

// we add new code below:
//console.log("new data", data)
// what we essentially do now is the following:
// each element on the page is associated with one datapoint
// of the OLD data array. With our new data, we will now overwrite
// those associations. let's start by asking D3 to assess what's up:
elementsForPage = graphGroup.selectAll(".datapoint").data(data);
// note, we don't need "let" because the variable elementsForPage already exists
//console.log(elementsForPage);
// look at this, it's slightly unexpected at first, but fold out
// the enter, exit and _group ("update") subsections:
// you will see that enter has.... ONE element! it's the one we
// just added to the array!!
// exit has zero elements, no elements is leaving, because we reuse
// all the elements that are on the page and...
// ...update them! as is seen in the _group ("update") array where there is 10 elements (the ones that are on the page already)
// in other words: "10 elements are on the page, we would like to show 11 (amount of points in our data). therefore we reuse the 10 (update them) and add one more (it enters)".
// WOW
// so cool :D
// again, we can now exactly define, how each subgroup should
// behave

// in the end, the incoming bar will appear on the right side. for that
// to look great, let's move over the updating elements first.
// to recap, we extract the entering elments like so:
enteringElements = elementsForPage.enter();
// and the exiting ones like so:
exitingElements = elementsForPage.exit();
// note: i don't use "let" because this variables already exists
// ...after extracting those subgroups, what's left in elementsForPage
// are the elements that update.
// let's try it:
elementsForPage.attr("transform", function (d, i) {
    return "translate(" + xScale(d.key) + "," + (h - padding) + ")"
});
// try it
// oh my, it works. You can animate the transition in the same way as you did
// with the x axis before

elementsForPage.transition().duration(1000).attr("transform", function (d, i) {
    return "translate(" + xScale(d.key) + "," + (h - padding) + ")"
});

// we aren't done with the updating section yet
// the width needs to adjust, and even the height (as incoming data points MIGHT
// set a new maximum value and every other bar goes down a little)
elementsForPage.select("rect")
    .transition()
    .delay(1000)
    .duration(200)
    .attr("width", function () {
        return xScale.bandwidth();
    })
    .attr("y", function (d, i) {
        return -yScale(d.value);
    })
    .attr("height", function (d, i) {
        return yScale(d.value);
    })
    ;
// first note, I added a new feature, the .delay() delays the transition
// second, again, we only update the things that are impacted by the new data situation

// lastly, we can deal with the elements that enter
// we already extracted the enteringElements from elementsForPage above
// what do we want to do with incoming elements?
// much the same we always do
// we append a group to the empty placeholder:
let incomingDataGroups = enteringElements
    .append("g")
    .classed("datapoint", true)
    ;
// position the groups:
incomingDataGroups.attr("transform", function (d, i) {
    return "translate(" + xScale(d.key) + "," + (h - padding) + ")"
});
// and append rectangles
incomingDataGroups
    .append("rect")
    .attr("width", function () {
        return xScale.bandwidth();
    })
    .attr("y", function (d, i) {
        return -yScale(d.value);
    })
    .attr("height", function (d, i) {
        return yScale(d.value);
    })
    .attr("fill", "black")
    ;
// works, but looks boring! let's transition from no height
// at all to the actual height and from a different color towards
// black.

incomingDataGroups
    .append("rect")
    .attr("y", function (d, i) {
        return 0;
    })
    .attr("height", function (d, i) {
        return 0;
    })
    .attr("width", function () {
        return xScale.bandwidth();
    })
    .attr("fill", "#F27294")
    .transition()
    .delay(1200)
    .duration(2000)
    .attr("y", function (d, i) {
        return -yScale(d.value);
    })
    .attr("height", function (d, i) {
        return yScale(d.value);
    })
    .attr("fill", "black")
    ;



//step01
function add() {
    addDatapoints(1);
    elementsForPage = graphGroup.selectAll(".datapoint").data(data, assignkeys);
    enteringElements = elementsForPage.enter();

    allNames = data.map(function (d) { return d.key });
    xScale.domain(allNames);

    xAxis = d3.axisBottom(xScale);
    xAxis.tickFormat(d => { return data.filter(dd => dd.key == d)[0].name; });
    xAxisGroup.selectAll("line").remove();

    yMax = d3.max(data, function (d) { return d.value });
    yDomain = [0, yMax + yMax * 0.1];
    yScale.domain(yDomain);

    xAxisGroup.transition().call(xAxis).selectAll("text").attr("font-size", 18);
    xAxisGroup.selectAll("line").remove();

    elementsForPage.transition().duration(50).attr("transform", function (d, i) {
        return "translate(" + xScale(d.key) + "," + (h - padding) + ")"
    });

    elementsForPage.select("rect")
        .transition()
        .delay(100)
        .duration(20)
        .attr("width", function () {
            return xScale.bandwidth();
        })
        .attr("y", function (d, i) {
            return -yScale(d.value);
        })
        .attr("height", function (d, i) {
            return yScale(d.value);
        })
        ;

    // we append a group to the empty placeholder:
    let incomingDataGroups = enteringElements
        .append("g")
        .classed("datapoint", true)
        ;
    // position the groups:
    incomingDataGroups.attr("transform", function (d, i) {
        return "translate(" + xScale(d.key) + "," + (h - padding) + ")"
    });
    // and append rectangles
    incomingDataGroups
        .append("rect")
        .attr("width", function () {
            return xScale.bandwidth();
        })
        .attr("y", function (d, i) {
            return 0;
        })
        .attr("height", function (d, i) {
            return 0;
        })
        .transition()
        .delay(10)
        .attr("fill", "blue")
        .attr("width", function () {
            return xScale.bandwidth();
        })
        .attr("y", function (d, i) {
            return -yScale(d.value);
        })
        .attr("height", function (d, i) {
            return yScale(d.value);
        })
        .transition()
        .attr("fill", "black")
        ;
}
document.getElementById("buttonA").addEventListener("click", add);



//step02
function remove() {
    removeDatapoints(1);
    elementsForPage = graphGroup.selectAll(".datapoint").data(data);
    exitingElements = elementsForPage.exit();

    allNames = data.map(function (d) { return d.key });
    xScale.domain(allNames);

    xAxis = d3.axisBottom(xScale);
    xAxis.tickFormat(d => { return data.filter(dd => dd.key == d)[0].name; });
    xAxisGroup.selectAll("line").remove();

    yMax = d3.max(data, function (d) { return d.value });
    yDomain = [0, yMax + yMax * 0.1];
    yScale.domain(yDomain);

    xAxisGroup.transition().delay(2000).duration(500).call(xAxis).selectAll("text").attr("font-size", 18);

    exitingElements.select("rect")
        .attr("fill", "red")
        .transition()
        .delay(1500)
        .duration(100)
        .attr("y", function (d, i) {
            return 0;
        })
        .attr("height", function (d, i) {
            return 0;
        })
        .transition()
        .attr("fill", "black")
        ;

    exitingElements.transition().remove();

    elementsForPage.transition().delay(10).duration(500).attr("transform", function (d, i) {
        return "translate(" + xScale(d.key) + "," + (h - padding) + ")"
    });


    // we append a group to the empty placeholder:

    elementsForPage
        .select("rect")
        .transition()
        .duration(50)
        // .delay(50)
        .attr("width", function () {
            return xScale.bandwidth();
        })
        .attr("y", function (d, i) {
            return -yScale(d.value);
        })
        .attr("height", function (d, i) {
            return yScale(d.value);
        })
        ;

}
document.getElementById("buttonB").addEventListener("click", remove);



//step03
function removeAndAdd() {
    removeAndAddDatapoints(1, 1);
    elementsForPage = graphGroup.selectAll(".datapoint").data(data, function (d) {
        return d.name;
    });
    enteringElements = elementsForPage.enter();
    exitingElements = elementsForPage.exit();

    exitingElements.select("rect")
        .attr("fill", "yellow")
        .transition()
        .duration(50)
        .delay(50)
        .attr("y", function (d, i) {
            return 0;
        })
        .attr("height", function (d, i) {
            return 0;
        })
        .transition()
        .attr("fill", "black")
        ;

    exitingElements.transition().delay(1000).remove();

    allNames = data.map(function (d) { return d.key });
    xScale.domain(allNames);

    xAxis = d3.axisBottom(xScale);
    xAxis.tickFormat(d => { return data.filter(dd => dd.key == d)[0].name; });
    xAxisGroup.selectAll("line").remove();

    yMax = d3.max(data, function (d) { return Math.floor(Math.random() * d.value) });
    yDomain = [0, yMax + yMax * 0.1];
    yScale.domain(yDomain);

    xAxisGroup.transition().delay(0).duration(500).call(xAxis).selectAll("text").attr("font-size", 18);
    xAxisGroup.selectAll("line").remove();

    elementsForPage.transition().delay(0).duration(500).attr("transform", function (d, i) {
        return "translate(" + xScale(d.key) + "," + (h - padding) + ")"
    });

    elementsForPage
        .select("rect")
        .transition()
        .duration(50)
        .delay(50)
        .attr("width", function () {
            return xScale.bandwidth();
        })
        .attr("y", function (d, i) {
            return -yScale(d.value);
        })
        .attr("height", function (d, i) {
            return yScale(d.value);
        })
        ;

    let incomingDataGroups = enteringElements
        .append("g")
        .classed("datapoint", true)
        ;
    // position the groups:
    incomingDataGroups.attr("transform", function (d, i) {
        return "translate(" + xScale(d.key) + "," + (h - padding) + ")"
    });

    incomingDataGroups.append("rect")
        .attr("fill", 'green')
        .attr("width", function () {
            return xScale.bandwidth();
        })
        .attr("y", function (d, i) {
            return 0;
        })
        .attr("height", function (d, i) {
            return 0;
        })
        .transition()
        .delay(150)
        .duration(300)
        .attr("width", function () {
            return xScale.bandwidth();
        })
        .attr("y", function (d, i) {
            return -yScale(d.value);
        })
        .attr("height", function (d, i) {
            return yScale(d.value);
        })
        .transition()
        .attr("fill", "black")
        ;
    // we append a group to the empty placeholder:


}
document.getElementById("buttonC").addEventListener("click", removeAndAdd);

















//no problem
function sortData() {
    sortDatapoints();
    elementsForPage = graphGroup.selectAll(".datapoint").data(data, assignkeys);

    allNames = data.map(function (d) { return d.key });
    xScale.domain(allNames);
    xAxis = d3.axisBottom(xScale);

    xAxis.tickFormat(d => { return data.filter(dd => dd.key == d)[0].name; });

    yMax = d3.max(data, function (d) { return d.value });
    yDomain = [0, yMax + yMax * 0.1];
    yScale.domain(yDomain);

    xAxisGroup.transition().delay(2000).call(xAxis).selectAll("text").attr("font-size", 18);
    xAxisGroup.selectAll("line").remove();

    elementsForPage.transition().delay(10).duration(500).attr("transform", function (d, i) {
        return "translate(" + xScale(d.key) + "," + (h - padding) + ")"
    });

}
document.getElementById("buttonD").addEventListener("click", sortData);

function shuffleData() {
    shuffleDatapoints();

    elementsForPage = graphGroup.selectAll(".datapoint").data(data, assignkeys);

    allNames = data.map(function (d) { return d.key });
    xScale.domain(allNames);
    xAxis = d3.axisBottom(xScale);

    xAxis.tickFormat(d => { return data.filter(dd => dd.key == d)[0].name; });
    xAxisGroup.selectAll("line").remove();

    yMax = d3.max(data, function (d) { return d.value });
    yDomain = [0, yMax + yMax * 0.1];
    yScale.domain(yDomain);

    xAxisGroup.transition().delay(2000).call(xAxis).selectAll("text").attr("font-size", 18);
    xAxisGroup.selectAll("line").remove();

    elementsForPage.transition().delay(10).duration(500).attr("transform", function (d, i) {
        return "translate(" + xScale(d.key) + "," + (h - padding) + ")"
    });


    elementsForPage
        .select("rect")
        .transition()
        .duration(50)
        // .delay(50)
        .attr("width", function () {
            return xScale.bandwidth();
        })
        .attr("y", function (d, i) {
            return -yScale(d.value);
        })
        .attr("height", function (d, i) {
            return yScale(d.value);
        })
        ;

}
document.getElementById("buttonE").addEventListener("click", shuffleData);
//no problem

// function move() {
//     emoji = graphGroup.selectAll(".datapoint").data(data, function (d) {
//         return d.name;
//     })

//     yMax = d3.max(data, function (d) { return d.value });
//     yDomain = [0, yMax + yMax * 0.1];
//     yScale.domain(yDomain);
//     emoji.transition()
//         .duration(900)
//         .attr("y", function (d, i) {
//             return -yScale(100);
//         })
//         .attr("height", function (d, i) {
//             return yScale(100);
//         })
//         .ease(d3.easeElastic);
// }
function move() {
    elementsForPage = graphGroup.selectAll(".datapoint").data(data);
    elementsForPage.select('rect')
        .attr("fill", "blue")
        ;
}


document.getElementById("buttonF").addEventListener("click", move);