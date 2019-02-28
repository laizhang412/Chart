<template>
    <div>
        <h3>Line</h3>
        <canvas id="trafficBar"></canvas>
        
        <h3>Pie</h3>
        <canvas id="languagePie"></canvas>
        
        <h3>Dounut</h3>
        <chartjs-doughnut 
            :labels="dounutLabels" 
            :datasets="dounutDataSets" 
            :option="dounutOptions">
        </chartjs-doughnut> 
        
        <h3>Polar</h3>
        <chartjs-polar-area 
            :labels="polarLabels" 
            :datasets="polarDatasets">
        </chartjs-polar-area>

        <h3>Radar</h3>
        <chartjs-radar 
            :datalabel="radarTitle" 
            :labels="radarLabels" 
            :data="radarData">
        </chartjs-radar>
    </div>
</template>

<script>
import Chart from 'chart.js'
export default {
data () {
    return {
        //Way 2 of creating chart: directly creating data here
        //Dounut Chart Test Data
        dounutLabels: ["Red", "Blue", "Yellow"],
        dounutDataSets:[{
            data: [300, 50, 100],
            backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ],
            hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ]
        }],
        dounutOptions:{
            responsive:true,
            maintainAspectRatio:true,
            title: {
                display: true,
                position: 'bottom',
                text: 'Custom Chart Title'
            }
        },


        //Polar Area Test Data
        polarLabels: ["Red", "Green", "Yellow", "Grey", "Blue"],
        polarDatasets:[{
            data: [11, 16, 7, 3, 14],
            backgroundColor: [
                "#FF6384",
                "#4BC0C0",
                "#FFCE56",
                "#E7E9ED",
                "#36A2EB"
            ],
            label: 'My dataset' 
        }],


        //Radar Chart Test Data
        radarTitle : 'TestDataLabel',
        radarLabels : ['happy', 'myhappy', 'hello'],
        radarData : [100, 40, 60],

        generateRandomNumbers (numbers, max, min) {
            var a = []
            for (var i = 0; i < numbers; i++) {
                a.push(Math.floor(Math.random() * (max - min + 1)) + max)
            }
            return a
        }
    }
},

computed:{
    coPilotNumbers () {
      return this.generateRandomNumbers(12, 1000000, 10000)
    },
    personalNumbers () {
      return this.generateRandomNumbers(12, 1000000, 10000)
    },
    isMobile () {
        return (window.innerWidth <= 800 && window.innerHeight <= 600)
    },
    pieData (){
        return [56.6, 37.7, 4.1]
    },
    pieSubData(){
        return [[243,345,783],[64,531,357],[366,12,489,]]
    }

},
mounted () {
    //Way 1 of creating chart
    //Line Chart
    var ctx = document.getElementById('trafficBar')
    var lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 
            'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [{
                label: 'CoPilot',
                fill: false,
                borderColor: '#284184',
                pointBackgroundColor: '#284184',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                data: this.coPilotNumbers
            }, {
                label: 'Personal Site',
                borderColor: '#4BC0C0',
                pointBackgroundColor: '#4BC0C0',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                data: this.personalNumbers
            }]
        },
        options: {
            onClick: (event)=>{console.log(lineChart.getElementAtEvent(event))}
        }
    });
    

    //Pie Chart
    var pieChartCanvas = document.getElementById('languagePie')
    var pieConfig = {
        type: 'pie',
        data: {
            labels: ['HTML', 'JavaScript', 'CSS'],
            datasets: [{
                data: this.pieData,
                backgroundColor: ['#00a65a', '#f39c12', '#00c0ef'],
                hoverBackgroundColor: ['#00a65a', '#f39c12', '#00c0ef']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: !this.isMobile,
            legend: {
                position: 'bottom',
                display: true
            },
            onClick: (event)=>{
                var ele = pieChart.getElementAtEvent(event)[0]
                if(ele)
                    pieConfig.data.datasets[0].data=this.pieSubData[ele._index]
                else
                    pieConfig.data.datasets[0].data=this.pieData
                pieChart.update();
            }
            
        }
    }
    var pieChart = new Chart(pieChartCanvas, pieConfig) 
    
}
}
</script>
