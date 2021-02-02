let data = [
    {
        "timestamp": "2021-01-28T09:36:58.129Z",
        "Select a topic": 4,
        "Finding Inspirations and Preparatory Research": 3,
        "Roadmap and Design the project": 3,
        "Communication with teammates": 4,
        "Technical implementation": 2,
        "User Engagement": 2
    },
    {
        "timestamp": "2021-01-28T09:37:44.783Z",
        "Select a topic": 3,
        "Finding Inspirations and Preparatory Research": 4,
        "Roadmap and Design the project": 4,
        "Communication with teammates": 3,
        "Technical implementation": 4,
        "User Engagement": 5
    },
    {
        "timestamp": "2021-01-28T09:44:48.294Z",
        "Select a topic": 5,
        "Finding Inspirations and Preparatory Research": 4,
        "Roadmap and Design the project": 4,
        "Communication with teammates": 3,
        "Technical implementation": 4,
        "User Engagement": 3
    },
    {
        "timestamp": "2021-01-28T09:48:01.879Z",
        "Select a topic": 4,
        "Finding Inspirations and Preparatory Research": 3,
        "Roadmap and Design the project": 3,
        "Communication with teammates": 2,
        "Technical implementation": 5,
        "User Engagement": 3
    },
    {
        "timestamp": "2021-01-28T10:22:51.113Z",
        "Select a topic": 3,
        "Finding Inspirations and Preparatory Research": 3,
        "Roadmap and Design the project": 3,
        "Communication with teammates": 4,
        "Technical implementation": 4,
        "User Engagement": 3
    },
    {
        "timestamp": "2021-01-28T11:15:06.586Z",
        "Select a topic": 3,
        "Finding Inspirations and Preparatory Research": 2,
        "Roadmap and Design the project": 4,
        "Communication with teammates": 2,
        "Technical implementation": 4,
        "User Engagement": 4
    },
    {
        "timestamp": "2021-01-29T01:24:25.117Z",
        "Select a topic": 5,
        "Finding Inspirations and Preparatory Research": 4,
        "Roadmap and Design the project": 3,
        "Communication with teammates": 5,
        "Technical implementation": 2,
        "User Engagement": 3
    },
    {
        "timestamp": "2021-01-29T03:35:31.475Z",
        "Select a topic": 3,
        "Finding Inspirations and Preparatory Research": 5,
        "Roadmap and Design the project": 2,
        "Communication with teammates": 3,
        "Technical implementation": 2,
        "User Engagement": 5
    },
    {
        "timestamp": "2021-01-30T06:44:23.624Z",
        "Select a topic": 5,
        "Finding Inspirations and Preparatory Research": 4,
        "Roadmap and Design the project": 3,
        "Communication with teammates": 5,
        "Technical implementation": 2,
        "User Engagement": 4
    },
    {
        "timestamp": "2021-01-30T06:52:17.230Z",
        "Select a topic": 3,
        "Finding Inspirations and Preparatory Research": 2,
        "Roadmap and Design the project": 4,
        "Communication with teammates": 3,
        "Technical implementation": 4,
        "User Engagement": 4
    },
    {
        "timestamp": "2021-01-30T07:48:58.626Z",
        "Select a topic": 2,
        "Finding Inspirations and Preparatory Research": 5,
        "Roadmap and Design the project": 4,
        "Communication with teammates": 1,
        "Technical implementation": 5,
        "User Engagement": 5
    },
    {
        "timestamp": "2021-01-30T18:45:55.530Z",
        "Select a topic": 3,
        "Finding Inspirations and Preparatory Research": 3,
        "Roadmap and Design the project": 2,
        "Communication with teammates": 1,
        "Technical implementation": 2,
        "User Engagement": 1
    },
    {
        "timestamp": "2021-01-31T12:08:21.426Z",
        "Select a topic": 4,
        "Finding Inspirations and Preparatory Research": 4,
        "Roadmap and Design the project": 2,
        "Communication with teammates": 3,
        "Technical implementation": 2,
        "User Engagement": 3
    }
]



// A function Leon wrote to transform the structure of the data
// The function with many comments on description of what kind of
// data it transform into what other kind of data is here:
// https://github.com/leoneckert/critical-data-and-visualization-spring-2021/tree/master/labs/lab1#transform-data


function averageData(data) {
    let newData = [];
    let keys = Object.keys(data[data.length - 1]);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let sum = 0;
        let num = 0;
        for (let j = 0; j < data.length; j++) {
            let datum = data[j];
            if (key in datum) {
                sum += datum[key];
                num++;
            }
        }
        let avg = sum / num;
        if (!isNaN(avg)) {
            let newDataPoint = { "name": key, "average": avg, 'numMeasurements': num };
            newData.push(newDataPoint);
        }
    }
    return newData;
}

// here we use the function to transform the data
let transformedData = averageData(data);


// log things to the console as you go to make sure things
// are behaving as intended. I see the data looks good

// up here, we also select the container (div) on the page
// into which we insert the bars we create in the loop below
let container = document.getElementsByClassName("maindiv");


// Loop over the data, once for each datapoint.
// in our case the loop loops 5 times because we have
// 5 foods in out dataset.
for (let i = 0; i < transformedData.length; i++) {
    let datapoint = transformedData[i];
    let food = datapoint.name;
    let average = datapoint.average;
    // console.log(average);
    // console.log(typeof transformedData[i]);
    var num = i + 1;
    let bar = document.getElementById("bar" + num.toString());
    bar.className = "bar";
    bar.style.transform = "scaleY(" + average + ")";
    // document.getElementsByClassName('bar')[0].style.transform = "scaleY(3)";
    let barname = document.createElement("p");
    barname.innerHTML = food;
    console.log(food)
    let text = document.getElementById("text1");
    text.className = "bar:nth-child(1)";
    let text2 = document.getElementById("text2");
    text2.className = "bar:nth-child(2)";
}
