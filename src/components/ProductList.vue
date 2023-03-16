<template>
<div class="lessonSpace">


<div class="row">
  <!-- main content -->
  <div class="col-md-10">
    <div id="lessonSection" class="row">
      <div class="col-md-6 col-lg-4" v-for="lesson in filteredLessons" :key="lesson.id">
        <div class="card mb-2 cards">
          <img :src="imageUrl + lesson.img" alt="lesson.subject" class="card-img-top">
          <div class="card-text mb-0 d-flex justify-content-end">
            <i v-bind:class="lesson.icon" class="fa-2x"></i>
          </div>
          <div class="card-body">

            <b>Subject:</b> {{ lesson.subject }}
            <div class="card-text mb-0"> <b>Location :</b>{{ lesson.location }}</div>
            <div class="card-text mb-0"> <b>Price :</b>{{ lesson.price }}</div>
            <div class="card-text mb-0"> <b>Spaces :</b>{{ lesson.spaces }}</div>
          </div>
          <!---find a way to map, shopping cart vue js functionality-->
          <button type="button" class="btn btn-warning" v-on:click="addToCart(lesson)"
            v-if="canAddToCart(lesson)">Add to
            cart</button>
          <button v-else>Add to cart</button>
        </div>

        <span v-if="lesson.spaces - cartCount(lesson.id) === 0">
          All Out!
        </span>

        <span v-else-if="lesson.spaces - cartCount(lesson.id) < 5">
          Only {{ lesson.spaces }} items left!!
        </span>
        <span v-else>
          Buy Now!!!
        </span>

      </div>
    </div>
  </div>
  <!-- filter section -->
  <!-- <div class="col-md-2">
    <div class="row">
      <div class="col-md-6">
        <select v-model="sortFeature" class="form-control">
          <option disabled>Sort</option>
          <option value="subject">Subject</option>
          <option value="price">Price</option>
          <option value="location">Location</option>
          <option value="availability">Availabilty</option>
        </select>
      </div>
      <div class="col-md-6">
        <select v-model="sortOption" class="form-control">
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>
    </div>
  </div> -->
</div>
</div>
</template>

<script>
export default {
  name: 'app',
  props: ["filteredLessons", "imageUrl", "cart"],
  methods: {
    canAddToCart(aLesson) {
      return aLesson.spaces > this.cartCount(aLesson.id);
    },

    cartCount(lesson) {
      let count = 0;
      for (var i = 0; i < this.cart.length; i++) {
        if (this.cart[i] === lesson) {
          count++;
        }
      }

      return count;
    },
        // adds a lesson to cart -> the button
        addToCart: function(lessonId) {
      this.$emit("add-item-to-cart", lessonId)
    },
},
}
</script>