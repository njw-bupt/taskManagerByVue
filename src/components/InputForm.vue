<template>
    <div id='new-task-form'>
        <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
            <a-form-item label="name">
                <a-input
                    v-decorator="['name', { rules: [{ required: true, message: 'Please input task name!' }] }]"
                />
            </a-form-item>
            <a-form-item label="description">
                <a-input
                    v-decorator="['description', { rules: [{ required: true, message: 'Please input description!' }] }]"
                />
            </a-form-item>
            <a-form-item label="priority">
                <a-radio-group 
                    v-decorator="['priority', { rules: [{ required: true, message: 'Please select a prioity!' }] }]"
                >
                    <a-radio-button value="high">high</a-radio-button>
                    <a-radio-button value="middle">middle</a-radio-button>
                    <a-radio-button value="low">low</a-radio-button>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="label">
                <a-select
                    v-decorator="[
                        'label',
                        { rules: [{ required: true, message: 'Please select a label for your task!' }] },
                    ]"
                    placeholder="Please select a label"
                >
                    <a-select-option
                        v-for='label in labels'
                        v-bind:key='label'
                        v-bind:value='label'
                    >
                    {{ label }}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                <a-button type="primary" html-type="submit">
                    submit
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
export default {
    props: {
        labelMapColor: Map,
        handleOk: Function
    },
    computed: {
        labels: function(){
            return Array.from(this.labelMapColor.keys());
        }
    },
    data() {
        return {
            form: this.$form.createForm(this, { name: 'coordinated' }),
        };
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                    values.createdTime = new Date();
                    values.state = 'todo'
                    this.handleOk(values);
                    //console.log('Received values of form: ', values);
                }
            });
        },
    }
};
</script>

<style scoped>
#new-task-form .ant-form-item-label {
    text-align: left;
}
</style>