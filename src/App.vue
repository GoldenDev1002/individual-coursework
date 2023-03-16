<template>
  <div id="app">
    <nav class="navbar navbar-light bg-danger">
      <div class="col-md-5 ml-5">
        <form>
          <input
            class="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
      </div>
      <div class="col-md-2">
        <button
          v-if="cartItem <= 0"
          type="button"
         
          class="btn btn-warning px-2 disabled"
        >
          No item in cart
        </button>
        <button
          v-else
          type="button"
          v-on:click="showButton"
          class="btn btn-warning px-2"
        >
          <span v-if="this.cart.length > 0"> Go to cart {{ cartItem }} </span>
          <span v-else> Go back to home </span>
        </button>
      </div>
    </nav>

    <main>
      <component
        :is="currentView"
        :filteredLessons="filteredLessons"
        :imageUrl="imageUrl"
        :cart="cart"
        @add-item-to-cart="addToCart" 
        @remove-item-from-cart="removeCart"
      ></component>
    </main>
  </div>
</template>

<script>
import ProductList from "./components/ProductList.vue";
import Checkout from "./components/Checkout.vue";

export default {
  name: "app",
  data() {
    return {
      currentView: ProductList,
      lessons: [],
      cart: [],
      imageUrl: "https://webbased-env.eba-p5pzhqty.eu-west-2.elasticbeanstalk.com/image/",
    };
  },
  components: {
    ProductList,
    Checkout,
  },

  created: function () { 
    fetch(
      "https://webbased-env.eba-p5pzhqty.eu-west-2.elasticbeanstalk.com/lessons"
    )
      .then((response) => response.json())
      .then((lessons) => {
        this.lessons = lessons;
      });
  },
  methods: {
    addToCart(aLesson) {
      // reduces number of spaces for lesson given
      aLesson.spaces--;

      // check if lesson passed is already existing in cart
      var existingItemInCart = this.cart.find(
        (item) => item.lessonId === aLesson.id
      );
      if (existingItemInCart == null) {
        // lesson does not yet exist in cart, add lesson to cart
        // create and save cartItem object for new lesson to be added to cart
        var cartItem = { lessonId: aLesson.id, spaces: 1, lesson: aLesson };
        this.cart.push(cartItem);
      } else {
        // update number of spaces for existing lesson in cart
        ++existingItemInCart.spaces;
      }
    },

    showButton() { //the cart button
      if (this.currentView == ProductList) {
        this.currentView = Checkout;
      } else {
        this.currentView = ProductList;
      }
    },

    removeCart(lessonId) {
      // find selected lesson in cart
      var itemInCart = this.getCartItemFromCartByLessonId(lessonId);

      if (itemInCart.spaces == 1) {
        // if just one item space is left, remove item completely from cart
        var index = this.cart.map((x) => x.lessonId).indexOf(lessonId);
        this.cart.splice(index, 1);

        // redirect user back to home if cart is empty
        if (this.cart.length <= 0) {
          this.showButton();
        }
      } else {
        // reduce number of spaces of item in cart
        --itemInCart.spaces;
      }

      // increase lesson space
      var lesson = this.getLessonById(lessonId);
      ++lesson.spaces;
    },
    // get lesson by id
    getLessonById(lessonId) {
      var lesson = this.lessons.find((u) => u.id == lessonId);
      return lesson;
    },
    // get item in cart by id
    getCartItemFromCartByLessonId(lessonId) {
      var item = this.cart.find((u) => u.lessonId == lessonId);
      return item;
    },
  },
  computed: {
    cartItem: function () {
      return this.cart.length; //this data is unsuitabkle because of use rinteraction i.e the user is supposed to input in this scenario
    },

    filteredLessons: function () {
      let eachLesson = this.lessons;

      if (this.search != "") {
        eachLesson = eachLesson.filter((lesson) => {
          return (
            lesson.subject.toLowerCase().match(this.search) ||
            lesson.location.toLowerCase().match(this.search)
          );
        });
      }

      if (this.sortOption === "ascending") {
        switch (this.sortFeature) {
          case "subject":
            return lessons.sort((a, b) => {
              if (a.subject.toLowerCase() < b.subject.toLowerCase()) return -1;
              return 1;
            });
          case "location":
            return lessons.sort((a, b) => {
              if (a.location.toLowerCase() < b.location.toLowerCase())
                return -1;
              return 1;
            });
          case "price":
            return lessons.sort((a, b) => a.price - b.price);
          case "availability":
            return lessons.sort((a, b) => {
              if (a.spaces > b.spaces) return -1;
              return 1;
            });
        }
      } else if (this.sortOption === "descending") {
        switch (this.sortFeature) {
          case "subject":
            return lessons.sort((a, b) => {
              if (a.subject.toLowerCase() < b.subject.toLowerCase()) return 1;
              return -1;
            });
          case "location":
            return lessons.sort((a, b) => {
              if (a.location.toLowerCase() < b.location.toLowerCase()) return 1;
              return -1;
            });
          case "price":
            return lessons.sort((a, b) => b.price - a.price);
          case "availability":
            return lessons.sort((a, b) => {
              if (a.spaces > b.spaces) return 1;
              return -1;
            });
        }
      }

      return eachLesson;
    },
  },
};
</script>
