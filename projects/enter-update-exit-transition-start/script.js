const intrototitle = document.getElementById('intrototitle');
const intrototitleInnerHTML = intrototitle.innerHTML
    .split(/<br>\s*/i)
    .map((text, i) => '<p style="animation-delay:' + (400 * i) + 'ms">' + text + '</p>')
    .join('');

intrototitle.innerHTML = intrototitleInnerHTML;

const target = document.getElementById('target');
const targetInnerHTML = target.innerHTML
    .split(/<br>\s*/i)
    .map((text, i) => '<p style="animation-delay:' + (2000 * i) + 'ms">' + text + '</p>')
    .join('');

target.innerHTML = targetInnerHTML;

const introdensity = document.getElementById('introdensity');
const introdensityInnerHTML = introdensity.innerHTML
    .split(/<br>\s*/i)
    .map((text, i) => '<p style="animation-delay:' + (2000 * i + 1000) + 'ms">' + text + '</p>')
    .join('');

introdensity.innerHTML = introdensityInnerHTML;


// const whatsuspecttell = document.getElementById('whatsuspecttell');
// const whatsuspecttellInnerHTML = whatsuspecttell.innerHTML
//     .split(/<br>\s*/i)
//     .map((text, i) => '<p style="animation-delay:' + (2000 * i) + 'ms">' + text + '</p>')
//     .join('');

// whatsuspecttell.innerHTML = whatsuspecttellInnerHTML;

var scrollpos = window.scrollY;

document.addEventListener("scroll", function () { showFunction() });

function showFunction() {

    if (document.documentElement.scrollTop > 763) {
        document.getElementById("intrototitle").style.display = "block";
    } else {
        document.getElementById("intrototitle").style.display = "none";
    }

    if (document.documentElement.scrollTop > 910) {
        document.getElementById("target").style.display = "block";
    } else {
        document.getElementById("target").style.display = "none";
    }


    if (document.documentElement.scrollTop > 1780) {
        document.getElementById("introdensity").style.display = "block";
    } else {
        document.getElementById("introdensity").style.display = "none";
    }

    // if (document.documentElement.scrollTop > 4230) {
    //     document.getElementById("whatsuspecttell").style.display = "block";
    // } else {
    //     document.getElementById("whatsuspecttell").style.display = "none";
    // }

    // if (document.documentElement.scrollTop > 3953) {
    //     document.getElementById("forcegraphstart").style.display = "block";
    // } else {
    //     // document.getElementById("forcegraphstart").style.display = "none";
    // }
    console.log(document.documentElement.scrollTop);
}


//d3 come
// let w = 1000;
// let h = 1000;
let padding = 50;
let yPadding = 180;
let xPadding = 120;
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

function colorone(d, i) {

    if (d.name == "NYPD") {

        return "#ffdab9";

    } else if (d.name == "New-York-Times") {

        return "#fcd5ce";

    } else {
        return "#adadad";
    }
};

let generalViz = d3.select("#generalcontainer")
    .append("svg")
    .style("width", 1000)
    .style("height", 1200)
    .attr("x", 10)
    .attr("y", 10)
    // .style("background", '#BCC5F7')
    .attr("class", "biggeneral")
    ;

let timelineViz = d3.select("#timelinecontainer")
    .append("svg")
    .style("width", 1000)
    .style("height", 800)
    .attr("x", 10)
    .attr("y", 10)
    // .style("background", '#BCC5F7')
    .attr("class", "timelineviz")
    ;




function gotData(incomingData) {
    console.log(incomingData)

    let generalGroups = generalViz.selectAll('.generalgroup').data(incomingData).enter()
        .append("g")
        .attr("class", "generalgroup")
        .attr("id", function (d, i) {
            return d.title
        })
        .attr("cursor", "default")
        ;

    function getGroupPositionzero(d, i) {
        let x = 200;
        let y = 17 * i + 5.5;
        return "translate(" + x + "," + y + ")"
    };
    function getranddomGroupPositionzero(d, i) {
        let x = 200;
        let y = 0;
        return "translate(" + x + "," + y + ")"
    };

    // generalGroups.attr("transform", getranddomGroupPositionzero)
    //     .transition()
    //     .delay(50)
    //     .duration(300)
    //     .attr("transform", getranddomGroupPositionzero)
    //     .attr("opacity", 0)
    //     .transition()
    //     .delay(50)
    //     .duration(300)
    //     // .delay(function(i){return i})
    //     .attr("transform", getGroupPositionzero)
    //     .attr("opacity", 1)
    //     ;

    let generalrects = generalGroups.append('rect')
        .attr("fill", colorone)
        .attrs({
            x: 0,
            y: 0,
            // 'text-anchor': 'middle',
            'width': 100,
            'height': 12,
            'rx': 7,
            'ry': 7,
            // id: function (d) { return d.title }
        })


    let generaltexts = generalGroups.append('text')
        .text(function (d, i) { return d.title; })
        .attr("opacity", 0)
        .attr("x", 1)
        .attr("y", 11.5)
        .attrs({
            'text-anchor': 'left',
            'font-size': '11pt',
            'fill': 'rgb(25,25,25)',
            id: function (d) { return 'text' + d.title }
        })


    generalrects
        .attr('width', function (d) {
            return (document.getElementById('text' + d.title).getBBox().width + 2);
        })
        ;
    generalGroups
        .on("mouseover", function (d, i) {
            d3.select(this).select("rect").transition("selectedTransition").duration(100).attr("fill", "#fff9f9");
            d3.select(this).select("text").transition("selectedTransition").duration(100).attr("opacity", 1);
        })
        .on("mouseout", function (d, i) {
            d3.select(this).select("rect").interrupt("selectedTransition").attr("fill", colorone);
            d3.select(this).select("text").interrupt("selectedTransition").attr("opacity", 0);
        })
        ;

    //interaction
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
        .attr("transform", "translate(700, 50)")
        .append("text")
        .attr("fill", "black")
        .text("When the report first published")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1.6em")
        .attr("opacity", 0.9)

        ;
    elementGroup.append("text")
        .attr("x", -40)
        .attr("y", -50)
        .attr("fill", "black")
        .text("65-women")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1em")

    elementGroup.append("text")
        .attr("x", -60)
        .attr("y", 50)
        .attr("fill", "black")
        .text("Asiangetlockjaw")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1em")

    elementGroup.append("text")
        .attr("x", -40)
        .attr("y", 165)
        .attr("fill", "black")
        .text("37-female")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1em")

    elementGroup.append("text")
        .attr("x", -50)
        .attr("y", 260)
        .attr("fill", "black")
        .text("femalebluehair")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1em")

    elementGroup.append("text")
        .attr("x", -35)
        .attr("y", 360)
        .attr("fill", "black")
        .text("65-male")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1em")
    elementGroup.append("text")
        .attr("x", -70)
        .attr("y", 470)
        .attr("fill", "black")
        .text("36-stabbed-debatable")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1em")
    elementGroup.append("text")
        .attr("x", -45)
        .attr("y", 560)
        .attr("fill", "black")
        .text("Ching-Chong")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1em")

    //第二列

    elementGroup.append("text")
        .attr("x", 200)
        .attr("y", -50)
        .attr("fill", "black")
        .text("ZhangMingshun")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1em")

    elementGroup.append("text")
        .attr("x", 190)
        .attr("y", 50)
        .attr("fill", "black")
        .text("female inLongIsland")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1em")

    elementGroup.append("text")
        .attr("x", 200)
        .attr("y", 165)
        .attr("fill", "black")
        .text("man inHarlem")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1em")

    elementGroup.append("text")
        .attr("x", 200)
        .attr("y", 260)
        .attr("fill", "black")
        .text("policeattacked")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1em")

    elementGroup.append("text")
        .attr("x", 200)
        .attr("y", 360)
        .attr("fill", "black")
        .text("man inFlushing")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1em")
    elementGroup.append("text")
        .attr("x", 225)
        .attr("y", 470)
        .attr("fill", "black")
        .text("37-Hou")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1em")
    elementGroup.append("text")
        .attr("x", 200)
        .attr("y", 560)
        .attr("fill", "black")
        .text("maskonstreet")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1em")



    //第三列
    elementGroup.append("text")
        .attr("x", 470)
        .attr("y", -50)
        .attr("fill", "black")
        .text("walk-dog")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1em")

    elementGroup.append("text")
        .attr("x", 475)
        .attr("y", 50)
        .attr("fill", "black")
        .text("13-teen")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1em")

    elementGroup.append("text")
        .attr("x", 465)
        .attr("y", 165)
        .attr("fill", "black")
        .text("laundromat")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1em")

    elementGroup.append("text")
        .attr("x", 480)
        .attr("y", 260)
        .attr("fill", "black")
        .text("couple")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1em")

    elementGroup.append("text")
        .attr("x", 450)
        .attr("y", 360)
        .attr("fill", "black")
        .text("maskonsubway")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1em")
    elementGroup.append("text")
        .attr("x", 470)
        .attr("y", 470)
        .attr("fill", "black")
        .text("61-male")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1em")
    elementGroup.append("text")
        .attr("x", 470)
        .attr("y", 560)
        .attr("fill", "black")
        .text("unclear")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1em")

    //第四列
    elementGroup.append("text")
        .attr("x", 650)
        .attr("y", -50)
        .attr("fill", "black")
        .text("womenbeurined")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1em")

    elementGroup.append("text")
        .attr("x", 650)
        .attr("y", 50)
        .attr("fill", "black")
        .text("mother-and-son")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1em")

    elementGroup.append("text")
        .attr("x", 660)
        .attr("y", 165)
        .attr("fill", "black")
        .text("52women-Feb")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1em")

    elementGroup.append("text")
        .attr("x", 685)
        .attr("y", 260)
        .attr("fill", "black")
        .text("Route")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1em")

    elementGroup.append("text")
        .attr("x", 660)
        .attr("y", 360)
        .attr("fill", "black")
        .text("gym-manager")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1em")
    elementGroup.append("text")
        .attr("x", 670)
        .attr("y", 470)
        .attr("fill", "black")
        .text("Korean-blog")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1em")


    //第五咧
    elementGroup.append("text")
        .attr("x", 850)
        .attr("y", -50)
        .attr("fill", "black")
        .text("protesterinLowerEast")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1em")

    elementGroup.append("text")
        .attr("x", 880)
        .attr("y", 50)
        .attr("fill", "black")
        .text("54women")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1em")

    elementGroup.append("text")
        .attr("x", 880)
        .attr("y", 165)
        .attr("fill", "black")
        .text("83-Korean")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1em")

    elementGroup.append("text")
        .attr("x", 860)
        .attr("y", 260)
        .attr("fill", "black")
        .text("23-koreanwomen")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1em")

    elementGroup.append("text")
        .attr("x", 900)
        .attr("y", 360)
        .attr("fill", "black")
        .text("nazi")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1em")
    elementGroup.append("text")
        .attr("x", 890)
        .attr("y", 470)
        .attr("fill", "black")
        .text("68-male")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1em")

    elementGroup.append("text")
        .attr("x", 450)
        .attr("y", 850)
        .attr("fill", "black")
        .text("Suspect: Minority Group")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1em")

    elementGroup.append("text")
        .attr("x", 650)
        .attr("y", 850)
        .attr("fill", "black")
        .text("Light-skin")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1em")

    elementGroup.append("text")
        .attr("x", 820)
        .attr("y", 850)
        .attr("fill", "black")
        .text("Unclear")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1em")

    elementGroup.append("text")
        .attr("x", 550)
        .attr("y", 1350)
        .attr("fill", "black")
        .text("Male Suspect")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1em")

    elementGroup.append("text")
        .attr("x", 750)
        .attr("y", 1350)
        .attr("fill", "black")
        .text("Female Suspect")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1em")


    elementGroup.append("text")
        .attr("x", 450)
        .attr("y", 1750)
        .attr("fill", "black")
        .text("Minority group")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1em")

    elementGroup.append("text")
        .attr("x", 650)
        .attr("y", 1750)
        .attr("fill", "black")
        .text("Other")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1em")

    elementGroup.append("text")
        .attr("x", 820)
        .attr("y", 1750)
        .attr("fill", "black")
        .text("Unclear")
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1em")



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
        if (d.crime == "unclearone") {
            return 500
        } if (d.crime == "uncleartwo") {
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
            return 915
        }
        if (d.crime == "54-women-I'm here to mess with Asians") {
            return 915
        }
        if (d.crime == "83-Korean") {
            return 915
        }
        if (d.crime == "23-korean-women-Feb") {
            return 915
        }
        if (d.crime == "6-Chinese-killChinese-nazi") {
            return 915
        } if (d.crime == "68-male") {
            return 915
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
        if (d.crime == "unclearone") {
            return 520
        } if (d.crime == "uncleartwo") {
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
            return 530
        }
        if (d.name == "NYPD" && d.crime == "gym-manager") {
            return 530
        }

        if (d.name == "NYPD" && d.crime == "37-female") {
            return 530
        }
        if (d.name == "NYPD" && d.crime == "Lower East Side protesters-police-released") {
            return 530
        }
        if (d.name == "NYPD" && d.crime == "37-Hou") {
            return 530
        }
        if (d.name == "NYPD" && d.crime == "68-male") {
            return 530
        }
        if (d.name == "NYPD" && d.crime == "56-Zhang Mingshun") {
            return 530
        }
        if (d.name == "NYPD" && d.crime == "Harlem man-police-mentioned") {
            return 680
        }
        if (d.name == "NYPD" && d.crime == "unclearone") {
            return 530
        } if (d.name == "NYPD" && d.crime == "uncleartwo") {
            return 850
        }
        if (d.name == "New-York-Times" && d.crime == "Phillipine-women") {
            return 530
        }
        if (d.name == "New-York-Times" && d.crime == "36-stabbed-debatable-Feb") {
            return 530
        }
        if (d.name == "New-York-Times" && d.crime == "52-women-attacked-by-white-Feb") {
            return 680
        }
        if (d.name == "New-York-Times" && d.crime == "37-Hou") {
            return 530
        }
        if (d.name == "New-York-Times" && d.crime == "23-korean-women-Feb") {
            return 850
        }
        if (d.name == "World-Journal" && d.crime == "Phillipine-women") {
            return 530
        }
        if (d.name == "World-Journal" && d.crime == "Asian-male-subway-lockjaw") {
            return 530
        }
        if (d.name == "World-Journal" && d.crime == "laundromat") {
            return 530
        } if (d.name == "World-Journal" && d.crime == "37-female") {
            return 530
        }
        if (d.name == "World-Journal" && d.crime == "65-female-bluehair") {
            return 680
        } if (d.name == "World-Journal" && d.crime == "Ching-Chong-NYCHPD") {
            return 850
        }
        if (d.name == "World-Journal" && d.crime == "65-male") {
            return 680
        } if (d.name == "World-Journal" && d.crime == "couple-helped-by-Tommy-John") {
            return 530
        } if (d.name == "World-Journal" && d.crime == "policebeingattacked") {
            return 530
        } if (d.name == "World-Journal" && d.crime == "Flushing Chinese man-attacked-Feb") {
            return 850
        } if (d.name == "World-Journal" && d.crime == "Route") {
            return 530
        } if (d.name == "World-Journal" && d.crime == "25-urine-women") {
            return 680
        } if (d.name == "World-Journal" && d.crime == "37-Hou") {
            return 530
        } if (d.name == "World-Journal" && d.crime == "61-male") {
            return 850
        } if (d.name == "World-Journal" && d.crime == "68-male") {
            return 530
        } if (d.name == "World-Journal" && d.crime == "54-women-I'm here to mess with Asians") {
            return 850
        } if (d.name == "World-Journal" && d.crime == "Lower East Side protesters-police-released") {
            return 530
        } if (d.name == "World-Journal" && d.crime == "36-stabbed-debatable-Feb") {
            return 530
        } if (d.name == "World-Journal" && d.crime == "walk-dog") {
            return 850
        } if (d.name == "World-Journal" && d.crime == "Korean-blog") {
            return 680
        } if (d.name == "World-Journal" && d.crime == "6-Chinese-killChinese-nazi") {
            return 530
        } if (d.name == "World-Journal" && d.crime == "83-Korean") {
            return 530
        } if (d.name == "World-Journal" && d.crime == "25-mother-and-son") {
            return 850
        } if (d.name == "World-Journal" && d.crime == "56-Zhang Mingshun") {
            return 530
        } if (d.name == "World-Journal" && d.crime == "Kill Chinks-on-subway") {
            return 850
        } if (d.name == "World-Journal" && d.crime == "gym-manager") {
            return 530
        } if (d.name == "World-Journal" && d.crime == "Kill Chinks-mask-on-street") {
            return 850
        } if (d.name == "World-Journal" && d.crime == "Lower East Side protesters-police-released") {
            return 530
        } if (d.name == "World-Journal" && d.crime == "Long Island-female-attacked") {
            return 850
        } if (d.name == "World-Journal" && d.crime == "13-teen") {
            return 850
        } if (d.name == "World-Journal" && d.crime == "Harlem man-police-mentioned") {
            return 680
        }
    }
    function forceYtwo(d) {
        if (d.name == "NYPD" && d.crime == "Phillipine-women") {
            return 900
        }
        if (d.name == "NYPD" && d.crime == "gym-manager") {
            return 900
        }

        if (d.name == "NYPD" && d.crime == "37-female") {
            return 900
        }
        if (d.name == "NYPD" && d.crime == "Lower East Side protesters-police-released") {
            return 900
        }
        if (d.name == "NYPD" && d.crime == "56-Zhang Mingshun") {
            return 900
        }
        if (d.name == "NYPD" && d.crime == "37-Hou") {
            return 900
        }
        if (d.name == "NYPD" && d.crime == "Harlem man-police-mentioned") {
            return 900
        }
        if (d.name == "NYPD" && d.crime == "68-male") {
            return 900
        }
        if (d.name == "NYPD" && d.crime == "unclearone") {
            return 900
        } if (d.name == "NYPD" && d.crime == "uncleartwo") {
            return 900
        }
        if (d.name == "New-York-Times" && d.crime == "Phillipine-women") {
            return 1000
        }
        if (d.name == "New-York-Times" && d.crime == "36-stabbed-debatable-Feb") {
            return 1000
        }
        if (d.name == "New-York-Times" && d.crime == "52-women-attacked-by-white-Feb") {
            return 1000
        }
        if (d.name == "New-York-Times" && d.crime == "37-Hou") {
            return 1000
        }
        if (d.name == "New-York-Times" && d.crime == "23-korean-women-Feb") {
            return 1000
        }
        if (d.name == "New-York-Times" && d.crime == "23-korean-women-Feb") {
            return 1000
        }
        if (d.name == "World-Journal" && d.crime == "Phillipine-women") {
            return 1100
        }
        if (d.name == "World-Journal" && d.crime == "Asian-male-subway-lockjaw") {
            return 1100
        }
        if (d.name == "World-Journal" && d.crime == "laundromat") {
            return 1100
        } if (d.name == "World-Journal" && d.crime == "37-female") {
            return 1100
        }
        if (d.name == "World-Journal" && d.crime == "65-female-bluehair") {
            return 1100
        } if (d.name == "World-Journal" && d.crime == "Ching-Chong-NYCHPD") {
            return 1100
        }
        if (d.name == "World-Journal" && d.crime == "65-male") {
            return 1100
        } if (d.name == "World-Journal" && d.crime == "couple-helped-by-Tommy-John") {
            return 1100
        } if (d.name == "World-Journal" && d.crime == "policebeingattacked") {
            return 1100
        } if (d.name == "World-Journal" && d.crime == "Flushing Chinese man-attacked-Feb") {
            return 1100
        } if (d.name == "World-Journal" && d.crime == "Route") {
            return 1100
        } if (d.name == "World-Journal" && d.crime == "25-urine-women") {
            return 1100
        } if (d.name == "World-Journal" && d.crime == "37-Hou") {
            return 1100
        } if (d.name == "World-Journal" && d.crime == "61-male") {
            return 1100
        } if (d.name == "World-Journal" && d.crime == "68-male") {
            return 1100
        } if (d.name == "World-Journal" && d.crime == "54-women-I'm here to mess with Asians") {
            return 1100
        } if (d.name == "World-Journal" && d.crime == "Lower East Side protesters-police-released") {
            return 1100
        } if (d.name == "World-Journal" && d.crime == "36-stabbed-debatable-Feb") {
            return 1100
        } if (d.name == "World-Journal" && d.crime == "walk-dog") {
            return 1100
        } if (d.name == "World-Journal" && d.crime == "Korean-blog") {
            return 1100
        } if (d.name == "World-Journal" && d.crime == "6-Chinese-killChinese-nazi") {
            return 1100
        } if (d.name == "World-Journal" && d.crime == "83-Korean") {
            return 1100
        } if (d.name == "World-Journal" && d.crime == "25-mother-and-son") {
            return 1100
        } if (d.name == "World-Journal" && d.crime == "56-Zhang Mingshun") {
            return 1100
        } if (d.name == "World-Journal" && d.crime == "Kill Chinks-on-subway") {
            return 1100
        } if (d.name == "World-Journal" && d.crime == "gym-manager") {
            return 1100
        } if (d.name == "World-Journal" && d.crime == "Kill Chinks-mask-on-street") {
            return 1100
        } if (d.name == "World-Journal" && d.crime == "Lower East Side protesters-police-released") {
            return 1100
        } if (d.name == "World-Journal" && d.crime == "Long Island-female-attacked") {
            return 1100
        } if (d.name == "World-Journal" && d.crime == "13-teen") {
            return 1100
        } if (d.name == "World-Journal" && d.crime == "Harlem man-police-mentioned") {
            return 1100
        }
    }

    function forceXFour(d) {
        if (d.crime == "Ching-Chong-NYCHPD") {
            return 680
        }
        if (d.crime == "Asian-male-subway-lockjaw") {
            return 680
        }
        if (d.crime == "36-stabbed-debatable-Feb") {
            return 680
        }

        if (d.crime == "6-Chinese-killChinese-nazi") {
            return 850
        }
        if (d.crime == "gym-manager") {
            return 680
        }
        if (d.crime == "Kill Chinks-mask-on-street") {
            return 850
        } if (d.crime == "Kill Chinks-on-subway") {
            return 850
        } if (d.crime == "Flushing Chinese man-attacked-Feb") {
            return 680
        } if (d.crime == "FHarlem man-police-mentioned") {
            return 680
        } if (d.crime == "Lower East Side protesters-police-released") {
            return 680
        } if (d.crime == "laundromat") {
            return 680
        } if (d.crime == "police-being-attacked") {
            return 680
        } if (d.crime == "unclearone") {
            return 850
        } if (d.crime == "uncleartwo") {
            return 850
        } else {
            return 490
        }
    }

    function forceXthree(d) {
        if (d.crime == "Korean-blog") {
            return 800
        } else {
            return 600
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
                    .duration(800)
                    .attr("transform", (d, i) => {
                        return "translate(" + d.x + "," + d.y + ")"
                    })
            }
        },
        exit: function (el) {
            // xAxisGroup.attr("opacity", 0)
            elementGroup.selectAll(".datagroup")
                .transition()
                .duration(800)
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
            graphGroup.attr("transform", () => {
                let x = 0;
                let y = - progress * h;
                return "translate(" + x + "," + y + ")"
            })
                ;
        },
        offset: 0.5, // enter at middle of viewport
        // once: true, // trigger just once
    });



    enterView({
        selector: '.partOne .stepThree',
        enter: function (el) {
            // console.log('a special element entered');
            let simulation = d3.forceSimulation(incomingData)
                .force('forceX', d3.forceX(forceXthree))
                .force('forceY', d3.forceY(1450))
                .force("collide", d3.forceCollide(10))
                .on('tick', stimulationRan)
                ;

            function stimulationRan() {

                d3.selectAll(".datagroup")
                    .transition()
                    .duration(700)
                    .attr("transform", (d, i) => {

                        return "translate(" + d.x + "," + d.y + ")"
                    })
            }



        },
        exit: function (el) {
            console.log('a special element exited');
            let simulation = d3.forceSimulation(incomingData)
                .force('forceX', d3.forceX(forceXtwo))
                .force('forceY', d3.forceY(forceYtwo))
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
            graphGroup.attr("transform", () => {
                let x = 0;
                let y = - progress * h - h;
                return "translate(" + x + "," + y + ")"
            })
                ;
        },
        offset: 0.5,
    });



    enterView({
        selector: '.partOne .stepFour',
        enter: function (el) {
            // console.log('a special element entered');
            let simulation = d3.forceSimulation(incomingData)
                .force('forceX', d3.forceX(forceXFour))
                .force('forceY', d3.forceY(1850))
                .force("collide", d3.forceCollide(10))
                .on('tick', stimulationRan)
                ;

            function stimulationRan() {

                d3.selectAll(".datagroup")
                    .transition()
                    .duration(700)
                    .attr("transform", (d, i) => {

                        return "translate(" + d.x + "," + d.y + ")"
                    })
            }



        },
        exit: function (el) {
            console.log('a special element exited');
            let simulation = d3.forceSimulation(incomingData)
                .force('forceX', d3.forceX(forceXthree))
                .force('forceY', d3.forceY(1450))
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
            graphGroup.attr("transform", () => {
                let x = 0;
                let y = - progress * h - h - h;
                return "translate(" + x + "," + y + ")"
            })
                ;
        },
        offset: 0.5,
    });



    //myenterView
    enterView({
        selector: ".biggeneral",
        enter: function (el) {
            // generalViz.transition().attr("opacity", 1);
            generalViz.selectAll('.generalgroup')
                .attr("opacity", 1)
                .transition()
                .delay(50)
                .duration(100)
                .attr("transform", getranddomGroupPositionzero)
                .attr("opacity", 0)
                .transition()
                .delay(50)
                .duration(1000)
                // .delay(function(i){return i})
                .attr("transform", getGroupPositionzero)
                .attr("opacity", 1);
            // function getGroupPositionzero(d, i) {
            //     let x = 200;
            //     let y = 17 * i + 5.5;
            //     return "translate(" + x + "," + y + ")"
            // };
            // function getranddomGroupPositionzero(d, i) {
            //     let x = 200;
            //     let y = 0;
            //     return "translate(" + x + "," + y + ")"
            // };


        },
        exit: function (el) {
            // generalViz.transition().attr("opacity", 0);

        },


        progress: function (el, progress) {
            console.log("the special element's progress is:", progress);

        }
    })


}



// let datagroups3 = forceViz.selectAll(".detailcrime").data(incomingData).enter()
//         .append("g")
//         .attr("class", "detailcrime")


//     Phillipinewomen = d3.group(incomingData, d => d.crime)
//     Phillipinewomencrime = Phillipinewomen.get("Phillipine-women")

//     Asianmalesubwaylockjaw = d3.group(incomingData, d => d.crime)
//     Asianmalesubwaylockjawcrime = Asianmalesubwaylockjaw.get("Asian-male-subway-lockjaw")



//     thirtysevenfemale = d3.group(incomingData, d => d.crime)
//     thirtysevenfemalecrime = thirtysevenfemale.get("37-female")


//     ChingChong = d3.group(incomingData, d => d.crime)
//     ChingChongcrime = ChingChong.get("Ching-Chong-NYCHPD")



//     sixtyfivemale = d3.group(incomingData, d => d.crime)
//     sixtyfivemalecrime = sixtyfivemale.get("65-male")


//     femalebluehair = d3.group(incomingData, d => d.crime)
//     femalebluehaircrime = femalebluehair.get("65-female-bluehair")

//     Hou = d3.group(incomingData, d => d.crime)
//     Houcrime = Hou.get("37-Hou")


//     sixtyonemale = d3.group(incomingData, d => d.crime)
//     sixtyonemalecrime = sixtyonemale.get("61-male")

//     sixtyeightmale = d3.group(incomingData, d => d.crime)
//     sixtyeightmalecrime = sixtyeightmale.get("68-male")

//     stabbeddebatableFeb = d3.group(incomingData, d => d.crime)
//     stabbeddebatableFebcrime = stabbeddebatableFeb.get("36-stabbed-debatable-Feb")

//     Koreanblog = d3.group(incomingData, d => d.crime)
//     Koreanblogcrime = Koreanblog.get("Korean-blog")


//     ChinesekillChinesenazi = d3.group(incomingData, d => d.crime)
//     ChinesekillChinesenazicrime = ChinesekillChinesenazi.get("6-Chinese-killChinese-nazi")

//     koreanwomenFeb = d3.group(incomingData, d => d.crime)
//     koreanwomenFebcrime = koreanwomenFeb.get("23-korean-women-Feb")


//     eightythreeKorean = d3.group(incomingData, d => d.crime)
//     eightythreeKoreancrime = eightythreeKorean.get("83-Korean")


//     motherandson = d3.group(incomingData, d => d.crime)
//     motherandsoncrime = koreanwomenFeb.get("25-mother-and-son")


//     teen = d3.group(incomingData, d => d.crime)
//     teencrime = teen.get("13-teen")


//     LongIslandfemaleattacked = d3.group(incomingData, d => d.crime)
//     LongIslandfemaleattackedcrime = LongIslandfemaleattacked.get("Long Island-female-attacked")


//     ZhangMingshun = d3.group(incomingData, d => d.crime)
//     ZhangMingshuncrime = teen.get("56-Zhang Mingshun")


//     gymmanager = d3.group(incomingData, d => d.crime)
//     gymmanagercrime = gymmanager.get("gym-manager")

//     KillChinksmaskonstreet = d3.group(incomingData, d => d.crime)
//     KillChinksmaskonstreetcrime = KillChinksmaskonstreet.get("Kill Chinks-mask-on-street")

//     KillChinksonsubway = d3.group(incomingData, d => d.crime)
//     KillChinksonsubwaycrime = KillChinksmaskonstreet.get("Kill Chinks-on-subway")

//     couplehelpedbyTommyJohn = d3.group(incomingData, d => d.crime)
//     couplehelpedbyTommyJohncrime = couplehelpedbyTommyJohn.get("couple-helped-by-Tommy-John")

//     Route = d3.group(incomingData, d => d.crime)
//     Routecrime = Route.get("Route")

//     womenmess = d3.group(incomingData, d => d.crime)
//     womenmesscrime = womenmess.get("54-women-I'm here to mess with Asians")


//     walkdog = d3.group(incomingData, d => d.crime)
//     walkdogcrime = walkdog.get("walk-dog")

//     FlushingChinesemanFeb = d3.group(incomingData, d => d.crime)
//     FlushingChinesemanFebcrime = FlushingChinesemanFeb.get("Flushing Chinese man-attacked-Feb")

//     urinewomen = d3.group(incomingData, d => d.crime)
//     urinewomencrime = urinewomen.get("25-urine-women")

//     womenattackedbywhiteFeb = d3.group(incomingData, d => d.crime)
//     womenattackedbywhiteFebcrime = womenattackedbywhiteFeb.get("52-women-attacked-by-white-Feb")

//     LowerEastSideprotesters = d3.group(incomingData, d => d.crime)
//     LowerEastSideprotesterscrime = LowerEastSideprotesters.get("Lower East Side protesters-police-released")

//     Harlemman = d3.group(incomingData, d => d.crime)
//     Harlemmancrime = Harlemman.get("Harlem man-police-mentioned")

//     laundromat = d3.group(incomingData, d => d.crime)
//     laundromatcrime = laundromat.get("laundromat")


//     policebeingattacked = d3.group(incomingData, d => d.crime)
//     policebeingattackedcrime = policebeingattacked.get("policebeingattacked")



//     let Phillipinewomentext = datagroups3
//         .append("text")
//         .attr("x", 210)
//         .attr('y', 160)
//         .attr("fill", "black")
//         .text("Phillipinewomen ")
//         .attr("font-family", "'Amaranth', sans-serif")
//         .attr("font-size", "0.8em")
//         ;

//     let crimecircle = datagroups3
//         .append("circle")
//         .attr("r", 5)
//         .attr("fill", colorone)
//         .attr("class", "Phillipinewomencrime1")
//         ;



//     let simulation = d3.forceSimulation(incomingData)
//         .force('forceX', d3.forceX(function (d, i) {
//             return i / incomingData.length * 1110
//         }))
//         .force('forceY', d3.forceY(100))
//         .force("collide", d3.forceCollide(9))
//         .on('tick', stimulationRan)
//         ;

//     let simulation = d3.forceSimulation(Phillipinewomencrime)
//         .force('forceX', d3.forceX(255))
//         .force('forceY', d3.forceY(100))
//         .force("collide", d3.forceCollide(9))
//         .on('tick', stimulationRan)
//         ;
//     function stimulationRan() {

//         forceViz.selectAll(".Phillipinewomencrime1")
//             .attr("cx", function (d) { return d.x })
//             .attr("cy", function (d) { return d.y })
//             ;
//     }

//     let Asianmalesubwaylockjawcrimetext = datagroups3
//         .append("text")
//         .attr("x", 430)
//         .attr('y', 160)
//         .attr("fill", "black")
//         .text("Asianmalesubwaylockjaw ")
//         .attr("font-family", "'Amaranth', sans-serif")
//         .attr("font-size", "0.8em")
//         ;

//     let crimecircle1 = datagroups3
//         .append("circle")
//         .attr("r", 5)
//         .attr("fill", colorone)
//         .attr("class", "Asianmalesubwaylockjaw1")
//         ;

//     let simulation1 = d3.forceSimulation(Asianmalesubwaylockjawcrime)
//         .force('forceX', d3.forceX(505))
//         .force('forceY', d3.forceY(100))
//         .force("collide", d3.forceCollide(9))

//         .on('tick', stimulationRan1)
//         ;

//     function stimulationRan1() {

//         forceViz.selectAll(".Asianmalesubwaylockjaw1")
//             .attr("cx", function (d) { return d.x })
//             .attr("cy", function (d) { return d.y })
//             ;
//     }
//     thirtysevenfemaletext = datagroups3
//         .append("text")
//         .attr("x", 680)
//         .attr('y', 160)
//         .attr("fill", "black")
//         .text(" thirtysevenfemale ")
//         .attr("font-family", "'Amaranth', sans-serif")
//         .attr("font-size", "0.8em")
//         ;

//     let crimecircle2 = datagroups3
//         .append("circle")
//         .attr("r", 5)
//         .attr("fill", colorone)
//         .attr("class", " thirtysevenfemale1")
//         ;

//     let simulation2 = d3.forceSimulation(thirtysevenfemalecrime)
//         .force('forceX', d3.forceX(725))
//         .force('forceY', d3.forceY(100))
//         .force("collide", d3.forceCollide(9))

//         .on('tick', stimulationRan2)
//         ;

//     function stimulationRan2() {

//         forceViz.selectAll(".thirtysevenfemale1")
//             .attr("cx", function (d) { return d.x })
//             .attr("cy", function (d) { return d.y })
//             ;
//     }


//     ChingChongtext = datagroups3
//         .append("text")
//         .attr("x", 865)
//         .attr('y', 160)
//         .attr("fill", "black")
//         .text(" ChingChong ")
//         .attr("font-family", "'Amaranth', sans-serif")
//         .attr("font-size", "0.8em")
//         ;

//     let crimecircle3 = datagroups3
//         .append("circle")
//         .attr("r", 5)
//         .attr("fill", colorone)
//         .attr("class", "ChingChong1")
//         ;

//     let simulation3 = d3.forceSimulation(ChingChongcrime)
//         .force('forceX', d3.forceX(890))
//         .force('forceY', d3.forceY(100))
//         .force("collide", d3.forceCollide(9))

//         .on('tick', stimulationRan3)
//         ;

//     function stimulationRan3() {

//         forceViz.selectAll(".ChingChong1")
//             .attr("cx", function (d) { return d.x })
//             .attr("cy", function (d) { return d.y })
//             ;
//     }

//     stabbeddebatableFebtext = datagroups3
//         .append("text")
//         .attr("x", 1030)
//         .attr('y', 160)
//         .attr("fill", "black")
//         .text(" stabbeddebatableFeb ")
//         .attr("font-family", "'Amaranth', sans-serif")
//         .attr("font-size", "0.8em")
//         ;

//     let crimecircle00 = datagroups3
//         .append("circle")
//         .attr("r", 5)
//         .attr("fill", colorone)
//         .attr("class", "stabbeddebatableFeb1")
//         ;

//     let simulation00 = d3.forceSimulation(stabbeddebatableFebcrime)
//         .force('forceX', d3.forceX(1080))
//         .force('forceY', d3.forceY(100))
//         .force("collide", d3.forceCollide(9))

//         .on('tick', stimulationRan00)
//         ;

//     function stimulationRan00() {

//         forceViz.selectAll(".stabbeddebatableFeb1")
//             .attr("cx", function (d) { return d.x })
//             .attr("cy", function (d) { return d.y })
//             ;
//     }



//     sixtyfivemaletext = datagroups3
//         .append("text")
//         .attr("x", 230)
//         .attr('y', 360)
//         .attr("fill", "black")
//         .text(" 65-male ")
//         .attr("font-family", "'Amaranth', sans-serif")
//         .attr("font-size", "0.8em")
//         ;

//     let crimecircle4 = datagroups3
//         .append("circle")
//         .attr("r", 5)
//         .attr("fill", colorone)
//         .attr("class", "sixtyfivemale1")
//         ;

//     let simulation4 = d3.forceSimulation(sixtyfivemalecrime)
//         .force('forceX', d3.forceX(255))
//         .force('forceY', d3.forceY(300))
//         .force("collide", d3.forceCollide(9))

//         .on('tick', stimulationRan4)
//         ;

//     function stimulationRan4() {

//         forceViz.selectAll(".sixtyfivemale1")
//             .attr("cx", function (d) { return d.x })
//             .attr("cy", function (d) { return d.y })
//             ;
//     }

//     let femalebluehairtext = datagroups3
//         .append("text")
//         .attr("x", 485)
//         .attr('y', 360)
//         .attr("fill", "black")
//         .text("femalebluehair ")
//         .attr("font-family", "'Amaranth', sans-serif")
//         .attr("font-size", "0.8em")
//         ;

//     let crimecircle5 = datagroups3
//         .append("circle")
//         .attr("r", 5)
//         .attr("fill", colorone)
//         .attr("class", "femalebluehair1")
//         ;

//     let simulation5 = d3.forceSimulation(femalebluehaircrime)
//         .force('forceX', d3.forceX(530))
//         .force('forceY', d3.forceY(300))
//         .force("collide", d3.forceCollide(9))

//         .on('tick', stimulationRan5)
//         ;

//     function stimulationRan5() {

//         forceViz.selectAll(".femalebluehair1")
//             .attr("cx", function (d) { return d.x })
//             .attr("cy", function (d) { return d.y })
//             ;
//     }


//     Houtext = datagroups3
//         .append("text")
//         .attr("x", 735)
//         .attr('y', 360)
//         .attr("fill", "black")
//         .text(" 37-Hou ")
//         .attr("font-family", "'Amaranth', sans-serif")
//         .attr("font-size", "0.8em")
//         ;

//     let crimecircle6 = datagroups3
//         .append("circle")
//         .attr("r", 5)
//         .attr("fill", colorone)
//         .attr("class", " Hou1")
//         ;

//     let simulation6 = d3.forceSimulation(Houcrime)
//         .force('forceX', d3.forceX(750))
//         .force('forceY', d3.forceY(300))
//         .force("collide", d3.forceCollide(9))

//         .on('tick', stimulationRan6)
//         ;

//     function stimulationRan6() {

//         forceViz.selectAll(".Hou1")
//             .attr("cx", function (d) { return d.x })
//             .attr("cy", function (d) { return d.y })
//             ;
//     }

//     sixtyonemaletext = datagroups3
//         .append("text")
//         .attr("x", 910)
//         .attr('y', 360)
//         .attr("fill", "black")
//         .text(" 61-male ")
//         .attr("font-family", "'Amaranth', sans-serif")
//         .attr("font-size", "0.8em")
//         ;

//     let crimecircle7 = datagroups3
//         .append("circle")
//         .attr("r", 5)
//         .attr("fill", colorone)
//         .attr("class", " sixtyonemale1")
//         ;

//     let simulation7 = d3.forceSimulation(sixtyonemalecrime)
//         .force('forceX', d3.forceX(930))
//         .force('forceY', d3.forceY(300))
//         .force("collide", d3.forceCollide(9))

//         .on('tick', stimulationRan7)
//         ;

//     function stimulationRan7() {

//         forceViz.selectAll(".sixtyonemale1")
//             .attr("cx", function (d) { return d.x })
//             .attr("cy", function (d) { return d.y })
//             ;
//     }


//     Koreanblogtext = datagroups3
//         .append("text")
//         .attr("x", 1060)
//         .attr('y', 360)
//         .attr("fill", "black")
//         .text(" Korean-blog ")
//         .attr("font-family", "'Amaranth', sans-serif")
//         .attr("font-size", "0.8em")
//         ;

//     let crimecircle01 = datagroups3
//         .append("circle")
//         .attr("r", 5)
//         .attr("fill", colorone)
//         .attr("class", " Koreanblog1")
//         ;

//     let simulation01 = d3.forceSimulation(Koreanblogcrime)
//         .force('forceX', d3.forceX(1090))
//         .force('forceY', d3.forceY(300))
//         .force("collide", d3.forceCollide(9))

//         .on('tick', stimulationRan01)
//         ;

//     function stimulationRan01() {

//         forceViz.selectAll(".Koreanblog1")
//             .attr("cx", function (d) { return d.x })
//             .attr("cy", function (d) { return d.y })
//             ;
//     }

//     sixtyeightmaletext = datagroups3
//         .append("text")
//         .attr("x", 230)
//         .attr('y', 560)
//         .attr("fill", "black")
//         .text(" 68-male ")
//         .attr("font-family", "'Amaranth', sans-serif")
//         .attr("font-size", "0.8em")
//         ;

//     let crimecircle8 = datagroups3
//         .append("circle")
//         .attr("r", 5)
//         .attr("fill", colorone)
//         .attr("class", "sixtyeightmale1")
//         ;

//     let simulation8 = d3.forceSimulation(sixtyeightmalecrime)
//         .force('forceX', d3.forceX(255))
//         .force('forceY', d3.forceY(500))
//         .force("collide", d3.forceCollide(9))

//         .on('tick', stimulationRan8)
//         ;

//     function stimulationRan8() {

//         forceViz.selectAll(".sixtyeightmale1")
//             .attr("cx", function (d) { return d.x })
//             .attr("cy", function (d) { return d.y })
//             ;
//     }

//     ChinesekillChinesenazitext = datagroups3
//         .append("text")
//         .attr("x", 465)
//         .attr('y', 560)
//         .attr("fill", "black")
//         .text(" ChinesekillChinesenazi ")
//         .attr("font-family", "'Amaranth', sans-serif")
//         .attr("font-size", "0.8em")
//         ;

//     let crimecircle9 = datagroups3
//         .append("circle")
//         .attr("r", 5)
//         .attr("fill", colorone)
//         .attr("class", "ChinesekillChinesenazi1")
//         ;

//     let simulation9 = d3.forceSimulation(ChinesekillChinesenazicrime)
//         .force('forceX', d3.forceX(530))
//         .force('forceY', d3.forceY(500))
//         .force("collide", d3.forceCollide(9))

//         .on('tick', stimulationRan9)
//         ;

//     function stimulationRan9() {

//         forceViz.selectAll(".ChinesekillChinesenazi1")
//             .attr("cx", function (d) { return d.x })
//             .attr("cy", function (d) { return d.y })
//             ;
//     }

//     koreanwomenFebtext = datagroups3
//         .append("text")
//         .attr("x", 705)
//         .attr('y', 560)
//         .attr("fill", "black")
//         .text("  koreanwomenFeb ")
//         .attr("font-family", "'Amaranth', sans-serif")
//         .attr("font-size", "0.8em")
//         ;

//     let crimecircle10 = datagroups3
//         .append("circle")
//         .attr("r", 5)
//         .attr("fill", colorone)
//         .attr("class", " koreanwomenFeb1")
//         ;

//     let simulation10 = d3.forceSimulation(koreanwomenFebcrime)
//         .force('forceX', d3.forceX(750))
//         .force('forceY', d3.forceY(500))
//         .force("collide", d3.forceCollide(9))

//         .on('tick', stimulationRan10)
//         ;

//     function stimulationRan10() {

//         forceViz.selectAll(".koreanwomenFeb1")
//             .attr("cx", function (d) { return d.x })
//             .attr("cy", function (d) { return d.y })
//             ;
//     }



//     eightythreeKoreantext = datagroups3
//         .append("text")
//         .attr("x", 890)
//         .attr('y', 560)
//         .attr("fill", "black")
//         .text("  eightythreeKorean ")
//         .attr("font-family", "'Amaranth', sans-serif")
//         .attr("font-size", "0.8em")
//         ;

//     let crimecircle11 = datagroups3
//         .append("circle")
//         .attr("r", 5)
//         .attr("fill", colorone)
//         .attr("class", " eightythreeKorean1")
//         ;

//     let simulation11 = d3.forceSimulation(eightythreeKoreancrime)
//         .force('forceX', d3.forceX(935))
//         .force('forceY', d3.forceY(500))
//         .force("collide", d3.forceCollide(9))

//         .on('tick', stimulationRan11)
//         ;

//     function stimulationRan11() {

//         forceViz.selectAll(".eightythreeKorean1")
//             .attr("cx", function (d) { return d.x })
//             .attr("cy", function (d) { return d.y })
//             ;
//     }

//     gymmanagertext = datagroups3
//         .append("text")
//         .attr("x", 890)
//         .attr('y', 760)
//         .attr("fill", "black")
//         .text("  gymmanager ")
//         .attr("font-family", "'Amaranth', sans-serif")
//         .attr("font-size", "0.8em")
//         ;

//     let crimecircle54 = datagroups3
//         .append("circle")
//         .attr("r", 5)
//         .attr("fill", colorone)
//         .attr("class", " gymmanager1")
//         ;

//     let simulation54 = d3.forceSimulation(gymmanagercrime)
//         .force('forceX', d3.forceX(935))
//         .force('forceY', d3.forceY(700))
//         .force("collide", d3.forceCollide(9))

//         .on('tick', stimulationRan54)
//         ;

//     function stimulationRan54() {

//         forceViz.selectAll(".gymmanager1")
//             .attr("cx", function (d) { return d.x })
//             .attr("cy", function (d) { return d.y })
//             ;
//     }

//     Routetext = datagroups3
//         .append("text")
//         .attr("x", 920)
//         .attr('y', 960)
//         .attr("fill", "black")
//         .text("  Route-7 ")
//         .attr("font-family", "'Amaranth', sans-serif")
//         .attr("font-size", "0.8em")
//         ;

//     let crimecircle67 = datagroups3
//         .append("circle")
//         .attr("r", 5)
//         .attr("fill", colorone)
//         .attr("class", "Routeone")
//         ;

//     let simulation67 = d3.forceSimulation(Routecrime)
//         .force('forceX', d3.forceX(935))
//         .force('forceY', d3.forceY(900))
//         .force("collide", d3.forceCollide(9))

//         .on('tick', stimulationRan67)
//         ;

//     function stimulationRan67() {

//         forceViz.selectAll(".Routeone")
//             .attr("cx", function (d) { return d.x })
//             .attr("cy", function (d) { return d.y })
//             ;
//     }


//     womenattackedbywhiteFebtext = datagroups3
//         .append("text")
//         .attr("x", 880)
//         .attr('y', 1160)
//         .attr("fill", "black")
//         .text("womenattackedbywhiteFeb")
//         .attr("font-family", "'Amaranth', sans-serif")
//         .attr("font-size", "0.8em")
//         ;

//     let crimecircle77 = datagroups3
//         .append("circle")
//         .attr("r", 5)
//         .attr("fill", colorone)
//         .attr("class", "womenattackedbywhiteFeb")
//         ;

//     let simulation77 = d3.forceSimulation(womenattackedbywhiteFebcrime)
//         .force('forceX', d3.forceX(935))
//         .force('forceY', d3.forceY(1100))
//         .force("collide", d3.forceCollide(9))

//         .on('tick', stimulationRan77)
//         ;

//     function stimulationRan77() {

//         forceViz.selectAll(".womenattackedbywhiteFebone")
//             .attr("cx", function (d) { return d.x })
//             .attr("cy", function (d) { return d.y })
//             ;
//     }

//     motherandsontext = datagroups3
//         .append("text")
//         .attr("x", 1060)
//         .attr('y', 560)
//         .attr("fill", "black")
//         .text("  motherandson ")
//         .attr("font-family", "'Amaranth', sans-serif")
//         .attr("font-size", "0.8em")
//         ;

//     let crimecircle12 = datagroups3
//         .append("circle")
//         .attr("r", 5)
//         .attr("fill", colorone)
//         .attr("class", " motherandson1")
//         ;

//     let simulation12 = d3.forceSimulation(motherandsoncrime)
//         .force('forceX', d3.forceX(1090))
//         .force('forceY', d3.forceY(500))
//         .force("collide", d3.forceCollide(9))

//         .on('tick', stimulationRan12)
//         ;

//     function stimulationRan12() {

//         forceViz.selectAll(".motherandson1")
//             .attr("cx", function (d) { return d.x })
//             .attr("cy", function (d) { return d.y })
//             ;
//     }

//     KillChinksmaskonstreettext = datagroups3
//         .append("text")
//         .attr("x", 1060)
//         .attr('y', 760)
//         .attr("fill", "black")
//         .text("Kill Chinks-mask-on-street")
//         .attr("font-family", "'Amaranth', sans-serif")
//         .attr("font-size", "0.8em")
//         ;

//     let crimecircle55 = datagroups3
//         .append("circle")
//         .attr("r", 5)
//         .attr("fill", colorone)
//         .attr("class", " KillChinksmaskonstreet1")
//         ;

//     let simulation55 = d3.forceSimulation(KillChinksmaskonstreetcrime)
//         .force('forceX', d3.forceX(1090))
//         .force('forceY', d3.forceY(700))
//         .force("collide", d3.forceCollide(9))

//         .on('tick', stimulationRan55)
//         ;

//     function stimulationRan55() {

//         forceViz.selectAll(".KillChinksmaskonstreet1")
//             .attr("cx", function (d) { return d.x })
//             .attr("cy", function (d) { return d.y })
//             ;
//     }

//     KillChinksonsubwaytext = datagroups3
//         .append("text")
//         .attr("x", 1060)
//         .attr('y', 960)
//         .attr("fill", "black")
//         .text("Kill Chinks-on-subway")
//         .attr("font-family", "'Amaranth', sans-serif")
//         .attr("font-size", "0.8em")
//         ;

//     let crimecircle65 = datagroups3
//         .append("circle")
//         .attr("r", 5)
//         .attr("fill", colorone)
//         .attr("class", " KillChinksonsubway1")
//         ;

//     let simulation65 = d3.forceSimulation(KillChinksonsubwaycrime)
//         .force('forceX', d3.forceX(1090))
//         .force('forceY', d3.forceY(900))
//         .force("collide", d3.forceCollide(9))

//         .on('tick', stimulationRan65)
//         ;

//     function stimulationRan65() {

//         forceViz.selectAll(".KillChinksonsubway1")
//             .attr("cx", function (d) { return d.x })
//             .attr("cy", function (d) { return d.y })
//             ;
//     }

//     couplehelpedbyTommyJohntext = datagroups3
//         .append("text")
//         .attr("x", 1060)
//         .attr('y', 1160)
//         .attr("fill", "black")
//         .text("couple-helped-by-Tommy-John")
//         .attr("font-family", "'Amaranth', sans-serif")
//         .attr("font-size", "0.8em")
//         ;

//     let crimecircle75 = datagroups3
//         .append("circle")
//         .attr("r", 5)
//         .attr("fill", colorone)
//         .attr("class", " couplehelpedbyTommyJohn1")
//         ;

//     let simulation75 = d3.forceSimulation(couplehelpedbyTommyJohncrime)
//         .force('forceX', d3.forceX(1090))
//         .force('forceY', d3.forceY(1100))
//         .force("collide", d3.forceCollide(9))

//         .on('tick', stimulationRan75)
//         ;

//     function stimulationRan75() {

//         forceViz.selectAll(".couplehelpedbyTommyJohn1")
//             .attr("cx", function (d) { return d.x })
//             .attr("cy", function (d) { return d.y })
//             ;
//     }



//     teentext = datagroups3
//         .append("text")
//         .attr("x", 235)
//         .attr('y', 760)
//         .attr("fill", "black")
//         .text(" 13-teen ")
//         .attr("font-family", "'Amaranth', sans-serif")
//         .attr("font-size", "0.8em")
//         ;

//     let crimecircle13 = datagroups3
//         .append("circle")
//         .attr("r", 5)
//         .attr("fill", colorone)
//         .attr("class", "teen1")
//         ;

//     let simulation13 = d3.forceSimulation(teencrime)
//         .force('forceX', d3.forceX(255))
//         .force('forceY', d3.forceY(700))
//         .force("collide", d3.forceCollide(9))

//         .on('tick', stimulationRan13)
//         ;

//     function stimulationRan13() {

//         forceViz.selectAll(".teen1")
//             .attr("cx", function (d) { return d.x })
//             .attr("cy", function (d) { return d.y })
//             ;
//     }

//     FlushingChinesemanFebtext = datagroups3
//         .append("text")
//         .attr("x", 200)
//         .attr('y', 960)
//         .attr("fill", "black")
//         .text(" FlushingChinesemanFeb ")
//         .attr("font-family", "'Amaranth', sans-serif")
//         .attr("font-size", "0.8em")
//         ;

//     let crimecircle71 = datagroups3
//         .append("circle")
//         .attr("r", 5)
//         .attr("fill", colorone)
//         .attr("class", "teen1")
//         ;

//     let simulation71 = d3.forceSimulation(FlushingChinesemanFebcrime)
//         .force('forceX', d3.forceX(255))
//         .force('forceY', d3.forceY(900))
//         .force("collide", d3.forceCollide(9))

//         .on('tick', stimulationRan71)
//         ;

//     function stimulationRan71() {

//         forceViz.selectAll(".FlushingChinesemanFeb1")
//             .attr("cx", function (d) { return d.x })
//             .attr("cy", function (d) { return d.y })
//             ;
//     }


//     policebeingattackedtext = datagroups3
//         .append("text")
//         .attr("x", 210)
//         .attr('y', 1160)
//         .attr("fill", "black")
//         .text(" policebeingattacked ")
//         .attr("font-family", "'Amaranth', sans-serif")
//         .attr("font-size", "0.8em")
//         ;

//     let crimecircle81 = datagroups3
//         .append("circle")
//         .attr("r", 5)
//         .attr("fill", colorone)
//         .attr("class", "policebeingattacked1")
//         ;

//     let simulation81 = d3.forceSimulation(policebeingattackedcrime)
//         .force('forceX', d3.forceX(255))
//         .force('forceY', d3.forceY(1100))
//         .force("collide", d3.forceCollide(9))

//         .on('tick', stimulationRan81)
//         ;

//     function stimulationRan81() {

//         forceViz.selectAll(".policebeingattacked1")
//             .attr("cx", function (d) { return d.x })
//             .attr("cy", function (d) { return d.y })
//             ;
//     }

//     Harlemmantext = datagroups3
//         .append("text")
//         .attr("x", 225)
//         .attr('y', 1360)
//         .attr("fill", "black")
//         .text(" Harlemman")
//         .attr("font-family", "'Amaranth', sans-serif")
//         .attr("font-size", "0.8em")
//         ;

//     let crimecircle91 = datagroups3
//         .append("circle")
//         .attr("r", 5)
//         .attr("fill", colorone)
//         .attr("class", "Harlemman1")
//         ;

//     let simulation91 = d3.forceSimulation(Harlemmancrime)
//         .force('forceX', d3.forceX(255))
//         .force('forceY', d3.forceY(1300))
//         .force("collide", d3.forceCollide(9))

//         .on('tick', stimulationRan91)
//         ;

//     function stimulationRan91() {

//         forceViz.selectAll(".Harlemman1")
//             .attr("cx", function (d) { return d.x })
//             .attr("cy", function (d) { return d.y })
//             ;
//     }



//     LongIslandfemaleattackedtext = datagroups3
//         .append("text")
//         .attr("x", 465)
//         .attr('y', 760)
//         .attr("fill", "black")
//         .text("LongIslandfemaleattacked ")
//         .attr("font-family", "'Amaranth', sans-serif")
//         .attr("font-size", "0.8em")
//         ;

//     let crimecircle14 = datagroups3
//         .append("circle")
//         .attr("r", 5)
//         .attr("fill", colorone)
//         .attr("class", "  LongIslandfemaleattacked1")
//         ;

//     let simulation14 = d3.forceSimulation(LongIslandfemaleattackedcrime)
//         .force('forceX', d3.forceX(530))
//         .force('forceY', d3.forceY(700))
//         .force("collide", d3.forceCollide(9))

//         .on('tick', stimulationRan14)
//         ;

//     function stimulationRan14() {

//         forceViz.selectAll(".LongIslandfemaleattacked1")
//             .attr("cx", function (d) { return d.x })
//             .attr("cy", function (d) { return d.y })
//             ;
//     }

//     womenmesstext = datagroups3
//         .append("text")
//         .attr("x", 465)
//         .attr('y', 960)
//         .attr("fill", "black")
//         .text("womenmess ")
//         .attr("font-family", "'Amaranth', sans-serif")
//         .attr("font-size", "0.8em")
//         ;

//     let crimecircle73 = datagroups3
//         .append("circle")
//         .attr("r", 5)
//         .attr("fill", colorone)
//         .attr("class", "womenmess1")
//         ;

//     let simulation73 = d3.forceSimulation(womenmesscrime)
//         .force('forceX', d3.forceX(530))
//         .force('forceY', d3.forceY(900))
//         .force("collide", d3.forceCollide(9))

//         .on('tick', stimulationRan73)
//         ;

//     function stimulationRan73() {

//         forceViz.selectAll(".womenmess1")
//             .attr("cx", function (d) { return d.x })
//             .attr("cy", function (d) { return d.y })
//             ;
//     }


//     laundromattext = datagroups3
//         .append("text")
//         .attr("x", 465)
//         .attr('y', 1160)
//         .attr("fill", "black")
//         .text("laundromat ")
//         .attr("font-family", "'Amaranth', sans-serif")
//         .attr("font-size", "0.8em")
//         ;

//     let crimecircle82 = datagroups3
//         .append("circle")
//         .attr("r", 5)
//         .attr("fill", colorone)
//         .attr("class", "laundromat1")
//         ;

//     let simulation82 = d3.forceSimulation(laundromatcrime)
//         .force('forceX', d3.forceX(530))
//         .force('forceY', d3.forceY(1100))
//         .force("collide", d3.forceCollide(9))

//         .on('tick', stimulationRan82)
//         ;

//     function stimulationRan82() {

//         forceViz.selectAll(".laundromat1")
//             .attr("cx", function (d) { return d.x })
//             .attr("cy", function (d) { return d.y })
//             ;
//     }


//     LowerEastSideprotesterstext = datagroups3
//         .append("text")
//         .attr("x", 465)
//         .attr('y', 1360)
//         .attr("fill", "black")
//         .text("LowerEastSideprotesters ")
//         .attr("font-family", "'Amaranth', sans-serif")
//         .attr("font-size", "0.8em")
//         ;

//     let crimecircle92 = datagroups3
//         .append("circle")
//         .attr("r", 5)
//         .attr("fill", colorone)
//         .attr("class", "LowerEastSideprotesters1")
//         ;

//     let simulation92 = d3.forceSimulation(LowerEastSideprotesterscrime)
//         .force('forceX', d3.forceX(530))
//         .force('forceY', d3.forceY(1300))
//         .force("collide", d3.forceCollide(9))

//         .on('tick', stimulationRan92)
//         ;

//     function stimulationRan92() {

//         forceViz.selectAll(".LowerEastSideprotesters1")
//             .attr("cx", function (d) { return d.x })
//             .attr("cy", function (d) { return d.y })
//             ;
//     }




//     ZhangMingshuntext = datagroups3
//         .append("text")
//         .attr("x", 705)
//         .attr('y', 760)
//         .attr("fill", "black")
//         .text("56-ZhangMingshun")
//         .attr("font-family", "'Amaranth', sans-serif")
//         .attr("font-size", "0.8em")
//         ;

//     let crimecircle15 = datagroups3
//         .append("circle")
//         .attr("r", 5)
//         .attr("fill", colorone)
//         .attr("class", "ZhangMingshun1")
//         ;

//     let simulation15 = d3.forceSimulation(ZhangMingshuncrime)
//         .force('forceX', d3.forceX(750))
//         .force('forceY', d3.forceY(700))
//         .force("collide", d3.forceCollide(9))

//         .on('tick', stimulationRan15)
//         ;

//     function stimulationRan15() {

//         forceViz.selectAll(".ZhangMingshun1")
//             .attr("cx", function (d) { return d.x })
//             .attr("cy", function (d) { return d.y })
//             ;
//     }

//     walkdogtext = datagroups3
//         .append("text")
//         .attr("x", 725)
//         .attr('y', 960)
//         .attr("fill", "black")
//         .text("walkdog")
//         .attr("font-family", "'Amaranth', sans-serif")
//         .attr("font-size", "0.8em")
//         ;

//     let crimecircle84 = datagroups3
//         .append("circle")
//         .attr("r", 5)
//         .attr("fill", colorone)
//         .attr("class", "walkdog1")
//         ;

//     let simulation84 = d3.forceSimulation(walkdogcrime)
//         .force('forceX', d3.forceX(750))
//         .force('forceY', d3.forceY(900))
//         .force("collide", d3.forceCollide(9))

//         .on('tick', stimulationRan84)
//         ;

//     function stimulationRan84() {

//         forceViz.selectAll(".walkdog1")
//             .attr("cx", function (d) { return d.x })
//             .attr("cy", function (d) { return d.y })
//             ;
//     }


//     urinewomentext = datagroups3
//         .append("text")
//         .attr("x", 725)
//         .attr('y', 1160)
//         .attr("fill", "black")
//         .text("urinewomen")
//         .attr("font-family", "'Amaranth', sans-serif")
//         .attr("font-size", "0.8em")
//         ;

//     let crimecircle94 = datagroups3
//         .append("circle")
//         .attr("r", 5)
//         .attr("fill", colorone)
//         .attr("class", "urinewomen1")
//         ;

//     let simulation94 = d3.forceSimulation(urinewomencrime)
//         .force('forceX', d3.forceX(750))
//         .force('forceY', d3.forceY(1100))
//         .force("collide", d3.forceCollide(9))

//         .on('tick', stimulationRan84)
//         ;

//     function stimulationRan84() {

//         forceViz.selectAll(".urinewomen1")
//             .attr("cx", function (d) { return d.x })
//             .attr("cy", function (d) { return d.y })
//             ;
//     }

    // //time line
    // let timeParseFunction = d3.utcParse("%Y-%m-%dT%H:%M:%S.%LZ");
    // let timeExtent = d3.extent(incomingData, function (d) {
    //     return timeParseFunction(d.time);
    // })
    // console.log(timeParseFunction("2021-03-30T16:00:00.000Z"))




    // console.log(timeExtent)

    // let xScale = d3.scaleTime().domain([timeParseFunction("2021-01-01T16:00:00.000Z"), timeParseFunction("2021-04-07T16:00:00.000Z")]).range([130, 800]);
    // let delayScale = d3.scaleLinear().domain(timeExtent).range([5000, 15000]);

    // let xAxisGroup = timelineViz.append("g").attr("class", 'xaxis');

    // let xAxis = d3.axisBottom(xScale);
    // xAxisGroup.attr("transform", "translate(0, 500)")
    //     .style("color", "black")
    //     .attr("font-family", "'Amaranth', sans-serif")
    //     .attr("font-size", "1.7em");
    // xAxisGroup.call(xAxis)

    // xAxisGroup.append("g").attr('class', 'xLabel')
    //     .attr("transform", "translate(450, 50)")
    //     .append("text")
    //     .attr("fill", "black")
    //     .text("When the report first published")
    //     .attr("font-family", "'Amaranth', sans-serif")
    //     .attr("font-size", "1.6em")
    //     .attr("opacity", 0.9)

    //     ;

    // let datagroups = timelineViz.selectAll(".generaldatagroup").data(incomingData).enter()
    //     .append("g")
    //     .attr("class", "generaldatagroups")
    //     ;




    // function timeline(incomingData) {
    //     let circles = datagroups
    //         .append("circle")
    //         .attr("fill", colorone)
    //         .attr("r", 5)
    //         ;

    //     function getGroupPosition(d, i) {
    //         let x = xScale(timeParseFunction(d.time));
    //         let y = Math.random() * 300 + 190;
    //         return "translate(" + x + "," + y + ")"


    //     };

    //     function getranddomGroupPosition(d, i) {
    //         let x = Math.random() * 300 + 80;
    //         let y = Math.random() * 200 + 100;
    //         return "translate(" + x + "," + y + ")"
    //     };

    //     datagroups.attr("transform", "translate(0,100)")
    //         .transition()
    //         .delay(function (d, i) {
    //             return delayScale(timeParseFunction(d.time)) / 20;
    //         })
    //         .duration(800)
    //         .attr("transform", getGroupPosition)
    //         .attr("opacity", 0)
    //         .transition()
    //         .delay(function (d, i) {
    //             return delayScale(timeParseFunction(d.time)) / 20;
    //         })
    //         .duration(600)
    //         // .delay(function(i){return i})
    //         .attr("transform", getGroupPosition)
    //         .attr("opacity", 1)
    //         ;
    // }





    //force graph


    // ForceData = [
    //     {
    //         "name": "Phillipine-women",
    //         "x": "255",
    //         "y": "100"

    //     },
    //     {
    //         "name": "Asian-male-subway-lockjaw",
    //         "x": "430",
    //         "y": "160"
    //     },
    //     {
    //         "name": "37-female",
    //         "x": "725",
    //         "y": "100"
    //     },
    //     {
    //         "name": "Ching-Chong-NYCHPD",
    //         "x": "890",
    //         "y": "100"
    //     },
    //     {
    //         "name": "36-stabbed-debatable-Feb",
    //         "x": "1080",
    //         "y": "100"
    //     },
    //     {
    //         "name": "65-male",
    //         "x": "255",
    //         "y": "300"
    //     },
    //     {
    //         "name": "65-female-bluehair",
    //         "x": "530",
    //         "y": "300"
    //     },
    //     {
    //         "name": "37-Hou",
    //         "x": "750",
    //         "y": "300"
    //     },
    //     {
    //         "name": "61-male",
    //         "x": "930",
    //         "y": "300"
    //     },
    //     {
    //         "name": "Korean-blog",
    //         "x": "1090",
    //         "y": "300"
    //     },
    //     {
    //         "name": "68-male",
    //         "x": "255",
    //         "y": "500"
    //     },
    //     {
    //         "name": "6-Chinese-killChinese-nazi",
    //         "x": "530",
    //         "y": "500"
    //     },
    //     {
    //         "name": "23-korean-women-Feb",
    //         "x": "750",
    //         "y": "500"
    //     },
    //     {
    //         "name": "83-Korean",
    //         "x": "935",
    //         "y": "500"
    //     },
    //     {
    //         "name": "gym-manager",
    //         "x": "935",
    //         "y": "700"
    //     },
    //     {
    //         "name": "Route",
    //         "x": "935",
    //         "y": "900"
    //     },
    //     {
    //         "name": "52-women-attacked-by-white-Feb",
    //         "x": "935",
    //         "y": "1100"
    //     },
    //     {
    //         "name": "25-mother-and-son",
    //         "x": "1090",
    //         "y": "500"
    //     },
    //     {
    //         "name": "Kill Chinks-mask-on-street",
    //         "x": "1090",
    //         "y": "700"
    //     },
    //     {
    //         "name": "Kill Chinks-on-subway",
    //         "x": "1090",
    //         "y": "900"
    //     },
    //     {
    //         "name": "couple-helped-by-Tommy-John",
    //         "x": "1090",
    //         "y": "1100"
    //     },
    //     {
    //         "name": "13-teen",
    //         "x": "255",
    //         "y": "700"
    //     },
    //     {
    //         "name": "Flushing Chinese man-attacked-Feb",
    //         "x": "255",
    //         "y": "900"
    //     },
    //     {
    //         "name": "policebeingattacked",
    //         "x": "255",
    //         "y": "1100"
    //     },
    //     {
    //         "name": "Harlem man-police-mentioned",
    //         "x": "255",
    //         "y": "1300"
    //     },
    //     {
    //         "name": "Long Island-female-attacked",
    //         "x": "530",
    //         "y": "700"
    //     },
    //     {
    //         "name": "54-women-I'm here to mess with Asians",
    //         "x": "530",
    //         "y": "900"
    //     },
    //     {
    //         "name": "laundromat",
    //         "x": "530",
    //         "y": "1100"
    //     },
    //     {
    //         "name": "Lower East Side protesters-police-released",
    //         "x": "530",
    //         "y": "1300"
    //     },
    //     {
    //         "name": "56-Zhang Mingshun",
    //         "x": "750",
    //         "y": "700"
    //     },
    //     {
    //         "name": "walk-dog",
    //         "x": "750",
    //         "y": "900"
    //     },
    //     {
    //         "name": "25-urine-women",
    //         "x": "750",
    //         "y": "1100"
    //     }
    // ]



    // function forceposition(ForceData) {

    //     function getForcePosition(d, i) {
    //         let x = d.x;
    //         let y = d.y;
    //         return "translate(" + x + "," + y + ")"
    //     }
    // }

    // function getGroupPosition(d, i) {
    //     let x = xScale(timeParseFunction(d.time));
    //     let y = Math.random() * 300 + 190;
    //     return "translate(" + x + "," + y + ")"


    // };

    // ForceData = [
    //     {
    //         "name": "Phillipine-women",
    //         "x": "25",
    //         "y": "100"

    //     },
    //     {
    //         "name": "Asian-male-subway-lockjaw",
    //         "x": "430",
    //         "y": "160"
    //     },
    //     {
    //         "name": "37-female",
    //         "x": "725",
    //         "y": "100"
    //     },
    //     {
    //         "name": "Ching-Chong-NYCHPD",
    //         "x": "890",
    //         "y": "100"
    //     },
    //     {
    //         "name": "36-stabbed-debatable-Feb",
    //         "x": "1080",
    //         "y": "100"
    //     },
    //     {
    //         "name": "65-male",
    //         "x": "255",
    //         "y": "300"
    //     },
    //     {
    //         "name": "65-female-bluehair",
    //         "x": "530",
    //         "y": "300"
    //     },
    //     {
    //         "name": "37-Hou",
    //         "x": "750",
    //         "y": "300"
    //     },
    //     {
    //         "name": "61-male",
    //         "x": "930",
    //         "y": "300"
    //     },
    //     {
    //         "name": "Korean-blog",
    //         "x": "1090",
    //         "y": "300"
    //     },
    //     {
    //         "name": "68-male",
    //         "x": "255",
    //         "y": "500"
    //     },
    //     {
    //         "name": "6-Chinese-killChinese-nazi",
    //         "x": "530",
    //         "y": "500"
    //     },
    //     {
    //         "name": "23-korean-women-Feb",
    //         "x": "750",
    //         "y": "500"
    //     },
    //     {
    //         "name": "83-Korean",
    //         "x": "935",
    //         "y": "500"
    //     },
    //     {
    //         "name": "gym-manager",
    //         "x": "935",
    //         "y": "700"
    //     },
    //     {
    //         "name": "Route",
    //         "x": "935",
    //         "y": "900"
    //     },
    //     {
    //         "name": "52-women-attacked-by-white-Feb",
    //         "x": "935",
    //         "y": "1100"
    //     },
    //     {
    //         "name": "25-mother-and-son",
    //         "x": "1090",
    //         "y": "500"
    //     },
    //     {
    //         "name": "Kill Chinks-mask-on-street",
    //         "x": "1090",
    //         "y": "700"
    //     },
    //     {
    //         "name": "Kill Chinks-on-subway",
    //         "x": "1090",
    //         "y": "900"
    //     },
    //     {
    //         "name": "couple-helped-by-Tommy-John",
    //         "x": "1090",
    //         "y": "1100"
    //     },
    //     {
    //         "name": "13-teen",
    //         "x": "255",
    //         "y": "700"
    //     },
    //     {
    //         "name": "Flushing Chinese man-attacked-Feb",
    //         "x": "255",
    //         "y": "900"
    //     },
    //     {
    //         "name": "policebeingattacked",
    //         "x": "255",
    //         "y": "1100"
    //     },
    //     {
    //         "name": "Harlem man-police-mentioned",
    //         "x": "255",
    //         "y": "1300"
    //     },
    //     {
    //         "name": "Long Island-female-attacked",
    //         "x": "530",
    //         "y": "700"
    //     },
    //     {
    //         "name": "54-women-I'm here to mess with Asians",
    //         "x": "530",
    //         "y": "900"
    //     },
    //     {
    //         "name": "laundromat",
    //         "x": "530",
    //         "y": "1100"
    //     },
    //     {
    //         "name": "Lower East Side protesters-police-released",
    //         "x": "530",
    //         "y": "1300"
    //     },
    //     {
    //         "name": "56-Zhang Mingshun",
    //         "x": "750",
    //         "y": "700"
    //     },
    //     {
    //         "name": "walk-dog",
    //         "x": "750",
    //         "y": "900"
    //     },
    //     {
    //         "name": "25-urine-women",
    //         "x": "750",
    //         "y": "1100"
    //     }
    // ]

    // {
    //     "name": "New-York-Times",
    //     "crime": "Atlanta",
    //     "time": "2021-03-21T16:00:00.000Z",
    //     "place": "NY",
    //     "title": "Anti-Asian Attacks Place Andrew Yang in the Spotlight. How Will He Use It?",
    //     "description": "But many Asian-Americans also see in his candidacy an opportunity for representation at the highest level of city government, an increasingly meaningful metric amid violent attacks on Asian-Americans in New York and across the nation, including the fatal shootings in the Atlanta area last week that left eight people dead, six of them women of Asian descent.",
    //     "link": "https://www.nytimes.com/2021/03/22/nyregion/andrew-yang-bias-asian-atlanta.html"
    // },
    // {
    //     "name": "World-Journal",
    //     "crime": "Atlanta",
    //     "time": "2021-03-20T16:00:00.000Z",
    //     "place": "NY",
    //     "title": "Thousands of people participate in New York City's anti-hate march, crowding Columbus Park",
    //     "description": "In response to the misunderstanding of the Asian community and the frequent hate crimes since the new pneumonia epidemic, \nthe Asian community held a \"March Against Hate\" in Columbus Park in Manhattan on the 21st.",
    //     "link": "https://www.worldjournal.com/wj/story/121470/5334193"
    // },
    // {
    //     "name": "World-Journal",
    //     "crime": "Atlanta",
    //     "time": "2021-03-20T16:00:00.000Z",
    //     "place": "NY",
    //     "title": "Thousands Rally Against Asian-American Hate Crimes in New York's Union Square",
    //     "description": "Thousands of people rallied at Union Square in Manhattan on the 21st to oppose hate crimes against \nAsians and to call on Asians and Africans to unite to fight racial discrimination.",
    //     "link": "https://www.worldjournal.com/wj/story/122021/5334194"
    // },
    // {
    //     "name": "World-Journal",
    //     "crime": "General",
    //     "time": "2021-03-19T16:00:00.000Z",
    //     "place": "NY",
    //     "title": "In addition to reporting hate crimes to the police, there are many ways to get help",
    //     "description": "There are many ways to seek help in the event of a hate crime or racial discrimination, in addition to reporting it to the police.",
    //     "link": "https://www.worldjournal.com/wj/story/121382/5331529"
    // },