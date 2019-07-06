//random Color 
var randomColor = (function(){
  var golden_ratio_conjugate = 0.618033988749895;
  var h = Math.random();

  var hslToRgb = function (h, s, l){
      var r, g, b;

      if(s == 0){
          r = g = b = l; // achromatic
      }else{
          function hue2rgb(p, q, t){
              if(t < 0) t += 1;
              if(t > 1) t -= 1;
              if(t < 1/6) return p + (q - p) * 6 * t;
              if(t < 1/2) return q;
              if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
              return p;
          }

          var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          var p = 2 * l - q;
          r = hue2rgb(p, q, h + 1/3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1/3);
      }

      return '#'+Math.round(r * 255).toString(16)+Math.round(g * 255).toString(16)+Math.round(b * 255).toString(16);
  };
  
  return function(){
    h += golden_ratio_conjugate;
    h %= 1;
    return hslToRgb(h, 0.5, 0.60);
  };
})();



function round(value,decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}
  var selectedArray = [];
  var depthArr = document.getElementById('depthArr').value,
      newDepth = depthArr.split(',');
  
  var minValDepth = Math.min.apply(Math, newDepth),
      maxValDepth = Math.max.apply(Math, newDepth);
function plotD(maxH, plotData) {
    // set the dimensions and margins of the graph
var Area1 = document.getElementById('Area1');
Area1.innerHTML = '';
var margin = {top: 10, right: 40, bottom: 30, left: 30},
      width = 520 - margin.left - margin.right,
      height = maxH - margin.top - margin.bottom;
    
var svg = d3.select("#Area1")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    // translate this svg element to leave some margin.
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");     
  
  var yscl = d3.scaleLinear()
      .domain([maxValDepth, minValDepth])        
      .range([height, 0]);

      svg
    .append('g')
    .attr("transform", "translate(0," + 30 + ")")
    .call(d3.axisLeft(yscl).tickSize(-height*1.1).ticks(100));

    var xscl = d3.scaleLinear()
    .domain([0, 200])        
    .range([0, 450]); 

    svg
    .append('g')
    .attr("transform", "translate(0," + 30 + ")")
    .attr("font-size", "12")
    .call(d3.axisTop(xscl).tickSize(-height*1.1).ticks(10).tickFormat(""));
  
  
    svg.selectAll("line").attr("stroke", "#EBEBEB").transition().duration(500);
  plotData.forEach(headerArrayNew => {
    
  var xdata = headerArrayNew;
  var ydata = newDepth;


  var xy = []; // start empty, add each element one at a time
  for(var i = 0; i < xdata.length; i++ ) {
     xy.push({x: xdata[i], y: ydata[i]});
  }

  var maxW = Math.max.apply(Math, headerArrayNew);
  if (maxW < 0) {
    maxW = Math.min.apply(Math, headerArrayNew);
  }

  var xscl = d3.scaleLinear()
      .domain([0, maxW])        
      .range([0, width]); 

      svg
      .append('g')
      .attr("transform", "translate(0," + 30 + ")")
      .attr("position", "relative")
      .call(d3.axisTop(xscl));
      
  var myline = d3.line()
    .x(function(d) { return xscl(d.x);}) 
    .y(function(d) { return yscl(d.y);}) 
  
  
  svg.append("path")
      .attr("class", "line") // attributes given one at a time
      .attr("d", myline(xy)) // use the value of myline(xy) as the data, 'd'
      .style("fill", "none")
      .style("stroke", randomColor)
      .attr("transform", "translate(0," + 30 + ")")
      .style("stroke-width", 1.2);
      svg.selectAll("line path.domain").attr("stroke", "#EBEBEB").transition().duration(500);
  });
  
  }
  /*
  function printLog () {
    var restorePage = document.body.innerHTML;
    var printedDiv = document.getElementById('Area').innerHTML;
    document.body.innerHTML = printedDiv;
    window.print();
    document.body.innerHTML = restorePage;
  }
  */
 /*
  var customRange1 = document.getElementById('customRange1');
  
  customRange1.onchange = function() {
    var area = document.getElementById('Area');
    area.innerHTML = '';
    var newMaxHeader = maxValHeader / customRange2.value;
    plotD(newMaxHeader, customRange1.value);
  }
  
  customRange2.onchange = function() {
    var area = document.getElementById('Area');
    area.innerHTML = '';
    var newMaxHeader = maxValHeader / customRange2.value;
    plotD(newMaxHeader, customRange1.value);
  }
  */
  /*
  //Scroll effect
  window.onscroll = function () {
    var plotSetting = document.getElementById('plotSetting');
    'use strict';
      var posit = document.documentElement.scrollTop;
      console.log(posit);
      if (posit >= 75 ) {
          plotSetting.classList.add('cus-fixed');
      }
      else {
          plotSetting.classList.remove('cus-fixed');
      }
  
  };
  */

 function check() {
    document.getElementById('Area1').innerHTML = ''
    var headers = document.getElementById('headers').value.split(',');  
    $(document).ready(function() {
      $(":checked").each(function(){
        selectedArray.push($(this).val());
      });
      var uniqSelectedArray = [...new Set(selectedArray)];
      if(uniqSelectedArray.length > 0) {
        var plotData = [];

        var Area1 = document.getElementById('Area1');
        Area1.innerHTML = '';

        uniqSelectedArray.forEach(header => {
          var headerArray = document.getElementById(header).value.split(',');
          plotData.push(headerArray);
        });
        console.log(plotData);
      }
      plotD(3000, plotData);
  });
    
 }
plotD(2000, []);
 /*
  
*/

//Scroll effect
window.onscroll = function () {
  var plotSetting = document.getElementById('plotSetting');
  'use strict';
    var posit = document.documentElement.scrollTop;
    console.log(posit);
    if (posit >= 75 ) {
        plotSetting.classList.add('cus-fixed-multi');
    }
    else {
        plotSetting.classList.remove('cus-fixed-multi');
    }

};
