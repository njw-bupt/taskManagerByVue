<template>
  <div class='item-input'>
    <a-button 
        type="default" 
        @click="showModal"
        size='small'
    >+</a-button>
    <span>Add New Task</span>
    <a-modal
      title="New Task Information"
      :visible="visible"
      :footer='null'
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
        <InputForm 
            :label-map-color='labelMapColor'
            :handleOk='handleOk'
        ></InputForm>
    </a-modal>
  </div>
</template>

<script>
import InputForm from './InputForm.vue';
export default {
    props: {
        labelMapColor: Map,
        addItem: Function
    },
    data() {
        return {
            visible: false,
            confirmLoading: false,
        };
    },
    components: {
        InputForm
    },
    methods: {
        showModal() {
            this.visible = true;
        },
        handleOk(values){
            console.log(values);
            this.confirmLoading = true;
            //将下面的步骤改为数据库异步操作回调
            this.visible = false;
            this.addItem(values);
        },
        // handleOk() {
        //   this.confirmLoading = true;
        //   setTimeout(() => {
        //     this.visible = false;
        //     this.confirmLoading = false;
        //   }, 2000);
        // },
        handleCancel(){
            this.visible = false;
        }
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item-input{
    margin: 0 5px;
    font-size: 15px;
    font-weight: 500;
}
.item-input span{
    margin-left: 6px;
}
</style>