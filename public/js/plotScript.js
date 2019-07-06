var depthArr = document.getElementById('depthArr').value,
        newDepth = depthArr.split(',');
    var headerArr = document.getElementById('headerArr').value,
        header = document.getElementById('header').value,
        newHeader = headerArr.split(',');

    var trace = {
        x: headerArr,
        y: depthArr,
        mode: 'lines',
        line: {
            color: '#333'
        }
    }

    var layout = {
        title: header,
        autosize: true, 
        xaxis: {
            showgrid: true,
            showline: true,
            mirror: 'trick',
            gridcolor: '#bdbdbd',
            gridwidth: 1,
            side: 'top'
        },
        yaxis: {
            showgrid: true,
            showline: true,
            mirror: 'trick',
            gridcolor:"#bdbdbd",
            gridwidth: 'top'
        }
    }

    var data = [trace];
    plotly.newPlot('myPlot', data, layout);