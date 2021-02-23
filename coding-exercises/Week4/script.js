let viz = d3.select('#container')
    .append('svg')
    .attr('id', 'viz')
    .attr('width', 2400)
    .attr('height', 820)
    ;

d3.json('data.json').then(gotData);

function curtaincolor(datapoint) {
    if (datapoint.curtain == 'White-blue') {
        return 'white'
    }
    if (datapoint.curtain == 'Yellow') {
        return '#ffffdd'
    }
    if (datapoint.curtain == 'Pink') {
        return '#fee9f2'
    }
}

function moodcolor(datapoint) {
    if (datapoint.curtain == 'White-blue') {
        return 'rgb(155,144,194)'
    }
    if (datapoint.curtain == 'Yellow') {
        return '#ffffdd'
    }
    if (datapoint.curtain == 'Pink') {
        return '#fee9f2'
    }
}

function specialcurtain(datapoint) {
    if (datapoint.curtain == 'White-blue') {
        return 'M 0 0 L 5.5 5.5 L 0 25 z'
    }
}

function sensorshape(datapoint) {
    if (datapoint.sensor == 'eye') {
        return 'M 0 50 L 25 25 L 50 50 z'
    }
    if (datapoint.sensor == 'ear') {
        return 'M 50 0 L 25 25 L 50 50 z'
    }
    if (datapoint.sensor == 'mind') {
        return 'M 0 0 L 25 25 L 50 0 z'
    }
    if (datapoint.sensor == 'ear-mind') {
        return 'M 50 0 L 25 25 L 50 50 z M 0 0 L 25 25 L 50 0 z'
    }
    if (datapoint.sensor == 'eye-ear') {
        return 'M 0 50 L 25 25 L 50 50 z M 50 0 L 25 25 L 50 50 z'
    }
    if (datapoint.sensor == 'eye-mind') {
        return 'M 0 50 L 25 25 L 50 50 z M 0 0 L 25 25 L 50 0 z'
    }

}
function sensorcolor(datapoint) {
    if (datapoint.sensor == 'eye') {
        return '#d2d8d8'
    }
    if (datapoint.sensor == 'ear') {
        return '#e1f3ff'
    }
    if (datapoint.sensor == 'mind') {
        return '#e2d4ed'
    }
    if (datapoint.sensor == 'ear-mind') {
        return '#d8efd9'
    }
    if (datapoint.sensor == 'eye-ear') {
        return '#b89ea0'
    }
    if (datapoint.sensor == 'eye-mind') {
        return '#ffe1cc'
    }
    if (datapoint.sensor == 'ear-eye-mind') {
        return 'transparant'
    }
}

function weathersuncolor(datapoint) {
    if (datapoint.weather == 'Good-8') {
        return 'red'
    }
    if (datapoint.weather == 'Good-9') {
        return 'red'
    }
    if (datapoint.weather == 'Good-10') {
        return 'red'
    }
    else {
        return 'transparent'
    }
}

function weatherbadcolor(datapoint) {
    if (datapoint.weather == 'Bad-5') {
        return '#b6c7e1'
    }
    if (datapoint.weather == 'Bad-4') {
        return '#b6c7e1'
    }
    if (datapoint.weather == 'Bad-9') {
        return '#b6c7e1'
    }
    else {
        return 'transparent'
    }
}
function weatherdarkcolor(datapoint) {
    if (datapoint.weather == 'Dark') {
        return 'yellow'
    }
    else {
        return 'transparent'
    }
}




function gotData(incomingData) {

    let datagroups = viz.selectAll('.datagroup').data(incomingData).enter()
        .append('g')
        .attr('class', 'datagroup')
        ;



    // function positionGroup(d, i) {

    //     let x = Math.random() * 600;
    //     let y = Math.random() * 600;
    //     // let y = standorseat(d.standorseat);

    //     // console.log('standorseat' + x);
    //     return 'translate(' + x + ',' + y + ')';
    // }

    function yposition(d, i) {
        if (i >= 0 && i < 15) {
            return 150;
        } if (i > 14 && i < 30) {
            return 300;
        } if (i > 29 && i < 45) {
            return 450;
        }
        if (i > 44 && i < 60) {
            return 600;
        }
        else {
            return 750;
        }
    }
    function xposition(d, i) {
        if (i >= 0 && i < 15) {
            return 50 * 1.5 * i + 200;
        } if (i > 14 && i < 30) {
            return 50 * 1.5 * i - 925;
        }
        if (i > 29 && i < 45) {
            return 50 * 1.5 * i - 2050;
        } if (i > 44 && i < 60) {
            return 50 * 1.5 * i - 3175;
        } if (i > 59 && i < 64) {
            return 50 * 1.5 * i - 4300;
        }
    }
    function groupposition(d, i) {
        let x = xposition(d, i);
        let y = yposition(d, i);
        return "translate(" + x + "," + y + ")";
    }

    datagroups.attr('transform', groupposition)



    let curtain = datagroups.append('path')
        .attr("d", "M 0 0 L 25 25 L 0 25 z")
        .attr('fill', curtaincolor);

    let specialcurta = datagroups.append('path')
        .attr("d", specialcurtain)
        .attr('fill', "#afbfdc");

    let mood = datagroups.append('path')
        .attr("d", "M 0 25 L 25 25 L 0 50 z")
        .attr('fill', moodcolor);

    let window = datagroups.append('rect')
        .attr("x", 0)
        .attr("y", 0)
        .attr('width', 50)
        .attr('height', 50)
        .attr('fill', "transparent");
    // .attr('stroke', "black");

    let sensor = datagroups.append('path')
        .attr("d", sensorshape)
        .attr('fill', sensorcolor);

    let weathersun = datagroups.append('circle')
        .attr("cx", 40)
        .attr("cy", -10)
        .attr("r", 2.5)
        .attr('fill', weathersuncolor)
        .style("stroke", weathersuncolor)
        .style("stroke-width", 1);

    let weatherrain = datagroups.append('path')
        .attr("d", "M40,-10 C41,-8 46,-2 40,-0.5 34,-2 39,-8 40,-10")
        .attr('fill', weatherbadcolor)
        .style("stroke", "transparent")
        .style("stroke-width", 1);

    let weatherdark = datagroups.append('path')
        .attr("d", "M40,-11 C42,-10 45,-2 36,-0.5 36,-1 41,-2 40,-11")
        .attr('fill', weatherdarkcolor)
        .style("stroke", weatherdarkcolor)
        .style("stroke-width", 1);

}