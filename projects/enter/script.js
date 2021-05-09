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
    xAxisGroup.attr("transform", "translate(0, -325)")
        .style("color", "black")
        .attr("opacity", 1)
        .attr("font-family", "'Amaranth', sans-serif")
        .attr("font-size", "1.7em");
    xAxisGroup.call(xAxis)

    xAxisGroup.append("g").attr('class', 'xLabel')
        .attr("transform", "translate(700, 40)")
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






    // elementGroup.on("mouseover", function (d, i) {
    //     datagroup.select(this)
    //         .select("circle")
    //         .transition()
    //         .attr("opacity", 1);
    //     var content = document.getElementsByClassName('datagroup');
    //     var textcontent = document.createElement("P");
    //     textcontent.innerText = "DEATH INFORMATION" + "\n" + d.description + "\n" + d.link;
    //     content.innerHTML = "";
    //     content.appendChild(textcontent);
    //     console.log(content.appendChild(textcontent))
    //     d3.select(".datagroup").transition().delay(200).style("opacity", 1)
    //     // d3.select("#top").style("opacity",0)

    //     // document.getElementById("textcontent").innerHTML="jytcjuytcjuycjyoaishdosifhosijoiajiooijoijoaisjdoijsd";

    // })
    //     .on("mouseout", function (d, i) {
    //         d3.select("circle").attr("r", 5);
    //         d3.select(".datagroup").style("opacity", 0)
    //         //   d3.select("#top").style("opacity",1)
    //     })



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
                let y = Math.random() * 300 - 625;
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
                    let y = Math.random() * 300 - 625;
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
                    .duration(1000)
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
                    .duration(1000)
                    .attr("transform", (d, i) => {

                        return "translate(" + d.x + "," + d.y + ")"
                    })
            }



        },
        exit: function (el) {
            console.log('a special element exited');
            let simulation = d3.forceSimulation(incomingData)
                .force('forceX', d3.forceX(forceXthree))
                .force('forceY', d3.forceY(1500))
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
                .delay(10)
                .duration(100)
                .attr("transform", getranddomGroupPositionzero)
                .attr("opacity", 0)
                .transition()
                .delay(50)
                .duration(800)
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
