<template>
      <div class="row" id="cartSection">
        <div class="col-md-6 col-lg-4" v-for="cartItem in cart" :key="cartItem.id">
          <div class="card mb-2 cards">
            <img :src="imageUrl + cartItem.lesson.img" alt="cartItem.lesson.subject" class="card-img-top">
            <div class="card-text mb-0">
              <i v-bind:class="cartItem.lesson.icon" class="fa-2x"></i>
            </div>
            <div class="card-body">

              <h5 class="card-title"> <b>Subject :</b>{{ cartItem.lesson.subject }}</h5>
            </div>
            <div class="card-text mb-0"><b>Location :</b>{{ cartItem.lesson.location }}</div>
            <div class="card-text mb-0"><b>Price :</b>{{ cartItem.lesson.price }}</div>
            <div class="card-text mb-0"><b>Spaces :</b>{{ cartItem.spaces }}</div>
            <!---find a way to map, shopping cart vue js functionality-->
            <button class="btn btn-warning" v-on:click="removeCart(cartItem.lessonId)">Remove from cart</button>
          </div>
        </div>

        <div class="row">
         
          <h2>Checkout Details</h2>
          <div class="col-md-4">
            <label for="name">Name</label><br />
            <input type="text" placeholder="Name" name="name" id="naming">
          </div>

          <div class="col-md-4">
            <label for="name">Number</label><br />
            <input type="text" placeholder="Phone Number" name="phone" id="numbering">
          </div>

          <p> </p>
          <div class="col-md-4">
            <button class="btn btn-primary">Checkout</button>
            <!-- <p>Status: {{ message }}</p> -->
          </div>

        </div>

      </div>
</template>

<script>
export default {
  name: "app",
  props: ["filteredLessons", "imageUrl", "cart"],
  methods: {
    // removes a lesson from cart -> event
    removeCart(lessonId) {
        this.$emit("remove-item-from-cart", lessonId)
    },
    submitForm() {
      alert("Your order has been Submitted");
    },
  },

};

</script>