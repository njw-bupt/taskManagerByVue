<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-header>header</a-layout-header>
      <a-layout>
        <a-layout-content>
			<div id='taskManager'>
				<a-row>
					<a-col :span="8">
						<item-card 
							state='todo'
							v-bind:items='todoItems'
							v-on:delete-item='deleteItem'
							v-on:change-item='changeItem'
						></item-card>
					</a-col>
					<a-col :span="8">
						<item-card 
							state='doing'
							v-bind:items='doingItems'
							v-on:delete-item='deleteItem'
							v-on:change-item='changeItem'
						></item-card>
					</a-col>
					<a-col :span="8">
						<item-card 
							state='done'
							v-bind:items='doneItems'
							v-on:delete-item='deleteItem'
							v-on:change-item='changeItem'
						></item-card>
					</a-col>
				</a-row>
			</div>
		</a-layout-content>
        <a-layout-sider>
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
		</a-layout-sider>
    </a-layout>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import ItemCard from './components/ItemCard.vue'
import ItemInput from './components/ItemInput.vue'
import LabelControl from './components/LabelContorl.vue'
export default {
	name: 'App',
	data: function(){
		return {
			allItems: [],
			allLabels: [],
			allTasks: []			
		}	
	},
	components: {
		ItemInput,
		ItemCard,
		LabelControl
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
		// let vm = this;
		// let xhr = new XMLHttpRequest();
		// xhr.onreadystatechange = function(){
		// 	if(xhr.readyState===4){
		// 		if(xhr.status===200){
		// 			let tasks = JSON.parse(xhr.responseText);
		// 			vm.allItems = tasks;
		// 		}
		// 	}
		// }
		// xhr.open('get','http://127.0.0.1:8080/taskManager/getAllTasks',true);
		// xhr.send(null);
		// let xhr2 = new XMLHttpRequest();
		// xhr2.onreadystatechange = function(){
		// 	if(xhr2.readyState===4){
		// 		if(xhr2.status===200){
		// 			let labels = JSON.parse(xhr2.responseText);
		// 			vm.allLabels = labels;
		// 		}
		// 	}
		// }
		// xhr2.open('get','http://127.0.0.1:8080/taskManager/getAllLabels',true);
		// xhr2.send(null);
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
#taskManager{
	background-color: #dedede;

}
#components-layout-demo-basic {
  text-align: left;
	font-size: 15px;
}
#components-layout-demo-basic p{
	margin-top: 0px;
	margin-bottom: 0px;
}
#components-layout-demo-basic .ant-layout-header,
#components-layout-demo-basic .ant-layout-footer {
  background: #7dbcea;
  /* color: #fff; */
}
#components-layout-demo-basic .ant-layout-footer {
  /* line-height: 1.5; */
}
#components-layout-demo-basic .ant-layout-sider {
  background: #fff;
  border-left: cadetblue;
  /* color: #fff;
  line-height: 120px; */
}
#components-layout-demo-basic .ant-layout-content {
  /* background: rgba(16, 142, 233, 1);
  color: #fff; */
  min-height: 120px;
  /* line-height: 120px; */
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
#components-layout-demo-basic .border-line {
  height:2px;
  margin: 10px 5px;
  background-color: #dbdbdb;
}

</style>