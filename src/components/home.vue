<template>
  <div class="home">
    <h1>{{ title }}</h1>
    <!-- <div class="progress progress-striped active col" v-if="isLoading">
      <div class="progress-bar" style="width: 50%"></div>
    </div> -->
    <ul class="list-group mb-3">
      <h3 v-if="carts.length !== 0">Added Items</h3>
      <li
        v-for="cart in carts"
        :key="cart._id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        {{ cart.menuname }}
        <span class="badge bg-primary rounded-pill">{{ cart.quantity }}</span>
        <span class="badge rounded-pill bg-danger"  @click="removeItem(cart)">X</span>
      </li>
    </ul>
    <div class="row align-center" v-if="!hasError">
      <div
        class="card ml-3 mb-3 col-md-3 col-lg-3 "
        v-for="data in foods"
        :key="data._id"
      >
        <h3 class="card-header">{{ data.menuname }}</h3>
        <img :src="data.images[getRandomNumbers()]" class="img-fluid" />
        <div class="card-body">
          <p class="card-text">
            {{ data.description }}
          </p>
        </div>
        <div class="card-body">
          <button
            @click="goTodetail(data._id)"
            type="button"
            class="btn btn-primary"
          >
            Detail
          </button>
          <button
            type="button"
            @click="addToCart(data)"
            class="btn btn-outline-warning"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Something went wrong...!</p>
    </div>
  </div>
</template>

<script>
import { getRandomNumbers } from "../utils/utils";
import { mapState } from "vuex";

export default {
  name: "home",
  data() {
    return {
      title: "Available Foods!",
      restaurants: [],
      getRandomNumbers,
      hasError: false,
      isLoading: true,
    };
  },
  methods: {
    goTodetail(prodId) {
      this.$router.push({ name: "details", params: { Pid: prodId } });
    },
    // TODO: Unused methods; b/c currently exposing it from store
    async getData() {
      try {
        const response = await this.$http.get(
          "https://foodbukka.herokuapp.com/api/v1/menu"
        );
        this.restaurants = response.data.Result;
      } catch (error) {
        this.hasError = true;
      }
      this.isLoading = false;
    }
  },
  created() {
    this.$store.dispatch("getFoods");
    // this.getData();
  },
  methods: {
    itemAlreadyInCart(product) {
      let inCart = false;
      this.carts.forEach(item => {
        if (item._id == product._id) {
          inCart = true;
        }
      });
      return inCart;
    },
    addToCart(product) {
      if (!this.itemAlreadyInCart(product)) {
        this.$store.commit("ADD_CART_ITEM", product);
      } else {
        this.$store.commit("UPDATE_CART_ITEM", product);
        //alert("Item already added to Cart");
      }
    },
    removeItem(product){
        this.$store.commit("REMOVE_CART_ITEM", product);
    }
  },
  computed: {
    foods() {
      return this.$store.state.foods;
    },
    ...mapState({
      carts: state => state.cart
    }),
    // TODO: you can get carts from this as well
    // carts() {
    //   return this.$store.getters.getCarts;
    // }
  },
  getRandomNumbers
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.row img {
  max-height: 15em;
  width: 100%;
}
.row h3 {
  cursor: pointer;
}
.align-center {
  justify-content: center;
}
</style>
