
function colorPtags(color) {
    let ps = document.getElementsByTagName("p");
    for (let i = 0; i < ps.length; i++) {
        let ptag = ps[i];
        ptag.style.color = color;
    }
}
let button = document.getElementById("button");
