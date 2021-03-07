let w = 1200;
let h = 800;

let viz = d3.select('#container')
    .append('svg')
    .attr('id', 'viz')
    .attr("width", w)
    .attr("height", h)
    // .style("background-color", "ffe8d6")
    ;

d3.json('data.json').then(gotData);

//set the inside

function gotData(incomingData) {

    let sunmoonshape = '<g class="sunmoonShape"><defs><radialGradient id="radial-gradient" cx="347.49" cy="363.19" r="135.48" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#822300"/><stop offset="0.18" stop-color="#852300"/><stop offset="0.33" stop-color="#902200"/><stop offset="0.47" stop-color="#a12100"/><stop offset="0.61" stop-color="#b92000"/><stop offset="0.64" stop-color="#bf2000"/><stop offset="0.77" stop-color="#bf2202"/><stop offset="0.82" stop-color="#c12809"/><stop offset="0.86" stop-color="#c43214"/><stop offset="0.88" stop-color="#c84125"/><stop offset="0.91" stop-color="#ce543b"/><stop offset="0.93" stop-color="#d56c57"/><stop offset="0.95" stop-color="#d87"/><stop offset="0.97" stop-color="#e6a99d"/><stop offset="0.98" stop-color="#f1cfc8"/><stop offset="1" stop-color="#fdf7f6"/><stop offset="1" stop-color="#fff"/></radialGradient><linearGradient id="linear-gradient" x1="478.41" y1="268.03" x2="486.92" y2="85.27" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"/><stop offset="0" stop-color="#fdfdfd"/><stop offset="0.01" stop-color="#f2f2f2"/><stop offset="0.02" stop-color="#ebebeb"/><stop offset="0.05" stop-color="#e9e9e9"/><stop offset="0.18" stop-color="#dba89e"/><stop offset="0.3" stop-color="#cf6e5a"/><stop offset="0.4" stop-color="#c64429"/><stop offset="0.47" stop-color="#c12a0b"/><stop offset="0.52" stop-color="#bf2000"/><stop offset="1" stop-color="#822300"/></linearGradient><linearGradient id="linear-gradient-2" x1="477.92" y1="256.77" x2="485.58" y2="92.05" gradientTransform="translate(-117.88 191.57) rotate(-20)" xlink:href="#linear-gradient"/><linearGradient id="linear-gradient-3" x1="478.44" y1="257.33" x2="486.1" y2="92.61" gradientTransform="translate(-163.14 411.91) rotate(-40)" xlink:href="#linear-gradient"/><linearGradient id="linear-gradient-4" x1="478.74" y1="258.03" x2="486.4" y2="93.31" gradientTransform="matrix(0.5, -0.87, 0.87, 0.5, -130.3, 634.44)" xlink:href="#linear-gradient"/><linearGradient id="linear-gradient-5" x1="478.78" y1="258.79" x2="486.44" y2="94.07" gradientTransform="translate(-23.34 832.32) rotate(-80)" xlink:href="#linear-gradient"/><linearGradient id="linear-gradient-6" x1="478.56" y1="259.52" x2="486.22" y2="94.8" gradientTransform="translate(144.86 981.68) rotate(-100)" xlink:href="#linear-gradient"/><linearGradient id="linear-gradient-7" x1="478.11" y1="260.13" x2="485.77" y2="95.41" gradientTransform="matrix(-0.5, -0.87, 0.87, -0.5, 353.99, 1064.5)" xlink:href="#linear-gradient"/><linearGradient id="linear-gradient-8" x1="477.47" y1="260.54" x2="485.13" y2="95.82" gradientTransform="matrix(-0.77, -0.64, 0.64, -0.77, 578.84, 1070.81)" xlink:href="#linear-gradient"/><linearGradient id="linear-gradient-9" x1="476.73" y1="260.72" x2="484.39" y2="96" gradientTransform="translate(792.28 999.83) rotate(-160)" xlink:href="#linear-gradient"/><linearGradient id="linear-gradient-10" x1="475.97" y1="269.24" x2="483.63" y2="104.52" gradientTransform="translate(968.58 860.13) rotate(180)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"/><stop offset="0" stop-color="#fdfdfd"/><stop offset="0.01" stop-color="#f2f2f2"/><stop offset="0.02" stop-color="#ebebeb"/><stop offset="0.05" stop-color="#e9e9e9"/><stop offset="0.18" stop-color="#ede49e"/><stop offset="0.3" stop-color="#f1e05a"/><stop offset="0.4" stop-color="#f4dd29"/><stop offset="0.47" stop-color="#f5db0b"/><stop offset="0.52" stop-color="#f6da00"/><stop offset="1" stop-color="#ffb200"/></linearGradient><linearGradient id="linear-gradient-11" x1="471.21" y1="271.5" x2="478.87" y2="106.78" gradientTransform="translate(1086.47 668.56) rotate(160)" xlink:href="#linear-gradient-10"/><linearGradient id="linear-gradient-12" x1="475.25" y1="266.38" x2="482.91" y2="101.66" gradientTransform="translate(1131.72 448.22) rotate(140)" xlink:href="#linear-gradient-10"/><linearGradient id="linear-gradient-13" x1="476.31" y1="262.2" x2="483.97" y2="97.49" gradientTransform="matrix(-0.5, 0.87, -0.87, -0.5, 1098.88, 225.69)" xlink:href="#linear-gradient-10"/><linearGradient id="linear-gradient-14" x1="474.9" y1="260.93" x2="482.56" y2="96.21" gradientTransform="translate(991.92 27.81) rotate(100)" xlink:href="#linear-gradient-10"/><linearGradient id="linear-gradient-15" x1="474.41" y1="258.91" x2="482.07" y2="94.19" gradientTransform="translate(823.73 -121.55) rotate(80)" xlink:href="#linear-gradient-10"/><linearGradient id="linear-gradient-16" x1="473.14" y1="260.33" x2="480.8" y2="95.61" gradientTransform="matrix(0.5, 0.87, -0.87, 0.5, 614.59, -204.38)" xlink:href="#linear-gradient-10"/><linearGradient id="linear-gradient-17" x1="472.17" y1="265.37" x2="479.83" y2="100.65" gradientTransform="matrix(0.77, 0.64, -0.64, 0.77, 389.74, -210.68)" xlink:href="#linear-gradient-10"/><linearGradient id="linear-gradient-18" x1="478.3" y1="261.31" x2="485.96" y2="96.59" gradientTransform="matrix(0.94, 0.34, -0.37, 1.01, 183.2, -158.67)" xlink:href="#linear-gradient-10"/><linearGradient id="linear-gradient-19" x1="-309.54" y1="301.52" x2="-297.09" y2="564.62" gradientTransform="matrix(-1, 0, 0, 1, 233.13, 0)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff" stop-opacity="0.2"/><stop offset="0" stop-color="#fffdf7" stop-opacity="0.22"/><stop offset="0.01" stop-color="#fff1c4" stop-opacity="0.39"/><stop offset="0.02" stop-color="#ffe695" stop-opacity="0.53"/><stop offset="0.03" stop-color="#ffdd6c" stop-opacity="0.66"/><stop offset="0.04" stop-color="#ffd54a" stop-opacity="0.77"/><stop offset="0.05" stop-color="#ffcf2f" stop-opacity="0.85"/><stop offset="0.07" stop-color="#ffca1a" stop-opacity="0.92"/><stop offset="0.09" stop-color="#ffc70b" stop-opacity="0.97"/><stop offset="0.12" stop-color="#ffc502" stop-opacity="0.99"/><stop offset="0.19" stop-color="#ffc400"/><stop offset="0.86" stop-color="#ffb700"/><stop offset="0.91" stop-color="#ffb600"/><stop offset="0.92" stop-color="#ffb704" stop-opacity="0.99"/><stop offset="0.93" stop-color="#ffba0f" stop-opacity="0.95"/><stop offset="0.95" stop-color="#ffc023" stop-opacity="0.88"/><stop offset="0.96" stop-color="#ffc83e" stop-opacity="0.78"/><stop offset="0.97" stop-color="#ffd262" stop-opacity="0.66"/><stop offset="0.98" stop-color="#ffde8d" stop-opacity="0.5"/><stop offset="0.99" stop-color="#ffedc1" stop-opacity="0.32"/><stop offset="1" stop-color="#fffefb" stop-opacity="0.12"/><stop offset="1" stop-color="#fff" stop-opacity="0.1"/></linearGradient><radialGradient id="radial-gradient-2" cx="170.22" cy="862.05" r="0" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#822300"/><stop offset="0.18" stop-color="#852300"/><stop offset="0.33" stop-color="#902200"/><stop offset="0.47" stop-color="#a12100"/><stop offset="0.61" stop-color="#b92000"/><stop offset="0.64" stop-color="#bf2000"/><stop offset="0.68" stop-color="#c02404"/><stop offset="0.72" stop-color="#c32f11"/><stop offset="0.77" stop-color="#c84125"/><stop offset="0.82" stop-color="#d05a43"/><stop offset="0.87" stop-color="#d97b68"/><stop offset="0.91" stop-color="#e5a396"/><stop offset="0.96" stop-color="#f2d2cc"/><stop offset="1" stop-color="#fff"/></radialGradient></defs><title>Untitled-5</title><circle class="cls-1" cx="347.49" cy="363.19" r="135.48"/><path class="cls-2" d="M476.19,93s14.52,21,16.13,51.61-6.45,38.71-8.06,58.07,16.62,60.48,15.71,61.29" transform="translate(-136.08 -66.87)"/><path class="cls-3" d="M478.29,66.87c-3.06,0,12,16.65,9.72,44.71-2.44,30.2-29.93,61.38-30.68,111.49-.25,16.77,16.39,46.53,16.39,64.55h27c0-18.25-16.9-48.24-17.16-65.2-.75-49.88,23.16-80.84,20.73-110.92C502.05,83.49,481.35,66.87,478.29,66.87Z" transform="translate(-136.08 -66.87)"/><path class="cls-4" d="M356.92,99.07c-2.59.94,15.29,10.4,22,34.87,7.24,26.33-6.43,61.21,8.38,103.88,5,14.28,28.22,34.36,33.77,49.62L444,279.1c-5.63-15.45-29.18-35.64-34.63-49.92-16-42-5.31-75.61-16.64-100.33C382.17,105.82,359.52,98.13,356.92,99.07Z" transform="translate(-136.08 -66.87)"/><path class="cls-5" d="M252.15,162.68c-2.11,1.78,17.93,4.55,32.62,25.24,15.81,22.27,14.89,59.72,43.41,94.75,9.54,11.72,38.26,22.64,48.7,35.07l18.66-15.66C385,289.49,355.93,278.57,345.93,267c-29.42-34-30.85-69.23-49.95-88.59C278.19,160.39,254.27,160.91,252.15,162.68Z" transform="translate(-136.08 -66.87)"/><path class="cls-6" d="M175.46,258.3c-1.38,2.39,18.4-1.86,39.28,12.56,22.47,15.51,34.42,51,73.2,74.19,13,7.74,43.7,8.18,57.76,16.3l12.18-21.1c-14.25-8.23-45.26-8.55-58.62-16C260,302.36,246.6,269.75,222,258.09,199.14,247.24,176.84,255.91,175.46,258.3Z" transform="translate(-136.08 -66.87)"/><path class="cls-7" d="M136.09,374.37c-.48,2.72,16.66-8,41.21-1.63,26.42,6.89,49.79,36.18,94.16,44.68,14.84,2.85,43.86-7.26,59.85-4.44l4.23-24c-16.2-2.86-45.46,7.45-60.55,5-44.4-7.14-68.13-33.21-95.21-35.75C154.56,355.88,136.57,371.65,136.09,374.37Z" transform="translate(-136.08 -66.87)"/><path class="cls-8" d="M138.8,496.91c.48,2.72,12.9-13.24,38.16-15.62,27.19-2.56,59.16,17,103.76,9.78,14.92-2.4,38.74-21.82,54.73-24.64l-4.23-24C315,445.29,291.05,465,276,467.86c-44.16,8.48-75.38-7.9-101.7-1C149.83,473.22,138.32,494.2,138.8,496.91Z" transform="translate(-136.08 -66.87)"/><path class="cls-9" d="M183.25,611.14c1.38,2.39,7.6-16.86,30.52-27.74,24.68-11.71,61.4-4.29,100.85-26.3,13.2-7.36,28.94-33.75,43-41.87l-12.18-21.1c-14.25,8.23-30,34.93-43.16,42.77-38.6,23.07-73.54,18.36-95.92,33.81C185.52,585.1,181.87,608.75,183.25,611.14Z" transform="translate(-136.08 -66.87)"/><path class="cls-10" d="M264.09,703.27c2.12,1.77,1.37-18.44,19.2-36.5,19.18-19.44,56.22-25,85.77-59.21,9.88-11.42,15.64-41.61,26.08-54l-18.66-15.66c-10.57,12.6-16.28,43.09-25.93,54.95-28.38,34.88-62.82,42.4-78.57,64.58C257.32,678,262,701.5,264.09,703.27Z" transform="translate(-136.08 -66.87)"/><path class="cls-11" d="M371.57,762.19c2.6.95-5-17.79,5.55-40.86,11.38-24.83,44.27-42.75,60.35-85,5.38-14.12.47-44.45,6-59.71l-22.89-8.33c-5.62,15.45-.55,46.06-5.57,60.5-14.74,42.48-44.53,61.33-51.74,87.55C356.57,740.8,369,761.25,371.57,762.19Z" transform="translate(-136.08 -66.87)"/><path class="cls-12" d="M492.72,772.2c2.76,0-10.8-15-8.76-40.3,2.2-27.22,27-55.32,27.65-100.49.23-15.1-14.76-41.93-14.76-58.17H472.48c0,16.45,15.23,43.47,15.47,58.76.67,45-20.88,72.86-18.69,100C471.31,757.22,490,772.2,492.72,772.2Z" transform="translate(-136.08 -66.87)"/><path class="cls-13" d="M612.93,744.92c2.59-.94-15.28-10.4-22-34.87-7.24-26.33,6.44-61.21-8.38-103.88-5-14.28-28.22-34.36-33.77-49.62l-22.89,8.34c5.62,15.45,29.18,35.64,34.62,49.92,16,42,5.31,75.61,16.64,100.33C587.68,738.17,610.34,745.86,612.93,744.92Z" transform="translate(-136.08 -66.87)"/><path class="cls-14" d="M713.06,688.46c2.11-1.78-17.93-4.55-32.62-25.24C664.63,641,665.55,603.5,637,568.47c-9.54-11.72-38.26-22.63-48.7-35.07l-18.66,15.66c10.57,12.6,39.61,23.51,49.61,35.07,29.42,34,30.85,69.23,50,88.59C687,690.75,710.94,690.23,713.06,688.46Z" transform="translate(-136.08 -66.87)"/><path class="cls-15" d="M790.72,597.64c1.38-2.39-18.39,1.85-39.28-12.56-22.47-15.52-34.41-51-73.19-74.19-13-7.75-43.7-8.18-57.77-16.3L608.3,515.68c14.25,8.23,45.27,8.55,58.62,16,39.28,21.9,52.67,54.51,77.24,66.17C767,608.69,789.34,600,790.72,597.64Z" transform="translate(-136.08 -66.87)"/><path class="cls-16" d="M831.06,481.56c.48-2.72-16.65,8-41.21,1.63-26.42-6.89-49.79-36.17-94.16-44.68-14.84-2.84-43.86,7.26-59.85,4.44l-4.23,24c16.2,2.86,45.46-7.45,60.55-5,44.4,7.14,68.13,33.21,95.21,35.76C812.59,500.05,830.58,484.28,831.06,481.56Z" transform="translate(-136.08 -66.87)"/><path class="cls-17" d="M829.66,359c-.48-2.72-12.9,13.25-38.17,15.62-27.19,2.57-59.16-17-103.76-9.78C672.81,367.27,649,386.69,633,389.51l4.23,24c16.2-2.86,40.17-22.55,55.18-25.43,44.16-8.48,75.38,7.9,101.7,1C818.63,382.71,830.14,361.74,829.66,359Z" transform="translate(-136.08 -66.87)"/><path class="cls-18" d="M782.67,244.8c-1.38-2.4-7.6,16.85-30.52,27.73-24.68,11.71-61.4,4.3-100.85,26.3-13.2,7.36-28.93,33.75-43,41.87l12.18,21.1c14.25-8.23,30-34.93,43.16-42.77,38.6-23.07,73.54-18.36,95.92-33.81C780.4,270.83,784.05,247.18,782.67,244.8Z" transform="translate(-136.08 -66.87)"/><path class="cls-19" d="M697.33,157.15c-2.12-1.78-1.37,18.44-19.19,36.5-19.19,19.44-56.23,25-85.78,59.2-9.88,11.43-15.64,41.62-26.08,54l18.66,15.66c10.58-12.6,16.28-43.09,25.93-54.95,28.38-34.87,62.82-42.4,78.57-64.57C704.1,182.39,699.44,158.92,697.33,157.15Z" transform="translate(-136.08 -66.87)"/><path class="cls-20" d="M603.21,85.5c-2.6-1,4.64,18.81-6.55,43.6-12,26.68-45.64,46.52-62.84,91.8-5.75,15.15-1.51,47.31-7.46,63.67l22.89,8.34c6-16.58,1.63-49,7-64.5,15.86-45.54,46.34-66.29,54.22-94.35C617.84,107.91,605.8,86.44,603.21,85.5Z" transform="translate(-136.08 -66.87)"/><path class="cls-21" d="M457.82,562.62a135.49,135.49,0,1,0,0-265.11,135.52,135.52,0,0,1,0,265.11Z" transform="translate(-136.08 -66.87)"/><path class="cls-22" d="M170.22,862.05Z" transform="translate(-136.08 -66.87)"/></g > '






    let datagroups = viz.selectAll('.datagroup').data(incomingData).enter()
        .append('g')
        .attr('class', 'datagroup')
        ;

    let backzerogroundlayer = viz.append('g')
        .attr('class', 'backzerogroundlayer')
        ;
    let forgroundlayer = viz.append('g')
        .attr('class', 'forgroundlayer')
        ;


    function whatcrackerIsee(datapoint) {
        if (datapoint.what == 'firecrack') {
            return sunmoonshape;
        }
    }


    backzerogroundlayer.append('rect')
        .attr("x", 0)
        .attr("y", 0)
        .attr('width', 600)
        .attr('height', 800)
        .attr('fill', "#f8edeb");

    backzerogroundlayer.append('rect')
        .attr("x", 600)
        .attr("y", 0)
        .attr('width', 600)
        .attr('height', 800)
        .attr('fill', "#161a1d");





    forgroundlayer.html(whatcrackerIsee).select('.sunmoonShape')
        .attr("transform", "scale(10) translate(30,30)")
        ;






}
