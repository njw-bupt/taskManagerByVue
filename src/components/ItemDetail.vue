<template>
    <div class='item-card'>
        <div class='item-card-title' @click='triggerContent' >
            <div>
                <a-icon v-if='showDetail' type="down" title='click to hide detail info' class='item-card-title-icon'/>
                <a-icon v-else type="right" title='click to show detail info' class='item-card-title-icon'/>
                <p>{{ item.name }}</p>
            </div>
            <div class='item-card-title-label' :style="{backgroundColor: labelColor}"></div>
        </div>
        <div class='item-card-content' :class='hideContent'>
            <p class='item-card-content-des'>{{ item.description }}</p>
            <div class='item-card-content-operate'>
                <a-button 
                    type="default" 
                    @click="$emit('change-item',item)"
                    v-if='state!="done"'
                    size='small'
                    class='item-card-content-change-button'
                >Transfer</a-button>
                <a-button 
                    type="default" 
                    @click="$emit('delete-item',item)"
                    size='small'
                    class='item-card-content-delete-button'
                >Delete</a-button>
            </div>
            <p class='item-card-content-time' id='item-card-content-time'>created at {{ item.createdTime }}</p>
        </div>     
    </div>
</template>

<script>
export default {
    props: {
		state: String,
        item: Object,
    },
    data: function(){
        return {
            hideContent: {
                'card-content-hide': false
            },
            showDetail: true,
            labelColor: this.item.color
        }
    },
    methods: {
        triggerContent: function(){
            this.showDetail = !this.showDetail;
            this.hideContent['card-content-hide'] = !this.hideContent['card-content-hide'];
        }
    },
}
</script>

<style scoped>
.item-card{
    margin: 8px auto;
}
.item-card .item-card-title{
    background-color: #f7f7f7;
    border: 1px solid #f2f2f2;
    padding: 6px;
    font-size: 18px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.item-card .item-card-title div{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.item-card .item-card-title .item-card-title-icon{
    font-size: 12px;
}
.item-card .item-card-title .item-card-title-label{
    width: 12px;
    height: 12px;
}
.item-card .item-card-title p{
    margin-left: 6px;
}
.item-card .item-card-content{
    background-color: #fff;
    border: 1px solid #f2f2f2;
    border-top-width: 0px;
    padding: 10px;
    font-weight: 500;
}
.item-card .item-card-content .item-card-content-des{
    line-height: 2em;
}
.item-card .item-card-content #item-card-content-time{
    text-align: right;
    font-size: 10px;
}
.item-card .item-card-content .item-card-content-operate{
    margin: 10px 0px;
}
.item-card .item-card-content .item-card-content-change-button{
    background-color: #ebebeb;
    margin-right: 10px;
}
.item-card .item-card-content .item-card-content-delete-button{
    background-color: #c6c6c6;
    
}
.card-content-hide{
    display: none;
}
</style>