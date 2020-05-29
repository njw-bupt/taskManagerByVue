import Vue from 'vue'
import App from './App.vue'
// import Button from 'ant-design-vue/lib/button';
// import Layout from 'ant-design-vue/lib/layout';
// import Card from 'ant-design-vue/lib/card';
// import List from 'ant-design-vue/lib/list';
// import Col from 'ant-design-vue/lib/col';
// import Row from 'ant-design-vue/lib/row';
// import Modal from 'ant-design-vue/lib/modal';
import Antd from 'ant-design-vue';

import 'ant-design-vue/dist/antd.css';

// Vue.use(Button);
// Vue.use(Layout);
// Vue.use(Card);
// Vue.use(List);
// Vue.use(Col);
// Vue.use(Row);
// Vue.use(Modal);
Vue.use(Antd);



Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

