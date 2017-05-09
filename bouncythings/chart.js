require(['node_modules/chart.js/dist/Chart.min.js'], function(Chart) {
    var ctx = $("#myChart");
    var data = generateData(1.047, 1, .01, 5)
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Angle',
                data: data
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

    var g = 9.8;

    var time = 0
    for (var i = 1; i < (oscillations + 1); i++) {
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
