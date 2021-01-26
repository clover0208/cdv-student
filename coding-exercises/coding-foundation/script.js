var i;
document.getElementById('txt').value = "Enter the number";


function getVal() {

    document.getElementsByClassName("container")[0].innerHTML = "";

    // Object.clear(document.getElementsByClassName("circle"));

    // document.getElementsByClassName("circle") = {};

    // for (var member in document.getElementsByClassName("container")[0]) delete document.getElementsByClassName("container")[0].[member];
    console.log(typeof document.getElementsByClassName("circle"));
    var txt = document.getElementById('txt').value;

    for (i = 0; i < txt; i++) {
        let div = document.createElement('div');
        div.className = 'circle';
        document.getElementsByClassName("container")[0].appendChild(div);
    }

    // console.log(document.getElementsByClassName("container")[0]);
    console.log(document.getElementsByClassName("circle"));

}

//play with mouse interaction
// var circle = document.getElementsByClassName('circle');
// circle.addEventListener("click", function () {
//     circle.style.animation = "rotate 2s";
//     circle.style.webkitAnimation = "rotate 2s";
// });
// var circleclass = document.getElementsByClassName("circle");
// var myFunction_Circle = function () {
//     this.style.color = "blue";
// }
// for (var i = 0; i < circleclass.length; i++) {
//     circleclass[i].addEventListener('click', myFunction_Circle, false);
// }



// function myFunction() {
//     document.getElementById("txt").reset();
// }

// for (i = 1; i < txt; i++) {
//     let div = document.createElement('div');
//     div.className = 'circle';
//     document.getElementsByClassName("container")[0].appendChild(div);
// }

