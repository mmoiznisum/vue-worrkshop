<template>
  <div class="home">
    <h1>{{ title }}</h1>
    <div class="progress progress-striped active col" v-if="isLoading">
      <div class="progress-bar" style="width: 50%"></div>
    </div>
    <div class="row" v-if="!hasError">
      <div class="col-md-4 col-lg4" v-for="data in restaurants" :key="data._id">
        <img :src="data.images[getRandomNumbers()]" class="img-fluid" />
        <h3 @click="goTodetail(data._id)">{{ data.menuname }}</h3>
      </div>
    </div>
    <div v-else>
      <p>Something went wrong...!</p>
    </div>
  </div>
</template>

<script>
import { getRandomNumbers } from "../utils/utils";
export default {
  name: "home",
  data() {
    return {
      title: "Home",
      restaurants: [],
      getRandomNumbers,
      hasError: false,
      isLoading: true
    };
  },
  methods: {
    goTodetail(prodId) {
      this.$router.push({ name: "details", params: { Pid: prodId } });
    },
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
    this.getData();
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
</style>
