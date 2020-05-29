<template>
    <div class='chart-operate'>
        <div class='chart-option'>
            <a-select default-value='state' size='small' @change='handleSelectChange'>
                <a-select-option value='state'>state analyze</a-select-option>
                <a-select-option value='label'>label analyze</a-select-option>
            </a-select>
            <a-button
                size='small'
                class='draw-button'
                @click='handleDraw'
            >draw</a-button>
        </div>
        <div class='chart-canvas'>
            <div id='chart'></div>
        </div>
    </div>
</template>

<script>
import Echarts from 'echarts'
export default {
    props: {
        allTasks: Array
    },
    data(){
        return {
            chartType: 'state'
        }
    },
    computed: {
        stateAnalyze: function(){
            let todoCount = this.allTasks.filter(item=>item.state=='todo').length;
            let doingCount = this.allTasks.filter(item=>item.state=='doing').length;
            let doneCount = this.allTasks.filter(item=>item.state=='done').length;
            return [todoCount,doingCount,doneCount]
        },
        labelAnalyze: function(){
            let map = new Map();
            for(let i=0; i<this.allTasks.length; i++){
                let item = this.allTasks[i];
                let label = item.label
                if(map.has(label)){
                    let cur = map.get(label);
                    map.set(label, cur+1)
                }else{
                    map.set(label, 1)
                }
            }
            return map;
        }
    },
    methods: {
        handleSelectChange: function(value){
            this.chartType = value;
            
        },
        handleDraw: function(){
            if(this.chartType=='state'){
                this.drawChart('state analyze chart',['todo','doing','done'],this.stateAnalyze);
            }else{
                let xData = Array.from(this.labelAnalyze.keys());
                let yData = Array.from(this.labelAnalyze.values());
                this.drawChart('label analyze chart',xData,yData);
            }       
        },
        drawChart: function(titleName,xData,yData){
            var myChart = Echarts.init(document.getElementById('chart'));
            myChart.setOption({
                title: {
                    show: false,
                    text: titleName,
                    textStyle: {
                        fontSize: 15,
                        fontWeight: 500,
                    }
                },
                tooltip: {},
                xAxis: {
                    data: xData
                },
                yAxis: {},
                series: [{
                    name: 'count',
                    type: 'bar',
                    data: yData
                }]
            });
        }
    }
}
</script>

<style scoped>
.chart-operate{
    padding: 0 6px;
    font-size: 15px;
    font-weight: 500;
}
.chart-operate .chart-option .draw-button{
    font-weight: 500;
    margin-left: 5px;
}
#chart{
    /* width: 200px; */
    height: 200px;

}
</style>