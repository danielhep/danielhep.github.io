require(['node_modules/chart.js/dist/Chart.min.js', 
        'node_modules/mathjs/dist/math.min.js'], function(Chart, math) {
            var myChart;

    $(".form-control").blur(() => {
        var startingAngle = math.eval($('#startingAngle').val());
        var length = math.eval($('#length').val());
        var stepSize = math.eval($('#stepSize').val());
        var duration = math.eval($('#duration').val());

        var data = generateData(startingAngle, length, stepSize, duration)

        myChart.data.datasets[0].data = data;
        myChart.update(500);
    }); 


    var ctx = $("#myChart");
    var data = generateData(1.047, 1, .01, 5)
    myChart = new Chart(ctx, {
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
