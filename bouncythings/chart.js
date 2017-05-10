const g = 9.8;


require(['node_modules/chart.js/dist/Chart.min.js',
    'node_modules/mathjs/dist/math.min.js'
], function(Chart, math) {
    var myChart;

    $(".form-control").blur(() => {
        updateGraph();
    });

    function updateGraph() {
        myChart.data.datasets[0].data = getData().exact;
        approxChart.data.datasets[0].data = getData().approx;
        myChart.update(500);
        approxChart.update(500);
    }

    function getData() {
        var startingAngle = math.eval($('#startingAngle').val());
        var length = math.eval($('#length').val());
        var stepSize = math.eval($('#stepSize').val());
        var duration = math.eval($('#duration').val());

        var data = {
            exact: generateData(startingAngle, length, stepSize, duration),
            approx: generateApprox(startingAngle, length, stepSize, duration)
        }

        return data;
    }

    var ctx = $("#myChart");
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Angle',
                data: getData().exact
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom'
                }]
            }
        }
    });

    var approx = $("#approxChart"); 
    approxChart = new Chart(approx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Angle',
                data: getData().approx
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom'
                }]
            }
        }
    })
})



function generateData(startingAngle, L, stepSize, duration) {
    var data = [{
        x: 0,
        y: startingAngle
    }]

    var oscillations = duration / stepSize;
    var angle = [];
    angle[0] = startingAngle;
    var velocity = [];
    velocity[0] = 0;

    var time = 0
    for (var i = 1; i < (oscillations); i++) {
        var accel = -g / L * Math.sin(angle[i - 1]);
        var deltaV = accel * stepSize;
        velocity[i] = velocity[i - 1] + deltaV;
        var deltaTheta = velocity[i] * stepSize;
        angle[i] = angle[i - 1] + deltaTheta;
        time += stepSize;

        data[i] = {
            x: time,
            y: angle[i]
        }
    }
    return data;
}

function generateApprox(startingAngle, L, stepSize, duration) {
    var data = [{
        x: 0,
        y: startingAngle
    }]

    var oscillations = duration / stepSize;

    var time = 0;

    for (var i = 1; i < (oscillations); i++) {
        time += stepSize;
        data[i] = {
            x: time,
            y: startingAngle * Math.cos(Math.sqrt(g / L) * time)
        }
    }

    return data;
}
