<template>
    <div class='state-card'>
        <p class='state-card-title'>{{ stateTitle }}</p>
            <item-detail
                v-for='(item) in items'
                v-bind:item='item'
                v-bind:key='item.name'
                v-bind:state='state'
                v-on:delete-item='$emit("delete-item",$event)'
                v-on:change-item='$emit("change-item",$event)'			
            ></item-detail>
       
    </div>
</template>

<script>
import ItemDetail from './ItemDetail.vue';

export default {
	props: {
		state: {
			type: String,
			required: true
		},
        items: Array,
    },
	components: {
		ItemDetail
    },
    computed: {
        stateTitle: function(){
            let arr = this.state.split('');
            arr[0] = arr[0].toUpperCase();
            return arr.join('');
        }
    },
}
</script>

<style scoped>
.state-card{
    border-right: 5px solid #d5d5d5;
    height: 100%;
    /* min-height: 500px; */
}
.state-card-title{
    font-size: 20px;
    font-weight: 500;
    padding-left: 10px;
    background-color: #e4e4e4;
    line-height: 2em;
}
</style>