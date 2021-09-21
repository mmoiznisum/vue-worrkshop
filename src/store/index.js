import axios from 'axios'
import Vuex from 'vuex'
import Vue from 'vue'

//load Vuex
Vue.use(Vuex);

//to handle state
const state = {
    foods: [],
    cart: []
}

//to handle state
const getters = {
    getCarts: (state) => state.cart
}

//to handle actions
const actions = {
    getFoods({ commit }) {
        axios.get('https://foodbukka.herokuapp.com/api/v1/menu')
            .then(response => {
                commit('SET_FOODS', response.data.Result)
        })
    }
}

//to handle mutations
const mutations = {
    SET_FOODS(state, foods) {
        state.foods = foods
    },
    ADD_CART_ITEM(state, item) {
      item.quantity = 1;
      state.cart.push(item);
    },
    UPDATE_CART_ITEM(state, updatedItem) {
      state.cart = state.cart.map((cartItem) => {
        if (cartItem.id == updatedItem.id) {
          return updatedItem;
        }
        return cartItem;
      });
    },
    REMOVE_CART_ITEM(state, item) {
      state.cart = state.cart.filter((cartItem) => {
        return cartItem.id != item.id;
      });
    }
}

//export store module
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})