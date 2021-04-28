


const intrototitle = document.getElementById('intrototitle');
const intrototitleInnerHTML = intrototitle.innerHTML
    .split(/<br>\s*/i)
    .map((text, i) => '<p style="animation-delay:' + (400 * i) + 'ms">' + text + '</p>')
    .join('');

intrototitle.innerHTML = intrototitleInnerHTML;

const target = document.getElementById('target');
const targetInnerHTML = target.innerHTML
    .split(/<br>\s*/i)
    .map((text, i) => '<p style="animation-delay:' + (2000 * i + 1000) + 'ms">' + text + '</p>')
    .join('');

target.innerHTML = targetInnerHTML;

const introdensity = document.getElementById('introdensity');
const introdensityInnerHTML = introdensity.innerHTML
    .split(/<br>\s*/i)
    .map((text, i) => '<p style="animation-delay:' + (2000 * i + 1000) + 'ms">' + text + '</p>')
    .join('');

introdensity.innerHTML = introdensityInnerHTML;

const densitystyle = document.getElementById('densitystyle');
const densitystyleInnerHTML = densitystyle.innerHTML
    .split(/<br>\s*/i)
    .map((text, i) => '<p style="animation-delay:' + (2000 * i + 8000) + 'ms">' + text + '</p>')
    .join('');

densitystyle.innerHTML = densitystyleInnerHTML;

const forcegraphstart = document.getElementById('forcegraphstart');
const forcegraphstartInnerHTML = forcegraphstart.innerHTML
    .split(/<br>\s*/i)
    .map((text, i) => '<p style="animation-delay:' + (2000 * i) + 'ms">' + text + '</p>')
    .join('');

forcegraphstart.innerHTML = forcegraphstartInnerHTML;

var scrollpos = window.scrollY;

document.addEventListener("scroll", function () { showFunction() });

function showFunction() {
    if (document.documentElement.scrollTop > 300) {
        document.getElementById("target").style.display = "block";
    } else {
        document.getElementById("target").style.display = "none";
    }

    // if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    //     document.getElementById("introdensity").style.display = "block";
    // } else {
    //     document.getElementById("introdensity").style.display = "none";
    // }

}

// document.addEventListener("scroll", showtwoFunction());

// function showtwoFunction() {
//     if (document.documentElement.scrollTop > 400) {
//         document.getElementById("introdensity").style.display = "block";
//     } else {
//         document.getElementById("introdensity").style.display = "none";
//     }

// }

// document.addEventListener("scroll", showtwoFunction());

// function showtwoFunction() {
//     if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
//         document.getElementById("introdensity").style.display = "block";
//     } else {
//         document.getElementById("introdensity").style.display = "none";
//     }

// }

// window.addEventListener("scroll", function () { showFunction() });
// scrollpos = window.scrollY;
// function showFunction() {


//     if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
//         document.getElementById("introdensity").style.display = "block";
//     } else {
//         document.getElementById("introdensity").style.display = "none";
//     }

// }


// var scrollpos = window.scrollY;
// var header = document.getElementById("target");

// function add_class_on_scroll() {
//     header.classList.add("fade-in");
// }

// function remove_class_on_scroll() {
//     header.classList.remove("fade-in");
// }

// window.addEventListener('scroll', function () {
//     //Here you forgot to update the value
//     scrollpos = window.scrollY;

//     if (scrollpos > 500) {
//         add_class_on_scroll();
//     }
//     else {
//         remove_class_on_scroll();
//     }
//     console.log(scrollpos);
// });






