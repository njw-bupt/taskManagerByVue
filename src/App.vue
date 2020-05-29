<template>
  <div id="components-layout-demo-basic" :style='{height: windowHeight}'>
		<div class='app-header'>
			<p>KanBan APP</p>
		</div>

		<div id='taskManager'>
			<item-card 
				class='app-content-card'
				state='todo'
				v-bind:items='todoItems'
				v-on:delete-item='deleteItem'
				v-on:change-item='changeItem'
			></item-card>
			<item-card 
				class='app-content-card'
				state='doing'
				v-bind:items='doingItems'
				v-on:delete-item='deleteItem'
				v-on:change-item='changeItem'
			></item-card>
			<item-card 
				class='app-content-card'
				state='done'
				v-bind:items='doneItems'
				v-on:delete-item='deleteItem'
				v-on:change-item='changeItem'
			></item-card>
			<div class='app-sider'>
				<LabelControl 
					:label-map-color='labelMapColor'
					:add-new-label='addNewLabel'
				/>
				<div class='border-line'></div>
				<ItemInput 
					:label-map-color='labelMapColor'
					:add-item='addItem'
				></ItemInput>
				<div class='border-line'></div>
				<ChartOption
					:all-tasks='allTasks'
				></ChartOption>
			</div>
		</div>

		<div class='app-footer'>
			<p>Created By NJW</p>
		</div>
	</div>
</template>

<script>
import ItemCard from './components/ItemCard.vue'
import ItemInput from './components/ItemInput.vue'
import LabelControl from './components/LabelContorl.vue'
import ChartOption from './components/ChartOption.vue'
export default {
	name: 'App',
	data: function(){
		return {
			allItems: [],
			allLabels: [],
			allTasks: [],
			windowHeight:`${window.innerHeight}px`		
		}	
	},
	components: {
		ItemInput,
		ItemCard,
		LabelControl,
		ChartOption
	},
	computed: {
		todoItems: function(){
			return this.allTasks.filter(item=>item.state=='todo')
		},
		doingItems: function(){
			return this.allTasks.filter(item=>item.state=='doing')
		},
		doneItems: function(){
			return this.allTasks.filter(item=>item.state=='done')
		},
		labelMapColor: function() {
			let map = new Map();
			this.allLabels.forEach(label=>{
				map.set(label.name,label.color)
			})
			return map;
		}
	},
	watch: {
		allItems: function(){
			let vm = this;
			this.allTasks = vm.allItems.map(item=>{
				let newItem = item;
				for(let i=0; i<vm.allLabels.length; i++){
					if(vm.allLabels[i].name==item.label){
						newItem.color = vm.allLabels[i].color
					}
				}
				return newItem;
			})
		}
	},
	methods: {
		addNewLabel: function(label){
			//console.log(label);
			let vm = this;
			let xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function(){
				if(xhr.readyState===4){
					if(xhr.status===200){
						vm.allLabels = JSON.parse(xhr.responseText);
					}
				}
			}
			xhr.open('post','http://127.0.0.1:8080/taskManager/addNewLabel',true);
			xhr.send(JSON.stringify(label));
		},
		deleteItem: function(item){
			let vm = this;
			let xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function(){
				if(xhr.readyState===4){
					if(xhr.status===200){
						vm.allItems = JSON.parse(xhr.responseText);
					}
				}
			}
			xhr.open('post','http://127.0.0.1:8080/taskManager/deleteTask',true);
			xhr.send(JSON.stringify(item));
		},
		changeItem: function(item){
			let vm = this;
			let xhr = new XMLHttpRequest();
			let newItem = {
				name: item.name,
				state: item.state=='todo'?'doing':'done'
			}
			xhr.onreadystatechange = function(){
				if(xhr.readyState===4){
					if(xhr.status===200){
						vm.allItems = JSON.parse(xhr.responseText);
					}
				}
			}
			xhr.open('post','http://127.0.0.1:8080/taskManager/changeTaskState',true);
			xhr.send(JSON.stringify(newItem));
		},
		addItem: function(newTask){
			console.log('info:',newTask)
			let vm = this;
			let xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function(){
				if(xhr.readyState===4){
					if(xhr.status===200){
						vm.allItems = JSON.parse(xhr.responseText);
					}
				}
			}
			xhr.open('post','http://127.0.0.1:8080/taskManager/addNewTask',true);
			xhr.send(JSON.stringify(newTask));
		}
	},
	beforeCreate:function(){
		let vm = this;
		let labelXHR = new XMLHttpRequest();
		let taskXHR = new XMLHttpRequest();
		labelXHR.onreadystatechange = function(){
			if(labelXHR.readyState===4){
				if(labelXHR.status===200){
					let labels = JSON.parse(labelXHR.responseText);
					vm.allLabels = labels;
					taskXHR.open('get','http://127.0.0.1:8080/taskManager/getAllTasks',true);
					taskXHR.send(null);

					
					taskXHR.onreadystatechange = function(){
						if(taskXHR.readyState===4){
							if(taskXHR.status===200){
								let tasks = JSON.parse(taskXHR.responseText);
								vm.allItems = tasks;
							}
						}
					}
				}
			}
		}
		labelXHR.open('get','http://127.0.0.1:8080/taskManager/getAllLabels',true);
		labelXHR.send(null);
	}
}
</script>



<style>
#components-layout-demo-basic{
	text-align: left;
	font-size: 15px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
#components-layout-demo-basic .app-footer{
	height: 25px;
	text-align:center;
}
.app-header{
	background-color: #27ae60;
	color: #fff;
	font-size: 25px;
}
.app-header > p{
	margin-left: 10px;
}
#taskManager{
	flex-grow: 1;
	background-color: #dedede;
	display:flex;
	flex-wrap: wrap;
	justify-content: space-between;
}
#taskManager .app-content-card{
	flex-grow: 2;
}
#taskManager .app-sider{
	flex-grow: 0.5;
	background-color: #fff;
}
#components-layout-demo-basic p{
	margin-top: 0px;
	margin-bottom: 0px;
}

.app-sider .border-line {
  height:2px;
  margin: 10px 5px;
  background-color: #dbdbdb;
}

</style>