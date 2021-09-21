<template>
  <div class="details">
    <div class="container">
      <div class="row">
        <div class="card col-md-6" v-if="!hasError">
        <h3 class="card-header">{{item.menuname}}</h3>
         <img :src="item.images[getRandomNumbers()]" class="img-fluid" />
        <div class="card-body">
          <p class="card-text">
            {{item.description}}
          </p>
        </div>
        </div>
        <div class="col-md-12" v-else>
          <p>Something went wrong...!</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { getRandomNumbers } from "../utils/utils";
export default {
  name: "details",
  data() {
    return {
      proId: this.$route.params.Pid,
      item: {},
      title: "details",
      hasError: false,
      getRandomNumbers
    };
  },
  methods: {
    async getItemDetail() {
      try {
        const response = await this.$http.get(
          `https://foodbukka.herokuapp.com/api/v1/menu/${this.proId}`
        );
        this.item = response.data.Result;
      } catch (error) {
		  this.hasError = true;
      }
    }
  },
  created() {
    this.getItemDetail();
  }
};
</script>
