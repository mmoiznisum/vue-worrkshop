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
    addCartItem(state, item) {
      item.quantity = 1;
      state.cart.push(item);
    },
    updateCartItem(state, updatedItem) {
      state.cart = state.cart.map((cartItem) => {
        if (cartItem.id == updatedItem.id) {
          return updatedItem;
        }

        return cartItem;
      });
    },
    removeCartItem(state, item) {
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

// export default new Vuex.Store({
//   state: {
//     products: [
//       {
//         id: 1,
//         name: "Chelsea Shoes",
//         price: 200,
//         shortdesc: "Best Drip in the Market",
//         url: "images/chelsea-shoes.png"
//       },
//       {
//         id: 2,
//         name: "Kimono",
//         price: 50,
//         shortdesc: "Classy, Stylish, Dope",
//         url: "images/kimono.png"
//       },
//       {
//         id: 3,
//         name: "Rolex",
//         price: 2500,
//         shortdesc: "Elegance built in",
//         url: "images/rolex.png"
//       },
//       {
//         id: 4,
//         name: "Baelerry Wallet",
//         price: 80,
//         shortdesc: "Sleek, Trendy, Clean",
//         url: "images/wallet.png"
//       },
//       {
//         id: 5,
//         name: "Lady Handbags",
//         price: 230,
//         shortdesc: "Fabulous, Exotic, Classy",
//         url: "images/handbag.png"
//       },
//       {
//         id: 6,
//         name: "Casual Shirts",
//         price: 30,
//         shortdesc: "Neat, Sleek, Smart",
//         url: "images/shirt.png"
//       }
//     ],
//     cart: []
//   },
//   mutations: {
//     addCartItem(state, item) {
//       item.quantity = 1;
//       state.cart.push(item);
//     },
//     updateCartItem(state, updatedItem) {
//       state.cart = state.cart.map((cartItem) => {
//         if (cartItem.id == updatedItem.id) {
//           return updatedItem;
//         }

//         return cartItem;
//       });
//     },
//     removeCartItem(state, item) {
//       state.cart = state.cart.filter((cartItem) => {
//         return cartItem.id != item.id;
//       });
//     }
//   }
// });