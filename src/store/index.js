import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCart(state, payload) {
      let product = state.cartList.find(item => {
        return (item.iid === payload.iid) & (item.style === payload.style);
      });
      if (product) {
        product.counter += payload.counter;
      } else {
        state.cartList.push(payload);
      }
    },
    deleteCart(state, payload) {
      let productIndex = state.cartList.findIndex(val => {
        return (val.iid === payload.iid) & (val.style === payload.style);
      });
      if (productIndex != -1) {
        state.cartList.splice(productIndex, 1);
      }
    },
    deleteAll(state) {
      state.cartList.splice(0, state.cartList.length);
    }
  }
});

export default store;
