<template>
    <div class='label-control'>
        <div class='label-control-title'>
            <a-icon type="tags" />
            <span>Labels</span>
        </div>
        <div class='label-control-content'>
            <div class='label-control-content-box'>
                <div
                    class='label-control-label'
                    v-for='label of labelMapColor'
                    :key='label[0]'
                    :style='{backgroundColor:label[1]}'
                >{{ label[0] }}</div>
                <a-button
                    type="default" 
                    @click='showLabelInput'
                    size='small'
                >+</a-button>
            </div>
            <div v-if='showInput'>
                <a-input 
                    size='small'
                    v-model='newLabelName'
                />
                <a-input 
                    size='small'
                    type='color'
                    v-model='newLabelColor'
                />
                <a-button
                    @click='handleNewLabel'
                    size='small'
                >add</a-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        labelMapColor: Map,
        addNewLabel: Function
    },
    data(){
        return {
            newLabelName: '',
            newLabelColor: '#ffffff',
            showInput: false
        }
    },
    methods: {
        showLabelInput: function(){
            this.showInput = true;
        },
        handleNewLabel: function(){
            //console.log(this.newLabelName,this.newLabelColor);
            //检查label、color是否重复
            let colors = [], labels = [];
            for(let [name,value] of this.labelMapColor){
                colors.push(value);
                labels.push(name);
            }
            if(this.newLabelName=='' || colors.includes(this.newLabelColor) || labels.includes(this.newLabelName)){
                alert('invalid label or color');
            }else{
                this.showInput = false;
                this.addNewLabel({name:this.newLabelName,color:this.newLabelColor})
            }       
        }
    }
}
</script>

<style scoped>
.label-control{
    margin: 10px 5px;
}
.label-control .label-control-content .label-control-content-box{
    display: flex;
    flex-wrap: wrap;
}
.label-control .label-control-label{
    padding: 0px 6px;
    margin: 0px 5px 5px 0;
    line-height: 1.6em;
    font-weight: 500;
    border-radius: 10%;
}
.label-control .label-control-title{
    margin-top: 6px;
    font-size: 15px;
    font-weight: 500;
}
.label-control .label-control-title >>> .anticon {
  margin-right: 6px;
  font-size: 15px;
}
</style>